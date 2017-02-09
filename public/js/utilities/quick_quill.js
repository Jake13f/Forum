function defaultQuill (elem) {
   return new Quill(elem, {
      modules: {
         toolbar: [
            ['bold', 'italic', 'underline'],
            ['code-block']
         ]
      },
      placeholder: 'Please type a message!',
      theme: 'snow' // or 'bubble'
   });
}
