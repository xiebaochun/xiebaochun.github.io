$(document).ready(function(){

	    //console.log("enter jquery ready");
        $("#left_nav li").each(function(){

        	$(this).hover(
        		function(){
	        			$("#left_nav li").each(function(){
	        			  $(this).removeClass("left_border_red");	
	        			});
        	            //console.log("enter hover");
	                   $(this).addClass("left_border_red");
	        		},function(){
	        			//console.log("out hover");
	                   $(this).removeClass("left_border_red");
	                   $("#nav_01").addClass("left_border_red");
	        		}
        	);
        });


	});