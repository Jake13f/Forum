$(function() {
   // Events
   $("#login-btn").on('click', function (e) {
      var credentials = {
         username: $("#username").val(),
         password: $("#password").val()
      }

      console.log(credentials);

      $.ajax({
         url: '/login/validate',
         method: 'POST',
         data: credentials
      });
   });
});
