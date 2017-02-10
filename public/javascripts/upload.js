var files;

// Upload Test File Click Handler
$('.upload-btn').on('click', function ()
{
  $('#debug').html('fasdfqasg');
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
      success: function(data)
      {
        var results = '';
        var resultJSON = JSON.parse(data);
        var resultArr = resultJSON.results;
        if(resultArr == "error"){
          $('#titleResults').html("Error");
          $('.spinner').css("visibility", "hidden");
          $('#bodyResults').html("File does not contain valid json");  
        }
        else{
          for(var i = 0; i < resultArr.length; i++)
          {
            results += resultArr[i] + '</br>';
          }

          $('#titleResults').html("RESULTS");
          $('.spinner').css("visibility", "hidden");
          $('#bodyResults').html(results);  
        }
        
      },
      xhr: function() 
      {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) 
          {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update progress bar
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            if (percentComplete === 100) {
              $('.progress-bar').html('Done');

              $('#titleResults').css("visibility", "visible");
              $('.spinner').css("visibility", "visible");
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

// Input "Browse" file change
$('#input-file').on('change', function()
{

  files = $(this).get(0).files;

});