

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 10000);

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
	scene.add(ground);


	camera.position.z = 1800;
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
	text3d.drawWithRotation(500,45,0,0,0,0,"x");
	text3d.drawWithRotation(45,300,0,0,0,0,"y");
	text3d.drawWithRotation(45,0,450,0.6,0,0,"z");

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
		var coordinationWeight=10;
		var geometry_z = new THREE.CubeGeometry(coordinationWeight,coordinationWeight,500);
		var material_z = new THREE.MeshBasicMaterial({color: 0x00ff00});
		var axis_z = new THREE.Mesh(geometry_z, material_z);
		axis_z.position.set(0,0,250);

		var geometry_x = new THREE.CubeGeometry(500,coordinationWeight,coordinationWeight);
		var material_x = new THREE.MeshBasicMaterial({color: 0x0000ff});
		var axis_x=new THREE.Mesh(geometry_x,material_x);
		axis_x.position.set(250,0,0);

		var geometry_y = new THREE.CubeGeometry(coordinationWeight,500,coordinationWeight);
		var material_y = new THREE.MeshBasicMaterial({color: 0xff0000});
		var axis_y=new THREE.Mesh(geometry_y,material_y);
		axis_y.position.set(0,250,0);



		scene.add(axis_y);
		scene.add(axis_x);
		scene.add(axis_z);
		};


	function drawLine()
	{

	}