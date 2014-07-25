
    var coordinationWeight=30;
    var coordinationLength=2000;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 20000);

	this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: false});
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	initCoordination();

	// add directional light
	var dLight = new THREE.DirectionalLight(0xffffff);
	dLight.position.set(0, 1000, 0);
	dLight.castShadow = true;
	// dLight.shadowCameraVisible = true;
	scene.add(dLight);

	// add simple ground
	var groundGeometry = new THREE.PlaneGeometry(1000, 1000, 1, 1);
	ground = new THREE.Mesh(groundGeometry, new THREE.MeshLambertMaterial({
		color: 0xdddddd, side: THREE.DoubleSide
	}));
	//ground.position.y = -20;
	ground.rotation.x = - Math.PI / 2;
	ground.receiveShadow = true;
	//scene.add(ground);


	camera.position.z = 9800;
	camera.position.x=1000;
	camera.position.y=1000;

	camera.lookAt({x:0,y:0,z:0});

   
   // events
        THREEx.WindowResize(this.renderer, this.camera);
   // prepare controls (OrbitControls)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);

   //draw the 3s Text
	var text3d=new Text3D(scene);
	text3d.drawWithRotation(coordinationLength,45,0,0,0,0,"x");
	text3d.drawWithRotation(45,coordinationLength,0,0,0,0,"y");
	text3d.drawWithRotation(45,0,coordinationLength,-Math.PI/2,0,0,"z");

	var render = function () {
		requestAnimationFrame(render);

		//cube.rotation.x += 0.01;
		// cube.rotation.y += 0.1;

		renderer.render(scene, camera);
		renderer.setClearColor(0xeeeeee, 1.0);
	};

	render();


	function initCoordination()
	{
		
		var geometry_z = new THREE.CubeGeometry(coordinationWeight,coordinationWeight,coordinationLength);
		var material_z = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var axis_z = new THREE.Mesh(geometry_z, material_z);
		axis_z.position.set(0,0,coordinationLength/2);

		var geometry_x = new THREE.CubeGeometry(coordinationLength,coordinationWeight,coordinationWeight);
		var material_x = new THREE.MeshBasicMaterial({color: 0x0000ff});
		var axis_x=new THREE.Mesh(geometry_x,material_x);
		axis_x.position.set(coordinationLength/2,0,0);

		var geometry_y = new THREE.CubeGeometry(coordinationWeight,coordinationLength,coordinationWeight);
		var material_y = new THREE.MeshBasicMaterial({color: 0xff0000});
		var axis_y=new THREE.Mesh(geometry_y,material_y);
		axis_y.position.set(0,coordinationLength/2,0);



		scene.add(axis_y);
		scene.add(axis_x);
		scene.add(axis_z);

		drawLine();
		drawLineK();
		//drawPlane();
		};


	function drawLine1()
	{
       for(i=0;i<3000;i++)
       {
            var n=new THREE.CubeGeometry(5,5,5);
            var m = new THREE.MeshBasicMaterial({color: 0x000000});
		    var x=new THREE.Mesh(n,m);
		    x.position.set(i,Math.sin(i/100)*100,0);
		    scene.add(x);
       }
	}
	function drawLine()
	{
       for(i=0;i<3000;i++)
       {
            var n=new THREE.CubeGeometry(5,5,5);
            var m = new THREE.MeshBasicMaterial({color: 0x000000});
		    var x=new THREE.Mesh(n,m);
		    x.position.set(i-Math.sin(i/1000)*1000,1000-Math.cos(i/1000)*1000,4000*Math.sin(i/2000));
		    scene.add(x);
       }
	}
	function drawLineK()
	{
       for(i=0;i<3000;i++)
       {
            var n=new THREE.CubeGeometry(5,5,5);
            var m = new THREE.MeshBasicMaterial({color: 0x000000});
		    var x=new THREE.Mesh(n,m);
		    x.position.set(i,i-Math.PI*500+2000,i*Math.sqrt(2)-Math.sqrt(2)*Math.PI*500+3000*Math.sqrt(2));
		    scene.add(x);
       }
	}
	function drawPlane()
	{
       for(i=0;i<100;i++)
       {
       	    for(j=0;j<100;j++)
       	    {
                  var n=new THREE.CubeGeometry(5,5,5);
	            var m = new THREE.MeshBasicMaterial({color: 0x990000});
			    var x=new THREE.Mesh(n,m);
			    x.position.set(i*20,j*20,(6000-i-2*j)/3);
			    scene.add(x);
       	    }
           
       }
	}
