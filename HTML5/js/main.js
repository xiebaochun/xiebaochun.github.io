define(function(require){
  var $ = require('jquery');
  require('jquery.itemscroll');
  require('../../common/common');
  $(document).ready(function(){
    $("#html5").addClass("c");
    $("#nav_01").addClass("left_border_red");

    $("#left_nav li").each(function(){
      $(this).click(function(){
        $("#left_nav li").each(function(){
          $(this).removeClass("left_border_red");
          $(this).removeClass("right_border_gray");
        });
        $(this).addClass("left_border_red");
        $(this).addClass("right_border_gray");                  
      });
    });
    
    var isTouched=false;
    $(window).scroll(function(){  
      if ($(".primary_nav").offset().top-$(window).scrollTop()<5){ 
        if(isTouched==false){
          isTouched=true;
          console.log($(".primary_nav").offset().top);
          $(".primary_nav").css({"position":"fixed","top":"5px"});
        }     
      }  
      if ($(window).scrollTop() < 160) { 
        if(isTouched == true){
          isTouched = false;
          console.log($(".primary_nav").offset().top);
          $(".primary_nav").css({"position":"relative","top":"0px"});
        }   
      }       
    }); 

    $(".product_item_title").hover(function(){
      $(this).css("background","#fff5f5");
    },function(){
      if($(this).parent().height()<32){
        $(this).css("background","#f5f5f5");
      }     
    });

    $(".product_item_title").click(function(){
      var self=this;
      var height=$(this).parent().height();
      if(height<32){
        //forech all product_item,if which height large than 31px then scale down it
        $(this).parent().parent().children(".product_item").each(function(){    
          if($(this).height()>31){
            $(this).animate({height:"31px"},200,function(){
              $(this).children(".product_item_title").children(".product_item_title_right").html(">");
              $(this).children(".product_item_title").css({"border-bottom":"1px solid #dedede","color":"#aaa","background": "#f5f5f5"});
            });        
          }
        });
        //if product_item,which was clicked,height less than 300px then scale up it
        $(self).children(".product_item_title_right").html("V");
          $(self).css({"border-bottom":"1px solid #fedede","color":"#777","background": "#fff5f5"});
          $(self).parent().animate({height:"300px"},500,function(){                 
        });
      //if large than 299px,then scale down it
      }
      else if(height > 299) {
        $(self).children(".product_item_title_right").html(">");   
        $(self).parent().animate({height:"31px"},200,function(){
          $(self).css({"border-bottom":"1px solid #dedede","color":"#aaa","background": "#f5f5f5"});
        });
      }
    });
    //////////////////////////////////////////////////////////////////左右自动切换
    $("#game_item").itemScroll({currentIndex:1});
    $("#app_item").itemScroll({
      isAutoPlay:false,
      speed:200,
      indexBlockColor:{hightlight:"#f33",normal:"#9f9"},
    });
  });
});
  
    

  