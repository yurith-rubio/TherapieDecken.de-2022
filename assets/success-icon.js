$(document).ready(function (){
  $('.cl-po--upload-files').removeClass('.cl-po--upload-files:before');
  $('.ProductForm input[type=file]').change(function(){
    $('.cl-po--upload-files').addClass('.cl-po--upload-files:before');
  });
});

