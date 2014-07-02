            var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 1000);

			var renderer = new THREE.WebGLRenderer();
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


			camera.position.z = 900;
            camera.position.x=100;
            camera.position.y=100;

            camera.lookAt({x:0,y:0,z:0});

             
            3dText.setScene(scene);
            sdText.drawWithRotation(500,40,0,-0.5,0,0);

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
                var geometry_z = new THREE.CubeGeometry(1,1,500);
				var material_z = new THREE.MeshBasicMaterial({color: 0x00ff00});
				var axis_z = new THREE.Mesh(geometry_z, material_z);
	            axis_z.position.set(0,0,250);

	            var geometry_x = new THREE.CubeGeometry(500,1,1);
                var material_x = new THREE.MeshBasicMaterial({color: 0x0000ff});
	            var axis_x=new THREE.Mesh(geometry_x,material_x);
	            axis_x.position.set(250,0,0);

	            var geometry_y = new THREE.CubeGeometry(1,500,1);
                var material_y = new THREE.MeshBasicMaterial({color: 0xff0000});
	            var axis_y=new THREE.Mesh(geometry_y,material_y);
	            axis_y.position.set(0,250,0);



	            scene.add(axis_y);
	            scene.add(axis_x);
				scene.add(axis_z);
           };
	

