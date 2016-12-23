$(function() {
   // Events
   $("#login-btn").on('click', function (e) {
      var credentials = {
         username: $("#username").val(),
         password: $("#password").val()
      }

      $.ajax({
         url: '/login/login',
         method: 'POST',
         data: credentials,
         success: (errors) => {
            if (errors.length > 0) {
               // Display errors
            } else {
               // redirect to dashboard
               window.location.replace("/");
            }
         }
      });
   });
});
