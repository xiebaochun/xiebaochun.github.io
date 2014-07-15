$(document).ready(function(){

	    //console.log("enter jquery ready");
        $("#left_nav li").each(function(){

        	$(this).hover(
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

        getContent();
        function getContent(){
        	var xmlhttp;
        	if(window.XMLHttpRequest){
        		xmlhttp=new XMLHttpRequest();
        		console.log("enable the XMLHttpRequest")
        	}else{
        		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        		console.log("enable the ActiveXObject")
        	}
        	xmlhttp.open("GET","test.text",true);
        	xmlhttp.send();
        	console.log("xmlhttp readyState:"+xmlhttp.readyState);
        	console.log(xmlhttp);
        	xmlhttp.onreadystatechange=function()
        	{
        		if(xmlhttp.readyState==4&&xmlhttp.status==200)
        		{
        	         console.log(xmlhttp.response+"serger");	
        	         //$(".right-content").	
        	         document.getElementById("right").innerHTML=xmlhttp.responseText;
        		}
        	}
        	//var responseText=xmlhttp.responseText;
        	
        }


	});