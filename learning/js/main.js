$(document).ready(function(){
        var cateList=["design","front-end","android","symbian","linux","hardware","basis"];
        //alert(cateList[0]);
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
                            alert($(this).index(this));
	        		},function(){
	        			//console.log("out hover");
	                   // $(this).removeClass("left_border_red");
	                   // $("#nav_01").addClass("left_border_red");
	        		}
        	);
        });

        getContent("../../ebook/pdf/basis.html");
        function getContent(filePath){
        	//$("#right").attr("src","../../ebook/pdf/pdf.js/web/viewer.html");
        	var xmlhttp;
        	if(window.XMLHttpRequest){
        		xmlhttp=new XMLHttpRequest();
        		console.log("enable the XMLHttpRequest")
        	}else{
        		xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        		console.log("enable the ActiveXObject")
        	}
        	xmlhttp.open("GET",filePath,true);
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
        		     $("#book_01").click(function(){
				        	//getContent("../../ebook/pdf/pdf.js/web/viewer.html");
                                                window.open("../../ebook/pdf/pdf.js/web/viewer.html");
				        });
        		}
        	}
        	//var responseText=xmlhttp.responseText;
        	
        }
        
        // function showBook(){
        // 	alert("");
        // }
       


	});