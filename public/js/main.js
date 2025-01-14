// public/js/main.js
window.addEventListener('DOMContentLoaded', (event) => {
  ClassicEditor
      .create(document.querySelector('#editor'), {
          toolbar: [
              'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
              'alignment', 'blockQuote', 'insertTable', 'undo', 'redo'
          ],
          height: 0,
          width: '50%',
          enterMode: ClassicEditor.ENTER_BR,  // set it to use <br> instead of <p> when Enter is pressed
      })
      .catch(error => {
          console.error(error);
      });
});
