import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
let blogId = 0;
let allblogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to add current route info
app.use((req, res, next) => {
    res.locals.currentRoute = req.path;
    next();
});

// Home Route
app.get('/', (req, res) => {
    res.render("index.ejs", { 
        blogs: allblogs, 
        title: "Discover Stories, Insights, and Updates" 
    });
});

// Create Route
app.route("/create")
    .get((req, res) => {
        res.render("create.ejs", { title: "Create Your Own Blog, Your own World" });
    })
    .post((req, res) => {
        const { title, subTitle, author, content, date } = req.body;
        const newBlog = {
            id: ++blogId,
            title,
            subTitle,
            author,
            content,
            date
        };
        allblogs.push(newBlog);
        res.redirect("/");
    });

// Update Route
app.route("/update/:id")
    .get((req, res) => {
        const targetId = parseInt(req.params.id);
        const foundBlog = allblogs.find(blog => blog.id === targetId);

        if (foundBlog) {
            res.render("update.ejs", {
                blog: foundBlog,
                title: "Edit and Enhance Your Content"
            });
        } else {
            res.send("Blog not found");
        }
    })
    .post((req, res) => {
        const targetId = parseInt(req.params.id);
        const { title, subTitle, author, content } = req.body;
        const index = allblogs.findIndex(blog => blog.id === targetId);

        if (index !== -1) {
            allblogs[index] = {
                id: targetId,
                title,
                subTitle,
                author,
                content,
                date: new Date().toLocaleDateString()
            };
            res.redirect(`/read/${targetId}`);
        } else {
            res.send("Blog not found");
        }
    });

// Read Route
app.get('/read/:id', (req, res) => {
    const targetId = parseInt(req.params.id);
    const foundBlog = allblogs.find(blog => blog.id === targetId);

    if (foundBlog) {
        res.render("read.ejs", {
            blog: foundBlog,
            title: "Your Gateway to Knowledge and Inspiration"
        });
    } else {
        res.send("Blog not found");
    }
});

// Delete Route
app.post('/delete/:id', (req, res) => {
    const targetId = parseInt(req.params.id);
    allblogs = allblogs.filter(blog => blog.id !== targetId);
    res.redirect("/");
});

// Contact Route
app.get("/contact", (req, res) => {
    res.render("contact.ejs", {
        title: "Get in Touch, We love to Hear from you"
    });
});

// About Route
app.get("/about", (req, res) => {
    res.render("about.ejs", {
        title: "Discover the Story Behind the Blog"
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at port ${port}...`);
});
