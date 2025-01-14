<script src="https://cdn.ckeditor.com/4.20.2/standard/ckeditor.js"></script>
 CKEDITOR.replace('editor', {
    height: 200,
    toolbarGroups: [
      { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
      { name: 'paragraph', groups: ['list', 'blocks', 'align', 'bidi'] },
      { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
      { name: 'insert' },
      { name: 'links' },
      { name: 'styles' },
      { name: 'colors' },
      { name: 'tools' },
      
    ],
    enterMode: CKEDITOR.ENTER_BR, 
  });
