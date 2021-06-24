var geometry, material;
var camera, scene, renderer;

Physijs.scripts.worker = 'utils/physijs_worker.js';
Physijs.scripts.ammo = 'Physijs/ammo.js';
var v1 = new THREE.Vector3(0, 0, 0),
	v2 = new THREE.Vector3(0, 1, 0);

var limR = 6.9,
	limL = -6.9,
	limF = 1.8;

//BALL PARAMETERS
var	ball;
var slope_ball_1=true;
var plane_ball_1=false;

var slope_ball_2=false;
var plane_ball_2=false;

var slope_ball_3=false;
var plane_ball_3=false;
var slope_ball_4=false;
var ball_speed = 0.12;
var ball_hill = 0.05;
var removed = false;

//floor and walls
var floor_count = 0;
var ground_material;
var texture_ground;
var floor;
var slope1=true;
var slope2=false;
var slope3=false;
var slope4=false;

var plane1=false;
var plane2=false;
var plane3=false;

//How much inclination has the character go down
var diff=0.0398;

var ostacolo;
var stone1,stone2,stone3,stone4,stone5;

var boulder_track,tree_track, stone_track, two_stone_track, wood_track,
    hit_track, falling_track;
var b, bb;
var texture;
var texture1;
var texture2;

var personaggio;

var stop=false;

var dead=false;

document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );

var leftIsDown  = false,
	upIsDown    = false,
	rightIsDown = false,
	downIsDown  = false,
	zisDown = false,
	mIsDown = false,    //scaricare con destro
	nIsDown	= false;
	pIsDown = false;
	bIsDown = false;
	vIsDown = false;
	cIsDown = false;
	xIsDown = false;
	wIsDown = false;
	aIsDown = false;
	sIsDown = false;
	dIsDown = false;
	lIsDown = false;
	kIsDown = false;
	rIsDown = false;
	tIsDown = false;
	qIsDown = false;
	eIsDown = false;

var down_pg=false;
var temp;
var another_button=false;
var rock_1,rock_2,rock_3, rock_4, rock_5, rock_6, rock_7,
		rock_8,	rock_9,	rock_10,	rock_11,	rock_12, rock_13;
var tree_1, tree_2, tree_3, tree_4, tree_5, tree_6,
		tree_7, tree_8, tree_9;
var wood_trunk1, wood_trunk2, wood_trunk3, wood_trunk4,
		wood_trunk5,	wood_trunk6, wood_trunk7;

var invisibleBox, hitbox_trunk_5, hitbox_trunk_6, hitbox_rock_13, hitbox_trunk_7;
var angle_pg=-0.4, increment=0.1;
var removed_array = new Array(25);

function pg(){
	texture = new THREE.TextureLoader().load('images/Face.bmp');
	testa = new THREE.Object3D;
	loader = new THREE.OBJLoader();
	loader.load('mod/testac.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture});
		testa.add(model);
		testa.position.set(0, 7, 0.2);

	});
	personaggio.add(testa);

	texture1 = new THREE.TextureLoader().load('images/metallo1.jpg');
	tronco = new THREE.Object3D;
	loader.load('mod/tronco2.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		tronco.add(model);


	});
	personaggio.add(tronco);

	bracciaDX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	braccioDX = new THREE.Object3D;
	loader.load('mod/braccioDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});

		braccioDX.add(model);
		//braccioDX.position.set(2.9, 5.9, 0.5);

		bracciaDX.add(braccioDX);

	});


	avambraccioDX = new THREE.Object3D;
	loader.load('mod/avambraccioDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		avambraccioDX.add(model);
		//avambraccioDX.position.set(3.1, 1.3, 1.3);
		avambraccioDX.position.set(0.2, -4.5, 0.8);

		bracciaDX.add(avambraccioDX);
		bracciaDX.position.set(2.9, 5.9, 0.5);

	});

	personaggio.add(bracciaDX);

    bracciaSX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	braccioSX = new THREE.Object3D;
	loader.load('mod/braccioSX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		braccioSX.add(model);
		//braccioSX.position.set(-2.9, 6, 0.5);

		bracciaSX.add(braccioSX);
	});


	avambraccioSX = new THREE.Object3D;
	loader.load('mod/avambraccioSX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		avambraccioSX.add(model);
		avambraccioSX.position.set(-0.2, -4.5, 0.8);

		bracciaSX.add(avambraccioSX);
		bracciaSX.position.set(-2.9, 5.9, 0.5);
	});

	personaggio.add(bracciaSX);

	gambeDX = new THREE.Object3D;
	gambaDX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		gambaDX.add(model);
		//gambaDX.position.set(1.1, -0.3, 0.3);

		gambeDX.add(gambaDX);
	});


	stincoDX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		stincoDX.add(model);
		stincoDX.position.set(0, -5.8, -1);

		gambeDX.add(stincoDX);
		gambeDX.position.set(1.1, -0.5, 0.3);
	});
	personaggio.add(gambeDX);

	gambeSX = new THREE.Object3D;
	gambaSX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		gambaSX.add(model);
		//gambaSX.position.set(-1.1, -0.3, 0.3);

		gambeSX.add(gambaSX);

	});

	stincoSX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){

		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		stincoSX.add(model);
		stincoSX.position.set(0, -5.8, -1);
		//personaggio.add(stincoSX);

		gambeSX.add(stincoSX);
		gambeSX.position.set(-1.1, -0.5, 0.3);
	});

	personaggio.add(gambeSX);

	personaggio.scale.set(0.1, 0.1, 0.1);
	personaggio.position.set(0,1,20);
	personaggio.rotation.y=Math.PI;
	// personaggio.position.set(0,-46.2,158.5);
	invisibleBox = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0xFF7F50}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);

	invisibleBox.visible = false;

	// invisibleBox.position.set(0,1,20);
	invisibleBox.scale.set(0.7, 0.8, 1);
	// invisibleBox.visible=false;
	// invisibleBox.position.x=personaggio.position.x;
	// invisibleBox.position.y=personaggio.position.y-0.3;
	// invisibleBox.position.z=personaggio.position.z;
	// scene.add(invisibleBox);
	// personaggio.add(invisibleBox);
	// invisibleBox.__dirtyPosition = true;

	// box = new Physijs.BoxMesh(
	// 		new THREE.CubeGeometry( 1, 3, 1 ),
	// 		new THREE.MeshBasicMaterial({color: 0x00fff0}),
	// 		//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
	// 		10 //MASSA
	// 	);
	// box.visible = true;
	// box.position.x = -3.5;
	// box.position.y = -44;
	// box.position.z = 181;
	// // invisibleBox.position.set(0,1,20);
	// box.scale.set(1,1,1);
	// scene.add(box);

}

var cave;


