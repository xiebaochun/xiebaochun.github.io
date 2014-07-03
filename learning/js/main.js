$(document).ready(
        $("#left_nav li").each(function(){

        	$(this).hover(
        		function(){
        			// $("#left_nav li").each(function(){
        			//   $(this).removeClass("left_border_red");	
        			// });
	                   $(this).addClass("left_border_red");
	        		},function(){
	                    $(this).removeClass("left_border_red");
	        		}
        	);
        })


	);