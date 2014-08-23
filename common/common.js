 $(document).ready(function(){
	$.get("http://xiebaochun.github.io/common/footer.html",function(data){
          //console.log(data);
        //add footer.html to the footer dom
        $("#foot_wrap").html(data);
	}).fail(function(){
		console.log("get footer.html fail!");
	});
	$.get("http://xiebaochun.github.io/common/header.html",function(data){
          //console.log(data);
        //add footer.html to the footer dom
        $("#header").html(data);
        //给导航栏添加焦点
        navFocus();
	}).fail(function(){
		console.log("get header.html fail!");
	});
	
});