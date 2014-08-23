 $(document).ready(function(){
	$.get("http://xiebaochun.github.io/common/footer.html",function(data){
          console.log(data);
	}).fail(function(){
		console.log("get footer.html fail!");
	});
});