$(function() {
   // Events
   $("#login-btn").on('click', function (e) {
      var credentials = {
         username: $("#username").val(),
         password: $("#password").val()
      }

      $.ajax({
         url: '/login/validate',
         method: 'POST',
         data: credentials,
         success: function (errors) {
            if (errors.length > 0) {
               // Display errors
               errors.forEach(function (error) { // display each error
                  alertify.logPosition('top center');
                  alertify.error(error);
               });
            } else {
               // redirect to dashboard
               window.location.replace("/dashboard");
            }
         }
      });
   });
});
