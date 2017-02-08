var files;

$('.upload-btn').on('click', function (){
  
  if(files.length > 0)
  {
    var formData = new FormData();
    var file = files[0];
    formData.append('upload', file, file.name);

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          $("#debug").html('upload successful!\n' + data);
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update progress bar
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            if (percentComplete === 100) {
              $('.progress-bar').html('Done');
            }
          }

        }, false);

        return xhr;
      }
    });
  }
  // reset ui
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#input-file').on('change', function(){

  files = $(this).get(0).files;

});