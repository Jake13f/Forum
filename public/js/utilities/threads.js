// Create a new thread
// @param options - the new thread's options to create
// @param cb - callback sending back the results of the thread creation
function createThread (options, cb) {
   $.ajax({
      url: '/thread/create',
      method: 'POST',
      data: options,
      success: function (thread) { cb(thread); },
      error: function (x, status, error) { cb(false, x.status); }
   });
}
