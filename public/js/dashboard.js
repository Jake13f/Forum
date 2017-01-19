$(function () {
   // Options for the thread list
   var options = {
      page: 10,
      valueNames: [ 'tname', 'posts' ],
      plugins: [
         ListPagination({
            innerWindow: 2,
            outerWindow: 2
         })
      ]
   };

   // Initialize thread list
   var userList = new List('threads', options);
});
