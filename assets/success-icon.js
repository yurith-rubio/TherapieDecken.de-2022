$(document).ready(function (){
  $('.ProductForm input[type=file]').change(function(){
    $('.cl-po--upload-files').addClass('.success-icon:before');
  });
});

