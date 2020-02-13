var Drawable = function(){
	// Parameters
	speed = 3,
	maxSpeed = 6;
	delta = 0;

	// var update = function(delta){
	// 	this.delta = delta;
	// }

	// Materials
	var blackMat = new THREE.MeshPhongMaterial({
	    color: 0x100707,
	    shading:THREE.FlatShading,
	  });

	var darkMat = new THREE.MeshPhongMaterial({
	    color: 0x000000,
	    shading:THREE.FlatShading,
	  });
	  
	var brownMat = new THREE.MeshPhongMaterial({
	    color: 0xb44b39,
	    shininess:0,
	    shading:THREE.FlatShading,
	  });

	var greenMat = new THREE.MeshPhongMaterial({
	    color: 0x7abf8e,
	    shininess:0,
	    shading:THREE.FlatShading,
	  });
	  
	var pinkMat = new THREE.MeshPhongMaterial({
	    color: 0xdc5f45,//0xb43b29,//0xff5b49,
	    shininess:0,
	    shading:THREE.FlatShading,
	  });

	var fleshMat = new THREE.MeshPhongMaterial({
	    color: 0xffc0cb,//0xfaf0e6,//0xfce6c9,
	    shininess:50,
	    shading:THREE.FlatShading,
	  });
	  
	var lightBrownMat = new THREE.MeshPhongMaterial({
	    color: 0xe07a57,
	    shading:THREE.FlatShading,
	  });
	  
	var whiteMat = new THREE.MeshPhongMaterial({
	    //color: 0xa49789, 
	    color: 0xffffff,
	    shading:THREE.FlatShading,
	  });

	var skinMat = new THREE.MeshPhongMaterial({
	    color: 0xff9ea5,
	    shading:THREE.FlatShading
	  });

	var leafMat = new THREE.MeshPhongMaterial({
	        //color: 0xa49789, 
	        color: 0x228b2e,
	        shininess:0,
	        shading:THREE.FlatShading,
	    });

	var trunkMat = new THREE.MeshPhongMaterial({
	        //color: 0xa49789, 
	        color: 0x8b4500,
	        shininess:0,
	        shading:THREE.FlatShading,
	});

	this.Cloud = function(){
	  this.mesh = new THREE.Object3D();
	  this.mesh.name = "cloud";
	  var geom = new THREE.CubeGeometry(20,20,20);
	  var mat = new THREE.MeshPhongMaterial({
	    color:Colors.white,
	  });

	  var nBlocs = 3+Math.floor(Math.random()*3);
	  for (var i=0; i<nBlocs; i++ ){
	    var m = new THREE.Mesh(geom.clone(), mat);
	    m.position.x = i*15;
	    m.position.y = Math.random()*10;
	    m.position.z = Math.random()*10;
	    m.rotation.z = Math.random()*Math.PI*2;
	    m.rotation.y = Math.random()*Math.PI*2;
	    var s = .1 + Math.random()*.9;
	    m.scale.set(s,s,s);
	    m.castShadow = true;
	    m.receiveShadow = true;
	    this.mesh.add(m);
	  }
	}

	this.Wall = function(){
	  this.mesh = new THREE.Group();
	  this.brick = new THREE.Group();
	  this.mesh.add(this.brick); 

	  var centralGeom = new THREE.CubeGeometry(10,6,4,1);

	  this.center = new THREE.Mesh(centralGeom, brownMat);
	  this.center.castShadow = true;
	  this.brick.add(this.center); 

	  var sideGeom = new THREE.CubeGeometry(4,10,5,1);
	  this.sideL = new THREE.Mesh(sideGeom, brownMat);
	  this.sideL.position.x = -7;
	  this.sideL.position.y =  2;
	  this.brick.add(this.sideL);

	  this.sideR = this.sideL.clone();
	  this.sideR.position.x = 7;
	  this.brick.add(this.sideR);

	  var VfenceGeom = new THREE.CubeGeometry(10,0.5,0.5,1);
	  this.vfence = new THREE.Mesh(VfenceGeom, darkMat);
	  this.vfence.position.y = 5;
	  this.brick.add(this.vfence);

	  var HfenceGeom = new THREE.CubeGeometry(0.5,4,0.5,1);
	  this.hfences = new Array();
	  var fenceNum = 5;
	  var fencePos = [-10.0/3, -5.0/3, 0, 5.0/3, 10.0/3];
	  for (var i = 0; i < fenceNum; i++) {
	    this.hfences[i] = new THREE.Mesh(HfenceGeom, darkMat);
	    this.hfences[i].position.x = fencePos[i];
	    this.hfences[i].position.y = 5;
	    this.brick.add(this.hfences[i]);
	  }
	}

	// Trees
	this.Tree1 = function(){
	  this.mesh = new THREE.Group();

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 6, 24, 6, 1 );
	  trunkGeom.vertices[0].x -= 1.5;
	  trunkGeom.vertices[0].z -= 1.5;
	  trunkGeom.vertices[1].x -= 1.5;
	  trunkGeom.vertices[1].z += 1.5;
	  trunkGeom.vertices[4].x += 1.5;
	  trunkGeom.vertices[4].z -= 1.5;
	  trunkGeom.vertices[5].x += 1.5;
	  trunkGeom.vertices[5].z += 1.5;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 20;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);

	}

	this.Tree2 = function(){
	  this.mesh = new THREE.Group();

	  // trunk
	  var trunkGeom = new THREE.CubeGeometry( 6, 30, 6, 1 );
	  trunkGeom.vertices[0].x -= 1.5;
	  trunkGeom.vertices[0].z -= 1.5;
	  trunkGeom.vertices[1].x -= 1.5;
	  trunkGeom.vertices[1].z += 1.5;
	  trunkGeom.vertices[4].x += 1.5;
	  trunkGeom.vertices[4].z -= 1.5;
	  trunkGeom.vertices[5].x += 1.5;
	  trunkGeom.vertices[5].z += 1.5;

	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaves
	  var leafGeom = new THREE.IcosahedronGeometry(15, 1); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf = new THREE.Mesh(leafGeom, leafMat);
	  this.leaf.position.y = 25;
	  this.leaf.castShadow = true;
	  this.mesh.add(this.leaf);
	}

	this.Tree3 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // trunk
	  var trunk1Geom = new THREE.CylinderGeometry( 1.5, 3, 40, 6 );
	  this.trunk1 = new THREE.Mesh(trunk1Geom, trunkMat);
	  this.trunk1.castShadow = true;
	  this.trunk.add(this.trunk1);

	  var trunk2Geom = new THREE.CubeGeometry( 3, 16, 3, 1 );
	  trunk2Geom.vertices[0].x -= .5;
	  trunk2Geom.vertices[0].z -= .5;
	  trunk2Geom.vertices[1].x -= .5;
	  trunk2Geom.vertices[1].z += .5;
	  trunk2Geom.vertices[4].x += .5;
	  trunk2Geom.vertices[4].z -= .5;
	  trunk2Geom.vertices[5].x += .5;
	  trunk2Geom.vertices[5].z += .5;

	  this.trunk2 = new THREE.Mesh(trunk2Geom, trunkMat);
	  this.trunk2.rotation.z = Math.PI/3;
	  this.trunk2.position.x -= 8;
	  this.trunk2.position.y += 8;
	  this.trunk2.castShadow = true;
	  this.trunk.add(this.trunk2);

	  var trunk3Geom = new THREE.CubeGeometry( 3, 12, 2, 1 );
	  trunk3Geom.vertices[0].x -= .5;
	  trunk3Geom.vertices[0].z -= .5;
	  trunk3Geom.vertices[1].x -= .5;
	  trunk3Geom.vertices[1].z += .5;
	  trunk3Geom.vertices[4].x += .5;
	  trunk3Geom.vertices[4].z -= .5;
	  trunk3Geom.vertices[5].x += .5;
	  trunk3Geom.vertices[5].z += .5;

	  this.trunk3 = new THREE.Mesh(trunk3Geom, trunkMat);
	  this.trunk3.rotation.z = -Math.PI/3;
	  this.trunk3.position.x += 6;
	  this.trunk3.position.y += 12;
	  this.trunk3.castShadow = true;
	  this.trunk.add(this.trunk3);

	  // Leafs
	  var leaf1Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf1 = new THREE.Mesh(leaf1Geom, leafMat);
	  this.leaf1.rotation.z = Math.PI/2;
	  this.leaf1.castShadow = true;
	  this.leaf1.position.y += 24;
	  this.trunk1.add(this.leaf1);

	  var leaf2Geom = new THREE.IcosahedronGeometry(6, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.rotation.z = Math.PI/2;
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y += 6;
	  this.trunk2.add(this.leaf2);

	  var leaf3Geom = new THREE.IcosahedronGeometry(6, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.rotation.z = Math.PI/2;
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y += 8;
	  this.trunk3.add(this.leaf3);

	}

	this.Tree4 = function(){
	  this.mesh = new THREE.Group();
	  this.trunk = new THREE.Group();
	  this.mesh.add(this.trunk);
	  
	  // trunk
	  var trunk1Geom = new THREE.CylinderGeometry( 1.5, 3, 30, 6 );
	  this.trunk1 = new THREE.Mesh(trunk1Geom, trunkMat);
	  this.trunk1.castShadow = true;
	  this.trunk.add(this.trunk1);

	  var trunk2Geom = new THREE.CubeGeometry( 3, 16, 3, 1 );
	  trunk2Geom.vertices[0].x -= .5;
	  trunk2Geom.vertices[0].z -= .5;
	  trunk2Geom.vertices[1].x -= .5;
	  trunk2Geom.vertices[1].z += .5;
	  trunk2Geom.vertices[4].x += .5;
	  trunk2Geom.vertices[4].z -= .5;
	  trunk2Geom.vertices[5].x += .5;
	  trunk2Geom.vertices[5].z += .5;

	  this.trunk2 = new THREE.Mesh(trunk2Geom, trunkMat);
	  this.trunk2.rotation.z = Math.PI/6;
	  this.trunk2.position.x -= 4;
	  this.trunk2.position.y += 14;
	  this.trunk2.castShadow = true;
	  this.trunk.add(this.trunk2);

	  var trunk3Geom = new THREE.CubeGeometry( 3, 12, 2, 1 );
	  trunk3Geom.vertices[0].x -= .5;
	  trunk3Geom.vertices[0].z -= .5;
	  trunk3Geom.vertices[1].x -= .5;
	  trunk3Geom.vertices[1].z += .5;
	  trunk3Geom.vertices[4].x += .5;
	  trunk3Geom.vertices[4].z -= .5;
	  trunk3Geom.vertices[5].x += .5;
	  trunk3Geom.vertices[5].z += .5;

	  this.trunk3 = new THREE.Mesh(trunk3Geom, trunkMat);
	  this.trunk3.rotation.z = -Math.PI/4;
	  this.trunk3.position.x += 4;
	  this.trunk3.position.y += 16;
	  this.trunk3.castShadow = true;
	  this.trunk.add(this.trunk3);

	  // Leafs
	  // var leaf1Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  // this.leaf1 = new THREE.Mesh(leaf1Geom, greenMat);
	  // this.leaf1.rotation.z = Math.PI/2;
	  // this.leaf1.castShadow = true;
	  // this.leaf1.position.y += 24;
	  // this.trunk1.add(this.leaf1);

	  var leaf2Geom = new THREE.IcosahedronGeometry(12, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.rotation.z = Math.PI/2;
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y += 10;
	  this.trunk2.add(this.leaf2);

	  var leaf3Geom = new THREE.IcosahedronGeometry(10, 0); // new THREE.SphereGeometry( 15, 6, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.rotation.z = Math.PI/2;
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y += 8;
	  this.trunk3.add(this.leaf3);
	}

	this.Tree5 = function(){
	  this.mesh = new THREE.Group();
	  // trunk
	  var trunkGeom = new THREE.CylinderGeometry( 3, 5, 40, 8 );
	  this.trunk = new THREE.Mesh(trunkGeom, trunkMat);
	  this.trunk.castShadow = true;
	  this.mesh.add(this.trunk);

	  // leaf
	  var leaf1Geom = new THREE.CylinderGeometry( 0, 18, 20, 8 );
	  this.leaf1 = new THREE.Mesh(leaf1Geom, leafMat);
	  this.leaf1.castShadow = true;
	  this.leaf1.position.y = 10;
	  this.mesh.add(this.leaf1);

	  var leaf2Geom = new THREE.CylinderGeometry( 0, 16, 20, 8 );
	  this.leaf2 = new THREE.Mesh(leaf2Geom, leafMat);
	  this.leaf2.castShadow = true;
	  this.leaf2.position.y = 20;
	  this.mesh.add(this.leaf2);

	  var leaf3Geom = new THREE.CylinderGeometry( 0, 14, 20, 6 );
	  this.leaf3 = new THREE.Mesh(leaf3Geom, leafMat);
	  this.leaf3.castShadow = true;
	  this.leaf3.position.y = 30;
	  this.mesh.add(this.leaf3);

	}

	// Cow
	this.Cow = function(){
		this.status = "start";
	  	this.changing = false;
		this.runningCycle = 0;
		this.mesh = new THREE.Group();
		this.body = new THREE.Group();
		this.mesh.add(this.body);

		// Big Belly
		var bellyGeom = new THREE.CubeGeometry(40, 20, 20, 1);

		this.belly = new THREE.Mesh(bellyGeom, whiteMat);
		this.belly.position.z = 0;
		this.belly.position.y = 8;
		this.belly.position.x = 0;
		this.belly.castShadow = true;
		this.body.add(this.belly);

		var bellySpotGeom1 = new THREE.CubeGeometry(20, 10, 0.1);
		this.bellySpot1 = new THREE.Mesh(bellySpotGeom1, darkMat);
	  	this.bellySpot1.position.x = 20;
	  	this.bellySpot1.position.y = 12.9;
	  	this.bellySpot1.position.z = 0;
	  	this.bellySpot1.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot1);

	  	var bellySpotGeom2 = new THREE.CubeGeometry(10, 10, 0.1);
		bellySpotGeom2.vertices[6].x += 3;
		bellySpotGeom2.vertices[7].x += 3;
		this.bellySpot2 = new THREE.Mesh(bellySpotGeom2, darkMat);
	  	this.bellySpot2.position.x = 15;
	  	this.bellySpot2.position.y = 12.9;
	  	this.bellySpot2.position.z = 10;

	  	this.body.add(this.bellySpot2);

	  	this.bellySpot3 = this.bellySpot2.clone();
	  	this.bellySpot3.position.z = -10;
	  	this.body.add(this.bellySpot3);

	  	var bellySpotGeom4 = new THREE.CubeGeometry(10, 0.1, 20);
	  	this.bellySpot4 = new THREE.Mesh(bellySpotGeom4, darkMat);
	  	this.bellySpot4.position.x = 15;
	  	this.bellySpot4.position.y = 18;
	  	this.bellySpot4.position.z = 0;
	  	//this.bellySpot4.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot4);

	  	var bellySpotGeom5 = new THREE.CubeGeometry(10, 14, 0.1);
	  	this.bellySpot5 = new THREE.Mesh(bellySpotGeom5, darkMat);
	  	this.bellySpot5.position.x = -15;
	  	this.bellySpot5.position.y = 11;
	  	this.bellySpot5.position.z = 10;
	  	// this.bellySpot5.rotation.y = Math.PI/2;
	  	this.body.add(this.bellySpot5);

	  	var bellySpotGeom6 = new THREE.CubeGeometry(0.1, 14, 6);
	  	this.bellySpot6 = new THREE.Mesh(bellySpotGeom6, darkMat);
	  	this.bellySpot6.position.x = -20;
	  	this.bellySpot6.position.y = 11;
	  	this.bellySpot6.position.z = 6.9;
	  	this.body.add(this.bellySpot6);

	  	var bellySpotGeom7 = new THREE.CubeGeometry(10, 0.1, 6);
	  	this.bellySpot7 = new THREE.Mesh(bellySpotGeom7, darkMat);
	  	this.bellySpot7.position.x = -15;
	  	this.bellySpot7.position.y = 18;
	  	this.bellySpot7.position.z = 6.9;
	  	this.body.add(this.bellySpot7);

	  	var bellySpotGeom8 = new THREE.CubeGeometry(16, 16, 0.1);
	  	this.bellySpot8 = new THREE.Mesh(bellySpotGeom8, darkMat);
	  	this.bellySpot8.position.x = -8;
	  	this.bellySpot8.position.y = 10;
	  	this.bellySpot8.position.z = -10;
	  	this.body.add(this.bellySpot8);
	  	
	  	var bellySpotGeom9 = new THREE.CubeGeometry(16, 0.1, 6);
	  	this.bellySpot9 = new THREE.Mesh(bellySpotGeom9, darkMat);
	  	this.bellySpot9.position.x = -8;
	  	this.bellySpot9.position.y = 18;
	  	this.bellySpot9.position.z = -7;
	  	this.body.add(this.bellySpot9);

	  	var bellySpotGeom10 = new THREE.CubeGeometry(8, 8, 0.1);
	  	this.bellySpot10 = new THREE.Mesh(bellySpotGeom10, darkMat);
	  	this.bellySpot10.position.x = 0;
	  	this.bellySpot10.position.y = 4;
	  	this.bellySpot10.position.z = 10;;
	  	this.body.add(this.bellySpot10);

	  	// Tail
	  	// SearchFlag
	  	var tailGeom = new THREE.CylinderGeometry(2, 1, 24, 8, 1);
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0));
	  	//tailGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI*7/8));
	  
	  	this.tail = new THREE.Mesh(tailGeom, whiteMat);
	  	this.tail.position.x = -20;
	  	this.tail.position.y = 14;
	  	this.body.add(this.tail);

	  	// Milk
	  	var milkGeom = new THREE.CubeGeometry(12, 8, 12);
	  	this.milk = new THREE.Mesh(milkGeom, fleshMat);
	  	this.milk.position.x = -5;
	  	this.milk.position.y = 2;
	  	this.milk.position.z = 0;
	  	this.body.add(this.milk);

		// Legs
		var LegGeom = new THREE.CubeGeometry(6, 20, 6, 1);
		LegGeom.vertices[2].x-=2;
		LegGeom.vertices[2].z-=2;
		LegGeom.vertices[3].x-=2;
		LegGeom.vertices[3].z+=2;
		LegGeom.vertices[6].x+=2;
		LegGeom.vertices[6].z+=2;
		LegGeom.vertices[7].x+=2;
		LegGeom.vertices[7].z-=2;

		this.legFL = new THREE.Mesh(LegGeom, whiteMat);
		this.legFL.position.y = -6;
		this.legFL.position.z = 6;
		this.legFL.position.x = 12;
		this.legFL.castShadow = true;
		this.body.add(this.legFL);

		this.legFR = new THREE.Mesh(LegGeom, whiteMat);
		this.legFR.position.y = -6;
		this.legFR.position.z = -6;
		this.legFR.position.x = 12;
		this.legFR.castShadow = true;
		this.body.add(this.legFR);

		this.legBL = new THREE.Mesh(LegGeom, whiteMat);
		this.legBL.position.y = -6;
		this.legBL.position.z = 6;
		this.legBL.position.x = -15;
		this.legBL.castShadow = true;
		this.body.add(this.legBL);

		this.legBR = new THREE.Mesh(LegGeom, whiteMat);
		this.legBR.position.y = -6;
		this.legBR.position.z = -6;
		this.legBR.position.x = -15;
		this.legBR.castShadow = true;
		this.body.add(this.legBR);

		// Heads
		var HeadGeom = new THREE.CubeGeometry(12, 12, 12, 1);
		// HeadGeom.vertices[2].y+=3;
		// HeadGeom.vertices[2].z+=2;
		// HeadGeom.vertices[3].y+=3;
		// HeadGeom.vertices[3].z-=2;
		// HeadGeom.vertices[0].y-=3;
		// HeadGeom.vertices[0].z+=2;
		// HeadGeom.vertices[1].y-=3;
		// HeadGeom.vertices[1].z-=2;

		this.head = new THREE.Mesh(HeadGeom, whiteMat);
		this.head.position.x = 24;
		this.head.position.y = 22;
		this.head.position.z = 0;
		//this.head.rotation.z = Math.PI/9;
		this.head.castShadow = true;
		this.body.add(this.head);
		// Mouth

		var MouthGeom = new THREE.CubeGeometry(12, 4, 12, 1);
		this.mouth = new THREE.Mesh(MouthGeom, fleshMat);
		this.mouth.position.y = -8;
		this.mouth.castShadow = true;
		this.head.add(this.mouth);


	  // Ring
	  var ringGeom = new THREE.TorusGeometry(3, 0.5, 4, 8);
	  this.ring = new THREE.Mesh(ringGeom, blackMat);
	  this.ring.position.x = 6.5;
	  this.ring.position.z = 0;
	  this.ring.position.y = -10;
	  this.ring.rotation.x = Math.PI/2;
	  this.ring.rotation.y = -Math.PI/3;
	  this.ring.castShadow = true;
	  this.head.add(this.ring);
	  // Ears
	  var earLGeom = new THREE.CubeGeometry(5, 5, 4, 1);
	  earLGeom.vertices[0].y -= 1;
	  earLGeom.vertices[1].y -= 1;
	  earLGeom.vertices[2].y += 1;
	  earLGeom.vertices[3].y += 1;

	  var earRGeom = new THREE.CubeGeometry(5, 5, 4, 1);
	  earRGeom.vertices[0].y += 1;
	  earRGeom.vertices[1].y += 1;
	  earRGeom.vertices[2].y -= 1;
	  earRGeom.vertices[3].y -= 1;

	  this.earL = new THREE.Mesh(earLGeom, darkMat);
	  this.earL.position.x = -6;
	  this.earL.position.y = 1;
	  this.earL.position.z = 7;
	  //this.earL.rotation.z = -Math.PI/6;
	  this.earL.rotation.y = Math.PI*2/3;
	  this.earL.castShadow = true;
	  this.head.add(this.earL);

	  this.earR = new THREE.Mesh(earRGeom, darkMat);
	  this.earR.position.x = -6;
	  this.earR.position.y = 1;
	  this.earR.position.z = -7;
	  //this.earR.rotation.z = -Math.PI/6;
	  this.earR.rotation.y = -Math.PI/3;
	  this.earR.castShadow = true;
	  this.head.add(this.earR);
	  // Eyes
	  var eyeGeom = new THREE.CubeGeometry(2,4,4);

	  this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  this.eyeL.position.x = 0;
	  this.eyeL.position.z = 5.5;
	  this.eyeL.position.y = 0;
	  this.eyeL.castShadow = true;
	  this.eyeL.rotation.y = -Math.PI/2;
	  this.head.add(this.eyeL);

	  var irisGeom = new THREE.CubeGeometry(.6,2,2);

	  this.iris = new THREE.Mesh(irisGeom, darkMat);
	  this.iris.position.x = 1.0;
	  this.iris.position.y = 0;
	  this.iris.position.z = 0;
	  this.eyeL.add(this.iris);

	  this.eyeR = this.eyeL.clone();
	  this.eyeR.children[0].position.x = -this.iris.position.x;

	  this.eyeR.position.z = -this.eyeL.position.z;
	  this.head.add(this.eyeR);
	  // SPOTS
	  var spotGeom = new THREE.CubeGeometry( 10, 6, 0.1 );
	  this.eyePotR = new THREE.Mesh(spotGeom, blackMat);
	  this.eyePotR.position.z = 6.3;
	  this.eyePotR.position.y = 0;
	  this.eyePotR.position.x = -1;
	  this.eyePotR.castShadow = true;
	  this.head.add(this.eyePotR);
	  this.eyePotL = new THREE.Mesh(spotGeom, darkMat);
	  this.eyePotL.position.x = -1;
	  this.eyePotL.position.y = 0;
	  this.eyePotL.position.z = -6.3;
	  this.eyePotL.castShadow = false;
	  this.head.add(this.eyePotL);
	  var face_spotGeom = new THREE.PlaneGeometry( 6.5, 6.5, 1 );
	  this.facePot = new THREE.Mesh(face_spotGeom, darkMat);
	  this.facePot.position.x = 6.5;
	  this.facePot.position.y = 2.8;
	  this.facePot.position.z = -3;
	  this.facePot.rotation.y = Math.PI/2;
	  this.head.add(this.facePot);

		this.body.traverse(function(object) {
	    if (object instanceof THREE.Mesh) {
	        object.castShadow = true;
	        object.receiveShadow = true;
	    }
	  });
	}

	this.Cow.prototype.nod = function(){
	  var _this = this;
	  var sp = 1 + Math.random()*2;

	  // Head
	  var tHeadRotY = -Math.PI/3 + Math.random()* Math.PI/3;
	  var tHeadRotZ = Math.random()*.4 + Math.PI/16;
	  TweenMax.to(this.head.rotation, sp, {z:tHeadRotZ, y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});

	  // Tail
	  var tTailRotY = -Math.PI/4;
	  TweenMax.to(this.tail.rotation, sp/8, {y:tTailRotY, ease:Power1.easeInOut, yoyo:true, repeat:8});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/20, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});
	}

	this.Cow.prototype.sleep = function(){
	  var sp = 1;
	  var _this = this;
	  // SleepMark
	  // no idea now

	  // Head
	  var tHeadRotZ = -Math.PI/6;
	  TweenMax.to(this.head.position, sp, {x: 28, ease: Power4.easeInOut});
	  TweenMax.to(this.head.rotation, sp, {z: tHeadRotZ, ease: Power4.easeInOut, onComplete:function(){_this.sleep()}});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});

	}

	this.Cow.prototype.walk = function(){
	  var s = Math.min(speed, maxSpeed);
	  this.runningCycle += delta * s * .7;
	  this.runningCycle = this.runningCycle % (Math.PI*2);
	  var t = this.runningCycle;
	  
	  //this.legFR.rotation.z = Math.sin(t)*Math.PI/8;
	  this.legFR.rotation.z = Math.sin(t+2)*Math.PI/8;
	  //this.legFR.position.y = -5.5 - Math.sin(t);
	  //this.legFR.position.z = 7.5 + Math.cos(t);
	  
	  this.legFL.rotation.z = Math.sin(t+.4)*Math.PI/8;
	  // this.legFL.position.y = -5.5 - Math.sin(t+.4);
	  // this.legFL.position.z = 7.5 + Math.cos(t+.4);
	  
	  this.legBL.rotation.z = Math.sin(t)*Math.PI/12;
	  // this.legBL.position.y = -5.5 - Math.sin(t+3.8);
	  // this.legBL.position.z = -7.5 + Math.cos(t+3.8);
	  
	  this.legBR.rotation.z = Math.sin(t+2.4)*Math.PI/12;
	  // this.legBR.position.y = -5.5 - Math.sin(t+3.4);
	  // this.legBR.position.z = -7.5 + Math.cos(t+3.4);
	  
	  this.body.position.y = Math.sin(t+Math.PI/2)*0.8;
	  this.head.position.y = 20-Math.sin(t+Math.PI/2)*0.8;
	  this.head.rotation.z = Math.PI/16;
	  this.tail.rotation.z =  + Math.sin(t-Math.PI/2)*0.1;
	  
	  this.iris.position.x = 1.1;
	  this.iris.position.x = 1.1;
	}

	this.Cow.prototype.move = function(duration, axisPos){
	  var _this = this;
	  this.status = "walking";
	  TweenMax.to(this.mesh.position, duration, {x: axisPos[0], y:axisPos[1], z:axisPos[2], ease:Power1.easeInOut, onComplete:function(){_this.trigger("nod"), null}});
	}

	this.Cow.prototype.trigger = function(updatestatus, para){
	  if(this.status != updatestatus){
	    this.changing = true;
	    this.status = updatestatus;
	    console.log(updatestatus);
	    switch(updatestatus){
	      case "nod":
	        //this.nod();
	        break;
	      case "sleep":
	        //this.sleep()
	        break;
	      case "walking":
	        //this.move(para[0], para[1]);
	        break;
	      default:
	    }
	  }
	  else
	    this.changing = false;
	  
	}

	this.Cow.prototype.action = function(){
	  	if(this.status == "walking"){
	    	this.walk();
	  	}
	    else if(this.status == "nod"){
	    	console.log(this.status);
	    	this.status = "noding"
	    	this.nod();
	    }
	    else if(this.status == "sleep"){
	    	this.sleep();
	    }
	}

	// Rabbit
	this.Rabbit = function() {
	  	this.status = "running";
	  	this.runningCycle = 0;
	  	this.mesh = new THREE.Group();
	  	this.body = new THREE.Group();
	  	this.mesh.add(this.body);
	  
	  	var torsoGeom = new THREE.CubeGeometry(7, 7, 10, 1);
	  
	  	this.torso = new THREE.Mesh(torsoGeom, brownMat);
	  	this.torso.position.z = 0;
	  	this.torso.position.y = 7;
	  	this.torso.castShadow = true;
	  	this.body.add(this.torso);
	  	
	  	var pantsGeom = new THREE.CubeGeometry(9, 9, 5, 1);
	  	this.pants = new THREE.Mesh(pantsGeom, whiteMat);
	  	this.pants.position.z = -3;
	  	this.pants.position.y = 0;
	  	this.pants.castShadow = true;
	  	this.torso.add(this.pants);
	  	
	  	var tailGeom = new THREE.CubeGeometry(3, 3, 3, 1);
	  	tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-2));
	  	this.tail = new THREE.Mesh(tailGeom, lightBrownMat);
	  	this.tail.position.z = -4;
	  	this.tail.position.y = 5;
	  	this.tail.castShadow = true;
	  	this.torso.add(this.tail);
	  	
	  	this.torso.rotation.x = -Math.PI/8;
	  	
	  	var headGeom = new THREE.CubeGeometry(10, 10, 13, 1);
	  	
	  	headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,7.5));
	  	this.head = new THREE.Mesh(headGeom, brownMat);
	  	this.head.position.z = 2;
	  	this.head.position.y = 11;
	  	this.head.castShadow = true;
	  	this.body.add(this.head);
	  	
	  	var cheekGeom = new THREE.CubeGeometry(1, 4, 4, 1);
	  	this.cheekR = new THREE.Mesh(cheekGeom, pinkMat);
	  	this.cheekR.position.x = -5;
	  	this.cheekR.position.z = 7;
	  	this.cheekR.position.y = -2.5;
	  	this.cheekR.castShadow = true;
	  	this.head.add(this.cheekR);
	  	
	  	this.cheekL = this.cheekR.clone();
	  	this.cheekL.position.x = - this.cheekR.position.x;
	  	this.head.add(this.cheekL);
	  	
	  	
	  	var noseGeom = new THREE.CubeGeometry(6, 6, 3, 1);
	  	this.nose = new THREE.Mesh(noseGeom, lightBrownMat);
	  	this.nose.position.z = 13.5;
	  	this.nose.position.y = 2.6;
	  	this.nose.castShadow = true;
	  	this.head.add(this.nose);
	  	
	  	var mouthGeom = new THREE.CubeGeometry(4, 2, 4, 1);
	  	mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,3));
	  	mouthGeom.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI/12));
	  	this.mouth = new THREE.Mesh(mouthGeom, brownMat);
	  	this.mouth.position.z = 8;
	  	this.mouth.position.y = -4;
	  	this.mouth.castShadow = true;
	  	this.head.add(this.mouth);
	  	
	  	
	  	var pawFGeom = new THREE.CubeGeometry(3,3,3, 1);
	  	this.pawFR = new THREE.Mesh(pawFGeom, lightBrownMat);
	  	this.pawFR.position.x = -2;
	  	this.pawFR.position.z = 6;
	  	this.pawFR.position.y = 1.5;
	  	this.pawFR.castShadow = true;
	  	this.body.add(this.pawFR);
	  	
	  	this.pawFL = this.pawFR.clone();
	  	this.pawFL.position.x = - this.pawFR.position.x;
	  	this.pawFL.castShadow = true;
	  	this.body.add(this.pawFL);
	  	
	  	var pawBGeom = new THREE.CubeGeometry(3,3,6, 1);
	  	this.pawBL = new THREE.Mesh(pawBGeom, lightBrownMat);
	  	this.pawBL.position.y = 1.5;
	  	this.pawBL.position.z = 0;
	  	this.pawBL.position.x = 5;
	  	this.pawBL.castShadow = true;
	  	this.body.add(this.pawBL);
	  	
	  	this.pawBR = this.pawBL.clone();
	  	this.pawBR.position.x = - this.pawBL.position.x;
	  	this.pawBR.castShadow = true;
	  	this.body.add(this.pawBR);
	  	
	  	var earGeom = new THREE.CubeGeometry(7, 18, 2, 1);
	  	earGeom.vertices[6].x+=2;
	  	earGeom.vertices[6].z+=.5;
	  	
	  	earGeom.vertices[7].x+=2;
	  	earGeom.vertices[7].z-=.5;
	  	
	  	earGeom.vertices[2].x-=2;
	  	earGeom.vertices[2].z-=.5;
	  	
	  	earGeom.vertices[3].x-=2;
	  	earGeom.vertices[3].z+=.5;
	  	earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,9,0));
	  	
	  	this.earL = new THREE.Mesh(earGeom, brownMat);
	  	this.earL.position.x = 2;
	  	this.earL.position.z = 2.5;
	  	this.earL.position.y = 5;
	  	this.earL.rotation.z = -Math.PI/12;
	  	this.earL.castShadow = true;
	  	this.head.add(this.earL);
	  	
	  	this.earR = this.earL.clone();
	  	this.earR.position.x = -this.earL.position.x;
	  	this.earR.rotation.z = -this.earL.rotation.z;
	  	this.earR.castShadow = true;
	  	this.head.add(this.earR);
	  	
	  	var eyeGeom = new THREE.CubeGeometry(2,4,4);
	  	
	  	this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  	this.eyeL.position.x = 5;
	  	this.eyeL.position.z = 5.5;
	  	this.eyeL.position.y = 2.9;
	  	this.eyeL.castShadow = true;
	  	this.head.add(this.eyeL);
	  	
	  	var irisGeom = new THREE.CubeGeometry(.6,2,2);
	  	
	  	this.iris = new THREE.Mesh(irisGeom, blackMat);
	  	this.iris.position.x = 1.2;
	  	this.iris.position.y = 1;
	  	this.iris.position.z = 1;
	  	this.eyeL.add(this.iris);
	  	
	  	this.eyeR = this.eyeL.clone();
	  	this.eyeR.children[0].position.x = -this.iris.position.x;
	  	
	  	
	  	this.eyeR.position.x = -this.eyeL.position.x;
	  	this.head.add(this.eyeR);
		
	  	this.body.traverse(function(object) {
	  	  	if (object instanceof THREE.Mesh) {
	  	    	object.castShadow = true;
	  	    	object.receiveShadow = true;
	    	}
	  	});

	}

	this.Rabbit.prototype.nod = function(){
	  var _this = this;
	  var sp = .5 + Math.random();
	  
	  // HEAD
	  var tHeadRotY = -Math.PI/6 + Math.random()* Math.PI/3;
	  TweenMax.to(this.head.rotation, sp, {y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});
	  
	  // EARS
	  var tEarLRotX =  Math.PI/4 + Math.random()* Math.PI/6;
	  var tEarRRotX =  Math.PI/4 + Math.random()* Math.PI/6;
	  
	  TweenMax.to(this.earL.rotation, sp, {x:tEarLRotX, ease:Power4.easeInOut});
	  TweenMax.to(this.earR.rotation, sp, {x:tEarRRotX, ease:Power4.easeInOut});
	  
	  
	  // PAWS BACK LEFT
	  
	  var tPawBLRot = Math.random()*Math.PI/2;
	  var tPawBLY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawBL.rotation, sp/2, {x:tPawBLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  TweenMax.to(this.pawBL.position, sp/2, {y:tPawBLY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  
	  // PAWS BACK RIGHT
	  
	  var tPawBRRot = Math.random()*Math.PI/2;
	  var tPawBRY = -4 + Math.random()*8;
	  TweenMax.to(this.pawBR.rotation, sp/2, {x:tPawBRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  TweenMax.to(this.pawBR.position, sp/2, {y:tPawBRY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // PAWS FRONT LEFT
	  
	  var tPawFLRot = Math.random()*Math.PI/2;
	  var tPawFLY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawFL.rotation, sp/2, {x:tPawFLRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  TweenMax.to(this.pawFL.position, sp/2, {y:tPawFLY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // PAWS FRONT RIGHT
	  
	  var tPawFRRot = Math.random()*Math.PI/2;
	  var tPawFRY = -4 + Math.random()*8;
	  
	  TweenMax.to(this.pawFR.rotation, sp/2, {x:tPawFRRot, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  TweenMax.to(this.pawFR.position, sp/2, {y:tPawFRY, ease:Power1.easeInOut, yoyo:true, repeat:2});
	  
	  // MOUTH
	  var tMouthRot = Math.random()*Math.PI/8;
	  TweenMax.to(this.mouth.rotation, sp, {x:tMouthRot, ease:Power1.easeInOut});
	  // IRIS
	  var tIrisY = -1 + Math.random()*2;
	  var tIrisZ = -1 + Math.random()*2;
	  var iris1 = this.iris;
	  var iris2 = this.eyeR.children[0];
	  TweenMax.to([iris1.position, iris2.position], sp, {y:tIrisY, z:tIrisZ, ease:Power1.easeInOut});
	  
	  //EYES
	  if (Math.random()>.2) TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});

	}

	this.Rabbit.prototype.sleep = function(){
	  var sp = 1;
	  var _this = this;
	  // SleepMark
	  // no idea now

	  // Head
	  var tHeadRotZ = -Math.PI/6;
	  TweenMax.to(this.head.position, sp, {z: 4, ease: Power4.easeInOut});
	  TweenMax.to(this.head.rotation, sp, {z: tHeadRotZ, ease: Power4.easeInOut, onComplete:function(){_this.sleep()}});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});
	}

	this.Rabbit.prototype.run = function(){
	  this.status = "running";
	  
	  var s = Math.min(speed,maxSpeed);
	  
	  this.runningCycle += delta * s * .7;
	  this.runningCycle = this.runningCycle % (Math.PI*2);
	  var t = this.runningCycle;
	  
	  var amp = 4;
	  var disp = .2;
	  
	  // BODY
	  
	  this.body.position.y = 6+ Math.sin(t - Math.PI/2)*amp;
	  this.body.rotation.x = .2 + Math.sin(t - Math.PI/2)*amp*.1;
	  
	  this.torso.rotation.x =  Math.sin(t - Math.PI/2)*amp*.1;
	  this.torso.position.y =  7 + Math.sin(t - Math.PI/2)*amp*.5;
	  
	  // MOUTH
	  this.mouth.rotation.x = Math.PI/16 + Math.cos(t)*amp*.05;
	  
	  // HEAD
	  this.head.position.z = 2 + Math.sin(t - Math.PI/2)*amp*.5;
	  this.head.position.y = 8 + Math.cos(t - Math.PI/2)*amp*.7;
	  this.head.rotation.x = -.2 + Math.sin(t + Math.PI)*amp*.1;
	  
	  // EARS
	  this.earL.rotation.x = Math.cos(-Math.PI/2 + t)*(amp*.2);
	  this.earR.rotation.x = Math.cos(-Math.PI/2 + .2 + t)*(amp*.3);
	  
	  // EYES
	  this.eyeR.scale.y = this.eyeL.scale.y = .7 +  Math.abs(Math.cos(-Math.PI/4 + t*.5))*.6;
	  
	  // TAIL
	  this.tail.rotation.x = Math.cos(Math.PI/2 + t)*amp*.3;
	  
	  // FRONT RIGHT PAW
	  this.pawFR.position.y = 1.5 + Math.sin(t)*amp;
	  this.pawFR.rotation.x = Math.cos(t ) * Math.PI/4;
	  
	  
	  this.pawFR.position.z = 6 - Math.cos(t)*amp*2;
	  
	  // FRONT LEFT PAW
	  
	  this.pawFL.position.y = 1.5 + Math.sin(disp + t)*amp;
	  this.pawFL.rotation.x = Math.cos( t ) * Math.PI/4;
	  
	  
	  this.pawFL.position.z = 6 - Math.cos(disp+t)*amp*2;
	  
	  // BACK RIGHT PAW
	  this.pawBR.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
	  this.pawBR.rotation.x = Math.cos(t + Math.PI*1.5) * Math.PI/3;
	  
	  
	  this.pawBR.position.z = - Math.cos(Math.PI + t)*amp;
	  
	  // BACK LEFT PAW
	  this.pawBL.position.y = 1.5 + Math.sin(Math.PI + t)*amp;
	  this.pawBL.rotation.x = Math.cos(t + Math.PI *1.5) * Math.PI/3;
	  
	  
	  this.pawBL.position.z = - Math.cos(Math.PI + t)*amp;
	   
	}

	this.Rabbit.prototype.move = function(duration, axisPos){
	  // Movement
	  TweenMax.to(this.mesh.position, duration, {x: axisPos[0], y:axisPos[1], z:axisPos[2], ease:Power1.easeInOut});
	}

	// Wolf
	this.Wolf = function(){
	  this.runningCycle = 0;
	  
	  this.mesh = new THREE.Group();
	  this.body = new THREE.Group();
	  
	  var torsoGeom = new THREE.CubeGeometry(15,15,20, 1);
	  this.torso = new THREE.Mesh(torsoGeom, blackMat);
	  
	  var headGeom = new THREE.CubeGeometry(20,20,40, 1);
	  headGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,20));
	  this.head = new THREE.Mesh(headGeom, blackMat);
	  this.head.position.z = 12;
	  this.head.position.y = 2;
	  
	  var mouthGeom = new THREE.CubeGeometry(10,4,20, 1);
	  mouthGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,-2,10));
	  this.mouth = new THREE.Mesh(mouthGeom, blackMat);
	  this.mouth.position.y = -8;
	  this.mouth.rotation.x = .4;
	  this.mouth.position.z = 4;
	  
	  this.rabbitHolder = new THREE.Group();
	  this.rabbitHolder.position.z = 20;
	  this.mouth.add(this.rabbitHolder);
	  
	  var toothGeom = new THREE.CubeGeometry(2,2,1,1);
	  
	  toothGeom.vertices[1].x-=1;
	  toothGeom.vertices[4].x+=1;
	  toothGeom.vertices[5].x+=1;
	  toothGeom.vertices[0].x-=1;
	  
	  for(var i=0; i<3; i++){
	    var toothf = new THREE.Mesh(toothGeom, whiteMat);
	    toothf.position.x = -2.8 + i*2.5;
	    toothf.position.y = 1;
	    toothf.position.z = 19;
	    
	    var toothl = new THREE.Mesh(toothGeom, whiteMat);
	    toothl.rotation.y = Math.PI/2;
	    toothl.position.z = 12 + i*2.5;
	    toothl.position.y = 1;
	    toothl.position.x = 4;
	    
	    var toothr = toothl.clone();
	    toothl.position.x = -4;
	    
	    this.mouth.add(toothf);
	    this.mouth.add(toothl);
	    this.mouth.add(toothr);
	  }
	  
	  var tongueGeometry = new THREE.CubeGeometry(6,1,14);
	  tongueGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(0,0,7));
	  
	  this.tongue = new THREE.Mesh(tongueGeometry, pinkMat);
	  this.tongue.position.z = 2;
	  this.tongue.rotation.x = -.2;
	  this.mouth.add(this.tongue);
	  
	  var noseGeom = new THREE.CubeGeometry(4,4,4, 1);
	  this.nose = new THREE.Mesh(noseGeom, pinkMat);
	  this.nose.position.z = 39.5;
	  this.nose.position.y = 9;
	  this.head.add(this.nose);
	  
	  this.head.add(this.mouth);
	  
	  var eyeGeom = new THREE.CubeGeometry(2,3,3);
	  
	  this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  this.eyeL.position.x = 10;
	  this.eyeL.position.z = 5;
	  this.eyeL.position.y = 5;
	  this.eyeL.castShadow = true;
	  this.head.add(this.eyeL);
	  
	  var irisGeom = new THREE.CubeGeometry(.6,1,1);
	  
	  this.iris = new THREE.Mesh(irisGeom, blackMat);
	  this.iris.position.x = 1.2;
	  this.iris.position.y = -1;
	  this.iris.position.z = 1;
	  this.eyeL.add(this.iris);
	  
	  this.eyeR = this.eyeL.clone();
	  this.eyeR.children[0].position.x = -this.iris.position.x;
	  this.eyeR.position.x = -this.eyeL.position.x;
	  this.head.add(this.eyeR);
	  
	  
	  var earGeom = new THREE.CubeGeometry(8, 6, 2, 1);
	  earGeom.vertices[1].x-=4;
	  earGeom.vertices[4].x+=4;
	  earGeom.vertices[5].x+=4;
	  earGeom.vertices[5].z-=2;
	  earGeom.vertices[0].x-=4;
	  earGeom.vertices[0].z-=2;

	 
	  earGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,3,0));
	  
	  this.earL = new THREE.Mesh(earGeom, blackMat);
	  this.earL.position.x = 6;
	  this.earL.position.z = 1;
	  this.earL.position.y = 10;
	  this.earL.castShadow = true;
	  this.head.add(this.earL);
	  
	  this.earR = this.earL.clone();
	  this.earR.position.x = -this.earL.position.x;
	  this.earR.rotation.z = -this.earL.rotation.z;
	  this.head.add(this.earR);
	  
	  var eyeGeom = new THREE.CubeGeometry(2,4,4);
	  
	  var tailGeom = new THREE.CylinderGeometry(5,2, 20, 4, 1);
	  tailGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,10,0));
	  tailGeom.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
	  tailGeom.applyMatrix(new THREE.Matrix4().makeRotationZ(Math.PI/4));
	  
	  this.tail = new THREE.Mesh(tailGeom, blackMat);
	  this.tail.position.z = -10;
	  this.tail.position.y = 4;
	  this.torso.add(this.tail);
	  
	  
	  var pawGeom = new THREE.CylinderGeometry(1.5,0,10);
	  pawGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,-5,0));
	  this.pawFL = new THREE.Mesh(pawGeom, blackMat);
	  this.pawFL.position.y = -7.5;
	  this.pawFL.position.z = 8.5;
	  this.pawFL.position.x = 5.5;
	  this.torso.add(this.pawFL);
	  
	  this.pawFR = this.pawFL.clone();
	  this.pawFR.position.x = - this.pawFL.position.x;
	  this.torso.add(this.pawFR);
	  
	  this.pawBR = this.pawFR.clone();
	  this.pawBR.position.z = - this.pawFL.position.z;
	  this.torso.add(this.pawBR);
	  
	  this.pawBL = this.pawBR.clone();
	  this.pawBL.position.x = this.pawFL.position.x;
	  this.torso.add(this.pawBL);
	  
	  this.mesh.add(this.body);
	  this.torso.add(this.head);
	  this.body.add(this.torso);
	  
	  this.torso.castShadow = true;
	  this.head.castShadow = true;
	  this.pawFL.castShadow = true;
	  this.pawFR.castShadow = true;
	  this.pawBL.castShadow = true;
	  this.pawBR.castShadow = true;
	  
	  this.body.rotation.y = Math.PI/2;
	}

	this.Wolf.prototype.nod = function(){
	  var _this = this;
	  var sp = 1 + Math.random()*2;
	  
	  // HEAD
	  var tHeadRotY = -Math.PI/6 + Math.random()*Math.PI/6;//-Math.PI/3 + Math.random()*.5;
	  var tHeadRotX = Math.random()*.4;
	  TweenMax.to(this.head.rotation, sp, {x:tHeadRotX, y:tHeadRotY, ease:Power4.easeInOut, onComplete:function(){_this.nod()}});
	  
	  // TAIL 
	  var tTailRotY = -Math.PI/4;
	  TweenMax.to(this.tail.rotation, sp/8, {y:tTailRotY, ease:Power1.easeInOut, yoyo:true, repeat:8});
	  
	  // EYES
	  
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/20, {y:0, ease:Power1.easeInOut, yoyo:true, repeat:1});
	}

	this.Wolf.prototype.run = function(){
	  var s = Math.min(speed,maxSpeed);
	  this.runningCycle += delta * s * .7;
	  this.runningCycle = this.runningCycle % (Math.PI*2);
	  var t = this.runningCycle;
	  
	  this.pawFR.rotation.x = Math.sin(t)*Math.PI/4;
	  this.pawFR.position.y = -5.5 - Math.sin(t);
	  this.pawFR.position.z = 7.5 + Math.cos(t);
	  
	  this.pawFL.rotation.x = Math.sin(t+.4)*Math.PI/4;
	  this.pawFL.position.y = -5.5 - Math.sin(t+.4);
	  this.pawFL.position.z = 7.5 + Math.cos(t+.4);
	  
	  this.pawBL.rotation.x = Math.sin(t+2)*Math.PI/4;
	  this.pawBL.position.y = -5.5 - Math.sin(t+3.8);
	  this.pawBL.position.z = -7.5 + Math.cos(t+3.8);
	  
	  this.pawBR.rotation.x = Math.sin(t+2.4)*Math.PI/4;
	  this.pawBR.position.y = -5.5 - Math.sin(t+3.4);
	  this.pawBR.position.z = -7.5 + Math.cos(t+3.4);
	  
	  this.torso.rotation.x = Math.sin(t)*Math.PI/8;
	  this.torso.position.y = 3-Math.sin(t+Math.PI/2)*3;
	  
	  //this.head.position.y = 5-Math.sin(t+Math.PI/2)*2;
	  this.head.rotation.x = -.1+Math.sin(-t-1)*.4;
	  this.mouth.rotation.x = .2 + Math.sin(t+Math.PI+.3)*.4;
	  
	  this.tail.rotation.x = .2 + Math.sin(t-Math.PI/2);
	  
	  this.eyeR.scale.y = .5 + Math.sin(t+Math.PI)*.5;
	}

	this.Wolf.prototype.sleep = function(){
	  var sp = 1;
	  var _this = this;
	  // SleepMark
	  // no idea now

	  // Head
	  var tHeadRotZ = Math.PI/12;
	  TweenMax.to(this.head.position, sp, {z: 10, ease: Power4.easeInOut});
	  TweenMax.to(this.head.rotation, sp, {x: tHeadRotZ, ease: Power4.easeInOut, onComplete:function(){_this.sleep()}});

	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});
	}

	this.Wolf.prototype.move = function(duration, axisPos){

	  TweenMax.to(this.mesh.position, duration, {x: axisPos[0], y:axisPos[1], z:axisPos[2], ease:Power1.easeInOut});

	}

	// Hedgehog
	this.Hedgehog = function() {
	  this.angle = 0;
	  this.status="ready";
	  this.mesh = new THREE.Group();
	  var bodyGeom = new THREE.CubeGeometry(6,6,6,1);
	  this.body = new THREE.Mesh(bodyGeom, blackMat);
	  
	  var headGeom = new THREE.CubeGeometry(5,5,7,1);
	  this.head= new THREE.Mesh(headGeom, lightBrownMat);
	  this.head.position.z = 6;
	  this.head.position.y = -.5;
	  
	  var noseGeom = new THREE.CubeGeometry(1.5,1.5,1.5,1);
	  this.nose = new THREE.Mesh(noseGeom, blackMat);
	  this.nose.position.z = 4;
	  this.nose.position.y = 2;
	  
	  var eyeGeom = new THREE.CubeGeometry(1,3,3);
	  
	  this.eyeL = new THREE.Mesh(eyeGeom, whiteMat);
	  this.eyeL.position.x = 2.2;
	  this.eyeL.position.z = -.5;
	  this.eyeL.position.y = .8;
	  this.eyeL.castShadow = true;
	  this.head.add(this.eyeL);
	  
	  var irisGeom = new THREE.CubeGeometry(.5,1,1);
	  
	  this.iris = new THREE.Mesh(irisGeom, blackMat);
	  this.iris.position.x = .5;
	  this.iris.position.y = .8;
	  this.iris.position.z = .8;
	  this.eyeL.add(this.iris);
	  
	  this.eyeR = this.eyeL.clone();
	  this.eyeR.children[0].position.x = -this.iris.position.x;
	  this.eyeR.position.x = -this.eyeL.position.x;
	  
	  var spikeGeom = new THREE.CubeGeometry(.5,2,.5,1);
	  spikeGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0,1,0));
	  
	  for (var i=0; i<9; i++){ 
	    var row = (i%3);
	    var col = Math.floor(i/3);
	    var sb = new THREE.Mesh(spikeGeom, blackMat);
	    sb.rotation.x =-Math.PI/2 + (Math.PI/12*row) -.5 +  Math.random();
	    sb.position.z = -3;
	    sb.position.y = -2 + row*2;
	    sb.position.x = -2 + col*2; 
	    this.body.add(sb); 
	    var st = new THREE.Mesh(spikeGeom, blackMat);
	    st.position.y = 3;
	    st.position.x = -2 + row*2;
	    st.position.z = -2 + col*2;
	    st.rotation.z = Math.PI/6 - (Math.PI/6*row) -.5 +  Math.random();
	    this.body.add(st);
	    
	    var sr = new THREE.Mesh(spikeGeom, blackMat);
	    sr.position.x = 3;
	    sr.position.y = -2 + row*2;
	    sr.position.z = -2 + col*2;
	    sr.rotation.z = -Math.PI/2 + (Math.PI/12*row) -.5 +  Math.random();
	    this.body.add(sr);
	    
	    var sl = new THREE.Mesh(spikeGeom, blackMat);
	    sl.position.x = -3;
	    sl.position.y = -2 + row*2;
	    sl.position.z = -2 + col*2;
	    sl.rotation.z = Math.PI/2  - (Math.PI/12*row) -.5 +  Math.random();;
	    this.body.add(sl); 
	  }

	  this.head.add(this.eyeR);
	  var earGeom = new THREE.CubeGeometry(2, 2, .5, 1);
	  this.earL = new THREE.Mesh(earGeom, lightBrownMat);
	  this.earL.position.x = 2.5;
	  this.earL.position.z = -2.5;
	  this.earL.position.y = 2.5;
	  this.earL.rotation.z = -Math.PI/12;
	  this.earL.castShadow = true;
	  this.head.add(this.earL);
	  
	  this.earR = this.earL.clone();
	  this.earR.position.x = -this.earL.position.x;
	  this.earR.rotation.z = -this.earL.rotation.z;
	  this.earR.castShadow = true;
	  this.head.add(this.earR);
	  
	  var mouthGeom = new THREE.CubeGeometry( 1, 1,.5, 1);
	  this.mouth = new THREE.Mesh(mouthGeom, blackMat);
	  this.mouth.position.z = 3.5;
	  this.mouth.position.y = -1.5;
	  this.head.add(this.mouth);
	  
	  
	  this.mesh.add(this.body);
	  this.body.add(this.head);
	  this.head.add(this.nose);

	  this.mesh.traverse(function(object) {
	    if (object instanceof THREE.Mesh) {
	      object.castShadow = true;
	      object.receiveShadow = true;
	    }
	  });
	}

	this.Hedgehog.prototype.nod = function(){
	  var _this = this;
	  var speed = .1 + Math.random()*.5;
	  var angle = -Math.PI/4 + Math.random()*Math.PI/2;
	  TweenMax.to(this.head.rotation, speed, {y:angle, onComplete:function(){
	    _this.nod();
	  }});
	}

	this.Hedgehog.prototype.sleep = function(){
	  var sp = 1;
	  // Eyes
	  TweenMax.to([this.eyeR.scale, this.eyeL.scale], sp/8, {y:0, ease:Power1.easeInOut, repeat:1});
	}


}