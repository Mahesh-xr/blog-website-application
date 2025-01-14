import express from 'express';
import Bodyparser from 'body-parser'
import bodyParser from 'body-parser';

const app = express();
const port = 3000;
var blogId = 0;
let allblogs = []

app.use(express.static("public"));
app.use(Bodyparser.urlencoded({extended:true}));

app.get('/',(req, res)=>{
    res.render("index.ejs", {blogs:allblogs});
});

 


app.route("/create")
    .get((req, res)=>{
    res.render("create.ejs");
})
    .post((req, res)=>{
        const { title, subTitle, author, content ,date} = req.body;
        // Create an object to store the data
        const newBlog = {
            id : ++blogId,
            title,      // Title from form
            subTitle,   // Sub Title from form
            author,     // Author name from form
            content ,    // Content from form
            date
        };
        allblogs.push(newBlog)
    res.redirect("/")
});

app.route("/update/:id")
    .get((req, res)=>{
    var targetId = req.params.id;
    console.log(targetId)
    let foundBlog = null;

    for (let i = 0; i < allblogs.length; i++) {
        if (allblogs[i].id == targetId) {
            foundBlog = allblogs[i];
            break; // Exit the loop once found
        }
        else{
            console.log(allblogs[i].id)
        }
}
    console.log(foundBlog)
    res.render("update.ejs",{blog:foundBlog});
})
    app.post('/update/:id', (req, res) => {
    const blogId = parseInt(req.params.id);
    const { title, subTitle, author, content } = req.body;

    const index = allblogs.findIndex(blog => blog.id === blogId);

    if (index !== -1) {
        allblogs[index] = {
            id: blogId,
            title,
            subTitle,
            author,
            content,
            date: new Date().toLocaleDateString()
        };
    
        res.redirect('/');  // Redirect after the update.
    } else {
        res.send('Blog not found');
    }
});

app.get('/read/:id',(req,res)=>{
    var targetId = req.params.id;
    let foundBlog = null;

    for (let i = 0; i < allblogs.length; i++) {
        if (allblogs[i].id == targetId) {
            foundBlog = allblogs[i];
            break; // Exit the loop once found
        }
        else{
            console.log(allblogs[i].id)
        }
}
    const blogToShow = foundBlog;
    res.render('read.ejs',{blog:blogToShow})
})


app.post('/delete/:id',(req,res)=>{
    var targetId = req.params.id;
    let foundBlog = null;

    for (let i = 0; i < allblogs.length; i++) {
        if (allblogs[i].id == targetId) {
            foundBlog = allblogs[i];
            break; // Exit the loop once found
        }
        else{
            console.log(allblogs[i].id)
        }
}
    allblogs.pop(foundBlog);
    res.redirect("/")
})
app.listen(port, (req,res) =>{
    console.log("server running at port 3000...");
});

app.get("/contact", (req, res)=>{
    res.render("contact.ejs");
});
  