function floor(){
	var pp=16;
	var larghezza = 50;
	var floor;
	// PER PHISIS METTERE:
	// new Physijs.BoxMesh AL POSTO DI THREE.MESH
	if(floor_count>=7 && floor_count < 9){
		pp=3;
		larghezza = 10;
		floor = new Physijs.BoxMesh(
		 new THREE.CubeGeometry( pp, 5, larghezza ),
		 ground_material,
		 0 //MASSA
	 );

	}
	else if(floor_count ==6) {
		floor_6 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 3, 5, 15 ),
			ground_material,
			0 //MASSA
		);
	}
	else if(floor_count ==9) {
		floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 3, 5, 15 ),
			ground_material,
			0 //MASSA
		);
	}
	else if (floor_count == 10) {
		 floor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 3, 5, 10 ),
			ground_material,
			0 //MASSA
		);
	}
	else if (floor_count ==11){
		floor = new Physijs.BoxMesh(
		 new THREE.CubeGeometry( 3, 5, 25 ),
		 ground_material,
		 0 //MASSA
	 );
	}

	else {
			if (floor_count==5){
				floor = new Physijs.BoxMesh(
	 			new THREE.CubeGeometry( pp, 5, larghezza ),
	 			ground_material,
	 			0 //MASSA
	 			);
			}
		else {
			if(floor_count==12){
				ground_material = Physijs.createMaterial(
					new THREE.MeshLambertMaterial({ map: texture_cave }), // high friction
					// low restitution
				);
			}
			floor = new Physijs.BoxMesh(
 			new THREE.CubeGeometry( pp, 5, larghezza ),
 			ground_material,
 			0 //MASSA
 		);
		}

	}
		switch(floor_count) {
	  	case 0:
		    	floor.position.set(0,-4,22);
					floor.rotation.x =9.8
	    break;
	  		case 1:
					floor.position.set(0,-14.5,40);
					floor.rotation.x=9.45;
	    		break;
				case 2:
					floor.position.set(0,-23.8,85.5);
					floor.rotation.x=9.78;
					break;
				case 3:
					floor.position.set(0,-29,85);
					floor.rotation.x=9.5;
					break;
				case 4:
					floor.position.set(0,-40.1,131.9);
					floor.rotation.x=9.8;
					break;
					case 5:
						floor.position.set(0,-50,160);
						floor.rotation.x=9.42;
						break;
					case 6:
						floor_6.position.set(0,-52.08,189.19);
						floor_6.rotation.x=9.7;
						break;
					case 7:
						floor.position.set(-2.39,-54.87,197.69);
						floor.rotation.x=9.7;
						floor.rotation.y= 0.499;
						break;
					case 8:
						floor.position.set(2.39,-54.57,197.69);
						floor.rotation.x=9.7;
						floor.rotation.y= -0.54;
						break;
					case 9:
						floor.position.set(0.91,-57.10,206.29);
						floor.rotation.x=9.7;
						floor.rotation.y= 0.89;
						break;
					case 10:
						floor.position.set(-3.78,-59.67,215.69);
						floor.rotation.x=9.7;
						break;
					case 11:
					floor.position.set(0,-60.8,220);
					floor.rotation.x=9.7;
						break;
					case 12:
						floor.position.set(0,-69.09,272.28);
						floor.rotation.x=9.5;
						break;
	  default:
	    break
		}
		if(floor_count!=6)
			scene.add(floor);
		else {
			scene.add(floor_6);
		}
}

function walls(){

	if(floor_count==10 || floor_count==11){
		ground_material= Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: texture_cave }), // high friction
			// low restitution
		);
	}
	wall = new Physijs.BoxMesh(
		new THREE.CubeGeometry( 1, 40, 50 ),
		ground_material,
		0
	);
	wall.rotation.x=0.399;
	switch(floor_count) {
		case 0:
				wall.position.set(-8.69, 7.98, 25.5);
				wall.rotation.x=0.399;
				break;
			case 1:
			wall.position.set(8.69, 7.98, 25.5);
			wall.rotation.x=0.399;
				break;
			case 2:
			wall.position.set(-8.68,-8.09,73.08);
				break;
			case 3:
			wall.position.set(8.68,-8.09,73.08);
				break;
			case 4:
				wall.position.set(-8.68,-25.8,119.9);
				break;
			case 5:
				wall.position.set(8.68,-25.8,119.9);
				break;
			case 6:
				wall.position.set(-8.68,-42.59,167.3);
				break;
			case 7:
				wall.position.set(8.68,-42.59,167.3);
				break;
			case 8:
				wall.position.set(-8.68,-56.98,215.6);
				break;
			case 9:
				wall.position.set(8.68,-56.98,215.6);
				break;
			case 10:
				wall.position.set(8.68,-65.47,266.3);
				break;
			case 11:
				wall.position.set(-8.68,-65.47,266.3);
				break;
	default:
		break
	}
	scene.add(wall);

}

function create_rocks(){
	var stone_text = new THREE.TextureLoader().load('images/text_rock.jpg');
	loader = new THREE.OBJLoader();
	rock_1= new THREE.Object3D;
	rock_2= new THREE.Object3D;
	rock_3= new THREE.Object3D;
	rock_4= new THREE.Object3D;
	rock_5= new THREE.Object3D;
	rock_6= new THREE.Object3D;
	rock_7= new THREE.Object3D;
	rock_8= new THREE.Object3D;
	rock_9= new THREE.Object3D;
	rock_10= new THREE.Object3D;
	rock_11= new THREE.Object3D;
	rock_12= new THREE.Object3D;
	rock_13= new THREE.Object3D;



		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_1 =rock_1.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_2 =rock_2.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_3 =rock_3.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_4 =rock_4.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_5 =rock_5.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_6 =rock_6.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_7 =rock_7.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_8 =rock_8.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_9 =rock_9.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_10 =rock_10.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_11 =rock_11.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_12 =rock_12.add(model);
		});

		loader.load('mod/rock_1.obj',function(model){
			model.children[0].material = new THREE.MeshPhongMaterial({map:stone_text});
			rock_13 =rock_13.add(model);
		});

		rock_1.scale.set(2, 3.2, 2.2);
		rock_1.rotation.set(0,1.5,0.4);
		// invisibleBox2 = new Physijs.BoxMesh(
		// 		new THREE.CubeGeometry( 0.4,0.2,0.6),
		// 		new THREE.MeshBasicMaterial({color: 0x00fff0}),
		// 		//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
		// 		1000 //MASSA
		// 	);
		// invisibleBox2.visible = true;
		// invisibleBox2.position.set(-4.3, -6.95, 38);
		// invisibleBox2.scale.set(13.6,29,5);
		// // tree_2.add(invisibleBox2);
		// scene.add(invisibleBox2);
		scene.add(rock_1);

		rock_2.scale.set(1.8, 2.8, 1.8);
		rock_2.rotation.set(0,1.5,0.4);
		scene.add(rock_2);

		rock_3.scale.set(1.8, 2.8, 1.8);
		rock_3.rotation.set(0,1.5,0.4);
		scene.add(rock_3);

		rock_4.scale.set(2.2, 3.1, 2.8);
		rock_4.rotation.set(0,1,0.4);
		scene.add(rock_4);

		rock_5.scale.set(2.1, 4.3, 2.8);
		rock_5.rotation.set(0,1,0.4);
		scene.add(rock_5);

		rock_6.scale.set(1.8, 2.8, 1.8);
		rock_6.rotation.y=1.5;
		rock_6.rotation.z=0.9;
		rock_6.rotation.x=1;
		scene.add(rock_6);

		rock_7.scale.set(1.8, 2.8, 1.8);
		rock_7.rotation.set(1,3.7,6.9);
		scene.add(rock_7);

		rock_8.scale.set(1.8, 2.8, 1.8);
		rock_8.rotation.set(1,0.6,1.7);
		scene.add(rock_8);

		rock_9.scale.set(1.8, 2.8, 1.8);
		rock_9.rotation.set(1,1.5,1.5);
		scene.add(rock_9);

		rock_10.scale.set(1.8, 2.8, 1.8);
		rock_10.rotation.set(1,0.9,1.5);
		scene.add(rock_10);


		rock_11.scale.set(1.8, 2.8, 1.8);
		rock_11.rotation.set(1,0.9,1.5);
		scene.add(rock_11);

		rock_12.scale.set(1.8, 2.8, 1.8);
		rock_12.rotation.set(1,2.5,0.9);
		scene.add(rock_12);

		rock_13.scale.set(1.3, 1.6, 1);
		rock_13.rotation.y=1.5;
		scene.add(rock_13);
		hitbox_rock_13 = new Physijs.BoxMesh(
				new THREE.CubeGeometry( 1, 2, 1 ),
				new THREE.MeshBasicMaterial({color: 0x00ff00}),
				//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
				10 //MASSA
			);
			hitbox_rock_13.position.set(0.2, -46.02, 169.8);
			hitbox_rock_13.scale.set(2.5,0.9,2);
			hitbox_rock_13.rotation.set(0,1.5,0);
			hitbox_rock_13.visible=false;
			scene.add(hitbox_rock_13);

		rock_1.position.set(-4.5, -6.95, 38);
		rock_2.position.set(4, -11.2, 51);
		rock_3.position.set(-4.3, -11.2, 58.1);
		rock_4.position.set(-4.49, -26.5, 101.4);
		rock_5.position.set(4, -26.5, 101.4);

		rock_6.position.set(4, -31, 120.1);
		rock_7.position.set(-6.38, -32.22, 123.3);
		rock_8.position.set(2.5, -34.8, 128);
		rock_9.position.set(4, -40.59, 144.3);
		rock_10.position.set(-1.49, -44.31, 154);
		rock_11.position.set(-3.69, -41.72, 147.6);
		rock_12.position.set(4, -44.17, 149.5);
		rock_13.position.set(0.2, -47.02, 169.3);

}

