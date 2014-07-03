$(document).ready(
        $("#left_nav li").each(function(){

        	$(this).hover(
        		function(){
        			// $("#left_nav li").each(function(){
        			//   $(this).removeClass("left_border_red");	
        			// });
        	            consloe.log("enter hover");
	                   $(this).addClass("left_border_red");
	        		},function(){
	        			consloe.log("out hover");
	                    $(this).removeClass("left_border_red");
	        		}
        	);
        })


	);