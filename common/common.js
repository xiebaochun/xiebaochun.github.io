 $(document).ready(function(){
 	var hostName = window.location.hostname;
 	//console.log(hostName);
	$.get("http://"+hostName+"/common/footer.html",function(data){
          //console.log(data);
        //add footer.html to the footer dom
        $("#foot_wrap").html(data);
	}).fail(function(){
		console.log("get footer.html fail!");
	});
	$.get("http://"+hostName+"/common/header.html",function(data){
          //console.log(data);
        //add footer.html to the footer dom
        $("#header").html(data);
        //给导航栏添加焦点
        navFocus();
	}).fail(function(){
		console.log("get header.html fail!");
	});	
});