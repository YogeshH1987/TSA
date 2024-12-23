
  $(document).ready(function() {
    proThumbSlider();
    proPopUpThumbSlider();
proVerticalThumbSlider();

  });


  $(window).resize(function () {  
    proThumbSlider()
    proPopUpThumbSlider()
  });

  function proThumbSlider(){
     // Initialize the main slider with Swiper
     var thumbSlider = new Swiper(".js-thumb-slider", {
      slidesPerView: 4,
    });
    var mainSlider = new Swiper(".js-pro-slider", {
      thumbs: {
        swiper: thumbSlider,
      },
    });

    
  }

  function proPopUpThumbSlider(){
    // Initialize the main slider with Swiper
    var thumbSlider = new Swiper(".js-popup-thumb-slider", {
     slidesPerView: 4,
   });
   var mainSlider = new Swiper(".js-popup-pro-slider", {
     thumbs: {
       swiper: thumbSlider,
     },
   });

   
 }

 function proVerticalThumbSlider(){
  // Initialize the main slider with Swiper
  var thumbSlider = new Swiper(".js-vertical-thumb-slider", {
   slidesPerView: 5,
     direction: 'vertical',
    
 });
 var mainSlider = new Swiper(".js-vertical-pro-slider", {
   thumbs: {
     swiper: thumbSlider,
   },
 });

 
}


  
  

  