function create_wood_trunks(){
	wood_trunk1 = new THREE.Object3D;
	// wood_trunk2 = new THREE.Object3D;
	var wood_text = new THREE.TextureLoader().load('images/trunk-texture.jpg');
	var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
	var material = new THREE.MeshBasicMaterial( {map:wood_text} );
	 wood_trunk1 = new THREE.Mesh( geometry, material );

	wood_trunk1.scale.set(0.2, 0.2, 0.2);
	wood_trunk1.rotation.z=1.3;
	scene.add(wood_trunk1);

	wood_trunk2=wood_trunk1.clone();
	wood_trunk2.scale.set(0.2, 0.3, 0.2);
	scene.add(wood_trunk2);

	wood_trunk3=wood_trunk1.clone();
	wood_trunk3.rotation.set(-0.1,-0.1,-1.8);
	scene.add(wood_trunk3);

	wood_trunk4=wood_trunk1.clone();
	wood_trunk4.scale.set(0.2, 0.4, 0.2);
	scene.add(wood_trunk4);

	wood_trunk5=wood_trunk1.clone();
	wood_trunk5.scale.set(0.2, 0.3, 0.25);
	wood_trunk5.rotation.set(-0.4,-0.8,1.3);
	scene.add(wood_trunk5);
	hitbox_trunk_5 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0x00ff00}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);
		hitbox_trunk_5.position.set(-4.40,-46.6,161.7);
		hitbox_trunk_5.scale.set(1.7,3.3,1.9);
		hitbox_trunk_5.rotation.set(0,-0.8,1.6);
		hitbox_trunk_5.visible=false;
		scene.add(hitbox_trunk_5);

	wood_trunk6=wood_trunk1.clone();
	wood_trunk6.scale.set(0.2, 0.4, 0.2);
	wood_trunk6.rotation.set(-0.4,1,1.9);
	scene.add(wood_trunk6);
	hitbox_trunk_6 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0x00ff00}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);
		hitbox_trunk_6.position.set(4,-46.72,164.1);
		hitbox_trunk_6.scale.set(1.7,4,1.9);
		hitbox_trunk_6.rotation.set(0,-2.1,1.6);
		hitbox_trunk_6.visible=false;
		scene.add(hitbox_trunk_6);

	wood_trunk7=wood_trunk1.clone();
	wood_trunk7.scale.set(0.2, 0.5, 0.2);
	wood_trunk7.rotation.set(1.5,0,2);
	scene.add(wood_trunk7);

	hitbox_trunk_7 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0x00ff00}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);
		hitbox_trunk_7.position.set(-2.49,-46.82,177.2);
		hitbox_trunk_7.scale.set(1.7,4.9,1.9);
		hitbox_trunk_7.rotation.set(0,-0.4,1.6);
		hitbox_trunk_7.visible=false;
		scene.add(hitbox_trunk_7);

	wood_trunk1.position.set(4.7,-12.3,61);
	wood_trunk2.position.set(3.59,-22.9,91.4);
	wood_trunk3.position.set(-1.38,-37.8,134.3);
	wood_trunk4.position.set(1.3,-39.46,139.19);
	wood_trunk5.position.set(-4.2,-46.82,161.9);
	wood_trunk6.position.set(4,-46.72,164.1);
	wood_trunk7.position.set(-2.49,-46.82,177.2);

}

function create_trees(){
	var trunk_text = new THREE.TextureLoader().load('images/wood.jpg');
	var leaves_text = new THREE.TextureLoader().load('images/leaves.jpg');

	var trunk =  new THREE.Mesh(
			new THREE.CubeGeometry( 13, 5, 15 ),
		new THREE.MeshPhongMaterial({map:trunk_text}),
		0
	);
	// trunk.position.set(6, -4, 30);
	trunk.scale.set(0.1,0.9,0.1);

	 var leaves =  new THREE.Mesh(
			new THREE.CubeGeometry( 13, 5, 15 ),
		new THREE.MeshPhongMaterial({map:leaves_text}),
		0
	);
	leaves.position.set(0.1, 2, 0.2);
	leaves.scale.set(0.25,0.3,0.2);
	trunk.add(leaves);

	tree_1 = new THREE.Object3D;
	tree_1.add(trunk);
	tree_1.add(leaves);
	tree_1.rotation.set(0.3,-0.2,0);

	scene.add(tree_1);

	tree_2 = tree_1.clone();

	// invisibleBox2.__dirtyPosition = true;
	scene.add(tree_2);

	tree_3 = tree_1.clone();
	tree_3.scale.set(1.2,1.3,1.6);
	tree_3.rotation.set(0.3,0.3,0);
	scene.add(tree_3);

	tree_4 = tree_1.clone();
	tree_4.scale.set(2.3,2.5,1);
	tree_4.rotation.set(0.3,-0.2,0);
	scene.add(tree_4);

	tree_5 = tree_1.clone();
	scene.add(tree_5);

	tree_6 = tree_1.clone();
	tree_6.rotation.set(0.2,0.7,-0.1);
	tree_6.scale.set(1.4,1,1);
	scene.add(tree_6);

	tree_7 = tree_1.clone();
	tree_7.rotation.set(0.3,-0.3,-0.6);
	tree_6.scale.set(1.4,1.4,1);
	scene.add(tree_7);

	tree_8 = tree_1.clone();
	scene.add(tree_8);

	tree_9 = tree_1.clone();
	tree_9.scale.set(1.5,1.4,1);
	tree_9.rotation.set(-0.5,0.8,0);
	scene.add(tree_9);
	hitbox_tree_9 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0x00ff00}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);
		hitbox_tree_9.position.set(3.8,-46.1,182.5);
		hitbox_tree_9.scale.set(1.5,1.2,1.5);
		hitbox_tree_9.rotation.set(-0.5,0.8,0);
		hitbox_tree_9.visible=false;
		scene.add(hitbox_tree_9);

	tree_1.position.set(6,2,20);
	tree_2.position.set(-6,1.699,20);
	tree_3.position.set(3.7,-14.3,73);
	tree_4.position.set(-4.5,-17.316,80.39);
	tree_5.position.set(0,-19.064,85);
	tree_6.position.set(-4,-29.29,115.5);
	tree_7.position.set(1,-29.6,118.7);
	tree_8.position.set(-4,-34.5,129.3);
	tree_9.position.set(3.8,-46.1,182.5);
}

