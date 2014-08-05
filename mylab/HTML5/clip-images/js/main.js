 /*
  *create on：2014年08月05日
  *author：微个日光日
  *QQ: 463449055
  *github: http://github.com/xiebaochun
  *version: 1.0.0
 */
 var mousedownPosition={};
 var mouseState="";
 var selectBox;
 var isSelectBox_selected=false;
 var middlelayer;
 var bottomLayer;
 var smallBox8;
 var isSmallBox8_selected=false;
window.onload=function(){
	console.log("onload compeleted");
	selectBox=document.getElementById("select_box");
	middlelayer=document.getElementById("mib");
    bottomLayer=document.getElementById("bib");
    smallBox8=document.getElementById("small_box8");

    //console.log(smallBox8);
    //middlelayer.style.clip="rect(0,0,0,0)"
	//selectBox.style.width="300px";
	//console.log(document.getElementById("select_box").style.width);
    //console.log(selectBox.childNodes[0].nodeName);
   var selectBox_oldPosition={x:selectBox.offsetLeft,y:selectBox.offsetTop};
   //console.log(selectBox_oldPosition);
   
	selectBox.onmousedown=function(e){
	    isSelectBox_selected=true;
	    mousedownPosition={"x":e.clientX,"y":e.clientY};
        selectBox_oldPosition={x:selectBox.offsetLeft,y:selectBox.offsetTop};
	}

	selectBox.onmousemove=function(e){
	    if(isSelectBox_selected==true){
	        var tempPositionX=e.clientX-mousedownPosition.x;
	        var tempPositionY=e.clientY-mousedownPosition.y;
	        //console.log(tempPositionX);
	        selectBox.style.left=Math.max(selectBox_oldPosition.x+tempPositionX,100)+"px";
	        selectBox.style.top=Math.max(selectBox_oldPosition.y+tempPositionY,100)+"px";

            middlelayer.style.clip="rect("+(selectBox.offsetTop-bottomLayer.offsetTop)+"px,"+(selectBox.offsetLeft-bottomLayer.offsetLeft+selectBox.offsetWidth)+"px,"+(selectBox.offsetTop-bottomLayer.offsetTop+selectBox.offsetHeight)+"px,"+(selectBox.offsetLeft-bottomLayer.offsetLeft)+"px)";
            console.log(middlelayer.style.clip);
	    }
	}
	selectBox.onmouseup=function(e){
	    isSelectBox_selected=false;
	}

	smallBox8.onmousedown=function(){
       isSmallBox8_selected=true;
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
	if(isSmallBox8_selected==true){
        var tempPositionX=e.clientX-mousedownPosition.x;
	    var tempPositionY=e.clientY-mousedownPosition.y;
	    
	}
}
document.onmouseup=function(e){
   mouseState="mouseup";
   isSelectBox_selected=false;
   isSmallBox8_selected=false;
   console.log(mouseState);
}