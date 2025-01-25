$(function(){
    $(".result-wrap tr.view").on("click", function(){
      if($(this).hasClass("open")) {
        $(this).removeClass("open").next(".fold").removeClass("open");
      } else {
        $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
        $(this).addClass("open").next(".fold").addClass("open");
      }
    });
  });