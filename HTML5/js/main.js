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
});