function rolling_ball(){
	var ball_text = new THREE.TextureLoader().load('images/stone.jpg');
	var geometry = new THREE.SphereGeometry( 18, 15, 15 );
	var material = new THREE.MeshBasicMaterial( {map:ball_text} );
 ball = new THREE.Mesh( geometry, material );
	// ball.position.set(0, 9.4, 10);
	ball.position.set(0, 11.5, 3.09);
	ball.scale.set(0.28,0.28,0.28);
	scene.add(ball);
}

function reset_pg_status(){
	bracciaDX.rotation.x=0;
	bracciaSX.rotation.x=0;

	gambaSX.rotation.x=0;
	gambaDX.rotation.x=0;

}

function animation_pg(){
	personaggio.children[2].rotation.x=angle_pg;
	personaggio.children[3].rotation.x=-angle_pg;
	personaggio.children[4].rotation.x=-angle_pg;
	personaggio.children[5].rotation.x=angle_pg;
	angle_pg += increment;

	if(angle_pg > 0.8 || angle_pg < -0.8) { increment = -increment; }
}

function down_hill_movement(){

	if(rightIsDown){
		if(personaggio.position.x < limR ){
			personaggio.position.x += 0.1;
			invisibleBox.position.x+=0.1;
			animation_pg();
		}
		personaggio.rotation.y = -Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.x > limL ){
			personaggio.position.x -= 0.1;
			invisibleBox.position.x-=0.1;
			animation_pg();
		}
		personaggio.rotation.y = Math.PI/2;
	}
	if(upIsDown){
		if(personaggio.position.z >=limF){
			personaggio.position.z -= 0.1;
				personaggio.position.y +=diff;
			animation_pg();
		}

		personaggio.rotation.y = 0;
	}
	if(downIsDown){
			personaggio.position.z += 0.1;
			invisibleBox.position.z+=0.1;
			personaggio.position.y -=diff;
			invisibleBox.position.y -=diff;

			animation_pg();
			personaggio.rotation.y = -Math.PI;
		}


	// console.log("per z: "+personaggio.position.z );
}

function plane_movement(){

	if(rightIsDown){
		if(personaggio.position.x < limR ){
			personaggio.position.x += 0.1;
			invisibleBox.position.x+=0.1;
			animation_pg();
		}
		personaggio.rotation.y = -Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.x > limL ){
			personaggio.position.x -= 0.1;
			invisibleBox.position.x-=0.1;
			animation_pg();
		}
		personaggio.rotation.y = Math.PI/2;
	}
	if(upIsDown){
			if (personaggio.position.z >=limF){
				personaggio.position.z -= 0.1;
				invisibleBox.position.z-=0.1;
				animation_pg();
			}
				personaggio.rotation.y = 0;
	}
	if(downIsDown){
			personaggio.position.z += 0.1;
			invisibleBox.position.z+=0.1;
			animation_pg();

		personaggio.rotation.y = Math.PI;
	}
}
var texture_cave, first_wall;
window.onload = function init() {

		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( 1280, 600 );
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );

		scene = new Physijs.Scene;
		scene.setGravity(new THREE.Vector3( 0, -10, 0));

		camera = new THREE.PerspectiveCamera(
			45,
			1280/600,
			0.1,
			1000
		);
		camera.position.set( 0, 0, 30 ); //on the personaggio
		// camera.position.set( 0, -40, 210 );  //0 0 30
		//Lateral Camera
		// camera.position.set( -100, -10, 49 );
		// camera.rotation.y = 4.42;
		// camera.position.set(0,-40,258);
		// camera.position.set( 0, -6, 100 );
		scene.add( camera );

		for (var i = 0; i < removed_array.length; ++i) { removed_array[i] = false; }

		var light3 = new THREE.AmbientLight(0xaaaaaa, 1, 50);
		light3.position.set(0, 0, 10);
		scene.add(light3);

		var light1 = new THREE.PointLight( 0xffaaaa, 2, 15);  //vaso
		light1.position.set(-3.8, 3, 13.5);
		scene.add(light1);

		personaggio = new THREE.Object3D;

		pg();
		scene.add(personaggio);
		// scene.add(invisibleBox);

		//Add floors
		texture_ground = new THREE.TextureLoader().load('images/ground.jpg');
		texture_cave = new THREE.TextureLoader().load('images/matt.jpg');
	  ground_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: texture_ground }), // high friction
			// low restitution
		);

		rolling_ball();
		create_trees();
		create_rocks();
		create_wood_trunks();
		for(;floor_count < 13; floor_count++){
			floor();
		}


			texture_ground = new THREE.TextureLoader().load('images/wall.jpg');
			cave_material = Physijs.createMaterial(
				new THREE.MeshLambertMaterial({ map: texture_cave}),
				.6, // high friction
				.3 // low restitution
			);
		  ground_material = Physijs.createMaterial(
				new THREE.MeshLambertMaterial({ map: texture_ground }),
				.6, // high friction
				.3 // low restitution
			);

			first_wall = new THREE.Mesh(
				new THREE.CubeGeometry( 1, 30, 50 ),
				ground_material,
				0 //MASSA
			);
			first_wall.position.set(0,31,9.3);
			first_wall.rotation.set(2.94,1.5,-2.5);
			first_wall.scale.y=1.8;
			scene.add(first_wall);

		for(floor_count=0;floor_count <12; floor_count++){
			walls();
		}
		var listener = new THREE.AudioListener();
		var background_track = new THREE.Audio( listener );
		var audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sound/background_chase2.mp3', function( buffer ) {
			background_track.setBuffer( buffer );
			background_track.setLoop( true );
			background_track.setVolume( 0.2 );
			background_track.play();
		});

		 boulder_track = new THREE.Audio( listener );
		audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sound/bould.mp3', function( buffer ) {
			boulder_track.setBuffer( buffer );
			boulder_track.setLoop( true );
			boulder_track.setVolume( 0.03 );
			boulder_track.play();
		});

		tree_track = new THREE.Audio( listener );
	 audioLoader = new THREE.AudioLoader();
	 audioLoader.load( 'sound/tree.mp3', function( buffer ) {
		 tree_track.setBuffer( buffer );
		 // tree_track.setLoop( true );
		 tree_track.setVolume( 0.2 );
		 // tree_track.play();
	 });

	 stone_track = new THREE.Audio( listener );
	audioLoader = new THREE.AudioLoader();
	audioLoader.load( 'sound/rock_smash.mp3', function( buffer ) {
		stone_track.setBuffer( buffer );
		// tree_track.setLoop( true );
		stone_track.setVolume( 0.3 );
		// tree_track.play();
	});

 two_stone_track = new THREE.Audio( listener );
audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/both_rock_smash2.mp3', function( buffer ) {
	two_stone_track.setBuffer( buffer );
	// tree_track.setLoop( true );
	two_stone_track.setVolume( 0.5 );
	// tree_track.play();
});

