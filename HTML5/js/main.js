$(document).ready(function(){
	$("#left_nav li").each(function(){

        	$(this).click(
        		function(){
	        			$("#left_nav li").each(function(){
	        			  $(this).removeClass("left_border_red");
	        			  	$(this).removeClass("right_border_gray");
	        			});
        	            console.log("enter click!");
	                   $(this).addClass("left_border_red");
	                   $(this).addClass("right_border_gray");
                           
	        		}
        	);
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
                if ($(window).scrollTop()<160){ 
                   if(isTouched==true){
                    isTouched=false;
                     console.log($(".primary_nav").offset().top);
                    $(".primary_nav").css({"position":"relative","top":"0px"});
                   } 
                    
                }  
                // else  
                // {  
                //   if(isTouched==true){
                //     isTouched=false;
                //      console.log($(".primary_nav").offset().top);
                //     $(".primary_nav").css({"position":"relative","top":"0px"});
                //    } 
                //      // $(".primary_nav").css({"position":"relative","top":"5px"});
                // }  
                
            });  
    $(".product_item_title").click(function(){
        var self=this;
        // if($(this).parent().height()<300){
        //     $(self).children(".product_item_title_right").html("V");
        //     $(this).parent().animate({height:"300px"},null,function(){
            
        //     });
        // }else{
        //     $(self).children(".product_item_title_right").html(">");
        //     $(this).parent().animate({height:"31px"},null,function(){
            
        //     });
        // }
        if($(this).parent().height()<300){
           

            $(".product_item").animate({height:"31px"},200,function(){

                $(this).children(".product_item_title").children(".product_item_title_right").html(">");
                $(this).children(".product_item_title").css({"border-bottom":"1px solid #dedede","color":"#aaa"});

                $(self).children(".product_item_title_right").html("V");
                $(self).css({"border-bottom":"1px solid #fedede","color":"#777"});
                 $(self).parent().animate({height:"300px"},500,function(){
                       
                 });

                });
        }

    });
});