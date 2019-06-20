$(function(){
  console.log("test");
  
  $('.text').waypoint(function() {
    $(this).addClass('animated fadeInUp');
  }, { offset: '50%' });
});