wood_track = new THREE.Audio( listener );
audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/wood_trunk.mp3', function( buffer ) {
 wood_track.setBuffer( buffer );
 // tree_track.setLoop( true );
 wood_track.setVolume( 0.03 );
 // tree_track.play();
});

hit_track = new THREE.Audio( listener );
audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/hit.mp3', function( buffer ) {
 hit_track.setBuffer( buffer );
 // tree_track.setLoop( true );
 hit_track.setVolume( 0.6 );
 // tree_track.play();
});

falling_track = new THREE.Audio( listener );
audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/falling.mp3', function( buffer ) {
 falling_track.setBuffer( buffer );
 // tree_track.setLoop( true );
 falling_track.setVolume( 0.1 );
 // tree_track.play();
});




		// boulder_track = new Audio("sound/bould.mp3");
    //     boulder_track.loop = true;
    //     boulder_track.volume = 0.25;

		document.getElementById("skipLevel").onclick = function(){ location.href = "levelK.html"; };

	// 	setTimeout(function(){alert( "Is that a boulder?! Better flee with the arrow keys!");
	// },1000);
		stop_pg();

			//setTimeout(function(){render();
		//},1500);
	  render();
}

function character_handling(){
	switch (true) {
		case slope1:
					//check if pg touched rock
					if (personaggio.position.x >= -7 && personaggio.position.x <=-1.69 &&
							personaggio.position.z >=35.6 && personaggio.position.z <=41.20){
						collision_front=true;
						downIsDown=false;
					}
					down_hill_movement();
				if (personaggio.position.z >47.2){
					if (personaggio.position.y>=-11){
						personaggio.position.y-=0.1;
					}
					else {
						slope1=false;
						plane1=true;
						personaggio.position.y=-11.2;
						diff=0.038;
						limF=47.5;
					}
				}
				break;
		case plane1:
		//rock2
		if (personaggio.position.x <= 7 && personaggio.position.x >=1.5 &&
				personaggio.position.z>=49.2 && personaggio.position.z <=53.5){
			collision_front=true;
			downIsDown=false;
		}
		//rock3
		if (personaggio.position.x >= -6.5 && personaggio.position.x <=-1.69 &&
				personaggio.position.z>=54.9 && personaggio.position.z <=60.8){
			collision_front=true;
			downIsDown=false;
		}
		//wood_trunk1
		if (personaggio.position.x <= 7 && personaggio.position.x >=2.1 &&
				personaggio.position.z>=59.9 && personaggio.position.z <=63.2){
			collision_front=true;
			downIsDown=false;

		}
				plane_movement();
				if (personaggio.position.z >=66.1 && plane1){
					if (personaggio.position.y>=-12.2){
						personaggio.position.y-=0.1;
					}
					else {
						plane1=false;
						slope2=true;
						limF=66.3;
					}
				}
				break;
		case slope2:
		//tree 3
		if (personaggio.position.x <= 5 && personaggio.position.x >=2.1 &&
				personaggio.position.z>=71 && personaggio.position.z <=74.7){
			collision_front=true;
			downIsDown=false;
		}
		//check if pg tree_4
		else if (personaggio.position.x >= -6.29 && personaggio.position.x <=-2.3 &&
				personaggio.position.z >=79.49 && personaggio.position.z <=82.6){
			collision_front=true;
			downIsDown=false;
		}
		// tree 5
		else if (personaggio.position.x >=-1.09 && personaggio.position.x <=1.2 &&
				personaggio.position.z>=83.49 && personaggio.position.z <=86.2){
			collision_front=true;
			downIsDown=false;
		}
		//wood_trunk2
		else if (personaggio.position.x <= 6.399 && personaggio.position.x >=0.3 &&
				personaggio.position.z>=90.2 && personaggio.position.z <=92.8){
			collision_front=true;
			downIsDown=false;
		}

		//i due sassi gemelli
		else if ( personaggio.position.z>=98.5 && personaggio.position.z <=105.3 &&(personaggio.position.x <= -0.7 || personaggio.position.x >=0.59)){
			collision_front=true;
			downIsDown=false;
		}
				down_hill_movement();
				if(personaggio.position.z >=105.5){
					slope2=false;
					plane2=true;
				}
				break;
		case plane2:
				plane_movement();
				if (personaggio.position.z >=110.89){
					if (personaggio.position.y>=-27.8){
						personaggio.position.y-=0.1;
					}
					else {
						plane2=false;
						slope3=true;
						limF=112.2;
					}
				}
				break;
		case slope3:
		//tree_6
		if (personaggio.position.x >=-5.49 && personaggio.position.x <=-2.4 &&
				personaggio.position.z>=113.4 && personaggio.position.z <=117.1){
			collision_front=true;
			downIsDown=false;
		}
		//tree_7 + rock 5
		else if (personaggio.position.x >=-1.2 && personaggio.position.x <=7 &&
				personaggio.position.z>=116.79 && personaggio.position.z <=123.39){
			collision_front=true;
			downIsDown=false;
		}
		// rock 6
		else if (personaggio.position.x >=-7 && personaggio.position.x <=-4 &&
				personaggio.position.z>=120.6 && personaggio.position.z <=125.8){
			collision_front=true;
			downIsDown=false;
		}
		// rock 7
		else if (personaggio.position.x >=-0.4 && personaggio.position.x <=4 &&
				personaggio.position.z>=125.99 && personaggio.position.z <=131){
			collision_front=true;
			downIsDown=false;
		}
		//Tree_7
		else if (personaggio.position.x >=-4.9 && personaggio.position.x <=-2.7 &&
				personaggio.position.z>=127.899 && personaggio.position.z <=130.6){
			collision_front=true;
			downIsDown=false;
		}
		//wood_trunk3
		else if (personaggio.position.x >=-3.6 && personaggio.position.x <=1.09 &&
				personaggio.position.z>=132.8 && personaggio.position.z <=135.7){
			collision_front=true;
			downIsDown=false;
		}
		//wood_trunk4
		else if (personaggio.position.x >=-3 && personaggio.position.x <=5.29 &&
				personaggio.position.z>=138 && personaggio.position.z <=140.7){
			collision_front=true;
			downIsDown=false;
		}
		//rock_8
		else if (personaggio.position.x >=1.4 && personaggio.position.x <=6.39 &&
				personaggio.position.z>=142.3 && personaggio.position.z <=147.79){
			collision_front=true;
			downIsDown=false;
		}
		//rock_9
		else if (personaggio.position.x >=-5.99 && personaggio.position.x <=-1.19 &&
				personaggio.position.z>=145.59 && personaggio.position.z <=150.89){
			collision_front=true;
			downIsDown=false;
		}
		//rock_10
		else if (personaggio.position.x >=-4.1 && personaggio.position.x <=0.9 &&
				personaggio.position.z>=152.1 && personaggio.position.z <=157.09){
			collision_front=true;
			downIsDown=false;
		}
				down_hill_movement();
				if (personaggio.position.z >=157.59){
					if (personaggio.position.y>=-46.13){
						personaggio.position.y-=0.1;
					}
					else {
						plane3=true;
						slope3=false;
						limF=158;
						invisibleBox.visible=false;
						invisibleBox.position.x=personaggio.position.x;
						invisibleBox.position.y=personaggio.position.y;
						invisibleBox.position.z=personaggio.position.z;

						scene.add(invisibleBox);
					}
				}
				break;
		case plane3:
				// scene.setGravity(new THREE.Vector3( 0, -10, 0));
				plane_movement();
				if(personaggio.position.z >=185){
					// if (personaggio.position.y >= -47.1){
					// 	personaggio.position.y-=0.1;
					// }
					// else {
						plane3=false;
						slope4=true;
						diff=0.028;
						limF=185.6;
						camera.rotation.x=-0.9;
					  camera.position.y=personaggio.position.y+18;
						camera.position.z=personaggio.position.z +14;
						scene.setGravity(new THREE.Vector3( 0, -50, 0));
						invisibleBox.setLinearFactor(new THREE.Vector3(0, 1, 0));
						// personaggio.position.y=invisibleBox.position.y;
						// scene.add(dropBox);
						// invisibleBox.add(personaggio);
					}
				// }
				break;
		case slope4:
				down_hill_movement();
				break;
		default:
				break;
	}
	reset_collision();
}

