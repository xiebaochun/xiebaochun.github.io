$(document).ready(function(){
	$("#left_nav li").each(function(){

        	$(this).click(
        		function(){
	        			$("#left_nav li").each(function(){
	        			  $(this).removeClass("left_border_red");
	        			  	$(this).removeClass("right_border_gray");
	        			});
        	            //console.log("enter hover");
	                   $(this).addClass("left_border_red");
	                   $(this).addClass("right_border_gray");
                           
	        		},function(){
	        			//console.log("out hover");
	                   // $(this).removeClass("left_border_red");
	                   // $("#nav_01").addClass("left_border_red");
	        		}
        	);
        });
});