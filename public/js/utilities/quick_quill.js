function defaultQuill (elem) {
   return new Quill(elem, {
      modules: {
         toolbar: [
            [{
               header: [1, 2, false]
            }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block']
         ]
      },
      placeholder: 'Please type a message!',
      theme: 'snow' // or 'bubble'
   });
}