function ball_handling(){
	switch (true) {
		case slope_ball_1:
				ball.position.z+=ball_speed;
				ball.position.y-=ball_hill;
				if (ball.position.z +0.5>= tree_1.position.z && !removed_array[0]){
						ball_speed-=0.02;
						ball_hill=0.0375;
						// scene.remove(tree_1);
						tree_1.scale.y-=0.7;
						tree_1.position.y-=2;

						tree_2.scale.y-=0.7;
						tree_2.position.y-=2;
						tree_track.play();
						tree_track.play();
						removed_array[0] = true
				}
				else if (ball.position.z +0.5>= rock_1.position.z && !removed_array[1]){
						rock_1.position.x-=4;
						rock_1.rotation.x = 0.9;
						stone_track.play();
						removed_array[1] = true
				}

				else if (ball.position.z >47.2){
					if (ball.position.y>=-7.5){
						ball.position.y-=0.1;
					}
					else {
						slope_ball_1=false;
						plane_ball_1=true;
					}
				}
				break;
		case plane_ball_1:
				ball.position.z+=ball_speed;
				if (ball.position.z +0.6>= rock_2.position.z && !removed_array[2]){
						rock_2.position.x+=4;
						stone_track.play();
						removed_array[2] = true
				}
				else if (ball.position.z +0.6>= rock_3.position.z && !removed_array[3]){
						rock_3.position.x-=4;
						stone_track.play();
						removed_array[3] = true;
				}
				else if (ball.position.z +0.5>= wood_trunk1.position.z && !removed_array[4]){
						wood_trunk1.position.y=-12.6;
						wood_trunk1.scale.x=0.1;
						wood_track.play();
						removed_array[4] = true;
				}
				if (ball.position.z >=66.1){
					if (ball.position.y>=-9.6){
						ball.position.y-=0.1;
					}
					else {
						plane_ball_1=false;
						slope_ball_2=true;
						ball_hill=0.0375;
					}
				}
				break;
		case slope_ball_2:
				ball.position.z+=ball_speed;
				ball.position.y-=ball_hill;
				if (ball.position.z +0.5>= tree_3.position.z && !removed_array[5]){
						// ball_speed-=0.02;
						// ball_hill=0.0375;
						tree_3.scale.y-=0.7;
						tree_3.position.y=-16.3;
						tree_track.play();

						removed_array[5] = true;
				}
				else if (ball.position.z +0.5>= tree_4.position.z && !removed_array[6]){

						tree_4.rotation.z=0.4;
						tree_4.position.x=-6;
						tree_4.scale.x=1.99;
						tree_track.play();
						removed_array[6] = true;
				}
				else if (ball.position.z +0.5>= tree_5.position.z && !removed_array[7]){
						tree_5.position.y=-20.36;
						tree_5.scale.y=0.5;


						removed_array[7] = true;
						tree_track.play();
				}
				else if (ball.position.z +0.5>= wood_trunk2.position.z && !removed_array[8]){

						wood_trunk2.rotation.z=1.4;
						wood_trunk2.position.y=-23.9;
						wood_trunk2.scale.x=0.13;

						wood_track.play();
						removed_array[8] = true;
				}
				else if (ball.position.z +0.5>= rock_4.position.z && !removed_array[9]){

						rock_4.rotation.z=1;
						rock_4.rotation.y=0.4;
						rock_4.position.x-=2;

						rock_5.rotation.z=-1;
						rock_5.rotation.y=-0.4;
						rock_5.position.x+=2;
						two_stone_track.play();
						two_stone_track.play();
						removed_array[9] = true;
				}
				if(ball.position.z >=104.4){
					slope_ball_2=false;
					plane_ball_2=true;
				}
				break;
		case plane_ball_2:
				ball.position.z+=ball_speed;
				if (ball.position.z >=110.89){
					if (ball.position.y>=-21.8){
						ball.position.y-=0.1;
					}
					else {
						plane_ball_2=false;
						slope_ball_3=true;
					}
				}
				break;
		case slope_ball_3:
				ball.position.z+=ball_speed;
				ball.position.y-=ball_hill;
				if (ball.position.z +0.5>= tree_6.position.z && !removed_array[10]){

						tree_6.scale.y=0.6;
						tree_6.position.y=-30.89;
						tree_6.rotation.z=0.3;
						tree_6.rotation.x=-0.6;
						tree_track.play();
						removed_array[10] = true;
				}
				else if (ball.position.z +0.5>= tree_7.position.z && !removed_array[11]){

						tree_7.scale.y=0.5;
						tree_7.position.y=-31.7;

						rock_6.scale.x=1.1;
						rock_6.rotation.y=2.1;
						tree_track.play();
						tree_track.setVolume(0.2);
						stone_track.play();
						removed_array[11] = true;
				}
				else if (ball.position.z +0.5>= rock_7.position.z && !removed_array[12]){
						rock_7.position.x-=2;
						stone_track.play();
						stone_track.play();
						removed_array[12] = true;
				}
				else if (ball.position.z +0.5>= tree_8.position.z && !removed_array[13]){

						tree_8.scale.y=0.4;
						tree_8.position.y=-36.3;

						rock_8.position.y=-35.6;
						rock_8.scale.x=0.4;
						tree_track.play();
						stone_track.play();
						removed_array[13] = true;
				}
				else if (ball.position.z +0.5>= wood_trunk3.position.z && !removed_array[14]){

						wood_trunk3.scale.x=0.1;
						wood_trunk3.position.y=-38.5;
						wood_track.play();
						removed_array[14] = true;
				}
				else if (ball.position.z +0.5>= wood_trunk4.position.z && !removed_array[15]){

						wood_trunk4.scale.x-=0.05;
						wood_trunk4.rotation.z=1.4;
						wood_trunk4.position.y=-40.86;
						wood_track.play();
						removed_array[15] = true;
				}
				else if (ball.position.z +0.5>= rock_9.position.z && !removed_array[16]){

						rock_9.scale.x=1.4;
						rock_9.scale.y=2.2;
						rock_9.position.y=-41.4;
						stone_track.play();
						removed_array[16] = true;
						stone_track.play();
				}
				else if (ball.position.z +0.5>= rock_11.position.z && !removed_array[17]){

						rock_11.scale.x=0.2;
						rock_11.scale.y=2.8;
						rock_11.rotation.x=0.8;
						rock_11.position.y=-42.39;
						rock_11.position.x=-4.29;
						stone_track.play();
						removed_array[17] = true;
						stone_track.play();
				}
				else if (ball.position.z +0.5>= rock_10.position.z && !removed_array[18]){

						rock_10.position.y=-47;
						rock_10.rotation.y=0.4;
						rock_10.position.z=153.4;
						stone_track.play();
						removed_array[18] = true;
				}
				if (ball.position.z >=157.59){
					if (ball.position.y>=-42.13){
						ball.position.y-=0.1;
					}
					else {
						plane_ball_3=true;
						slope_ball_3=false;
					}
				}
				break;
		case plane_ball_3:
		if (ball.position.z +0.5>= wood_trunk5.position.z && !removed_array[19]){

				wood_trunk5.position.x=-5.3;
				wood_trunk5.rotation.y=-1.2;
				wood_trunk5.position.y=-47.62;
				scene.remove(hitbox_trunk_5);
				wood_track.play();
				removed_array[19] = true;
		}
		else if (ball.position.z +0.5>= wood_trunk6.position.z && !removed_array[20]){

				wood_trunk6.position.x=5.3;
				wood_trunk6.rotation.y=1.3;
				wood_trunk6.position.y=-47.92;
				scene.remove(hitbox_trunk_6);
				wood_track.play();
				removed_array[20] = true;
		}

		else if (ball.position.z +0.5>= rock_13.position.z && !removed_array[21]){

				rock_13.position.y=-47.62;
				rock_13.scale.y=0.8;
				rock_13.rotation.z-=0.1;
				scene.remove(hitbox_rock_13);
				stone_track.play();
				removed_array[21] = true;
		}
		else if (ball.position.z +0.5>= wood_trunk7.position.z && !removed_array[22]){

				wood_trunk7.position.x=-5.49;
				wood_trunk7.position.y=-47.82;
				wood_trunk7.rotation.z=2.8;
				scene.remove(hitbox_trunk_7);
				wood_track.play();
				removed_array[22] = true;
		}
		else if (ball.position.z +0.5>= tree_9.position.z && !removed_array[23]){

				tree_9.rotation.x=1;
				tree_9.position.z=187.5;
				tree_9.scale.y=0.7;
				tree_9.scale.z=0.7;
				scene.remove(hitbox_tree_9);
				tree_track.play();
				removed_array[23] = true;
		}
				ball.position.z+=ball_speed;
				if(ball.position.z >=185.4){
					if (ball.position.y >= -43.6){
						ball.position.y-=0.1;
					}
					else {
						plane_ball_3=false;
						slope_ball_4=true;
						ball_hill=0.026;
					}
				}
				break;
		case slope_ball_4:
				//Check if it has to fall
				if (ball.position.z <=237){
					ball.position.z+=ball_speed;
				}
				else {
					ball_hill=0.3;
				}
				ball.position.y-=ball_hill;
				break;
		default:break;

	}
}

