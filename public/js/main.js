document.addEventListener('DOMContentLoaded', () => {
    ClassicEditor
        .create(document.querySelector('#editor'), {
            toolbar: [
                'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
                'alignment', 'blockQuote', 'insertTable', 'undo', 'redo'
            ],
            height: '300px', // Set a proper height
            enterMode: 'BR' // Ensure <br> tags are used on Enter
        })
        .then(editor => {
            console.log('CKEditor initialized successfully!');
        })
        .catch(error => {
            console.error('Error initializing CKEditor:', error);
        });
});
