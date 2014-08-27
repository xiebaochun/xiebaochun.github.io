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

    $(".product_item_title").hover(function(){
        $(this).css("background","#fff5f5");
     },function(){
        if($(this).parent().height()<32){
            $(this).css("background","#f5f5f5");
        }     
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
        var height=$(this).parent().height();
        // console.log(height);
        if(height<32){
           
            //forech all product_item,if which height large than 31px then scale down it
            //$("#front-end .product_item").each(function(){
            $(this).parent().parent().children(".product_item").each(function(){    
                // console.log(this);
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
        }else if(height>299){
            $(self).children(".product_item_title_right").html(">");   
            $(self).parent().animate({height:"31px"},200,function(){
                       $(self).css({"border-bottom":"1px solid #dedede","color":"#aaa","background": "#f5f5f5"});
                 });
            }

    });

   //////////////////////////////////////////////////////////////////左右自动切换
   var listLength=2;
   var index=0;
   var temp=null;
    $(".arroy_right").click(function(){

        if(index<listLength-1&&temp!=index){
             temp=index;
            $(".product_list").children(".product_list_item:eq("+index+")").animate({"left":"-850px"},null,function(){
                 index++;
            });
            $(".product_list").children(".product_list_item:eq("+(index+1)+")").animate({"left":"0px"},null,function(){
                 
            });
        }
          
    });
    $(".arroy_left").click(function(){
        if(index>0&&temp!=index)
        {
            temp=index;
            $(".product_list").children(".product_list_item:eq("+(index)+")").animate({"left":"850px"},null,function(){
             index--;
            });
           $(".product_list").children(".product_list_item:eq("+(index-1)+")").animate({"left":"0px"},null,function(){
             
            });
        }
        
    });
});