function stop_pg(){
	downIsDown=false;
	rightIsDown=false;
	leftIsDown=false;
	upIsDown=false;
}
var collision_front=false;
var collision_rear=false;
var collision_left = false;
var collision_right = false;
var floor_6;
function reset_collision(){
	 collision_front=false;
	 collision_rear=false;
	 collision_left = false;
	 collision_right = false;
}
var end=false, landed=false;

function render() {


	// console.log("camera_pos z: "+camera.position.z);
	// tree_1.position.z+=0.1;

 	// BALL HANDLING
	ball_handling();
	ball.rotation.x+=.03
	if(ball.position.z + 3.3 >= personaggio.position.z  && !dead){
		dead=true;
		personaggio.rotation.x=2;
		personaggio.position.y-=1.4;
		hit_track.play();
	}

	if (mIsDown){
		camera.position.z+=1
	}
	if (nIsDown){
		camera.position.z-=1;
		 // camera.position.x-=1;
	}
	if(bIsDown){
		camera.position.y-=1;
	}
	if(vIsDown){
		camera.position.y+=1;
	}

	if( xIsDown){
	camera.position.set( 0, -40, 210 );
		camera.rotation.y = 0;
	}
	if( cIsDown){
		camera.position.set( -100, -10, 49 );
		// camera.position.set( -12.5, 0, 24 );
		camera.rotation.y = 4.42;
	}
	if(wIsDown){
		camera.rotation.x+=0.1;
	}
	if(sIsDown){
		camera.rotation.x+=0.1;

			console.log("floor y: "+floor.position.y);
	}
	if(aIsDown){
		floor.position.z-=0.1;

			console.log("floor z: "+floor.position.z);
	}
	if(dIsDown){
		camera.position.set( 0, -24.6, 169 );
		camera.rotation.x=-1.23;
		// floor.position.z+=0.1;
		//
		// 	console.log("floor z: "+floor.position.z);
		// invisibleBox.position.z+=0.05;
		// invisibleBox.position.y-=0.02;
	}
	if (lIsDown){
		camera.position.x+=0.5;
	}
	if (kIsDown){
		camera.position.x-=0.5;
	}
	if(rIsDown){
		floor.rotation.x+=0.1;
		console.log("rotation x: "+floor.rotation.x);
	}
	if(tIsDown){
		floor.rotation.x-=0.1;// XXX: -=0.1;
		console.log("rotation x: "+floor.rotation.x);
	}
	if (qIsDown){

		camera.position.set(-29,-63,235);
	}
	if (eIsDown){
		// floor.position.x+=0.1;
		// 	console.log("floor x: "+floor.position.x);
		// personaggio.position.y-=0.1;
		// console.log("pers y: "+personaggio.position.y);
		camera.position.z = personaggio.position.z +15;
		camera.position.y= personaggio.position.y+1.5;
	}

	// wood_trunk1.rotation.z+=0.1;
	// ball.rotation.z+=10;
	// scene.add(wall);
	// if (ball.position.z +0.5>= trunk.position.z){
	// 		scene.remove(trunk);
	// 		scene.remove(leaves);
	// }

	if (zisDown){
		// console.log("parametri camera");
		// console.log("cam x:" +camera.position.x);
		// 	console.log("cam y:"+ camera.position.y);
		// 		console.log("cam z:"+ camera.position.z);
		// 		console.log("cam rot y:"+ camera.rotation.y);

		// 		console.log("parametri floor");
		// 		console.log("floor x:" +floor.position.x);
		// 			console.log("floor y:"+ floor.position.y);
		// 				console.log("floor z:"+ floor.position.z);
		console.log("personaggio ");
			console.log(" x:" +personaggio.position.x);
				console.log(" y:"+ personaggio.position.y);
					console.log(" z:"+ personaggio.position.z);
	}

	//Update camera position
	// if(!slope4){
	if(personaggio.position.z >=230 && !landed){
		end=true;
		personaggio.children[2].rotation.x=0;
		personaggio.children[3].rotation.x=0;
		personaggio.children[4].rotation.x=0;
		personaggio.children[5].rotation.x=0;
		slope4=false;
		// camera.position.z = personaggio.position.z+12;
		// camera.position.y=personaggio.position.y+18;
		console.log("ao1");
		// scene.remove(invisibleBox);
	}
	if(!slope4){
		camera.position.z = personaggio.position.z +15;
		camera.position.y= personaggio.position.y+1.5;
	}
	else {
			if(!landed){
				camera.position.z += 0.09;
				camera.position.y=personaggio.position.y+18;
				// camera.position.z = personaggio.position.z +14;
				// camera.position.y= personaggio.position.y+18;
				console.log("AOOOOOOOOO");
			}

	}
	if(end && !landed){

		if(personaggio.position.z <=250){
			// camera.rotation.y=-0.2;
				personaggio.position.z+=0.15;
				personaggio.position.y+=0.01;
				// personaggio.rotation.y=3.4;
				personaggio.children[2].rotation.x=-1.5;
				personaggio.children[3].rotation.x=1.5;
				personaggio.children[0].rotation.x=-0.1;
				personaggio.children[4].rotation.x=1.5;
				personaggio.children[5].rotation.x=-1.5;
				camera.position.y=personaggio.position.y+18;

		}
		else {

			if(personaggio.position.y>=-63.7 && !landed){
				personaggio.position.y-=0.2;
				// camera.position.y=personaggio.position.y+50;
				// camera.position.y=personaggio.position.y+10;
				// camera.position.z = personaggio.position.z-12;
				slope4=false;
			}

			else {
				landed=true;
				camera.rotation.x=0;
				// camera.position.z = personaggio.position.z+15;
				// camera.position.y=personaggio.position.y+1.5;

			}
			camera.position.z = personaggio.position.z+12;
			camera.position.y=personaggio.position.y+18;
		}
	}

	if(landed){
		if (personaggio.position.z <=260){
			if(camera.rotation.x>=0){
				camera.rotation.x-=0.05;
			}
			animation_pg();
			personaggio.position.z+=0.1;
		}
		else {
			location.href = "levelK.html";
		}

	}

	if(personaggio.position.y <=-65 && !dead){
		falling_track.play();
		scene.setGravity(new THREE.Vector3( 0, 0, 0));
		dead=true;
	}



	if(!slope4){
		invisibleBox.__dirtyPosition=true;
		invisibleBox.setAngularFactor(new THREE.Vector3(0, 0, 0));
	  invisibleBox.setLinearFactor(new THREE.Vector3(0, 0, 0));
	}
	else {

		invisibleBox.__dirtyPosition=true;
		invisibleBox.setAngularFactor(new THREE.Vector3(0, 0, 0));
	  invisibleBox.setLinearFactor(new THREE.Vector3(0, 1, 0));
		personaggio.position.y=invisibleBox.position.y+1;

	}


	hitbox_trunk_5.__dirtyPosition=true;
	hitbox_trunk_5.setAngularFactor(new THREE.Vector3(0, 0, 0));
  hitbox_trunk_5.setLinearFactor(new THREE.Vector3(0, 0, 0));
	hitbox_trunk_6.__dirtyPosition=true;
	hitbox_trunk_6.setAngularFactor(new THREE.Vector3(0, 0, 0));
  hitbox_trunk_6.setLinearFactor(new THREE.Vector3(0, 0, 0));
	hitbox_rock_13.__dirtyPosition=true;
	hitbox_rock_13.setAngularFactor(new THREE.Vector3(0, 0, 0));
	hitbox_rock_13.setLinearFactor(new THREE.Vector3(0, 0, 0));

	hitbox_trunk_7.__dirtyPosition=true;
	hitbox_trunk_7.setAngularFactor(new THREE.Vector3(0, 0, 0));
	hitbox_trunk_7.setLinearFactor(new THREE.Vector3(0, 0, 0));

	hitbox_tree_9.__dirtyPosition=true;
	hitbox_tree_9.setAngularFactor(new THREE.Vector3(0, 0, 0));
	hitbox_tree_9.setLinearFactor(new THREE.Vector3(0, 0, 0));

	floor_6.__dirtyPosition=true;
	floor_6.setAngularFactor(new THREE.Vector3(0, 0, 0));
	floor_6.setLinearFactor(new THREE.Vector3(0, 0, 0));
	// box.__dirtyPosition=true;
	// box.setAngularFactor(new THREE.Vector3(0, 0, 0));
	// box.setLinearFactor(new THREE.Vector3(0, 1, 0));

	// invisibleBox.setCcdMotionThreshold(0.01);
		//switch for the personaggio
		invisibleBox.addEventListener( 'collision', function( other_object) {
							//collision da sopra
								if (other_object==hitbox_tree_9 || other_object==hitbox_rock_13 || other_object==hitbox_trunk_5 || other_object == hitbox_trunk_6
								   || other_object==hitbox_trunk_7){
										 console.log("collision");
		 							if (downIsDown){
		 								personaggio.position.z-=0.5;
										invisibleBox.position.z-=0.5;
		 								collision_front=true;
		 								downIsDown=false;
		 							}
									if (upIsDown){
		 								personaggio.position.z+=0.5;
										invisibleBox.position.z+=0.5;
		 								collision_rear=true;
		 								upIsDown=false;
		 							}
		 							if (leftIsDown){
		 								personaggio.position.x+=0.35;
										invisibleBox.position.x+=0.35;
		 								collision_right=true;
		 								leftIsDown=false;
		 							}

									if (rightIsDown){
		 								personaggio.position.x-=0.3;
										invisibleBox.position.x-=0.3;
		 								collision_left=true;
		 								rightIsDown=false;
		 							}
								}


		});
		if(!dead && !end)
			character_handling();
		else {
			if(dead){
				setTimeout(function(){
					window.location=document.URL;},1500);
			}

			}
		reset_collision();
		// invisibleBox.position.x = personaggio.position.x;
		// invisibleBox.position.y = personaggio.position.y+2;
		// invisibleBox.position.z = personaggio.position.z;

	scene.simulate(); // run physics
	renderer.render( scene, camera); // render the scene
	requestAnimationFrame( render );
}

