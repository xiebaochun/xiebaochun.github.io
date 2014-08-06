 /*
  *create on：2014年05月05日
  *author：微个日光日
  *QQ: 463449055
  *github: http://github.com/xiebaochun
  *version: 1.0.0
 */
 var mousedownPosition={};
 var selectBoxSize={};
 var mouseState="";
 var selectBox;
 var isSelectBox_selected=false;
 var middlelayer;
 var bottomLayer;
 var smallBox5;
 var isSmallBox5_selected=false;
 var preViewImg;
window.onload=function(){
	console.log("onload compeleted");
	selectBox=document.getElementById("select_box");
	middlelayer=document.getElementById("mib");
    bottomLayer=document.getElementById("bib");
    smallBox5=document.getElementById("small_box5");
    preViewImg=document.getElementById("preViewImg");

    selectBox.style.left="100px";
    selectBox.style.top="100px";
    //console.log(smallBox5);
    //middlelayer.style.clip="rect(0,0,0,0)"
	//selectBox.style.width="300px";
	//console.log(document.getElementById("select_box").style.width);
    //console.log(selectBox.childNodes[0].nodeName);
    var selectBox_oldPosition={x:selectBox.offsetLeft,y:selectBox.offsetTop};
    
    //console.log(selectBoxSize);
   //console.log(selectBox_oldPosition);
   
	selectBox.onmousedown=function(e){
	    isSelectBox_selected=true;
	    mousedownPosition={"x":e.clientX,"y":e.clientY};
        selectBox_oldPosition={x:selectBox.offsetLeft,y:selectBox.offsetTop};
        selectBoxSize={width:selectBox.offsetWidth,height:selectBox.offsetHeight};
	}

	selectBox.onmousemove=function(e){
	    if(isSelectBox_selected==true&&isSmallBox5_selected==false){
	        var tempPositionX=e.clientX-mousedownPosition.x;
	        var tempPositionY=e.clientY-mousedownPosition.y;
	        //console.log(tempPositionX);
	        //console.log(parseInt(selectBox.style.left));
	       
	        selectBox.style.left=Math.max(selectBox_oldPosition.x+tempPositionX,100)+"px";
	        selectBox.style.top=Math.max(selectBox_oldPosition.y+tempPositionY,100)+"px";

	        if((parseInt(selectBox.style.left)+selectBox.offsetWidth)>(bottomLayer.offsetLeft+bottomLayer.offsetWidth)){
	           	selectBox.style.left=bottomLayer.offsetLeft+bottomLayer.offsetWidth-selectBox.offsetWidth+"px";	     
	        }
	        if((parseInt(selectBox.style.top)+selectBox.offsetHeight)>(bottomLayer.offsetTop+bottomLayer.offsetHeight)){         	
	            selectBox.style.top=bottomLayer.offsetTop+bottomLayer.offsetHeight-selectBox.offsetHeight+"px";
	        }


            updateMiddleClip();
           // console.log(middlelayer.style.clip);
	    }
	}
	selectBox.onmouseup=function(e){
	    isSelectBox_selected=false;
	}

	smallBox5.onmousedown=function(e){
		selectBoxSize={width:selectBox.offsetWidth,height:selectBox.offsetHeight};
       isSmallBox5_selected=true;
       //console.log("smallBox click!!!!!!!!!!!");
	}
}
document.onmousedown=function(e){
	console.log("mousedown");
    mouseState="down";   
	mousedownPosition={"x":e.clientX,"y":e.clientY};
	console.log(mousedownPosition.x+":"+mousedownPosition.y);
}
document.onmousemove=function(e){

	var mouseX=e.clientX;
	var mouseY=e.clientY;
    mouseState="mousemove";
	//console.log(e.screenX,e.screenY);
	if(isSmallBox5_selected==true){
        var tempPositionX=e.clientX-mousedownPosition.x;
	    var tempPositionY=e.clientY-mousedownPosition.y;
	    selectBox.style.width=(parseInt(selectBoxSize.width)+parseInt(tempPositionX))+"px";
	    selectBox.style.height=(selectBoxSize.height+tempPositionY)+"px";
         if((parseInt(selectBox.style.left)+selectBox.offsetWidth)>(bottomLayer.offsetLeft+bottomLayer.offsetWidth)){
	           	selectBox.style.width=bottomLayer.offsetLeft+bottomLayer.offsetWidth-selectBox.offsetLeft+"px";	     
	        }
	        if((parseInt(selectBox.style.top)+selectBox.offsetHeight)>(bottomLayer.offsetTop+bottomLayer.offsetHeight)){         	
	            selectBox.style.height=bottomLayer.offsetTop+bottomLayer.offsetHeight-selectBox.offsetTop+"px";
	        }
        
	    updateMiddleClip();
       //console.log(preViewImg);
	    
	    

	    
	}
}
document.onmouseup=function(e){
   mouseState="mouseup";
   isSelectBox_selected=false;
   isSmallBox5_selected=false;
   console.log(mouseState);
}
function updateMiddleClip(){
	middlelayer.style.clip="rect("+(selectBox.offsetTop-bottomLayer.offsetTop)+"px,"+(selectBox.offsetLeft-bottomLayer.offsetLeft+selectBox.offsetWidth)+"px,"+(selectBox.offsetTop-bottomLayer.offsetTop+selectBox.offsetHeight)+"px,"+(selectBox.offsetLeft-bottomLayer.offsetLeft)+"px)"

	preViewImg.style.width=selectBox.style.width;
	preViewImg.style.height=selectBox.style.height;
	preViewImg.style.background="url(images/image1.jpg) no-repeat -"+(selectBox.offsetLeft-bottomLayer.offsetLeft)+"px "+"-"+(selectBox.offsetTop-bottomLayer.offsetTop)+"px";

}