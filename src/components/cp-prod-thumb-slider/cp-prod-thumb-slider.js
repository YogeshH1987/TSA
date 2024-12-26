
  $(document).ready(function() {
    proThumbSlider()
    proPopUpThumbSlider()
    proVerticalThumbSlider()
    proPopUpVerticalThumbSlider()
  });


  $(window).resize(function () {  
    proThumbSlider()
    proPopUpThumbSlider()
    proVerticalThumbSlider()
    proPopUpVerticalThumbSlider()
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

 function proPopUpVerticalThumbSlider(){
  // Initialize the main slider with Swiper
  var thumbSlider = new Swiper(".js-popup-vertical-thumb-slider", {
   slidesPerView: 5,
     breakpoints: {
      1920: {
        direction: 'vertical',
      },
      1028: {
        direction: 'vertical',
      },
      768: {
        direction: 'horizontal',
      }
  }
    
 });
 var mainSlider = new Swiper(".js-popup-vertical-pro-slider", {
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


  
  

  