function onDocumentKeyDown(event){
		switch(event.keyCode){
				case 37:  if(!collision_right){
											leftIsDown  =true;
									}
									else {
										leftIsDown=false;
										collision_right=true;
										reset_pg_status();
									}
									break;

				case 38:  if(!collision_rear){
											upIsDown = true;
										}
									else {
										upIsDown=false;
										collision_rear=true;
										reset_pg_status();
									}
									break;

				case 39:  if(!collision_left){
											rightIsDown  =true;
									}
									else {
										rightIsDown=false;
										collision_left=true;

										reset_pg_status();
									}
									break;

				case 40: if(!collision_front){
											downIsDown  =true;
									}
									else {
										downIsDown=false;
									}
									break;

				case 90: zisDown = true; break;
				case 77: mIsDown = true; break;
				case 78: nIsDown = true; break;
				case 66: bIsDown = true; break;
				case 86: vIsDown = true; break;

				case 67: cIsDown = true; break;
				case 88: xIsDown = true; break;

				case 87: wIsDown = true; break;
				case 65: aIsDown = true; break;
				case 83: sIsDown = true; break;
				case 68: dIsDown = true; break;
				case 75: kIsDown = true; break;
				case 76: lIsDown = true; break;

				case 82: rIsDown = true; break;
				case 84: tIsDown = true; break;
				case 81: qIsDown = true; break;
				case 69: eIsDown = true; break;
		}
}

function onDocumentKeyUp( event ) {
		switch( event.keyCode ) {
				case 37:  leftIsDown  = false;  break;
				case 38:  upIsDown    = false;  break;
				case 39:  rightIsDown = false;  break;
				case 40:  downIsDown  = false;  break;

				case 90: zisDown = false; break;
				case 77: mIsDown = false; break;
				case 78: nIsDown = false; break;
				case 66: bIsDown = false; break;
				case 86: vIsDown = false; break;

				case 67: cIsDown = false; break;
				case 88: xIsDown = false; break;

				case 87: wIsDown = false; break;
				case 65: aIsDown = false; break;
				case 83: sIsDown = false; break;
				case 68: dIsDown = false; break;
				case 75: kIsDown = false; break;
				case 76: lIsDown = false; break;

				case 82: rIsDown = false; break;
				case 84: tIsDown = false; break;
				case 81: qIsDown = false; break;
				case 69: eIsDown = false; break;


		}
}
