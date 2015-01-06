/*!
 * jQuery Item Scroll Plugin
 * version: 0.0.2
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 微个日光日
 * http://xiebaochun.github.com/
 */
;(function($) {
   //预定义变量，防止参数缺失
   $.fn.itemScroll = function(options){
   	  
      return this.each(function() { 
         //默认参数与用户配置合并
         var s =$.extend({} ,{
          //配置默认选项
          itemLength:3,     //子项目的数量
          currentIndex: 0,   //当前展开的项目
          isAutoPlay: true,  //是否自动滚动切换
          timeOut:3000,     //切换间隔,单位毫秒
          speed:null,       //切换速度,单位毫秒,defualt 400 from jquery docs
          indexBlockColor:{hightlight:"#f77",normal:"#fcc"},//指示的颜色,高亮和正常
         },options); 

         $this=$(this);
         var index_block=$this.children(".ls_index").children("a")
         //获取子项目的数量 retrieve the item count
         var itemLength=$this.children(".product_list").children(".product_list_item").length;
         //console.log("item length:"+itemLength+"type:"+typeof(itemLength));
         var index = s.currentIndex;

         s.itemLength=itemLength;

         var temp=null;     //临时变量
       
         var SPEED=s.speed;

         var slef=this;

         var contanerWidth=$this.width();
         //初始化
         initilize($this,s);  
         //点击右边箭头，进行切换操作
         $(this).children(".arroy_right").click(function(){    
            if(index<itemLength-1&&temp!=index){   
                  temp=index;
                  $(slef).children(".product_list").children(".product_list_item:eq("+index+")").animate({"left":"-"+contanerWidth+"px"},SPEED,function(){       
                     index++;
                     switchIndex(index_block,index);
                  });
                  $(slef).children(".product_list").children(".product_list_item:eq("+(index+1)+")").animate({"left":"0px"},SPEED,function(){              
                  });
            }
            if(index==itemLength-1&&temp!=index){
               temp=index;
               $(slef).children(".product_list").children(".product_list_item:eq("+(index)+")").animate({"left":"-"+contanerWidth+"px"},SPEED,function(){
                  $(slef).children(".product_list").children(".product_list_item:eq("+index+")").css({"left":contanerWidth+"px"});
                  index=0;
                  switchIndex(index_block,index);
               });
               for(var i=0;i<itemLength-1;i++){
                  $(slef).children(".product_list").children(".product_list_item:eq("+i+")").css({"left":contanerWidth+"px"});
               }
               $(slef).children(".product_list").children(".product_list_item:eq("+(0)+")").animate({"left":"0px"},SPEED,function(){
               });
            }
         });
         //点击左边箭头，进行切换操作
         $(this).children(".arroy_left").click(function(){
            if(index>0&&temp!=index)
            {
               temp=index;
               $(slef).children(".product_list").children(".product_list_item:eq("+(index)+")").animate({"left":contanerWidth+"px"},SPEED,function(){
                index--;
                switchIndex(index_block,index);
               });
               $(slef).children(".product_list").children(".product_list_item:eq("+(index-1)+")").animate({"left":"0px"},SPEED,function(){
                
               });
            }
            if(index==0&&temp!=index){
               temp=index;
               $(slef).children(".product_list").children(".product_list_item:eq("+(index)+")").animate({"left":contanerWidth+"px"},SPEED,function(){
                  $(slef).children(".product_list").children(".product_list_item:eq("+index+")").css({"left":"-"+contanerWidth+"px"});
                  index=itemLength-1;
                  switchIndex(index_block,index);
               });
               for(var i=1;i<itemLength;i++){
                  //console.log("-------------------------reset");
                  $(slef).children(".product_list").children(".product_list_item:eq("+i+")").css({"left":"-"+contanerWidth+"px"});
               }
               $(slef).children(".product_list").children(".product_list_item:eq("+(itemLength-1)+")").animate({"left":"0px"},SPEED,function(){
                   
               });
            }     
         });
         //初始化
         function initilize($this,o){
            var contanerWidth=$this.width();      
            for (var i=0;i<o.itemLength;i++) {
               if(i<o.currentIndex){
                  $this.children(".product_list").children(".product_list_item:eq("+i+")").css({"left":"-"+contanerWidth+"px"});
               }else{
                  $this.children(".product_list").children(".product_list_item:eq("+i+")").css({"left":contanerWidth+"px"});
               }
            };
            $this.children(".product_list").children(".product_list_item:eq("+o.currentIndex+")").css({"left":"0px"});
            switchIndex(index_block,o.currentIndex);
             ///console.log("---------------------"+contanerWidth);   
            index_block.click(function(){//取消index block点击事件
               return false;
            });
            if(o.isAutoPlay){
               setInterval(function(){//循环播放内容
                  $this.children(".arroy_right").trigger("click");
               },o.timeOut);
            }       
         }
         //指示切换高亮
         function switchIndex($target,index){
           $target.each(function(){
               if($(this).attr("data-index")==index+1){
                  $(this).css({"background":s.indexBlockColor.hightlight});
               }else{
                  $(this).css({"background":s.indexBlockColor.normal});
               }           
            });
         }       
      });
   }	
})(jQuery);