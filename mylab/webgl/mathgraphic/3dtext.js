 ;// load texture
	var texture = THREE.ImageUtils.loadTexture('texture.png');
	texture.repeat.set(0.03, 0.03);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
	texture.anisotropy = 16;
	texture.needsUpdate = true;


    var 3dText={
         
        scene:null,
        textMesh:null,
        init:function(){
              console.log("into 3dText init");
		     // prepare text geometry
		    var textGeometry = new THREE.TextGeometry(text, {
		        size: 60, // Font size
		        height: 20, // Font height (depth)
		        font: 'droid serif', // Font family
		        weight: 'bold', // Font weight
		        style: 'normal', // Font style
		        curveSegments: 1, // Amount of curve segments
		        bevelThickness: 5, // Bevel thickness
		        bevelSize: 5, // Bevel size
		        bevelEnabled: true, // Enable/Disable the bevel
		        material: 0, // Main material
		        extrudeMaterial: 1 // Side (extrude) material
		    });
		    console.log("into draw 3dText init>>>prepare two materials");
		    // prepare two materials
		    var materialFront = new THREE.MeshPhongMaterial({ map: texture, color: 0xffff00, emissive: 0x888888 });
		    var materialSide = new THREE.MeshPhongMaterial({ map: texture, color: 0xff00ff, emissive: 0x444444 });

		    // create mesh object
		    var textMaterial = new THREE.MeshFaceMaterial([ materialFront, materialSide ]);
		    this.textMesh = new THREE.Mesh(textGeometry, textMaterial);
		    this.textMesh.castShadow = true;
        },
    	draw:function(x,y,z,text){
	        console.log("into draw text 3d");
		     // prepare text geometry
		    var textGeometry = new THREE.TextGeometry(text, {
		        size: 60, // Font size
		        height: 20, // Font height (depth)
		        font: 'droid serif', // Font family
		        weight: 'bold', // Font weight
		        style: 'normal', // Font style
		        curveSegments: 1, // Amount of curve segments
		        bevelThickness: 5, // Bevel thickness
		        bevelSize: 5, // Bevel size
		        bevelEnabled: true, // Enable/Disable the bevel
		        material: 0, // Main material
		        extrudeMaterial: 1 // Side (extrude) material
		    });
		    console.log("into draw text 3d>>>prepare two materials");
		    // prepare two materials
		    var materialFront = new THREE.MeshPhongMaterial({ map: texture, color: 0xffff00, emissive: 0x888888 });
		    var materialSide = new THREE.MeshPhongMaterial({ map: texture, color: 0xff00ff, emissive: 0x444444 });

		    // create mesh object
		    var textMaterial = new THREE.MeshFaceMaterial([ materialFront, materialSide ]);
		    var textMesh = new THREE.Mesh(textGeometry, textMaterial);
		    textMesh.castShadow = true;

		    // place the mesh in the certain position, rotate it and add to the scene
		    textMesh.position.set(x, y, z);
		    textMesh.rotation.x = -0.3;
		    scene.add(textMesh);
		},
		drawWithRotation:function(x,y,z,rotationX,rotationY,rotationZ){
			this.init();

		    // place the mesh in the certain position, rotate it and add to the scene
		    this.textMesh.position.set(x, y, z);
		    this.textMesh.rotation.x =rotationX;
		    this.textMesh.rotation.y =rotationY;
		    this.textMesh.rotation.z =rotationZ;
		    this.scene.add(this.textMesh);
		},
		setScene:function(scene)
		{
			this.scene=scene;
		}

    };