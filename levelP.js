var geometry, material;
var camera, scene, renderer, loader;

var limR = 4,
	limL = -4,
	limF = -40,
	limB = 25;
	
var li1;
var lid = true,
	lir = false,
	liu = false,
	lil = false;

var rafterRot = false;

var onGround1 = true;
var onGround2 = true;
var onGround3 = true;

var death = false,
	death2 = false,
	dead = false;

var platform;

var room1, room2, room3;

var rafter;

var salto = false;
var saltato = false;

var mov = true;

var babyBear, bear;

var rightBabyBear = true,
	leftBabyBear = false,
	deadBabyBear = false,
	hitBabyBear = false;
	
var hitBear_1 = false,
	hitBear_2= false,
	hittingBear = false,
	deadBear = false;

var bearScratch = false;
var countLife = 2;
	
var rotationLimbs = 0.05;
var rotationLimbBabyBear = 0.04;
var rotationLimbBear = 0.03;


var starting = false,
	manageMov1 = false,
	manageMov2 = false,
	manageMov3 = false,
	manageMov4 = false,
	movPlatform = false;

var texture2;

var kunai1, kunai2, kunai3, kunai4,
	kunai5, kunai6, kunai7, kunai8;

var totem1, totem2, totem3, totem4, totem5, totem6;
	
var timeTotem1, rotTotem1 = true;
var manageTotem1 = false;
var hitTotem1 = false;

var timeTotem2, rotTotem2 = true;
var manageTotem2 = false;
var hitTotem2 = false;

var timeTotem3, rotTotem3 = true;
var manageTotem3 = false;
var hitTotem3 = false;

var timeTotem4, rotTotem4 = true;
var manageTotem4 = false;
var hitTotem4 = false;

var timeTotem5, rotTotem5 = true;
var manageTotem5 = false;
var hitTotem5 = false;

var timeTotem6, rotTotem6 = true;
var manageTotem6 = false;
var hitTotem6 = false;

var stopForward = false;
var stopBack = false;
	
var checkpoint;

var checkpointChecked = false,
	checkpointDeath = false,
	startRoom3 = false;


var saetta1, saetta2, saetta3;
var lifeEnemy1, lifeEnemy2;

var shu1=false, shu2=false, shu3=false, shu4=false, shu5=false, shu6=false;
var ora2, ora3, ora4, ora5;
var goShurikens = false;
var finalAnim = true;

var hittingMadara = false,
	hitMadara_1 = false,
	hitMadara_2 = false,
	madaraDead = false;

var shuriken1, shuriken2, shuriken3, shuriken4, shuriken5, shuriken6;

var personaggio, madara, barrier;

var testa, tronco,
	braccioDX, braccioSX, 
	avambraccioDX, avambraccioSX, 
	gambaDX, gambaSX, 
	stincoDX, stincoSX,
	bracciaDX, bracciaSX, 
	gambeDX, gambeSX;

var impugno = false, 
	spadata1 = false,
	spadata2 = false,
	riposo = false;
var ora;

var soundBlow, soundBlow2,
	soundFootstep,
	soundKunai1, soundKunai2,
	soundTotems, soundRafter,
	soundCheckPoint, soundFalling,
	soundHitMe, soundHitBear,
	soundShuriken, soundHitMadara;
	
var soundtrack1, soundtrackMadara;

document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );
document.getElementById("skipLevel").onclick = function(){ location.href = "outro.html"; };

var leftIsDown  = false,
	upIsDown    = false,
	rightIsDown = false,
	downIsDown  = false,
	zIsDown = false, //spadata1
	xIsDown = false, //spadata2
	aIsDown = false, //jump
	mIsDown = false,    
	nIsDown	= false;
	

	
	
function makePG(){
	
	var textureFace = new THREE.TextureLoader().load('images/Face.bmp');
	testa = new THREE.Object3D;
	loader.load('mod/testac.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:textureFace});
		testa.add(model);
		testa.position.set(0, 7, 0.2);
		
	});
	personaggio.add(testa);
	
	var texturePG = new THREE.TextureLoader().load('images/metallo1.jpg');
	tronco = new THREE.Object3D;
	loader.load('mod/tronco2.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		tronco.add(model);
		
	});
	personaggio.add(tronco);
	
	
	
	bracciaDX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	braccioDX = new THREE.Object3D;
	loader.load('mod/braccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		braccioDX.add(model);
		
		bracciaDX.add(braccioDX);
		
	});
	

	avambraccioDX = new THREE.Object3D;
	loader.load('mod/avambraccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		avambraccioDX.add(model);
		avambraccioDX.position.set(0.2, -4.5, 0.8);
		
		bracciaDX.add(avambraccioDX);
		bracciaDX.position.set(2.9, 5.9, 0.5);
		
	});
	
	personaggio.add(bracciaDX);
	
    bracciaSX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	braccioSX = new THREE.Object3D;
	loader.load('mod/braccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		braccioSX.add(model);
		
		bracciaSX.add(braccioSX);
		
	});
	
	
	avambraccioSX = new THREE.Object3D;
	loader.load('mod/avambraccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		avambraccioSX.add(model);
		avambraccioSX.position.set(-0.2, -4.5, 0.8);
		
		bracciaSX.add(avambraccioSX);
		bracciaSX.position.set(-2.9, 5.9, 0.5);
		
	});
	
	personaggio.add(bracciaSX);
	
	gambeDX = new THREE.Object3D;
	gambaDX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		gambaDX.add(model);
		
		gambeDX.add(gambaDX);
		
	});
	
	
	stincoDX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		stincoDX.add(model);
		stincoDX.position.set(0, -5.8, -1);
		
		gambeDX.add(stincoDX);
		gambeDX.position.set(1.1, -0.5, 0.3);
		
	});
	personaggio.add(gambeDX);
	
	gambeSX = new THREE.Object3D;
	gambaSX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		gambaSX.add(model);
		
		gambeSX.add(gambaSX);
		
	});
	
	stincoSX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texturePG});
		stincoSX.add(model);
		stincoSX.position.set(0, -5.8, -1);
		
		gambeSX.add(stincoSX);
		gambeSX.position.set(-1.1, -0.5, 0.3);
		
	});
	personaggio.add(gambeSX);
	
	
	spada1 = new THREE.Object3D;
	var textureHilt = new THREE.TextureLoader().load('images/metallo4.png');
	var textureBlade = new THREE.TextureLoader().load('images/sp4.jpg');
	loader.load('mod/zangetsu3.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:textureBlade});
		model.children[1].material = new THREE.MeshPhongMaterial({map:textureHilt});
		
		spada1.add(model);
		spada1.position.set(4,12,2);
		spada1.rotation.z -= Math.PI*5/6;
		spada1.rotation.y += Math.PI;

	});
	personaggio.add(spada1);
	
	personaggio.scale.set(0.1, 0.1, 0.1);
	personaggio.position.set(0, -0.45, 35);
	
}

function moveLimbs(){
	if(!spadata1 && !impugno){
		personaggio.children[2].rotation.x -= rotationLimbs;
	}
	personaggio.children[3].rotation.x += rotationLimbs;
	personaggio.children[4].rotation.x += rotationLimbs;
	personaggio.children[5].rotation.x -= rotationLimbs;
	
	if(personaggio.children[4].rotation.x > 0.5 || personaggio.children[5].rotation.x > 0.5) {rotationLimbs = -rotationLimbs;}
	soundFootstep.play();
}

function Resetta_Posizioni_PG(){
	
			//Le gambe e le braccia del personaggio vengono resettate ai valori iniziali e il personaggio si ferma
	if(!spadata1 && !impugno){
		personaggio.children[2].rotation.x = 0;
	}
	personaggio.children[3].rotation.x = 0;
	personaggio.children[4].rotation.x = 0;
	personaggio.children[5].rotation.x = 0;
	soundFootstep.pause();
}

function controllaPosizione(){
	
	if(personaggio.position.z < 14.5 && personaggio.position.z > 11.5){
		return true;
	}
	else if(personaggio.position.x > 42 && personaggio.position.x < 44.8)
		return true;
	
	else return false;
	
}

function fendente(){
	
	if(zIsDown && !riposo)
		spadata1 = true;
	
	if(spadata1){
		soundBlow.play();
		if(bracciaDX.rotation.x <= 2.5 && !impugno){
			bracciaDX.rotation.x += 0.1;
			avambraccioDX.rotation.x += 0.1;
			bracciaDX.rotation.z += 0.015;
			
			if(bracciaDX.rotation.x > 2.5){
				impugno = true;
				bracciaDX.rotation.z += 0.1;
			}
		}
		else if(bracciaDX.rotation.x > 1){
			bracciaDX.rotation.x -= 0.05;
			bracciaDX.rotation.z -= 0.04;
			avambraccioDX.rotation.x -= 0.15;
			avambraccioDX.rotation.z -= 0.03;
			
			spada1.rotation.x -= 0.15;
			spada1.rotation.y -= 0.2;
			spada1.rotation.z += 0.01;
			spada1.position.y -= 0.3;
			spada1.position.z -= 0.15;
			spada1.position.x -= 0.2;
			
			if(bracciaDX.rotation.x <= 1){
				spadata1 = false;
				avambraccioDX.rotation.y =0;
				avambraccioDX.rotation.z =0;
				avambraccioDX.rotation.x =0;
				ora = Date.now();
				riposo = true;
				
			}
		}
		if(xIsDown)
			spadata2 = true;
		
	}
	else if(spadata2){
		soundBlow2.play();
		if(Date.now() - ora > 300){
			if(bracciaDX.rotation.z <= 0.6){
				bracciaDX.rotation.z += 0.04;
				avambraccioDX.rotation.y += 0.05;

				spada1.rotation.z -= 0.04;
				spada1.position.x += 0.2;
				spada1.position.y -= 0.065;
			
				if(bracciaDX.rotation.z > 0.6){
					ora = Date.now();
					spadata2 = false;
					riposo = true;
				}
			}
		}
	}
	else if (riposo){
		if(Date.now() - ora > 600){
			bracciaDX.rotation.set(0,0,0);
			avambraccioDX.rotation.set(0,0,0);
			spada1.position.set(4, 12, 2);
			spada1.rotation.set(0, -Math.PI, -Math.PI*5/6);
			riposo= false;
			impugno = false;
		}
	}
	
}

function manageMovs1(){
	
	if(rightIsDown){
		if(personaggio.position.x < 4 ){
			personaggio.position.x += 0.1;
			camera.rotation.y -= 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = -Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.x > -4 ){
			personaggio.position.x -= 0.1;
			camera.rotation.y += 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI/2;
	}
	if(upIsDown){
		if(personaggio.position.z > limF ){
			personaggio.position.z -= 0.1;
			camera.position.z -= 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = 0;
	}
	if(downIsDown){
		if(personaggio.position.z < 25 ){
			personaggio.position.z += 0.1;
			camera.position.z += 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI;
	}
	
}



function stanza1(){
	
	var light1 = new THREE.PointLight( 0xcccccc, 1.5, 20);  //vaso
		light1.position.set(-4.3, 6, 20);		
		room1.add(light1);
		
	var light2 = new THREE.PointLight( 0xcccccc, 1.5, 10);  //vaso
		light2.position.set(-4.3, 6, -10);		
		room1.add(light2);
	
	var b1 = new THREE.Mesh(
		new THREE.CubeGeometry( 0.5, 0.5, 0.5 ),
		new THREE.MeshBasicMaterial()
	);
	b1.position.set(-4.5, 6, 20);
	room1.add(b1);
	
	var b2 = b1.clone();
	b2.position.set(-4.5, 6, -10);
	room1.add(b2);
	
	
	texture2 = new THREE.TextureLoader().load('images/matt.jpg');
	
	var roof1 = new THREE.Mesh(
		new THREE.CubeGeometry( 16, 1, 70 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	roof1.position.y = 9.0;
	roof1.position.z = -6;
	room1.add(roof1);
	
	var floor1 = new THREE.Mesh(
		new THREE.CubeGeometry( 13, 5, 15 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor1.position.y = -4.0;
	floor1.position.z = 22;
	room1.add(floor1);
	
	var floor2 = new THREE.Mesh(
		new THREE.CubeGeometry( 13, 5, 38 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor2.position.y = -4.0;
	floor2.position.z = -7.5;
	room1.add(floor2);
	
	var wallLeft1 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 14, 70 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft1.position.set(-5, 2, -5);
	room1.add(wallLeft1);
	
	var wallRight1 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 14, 60 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallRight1.position.set(5, 2, 0);
	room1.add(wallRight1);
	
	var wallLeft2 = new THREE.Mesh(
		new THREE.CubeGeometry( 58, 14, 0.95 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft2.position.set(17.5, 2, -40);
	room1.add(wallLeft2);
	
	var textureWallHole = new THREE.TextureLoader().load('images/wallHole2.jpg');
	var wallHole = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 3, 3 ),
		new THREE.MeshPhongMaterial({map:textureWallHole})
	);
	wallHole.position.set(4.95, 0, -12);
	room1.add(wallHole);
	
	var wallHole2 = wallHole.clone();
	wallHole2.position.set(-4.95, 0, -19);
	room1.add(wallHole2);
	
	var tp = new THREE.TextureLoader().load('images/sp5.jpg');
	platform = new THREE.Mesh(
		new THREE.CubeGeometry( 2, 0.1, 2 ),
		new THREE.MeshPhongMaterial({map:tp})
	);
	platform.position.set(0, -1.7, -25.5);
	room1.add(platform);
	
	li1 = new THREE.PointLight( 0xff1111, 10, 0.2); //pulsante
	li1.position.set(-1, -1.4, -24.5);
	room1.add(li1);
	
	var saeTexture = new THREE.TextureLoader().load('images/bluSaetta.jpg');
	saetta1 = new THREE.Object3D;
	loader.load('mod/saetta.obj',function(model){
		model.scale.set(0.02, 0.02, 0.02);
		
		model.children[0].material = new THREE.MeshBasicMaterial({map:saeTexture});
		saetta1.add(model);
		
		saetta1.position.set(-0.85, 0.35, -1);
		saetta1.rotation.y = Math.PI/2;

	});
	camera.add(saetta1);
	
	saetta2 = new THREE.Object3D;
	loader.load('mod/saetta.obj',function(model){
		model.scale.set(0.02, 0.02, 0.02);
		
		model.children[0].material = new THREE.MeshBasicMaterial({map:saeTexture});
		saetta2.add(model);
		
		saetta2.position.set(-0.8, 0.35, -1);
		saetta2.rotation.y = Math.PI/2;

	});
	camera.add(saetta2);
	
	saetta3 = new THREE.Object3D;
	loader.load('mod/saetta.obj',function(model){
		model.scale.set(0.02, 0.02, 0.02);
		
		model.children[0].material = new THREE.MeshBasicMaterial({map:saeTexture});
		saetta3.add(model);
		
		saetta3.position.set(-0.75, 0.35, -1);
		saetta3.rotation.y = Math.PI/2;

	});
	
	var textureLifeBear = new THREE.TextureLoader().load('images/bearface.jpg');
	lifeEnemy1 = new THREE.Object3D;
	loader.load('mod/enemylife2.obj',function(model){
		model.scale.set(0.03, 0.03, 0.03);
		model.children[0].material = new THREE.MeshBasicMaterial({map:textureLifeBear});
		lifeEnemy1.add(model);
		lifeEnemy1.position.set(0.83, 0.35, -1);
		
	});
	camera.add(lifeEnemy1);
	
	lifeEnemy2 = new THREE.Object3D;
	loader.load('mod/enemylife2.obj',function(model){
		model.scale.set(0.03, 0.03, 0.03);
		model.children[0].material = new THREE.MeshBasicMaterial({map:textureLifeBear});
		lifeEnemy2.add(model);
		lifeEnemy2.position.set(0.75, 0.35, -1);
		
	});
	camera.add(lifeEnemy2);
	
}

function makeBear(){
	
	var basebear = new THREE.Object3D;
	
	var texb = new THREE.TextureLoader().load('images/fur.jpg');
	var texbh = new THREE.TextureLoader().load('images/head.jpg');
	
	var bhead = new THREE.Mesh(
		new THREE.CubeGeometry( 0.3, 0.5, 0.3 ),
		new THREE.MeshPhongMaterial({map:texbh})
	);
	bhead.position.set(0,0.9,-0.2);
	bhead.rotation.x = -Math.PI/6;
	basebear.add(bhead);
	
	var btronco = new THREE.Mesh(
		new THREE.CubeGeometry( 0.8, 1.5, 0.6 ),
		new THREE.MeshPhongMaterial({map:texb})
	);
	btronco.position.set(0,0,0);
	basebear.add(btronco);
	
	var bbraccioDX = new THREE.Mesh(
		new THREE.CubeGeometry( 0.2, 0.8, 0.2 ),
		new THREE.MeshPhongMaterial({map:texb})
	);
	bbraccioDX.position.set(0.3, 0.5, -0.5);
	bbraccioDX.rotation.x = Math.PI/2;
	basebear.add(bbraccioDX);
	
	var bbraccioSX = bbraccioDX.clone();
	bbraccioSX.position.set(-0.3, 0.5, -0.5);
	bbraccioSX.rotation.x = Math.PI/2;
	basebear.add(bbraccioSX);
	
	var bgambaDX = new THREE.Mesh(
		new THREE.CubeGeometry( 0.25, 0.8, 0.25 ),
		new THREE.MeshPhongMaterial({map:texb})
	);
	bgambaDX.position.set(0.3,-1, 0);
	basebear.add(bgambaDX);
	
	var bgambaSX = bgambaDX.clone();
	bgambaSX.position.set(-0.3,-1, 0);
	basebear.add(bgambaSX);
	
	var btail = bbraccioDX.clone();
	btail.position.set(0,-0.8,0.2);
	btail.scale.set(0.6,0.3,0.6);
	btail.rotation.x = Math.PI/6;
	basebear.add(btail);
	
	basebear.scale.set(1.5,1.5,1.5);
	basebear.position.set(0, 0.5, -10);
	
	
	babyBear = basebear.clone();  //cucciolo
	babyBear.children[0].rotation.x = Math.PI/3;
	babyBear.children[0].position.y = -0.5;
	babyBear.children[0].position.z = -0.9;
	babyBear.children[1].rotation.x = Math.PI/2;
	babyBear.children[1].position.y = -0.5;
	babyBear.children[2].rotation.x = 0;
	babyBear.children[2].position.y = -1;
	babyBear.children[3].rotation.x = 0;
	babyBear.children[3].position.y = -1;
	babyBear.children[4].position.z = 0.6;
	babyBear.children[5].position.z = 0.6;
	babyBear.children[6].position.z = 0.8;
	babyBear.children[6].position.y = -0.5;
	babyBear.children[6].rotation.x = -Math.PI/3;
	babyBear.position.set(0, -0.4, 11);
	
	room1.add(babyBear);
	babyBear.scale.set(0.8, 0.8, 0.8);
	babyBear.rotation.y = -Math.PI/2;
	
	bear = babyBear.clone();
	bear.scale.set(2, 2, 2);
	bear.position.set(0, 1.3, -10); //-10
	bear.rotation.y = Math.PI;
	room1.add(bear);
	
}

function moveLimbBear(){
	bear.children[2].rotation.x -= rotationLimbBear;
	bear.children[3].rotation.x += rotationLimbBear;
	bear.children[4].rotation.x += rotationLimbBear;
	bear.children[5].rotation.x -= rotationLimbBear;
	bear.children[0].rotation.x += rotationLimbBear/6;
	
	if(bear.children[5].rotation.x > 0.5 || bear.children[4].rotation.x > 0.5) {rotationLimbBear = -rotationLimbBear;}
}

function manageBabyBear(){
	
	hittingBabyBear();
	
	if(!hitBabyBear){
		if(babyBear.position.x < 4 && rightBabyBear){
			babyBear.position.x += 0.1;
			
			moveLimbBabyBear();
			
			if(babyBear.position.x >= 4){
				rightBabyBear = false;
				leftBabyBear = true;
				babyBear.rotation.y = Math.PI/2;
			}	
		}
		if(babyBear.position.x > -4 && leftBabyBear){
			babyBear.position.x -= 0.1;
			moveLimbBabyBear();
			if(babyBear.position.x <= -4){
				rightBabyBear = true;
				leftBabyBear = false;
				babyBear.rotation.y = -Math.PI/2;
			}
		}
	}
	
}

function hittingBabyBear(){
	
	if(personaggio.position.distanceTo(babyBear.position) < 0.7 && !hitBabyBear && !dead){
		hitBabyBear = true;
		countLife = countLife-1;
		soundHitMe.play();
		soundHitBear.play();
		if(countLife==1)
			camera.remove(saetta2);
		else{
			camera.remove(saetta1);
			alert("Death. Try again!");
			dead = true;
			location.href = "levelP.html";
		}
	}
	
	if(hitBabyBear){
		if(babyBear.rotation.z < 1.5){
			babyBear.rotation.z += 0.05;
			babyBear.position.y -= 0.03;
		}
		else{
			deadBabyBear = true;
			room1.remove(babyBear);
			
			camera.remove(saetta2);
			Resetta_Posizioni_PG();
			upIsDown = false;
			downIsDown = false;
			leftIsDown = false;
			rightIsDown = false;
		}
	}
	
}

function moveLimbBabyBear(){
	babyBear.children[2].rotation.x -= rotationLimbBabyBear;
	babyBear.children[3].rotation.x += rotationLimbBabyBear;
	babyBear.children[4].rotation.x += rotationLimbBabyBear;
	babyBear.children[5].rotation.x -= rotationLimbBabyBear;
	babyBear.children[0].rotation.x += rotationLimbBabyBear/6;
	
	if(babyBear.children[5].rotation.x > 0.5 || babyBear.children[4].rotation.x > 0.5) {rotationLimbBabyBear = -rotationLimbBabyBear;}
}

function manageBear(){
	
	limF = bear.position.z;
	
	bear.rotation.y = - 2*camera.rotation.y + Math.PI;
	
	if(personaggio.position.distanceTo(bear.position) < 22)
		bear.position.x = personaggio.position.x*0.7;
		
		if(personaggio.position.z > bear.position.z && personaggio.position.distanceTo(bear.position) < 8){
			bear.position.z += 0.04;
			moveLimbBear();
	
			if(personaggio.position.distanceTo(bear.position) < 5 ){
				if(bear.children[1].rotation.x < 2){
					bear.children[0].rotation.x += 0.08;
					bear.children[0].position.y += 0.1;
					bear.children[0].position.z += 0.06;
					bear.children[1].rotation.x += 0.09;
					bear.children[1].position.y += 0.04;
					bear.children[1].position.z += 0.04;
					bear.children[2].rotation.x += 0.09;
					bear.children[2].position.y += 0.09;
					bear.children[2].position.z += 0.01;
					bear.children[3].rotation.x += 0.09;
					bear.children[3].position.y += 0.09;
					bear.children[3].position.z += 0.01;
				}
			}
			else{
				if(bear.children[1].rotation.x > 1.570796326794897){
					bear.children[0].rotation.x -= 0.08;
					bear.children[0].position.y -= 0.1;
					bear.children[0].position.z -= 0.06;
					bear.children[1].rotation.x -= 0.09;
					bear.children[1].position.y -= 0.04;
					bear.children[1].position.z -= 0.04;
					bear.children[2].rotation.x -= 0.09;
					bear.children[2].position.y -= 0.09;
					bear.children[2].position.z -= 0.01;
					bear.children[3].rotation.x -= 0.09;
					bear.children[3].position.y -= 0.09;
					bear.children[3].position.z -= 0.01;
				}
	
			}
		//bear3.children[0].rotation.x = 1.0471975511965976;
		//	bear3.children[0].position.y = -0.5;
		//	bear3.children[0].position.z = -0.9;
		//	bear3.children[1].rotation.x = 1.570796326794897;
		//	bear3.children[1].position.y = -0.5;
		//	bear3.children[1].position.z = 0;
		//	bear3.children[2].rotation.x = -1;
		//	bear3.children[2].position.y = 0;
		//	bear3.children[2].position.z = -1;
		//	bear3.children[3].rotation.x = 0.6;
		//	bear3.children[3].position.y = 0.6;
		//	bear3.children[3].position.z = 0.8;
		//	bear3.children[3].position.z = -0.5;
		//	bear3.children[3].position.z = -1.0471975511965976;
		}
		else if(personaggio.position.distanceTo(bear.position) >= 8){
			if(bear.position.z > -10 && !hittingBear)
				bear.position.z -= 0.04;
		}
	
		if( (spadata1 || spadata2) && !hittingBear)
			if(personaggio.position.distanceTo(bear.position) < 3)
				if(personaggio.rotation.y == 0)
					if(spada1.rotation.x < -4){
						soundHitBear.play();
						if(!hitBear_1){
							hitBear_1 = true;
							hittingBear = true;
							camera.remove(lifeEnemy2);
						}
						else{
							hitBear_2 = true;
							hittingBear = true;
							camera.remove(lifeEnemy1);
						}
					}
	
		if(hitBear_1 && hittingBear && !hitBear_2){
			
			
			if(bear.position.z >= -9.5){
				bear.position.z -= 0.2;
			}
			else{
				hittingBear = false;
			}
		}
		if(hitBear_2 && hittingBear){
			
			if(bear.position.y > -2){
				bear.rotation.z += 0.05;
				bear.position.y -= 0.1;
			}
			else{
				deadBear = true;
				hittingBear = true;
				room1.remove(bear);
				limF = -40;
				if(countLife==2){
					camera.remove(saetta1);
					camera.remove(saetta2);
				}
				else
					camera.remove(saetta1);
			}
		}
		
		if(personaggio.position.distanceTo(bear.position) < 2 && !hittingBear){
			bearScratch = true;
			countLife = countLife - 1;
			manageMov1 = false;
			if(countLife==1)
				camera.remove(saetta2);
			soundHitMe.play();
			if(countLife == 0){
				camera.remove(saetta1);
				alert("Death. Try again!");
				location.href = "levelP.html";
			}
		}
		
		if(bearScratch){
			personaggio.position.z += 0.2;
			camera.position.z += 0.2;
			if(personaggio.position.z >= 9){
				bearScratch = false;
				manageMov1 = true; 	
				Resetta_Posizioni_PG();
				upIsDown = false;
				downIsDown = false;
				leftIsDown = false;
				rightIsDown = false;
			}
		}
	
}

function creaKunai( knife, a, b, c ){
	
	var t1 = new THREE.TextureLoader().load('images/metallo2.jpg');
	loader = new THREE.OBJLoader();
	loader.load('mod/kunai2.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:t1});
		knife.add(model);
		
	});
	
	knife.position.set(a, b, c);
	knife.rotation.z = Math.PI/2;
	knife.rotation.x = Math.PI/2;
	knife.scale.set(0.03, 0.03, 0.03);
	room1.add(knife);

}

function controllokunai(){
	
	if(personaggio.position.z < 0){
		
		kunai1.position.x -= 0.4;
		kunai2.position.x -= 0.4;
		kunai3.position.x -= 0.4;
		kunai4.position.x -= 0.4;
		kunai5.position.x += 0.5;
		kunai6.position.x += 0.5;
		kunai7.position.x += 0.5;
		kunai8.position.x += 0.5;
		
		if(kunai1.position.x < -30){
			kunai1.position.x = 6;
			kunai2.position.x = 6;
			kunai3.position.x = 6;
			kunai4.position.x = 6.5;
			soundKunai1.play();
		}
		
		if(kunai5.position.x > 30){
			kunai5.position.x = -6.5;
			kunai6.position.x = -7;
			kunai7.position.x = -7;
			kunai8.position.x = -7;
			soundKunai2.play();
		}
		
	}
	
	if( (personaggio.position.distanceTo(kunai1.position) < 0.5 ||
		personaggio.position.distanceTo(kunai2.position) < 0.5 ||
		personaggio.position.distanceTo(kunai3.position) < 0.5 ||
		personaggio.position.distanceTo(kunai4.position) < 0.5 ||
		personaggio.position.distanceTo(kunai5.position) < 0.5 ||
		personaggio.position.distanceTo(kunai6.position) < 0.5 ||
		personaggio.position.distanceTo(kunai7.position) < 0.5 ||
		personaggio.position.distanceTo(kunai8.position) < 0.5) && !dead){
			soundHitMe.play();
			alert("Death. Try again!");
			dead = true;
			location.href = "levelP.html";
	}
	
}

function manageLuxina(){
	
	if(li1.position.x < 1 && lid){
		li1.position.x += 0.2;
		
		if(li1.position.x >= 1){
			lir = true;
			lid = false;
		}
	}
	if(li1.position.z > -26.5 && lir){
		li1.position.z -= 0.2;
		
		if(li1.position.z <= -26.5){
			liu = true;
			lir = false;
		}
	}
	if(li1.position.x > -1 && liu){
		li1.position.x -= 0.2;
		
		if(li1.position.x <= -1){
			lil = true;
			liu = false;
		}
	}
	if(li1.position.z < -24.5 && lil){
		li1.position.z += 0.2;
		
		if(li1.position.z >= -24.5){
			lid = true;
			lil = false;
		}
	}
}

function animPlatform(){
	
	if(platform.position.z > -35){
		platform.position.z -= 0.1;
		personaggio.position.z -= 0.1;
		camera.position.z -= 0.13;
		li1.position.z -= 0.1;
	}
	else if(platform.position.x < 16){
		platform.position.x += 0.1;
		personaggio.position.x += 0.1;
		camera.rotation.y -= 0.009;
		camera.position.x += 0.02;
		camera.position.z -= 0.04;
		li1.position.x += 0.1;
	}
	else{ 
		manageMov2 = true;
		mov = true;
		movPlatform = false;
		camera.position.set(4.5, 2, -35);
		camera.rotation.y = -Math.PI/2;
		
		aIsDown = false; 
		salto = false;
		saltato = false;
		
		personaggio.position.y = -0.45;
		
		
		alert("-Be CAREFUL with the Totems \n-Wait the right moment to hit them with a BLOW");
		
		soundTotems.play();
		
		Resetta_Posizioni_PG();
		upIsDown = false;
		downIsDown = false;
		leftIsDown = false;
		rightIsDown = false;
		
		scene.remove(room1);
	}
	
}




function manageMovs2(){
	
	if(upIsDown && !stopForward){
		if(personaggio.position.x < 52 ){
			personaggio.position.x += 0.1;
			camera.position.x += 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = -Math.PI/2;
	}
	if(downIsDown && !stopBack){
		if(personaggio.position.x > 15.5 ){
			personaggio.position.x -= 0.1;
			camera.position.x -= 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.z > -39 ){
			personaggio.position.z -= 0.1;
			camera.rotation.y += 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = 0;
	}
	if(rightIsDown){
		if(personaggio.position.z < -31 ){
			personaggio.position.z += 0.1;
			camera.rotation.y -= 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI;
	}
	
}

function stanza2(){
	
	var light3 = new THREE.PointLight( 0xcccccc, 1, 30);  //vaso
		light3.position.set(25, 8, -35);		
		room2.add(light3);
	
	var b3 = new THREE.Mesh(
		new THREE.CubeGeometry( 0.5, 0.5, 0.5 ),
		new THREE.MeshBasicMaterial()
	);
	b3.position.set(25, 8.5, -35);
	room2.add(b3);
	
	
	var wallLeft2 = new THREE.Mesh(
		new THREE.CubeGeometry( 58, 14, 1 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft2.position.set(17.5, 2, -40);
	room2.add(wallLeft2);
	
	var wallRight2 = new THREE.Mesh(
		new THREE.CubeGeometry( 48, 14, 1 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallRight2.position.set(28.75, 2, -30);
	room2.add(wallRight2);
	
	var wallRight3 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 20, 50 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallRight3.position.set(53, 2, -50);
	room2.add(wallRight3);
	
	var floor3 = new THREE.Mesh(
		new THREE.CubeGeometry( 27, 5, 18 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor3.position.set( 28.5, -4.0, -35);
	room2.add(floor3);
	
	var roof2 = new THREE.Mesh(
		new THREE.CubeGeometry( 70, 1, 16 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	roof2.position.set(25, 9.1, -35);
	room2.add(roof2);
	
	var floor4 = new THREE.Mesh(
		new THREE.CubeGeometry( 10, 5, 18 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor4.position.set( 50, -4.0, -35);
	room2.add(floor4);
	
	var textureCheckpoint = new THREE.TextureLoader().load('images/checkpoint.png');
	checkpoint = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 1, 1 ),
		new THREE.MeshPhongMaterial({map:textureCheckpoint})
	);
	checkpoint.position.set( 50, -1, -35);
	room2.add(checkpoint);
	
	makeTotem();
	
}

function makeTotem(){
	
	totem1 = new THREE.Object3D;
	totem2 = new THREE.Object3D;
	totem3 = new THREE.Object3D;
	totem4 = new THREE.Object3D;
	totem5 = new THREE.Object3D;
	totem6 = new THREE.Object3D;
	
	// Box
	var textureTotem1 = new THREE.TextureLoader().load('images/metallo3.jpg');
	palo = new THREE.Mesh(
		new THREE.CubeGeometry( 0.6, 5, 0.6 ),
		new THREE.MeshPhongMaterial({map:textureTotem1})
	);
	totem1.add(palo);
	
	var textureTotem2 = new THREE.TextureLoader().load('images/metallo2.jpg');
	tra1 = new THREE.Mesh(
		new THREE.CubeGeometry( 3, 0.35, 0.35 ),
		new THREE.MeshPhongMaterial({map:textureTotem2})
	);
	tra1.position.set(0, 2, 0);
	totem1.add(tra1);
	
	tra2 = new THREE.Mesh(
		new THREE.CubeGeometry( 4, 0.35, 0.35 ),
		new THREE.MeshPhongMaterial({map:textureTotem2})
	);
	tra2.position.set(0,0.5,0);
	totem1.add(tra2);
	
	tra3 = new THREE.Mesh(
		new THREE.CubeGeometry( 3, 0.35, 0.35 ),
		new THREE.MeshPhongMaterial({map:textureTotem2})
	);
	tra3.position.set(0,-1,0);
	totem1.add(tra3);

	totem1.position.set(21, 0, -33);
	
	room2.add(totem1);
	
	totem2 = totem1.clone();
	totem2.position.set(21, 0, -37);
	room2.add(totem2);
	
	totem3 = totem1.clone();
	totem3.position.set(28, 0, -33);
	room2.add(totem3);
	
	totem4 = totem1.clone();
	totem4.position.set(28, 0, -37);
	room2.add(totem4);
	
	totem5 = totem1.clone();
	totem5.position.set(35, 0, -33);
	room2.add(totem5);
	
	totem6 = totem1.clone();
	totem6.position.set(35, 0, -37);
	room2.add(totem6);
	
	//totem2.children[1].material.map = dd;
	
}

function manageTotems(){
	
	if(manageTotem1){
		
		if(Date.now() - timeTotem1 > 4000 && rotTotem1){
			rotTotem1 = false;
			soundTotems.volume -= 0.1;
			timeTotem1 = Date.now();
		}
		if(Date.now() - timeTotem1 > 2000 && !rotTotem1){
			rotTotem1 = true;
			soundTotems.volume += 0.1;
			timeTotem1 = Date.now();
		}
	
		if(rotTotem1){
			totem1.children[1].rotation.y += 0.1;
			totem1.children[2].rotation.y -= 0.15;
			totem1.children[3].rotation.y += 0.2;
		}
		else{
			totem1.children[1].rotation.y = -Math.PI/2;
			totem1.children[2].rotation.y = -Math.PI/2;
			totem1.children[3].rotation.y = -Math.PI/2;	
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem1.position) < 1.7)
					if( (personaggio.position.z < totem1.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem1.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem1.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem1.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem1 = true;
			
			}
		}

		if(rotTotem1 && !hitTotem1 && !dead && personaggio.position.distanceTo(totem1.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!"); location.href = "levelP.html"; }, 300);
		}

		if(hitTotem1){
			if(totem1.position.y > -3)
				totem1.position.y -= 0.2;
			
			else{
				room2.remove(totem1);
				manageTotem1 = false;
			}
		}

	}
	
	if(manageTotem2){
		
		if(Date.now() - timeTotem2 > 5000 && rotTotem2){
			rotTotem2 = false;
			soundTotems.volume -= 0.1;
			timeTotem2 = Date.now();
		}
		if(Date.now() - timeTotem2 > 2500 && !rotTotem2){
			rotTotem2 = true;
			soundTotems.volume += 0.1;
			timeTotem2 = Date.now();
		}
	
		if(rotTotem2){
			totem2.children[1].rotation.y -= 0.15;
			totem2.children[2].rotation.y -= 0.2;
			totem2.children[3].rotation.y += 0.3;
		}
		else{
			totem2.children[1].rotation.y = -Math.PI/2;
			totem2.children[2].rotation.y = -Math.PI/2;
			totem2.children[3].rotation.y = -Math.PI/2;	
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem2.position) < 1.7)
					if( (personaggio.position.z < totem2.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem2.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem2.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem2.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem2 = true;
			
			}
		}

		if(rotTotem2 && !hitTotem2 && !dead && personaggio.position.distanceTo(totem2.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!"); location.href = "levelP.html"; }, 300);
		}
		if(hitTotem2){
			if(totem2.position.y > -3)
				totem2.position.y -= 0.2;
			
			else{
				room2.remove(totem2);
				manageTotem2 = false;
			}
		}

	}
	
	if(manageTotem3){
		
		if(Date.now() - timeTotem3 > 6000 && rotTotem3){
			rotTotem3 = false;
			soundTotems.volume -= 0.1;
			timeTotem3 = Date.now();
		}
		if(Date.now() - timeTotem3 > 3000 && !rotTotem3){
			rotTotem3 = true;
			soundTotems.volume += 0.1;
			timeTotem3 = Date.now();
		}
	
		if(rotTotem3){
			totem3.children[1].rotation.y += 0.2;
			totem3.children[2].rotation.y += 0.3;
			totem3.children[3].rotation.y -= 0.2;
		}
		else{
			totem3.children[1].rotation.y = -Math.PI/2;
			totem3.children[2].rotation.y = -Math.PI/2;
			totem3.children[3].rotation.y = -Math.PI/2;	
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem3.position) < 1.7)
					if( (personaggio.position.z < totem3.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem3.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem3.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem3.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem3 = true;
			
			}
		}

		if(rotTotem3 && !hitTotem3 && !dead && personaggio.position.distanceTo(totem3.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!"); location.href = "levelP.html"; }, 300);
		}
		if(hitTotem3){
			if(totem3.position.y > -3)
				totem3.position.y -= 0.2;
			
			else{
				room2.remove(totem3);
				manageTotem3 = false;
			}
		}

	}
	
	if(manageTotem4){
		
		if(Date.now() - timeTotem4 > 7000 && rotTotem4){
			rotTotem4 = false;
			soundTotems.volume -= 0.1;
			timeTotem4 = Date.now();
		}
		if(Date.now() - timeTotem4 > 2000 && !rotTotem4){
			rotTotem4 = true;
			soundTotems.volume += 0.1;
			timeTotem4 = Date.now();
		}
	
		if(rotTotem4){
			totem4.children[1].rotation.y -= 0.15;
			totem4.children[2].rotation.y += 0.2;
			totem4.children[3].rotation.y += 0.3;
		}
		else{
			totem4.children[1].rotation.y = -Math.PI/2;
			totem4.children[2].rotation.y = -Math.PI/2;
			totem4.children[3].rotation.y = -Math.PI/2;	
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem4.position) < 1.7)
					if( (personaggio.position.z < totem4.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem4.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem4.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem4.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem4 = true;
			
			}
		}

		if(rotTotem4 && !hitTotem4 && !dead && personaggio.position.distanceTo(totem4.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!"); location.href = "levelP.html"; }, 300);
		}
		if(hitTotem4){
			if(totem4.position.y > -3)
				totem4.position.y -= 0.2;
			
			else{
				room2.remove(totem4);
				manageTotem4 = false;
			}
		}

	}
	
	if(manageTotem5){
		
		if(Date.now() - timeTotem5 > 9000 && rotTotem5){
			rotTotem5 = false;
			soundTotems.volume -= 0.1;
			timeTotem5 = Date.now();
		}
		if(Date.now() - timeTotem5 > 2500 && !rotTotem5){
			rotTotem5 = true;
			soundTotems.volume += 0.1;
			timeTotem5 = Date.now();
		}
	
		if(rotTotem5){
			totem5.children[1].rotation.y += 0.15;
			totem5.children[2].rotation.y -= 0.1;
			totem5.children[3].rotation.y -= 0.25;
		}
		else{
			totem5.children[1].rotation.y = -Math.PI/2;
			totem5.children[2].rotation.y = -Math.PI/2;
			totem5.children[3].rotation.y = -Math.PI/2;
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem5.position) < 1.7)
					if( (personaggio.position.z < totem5.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem5.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem5.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem5.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem5 = true;
			
			}
		}

		if(rotTotem5 && !hitTotem5 && !dead && personaggio.position.distanceTo(totem5.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!"); location.href = "levelP.html"; }, 300);
		}
		if(hitTotem5){
			if(totem5.position.y > -3)
				totem5.position.y -= 0.2;
			
			else{
				room2.remove(totem5);
				manageTotem5 = false;
			}
		}

	}
	
	if(manageTotem6){
		
		if(Date.now() - timeTotem6 > 8500 && rotTotem6){
			rotTotem6 = false;
			soundTotems.volume -= 0.1;
			timeTotem6 = Date.now();
		}
		if(Date.now() - timeTotem6 > 2500 && !rotTotem6){
			rotTotem6 = true;
			soundTotems.volume += 0.1;
			timeTotem6 = Date.now();
		}
	
		if(rotTotem6){
			totem6.children[1].rotation.y -= 0.3;
			totem6.children[2].rotation.y += 0.2;
			totem6.children[3].rotation.y -= 0.1;
		}
		else{
			totem6.children[1].rotation.y = -Math.PI/2;
			totem6.children[2].rotation.y = -Math.PI/2;
			totem6.children[3].rotation.y = -Math.PI/2;	
		
			if(spadata1 || spadata2){
				if(personaggio.position.distanceTo(totem6.position) < 1.7)
					if( (personaggio.position.z < totem6.position.z && personaggio.rotation.y==Math.PI) ||
						(personaggio.position.z > totem6.position.z && personaggio.rotation.y==0) ||
						(personaggio.position.x < totem6.position.x && personaggio.rotation.y==-Math.PI/2) ||
						(personaggio.position.x > totem6.position.x && personaggio.rotation.y==Math.PI/2) )
							if(spada1.rotation.x < -2)
								hitTotem6 = true;
			
			}
		}

		if(rotTotem6 && !hitTotem6 && !dead && personaggio.position.distanceTo(totem6.position) < 2.5){
			soundHitMe.play();
			dead=true;
			setTimeout(function(){ alert("Death. Try again!");  location.href = "levelP.html"; }, 300);
		}
		if(hitTotem6){
			if(totem6.position.y > -3)
				totem6.position.y -= 0.2;
			
			else{
				room2.remove(totem6);
				manageTotem6 = false;
			}
		}

	}
	
	
}

function manageTotems2(){
	
	if( ( manageTotem1 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >=20 && personaggio.position.x <21) ) ||
		( manageTotem2 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >=20 && personaggio.position.x <21) ) ||
		( manageTotem3 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >=27 && personaggio.position.x <28) ) ||
		( manageTotem4 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >=27 && personaggio.position.x <28) ) ||
		( manageTotem5 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >=34 && personaggio.position.x <35) ) ||
		( manageTotem6 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >=34 && personaggio.position.x <35) ) )
			stopForward = true;
	else stopForward = false;
	
	if( ( manageTotem1 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >21 && personaggio.position.x <=22) ) ||
		( manageTotem2 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >21 && personaggio.position.x <=22) ) ||
		( manageTotem3 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >28 && personaggio.position.x <=29) ) ||
		( manageTotem4 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >28 && personaggio.position.x <=29) ) ||
		( manageTotem5 && (personaggio.position.z <-30.5 && personaggio.position.z >=-35) && (personaggio.position.x >35 && personaggio.position.x <=36) ) ||
		( manageTotem6 && (personaggio.position.z <=-35 && personaggio.position.z >-39.5) && (personaggio.position.x >35 && personaggio.position.x <=36) ) )
			stopBack = true;
	else stopBack = false;
	
}




function manageMovs3(){
	
	if(rightIsDown){
		if(personaggio.position.x < 52 ){
			personaggio.position.x += 0.1;
			camera.rotation.y -= 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = -Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.x > 47.2 ){
			personaggio.position.x -= 0.1;
			camera.rotation.y += 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI/2;
	}
	if(upIsDown){
		if(personaggio.position.z > -80 ){
			personaggio.position.z -= 0.1;
			camera.position.z -= 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = 0;
	}
	if(downIsDown){
		if(personaggio.position.z < -32 ){
			personaggio.position.z += 0.1;
			camera.position.z += 0.1;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI;
	}
	
}

function manageMovs4(){
	
	if(rightIsDown){
		if(personaggio.position.x < 55 ){
			personaggio.position.x += 0.15;
			camera.rotation.y -= 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = -Math.PI/2;
	}
	if(leftIsDown){
		if(personaggio.position.x > 45 ){
			personaggio.position.x -= 0.15;
			camera.rotation.y += 0.003;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI/2;
	}
	if(upIsDown){
		if(personaggio.position.z > -134 ){
			personaggio.position.z -= 0.15;
			camera.position.z -= 0.15;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = 0;
	}
	if(downIsDown){
		if(personaggio.position.z < -79 ){
			personaggio.position.z += 0.15;
			camera.position.z += 0.15;
			moveLimbs();
		}
		else Resetta_Posizioni_PG();
		personaggio.rotation.y = Math.PI;
	}
	
}

function restoreRoom3(){
	
	death = false;
	personaggio.rotation.y = 0;
	personaggio.position.set(50, -0.45, -35);
	
	camera.position.set(50, 2, -25);
	camera.rotation.y = 0;
	
	manageMov3 = true;
	
	onGround1 = true;
	onGround2 = true;
	onGround3 = true;
	
	mov = true;
	
	rafterRot = true;
	
	madara.children[7].rotation.z = 0;
	madara.children[8].rotation.z = 0;
	
	if(death2){
		madara.children[7].rotation.z = 0;
		madara.children[8].rotation.z = 0;
		
		shuriken1.position.z = -150;
		shuriken2.position.z = -157;
		shuriken3.position.z = -164;
		shuriken4.position.z = -171;
		shuriken5.position.z = -178;
		shuriken6.position.z = -185;
		
		soundtrackMadara.pause();
		soundShuriken.pause();
		
		camera.remove(saetta1);
		camera.remove(saetta2);
		camera.remove(saetta3);
		
		camera.remove(lifeEnemy1);
		camera.remove(lifeEnemy2);
		
		hitMadara_1 = false;
		hitMadara_2 = false;
	}
	
	soundRafter.play();
	soundtrack1.play();
	
	finalAnim = true;
	goShurikens = false;
	
	alert("CheckPoint");
	
	Resetta_Posizioni_PG();
	upIsDown = false;
	downIsDown = false;
	leftIsDown = false;
	rightIsDown = false;
	
	
}

function stanza3(){
	
	var light4 = new THREE.PointLight( 0xff9999, 1, 20);  //vaso
		light4.position.set(50, -2, -57.5);		
		room3.add(light4);
	
	
	var floor4 = new THREE.Mesh(
		new THREE.CubeGeometry( 10, 5, 18 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor4.position.set( 50, -4.0, -35);
	room3.add(floor4);
	
	var roof3 = new THREE.Mesh(
		new THREE.CubeGeometry( 20, 1, 120 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	roof3.position.set( 50, 9, -90);
	room3.add(roof3);
	
	var wallLeft2 = new THREE.Mesh(
		new THREE.CubeGeometry( 58, 14, 0.95 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft2.position.set(17.5, 2, -40);
	room3.add(wallLeft2);
	
	var wallLeft3 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 20, 35 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft3.position.set(46.1, 2, -57.2);
	room3.add(wallLeft3);

	var wallRight3 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 20, 50 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallRight3.position.set(53, 2, -50);
	room3.add(wallRight3);
	
	
	var rafterTexture = new THREE.TextureLoader().load('images/legno.jpeg');
	rafter = new THREE.Mesh(
		new THREE.CylinderGeometry(0.18, 0.18, 2.2, 8),
		new THREE.MeshPhongMaterial({map:rafterTexture})
	);
	rafter.position.set(50, -2, -60);
	rafter.scale.set(3, 15, 3);
	rafter.rotation.x = Math.PI/2;
	room3.add(rafter);
	
	var floor5 = new THREE.Mesh(
		new THREE.CubeGeometry( 20, 5, 100 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	floor5.position.set( 50, -4.0, -125);
	room3.add(floor5);
	
	var wallLeft4 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 14, 100 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallLeft4.position.set(56.5, 2, -125);
	room3.add(wallLeft4);
	
	var wallRight4 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 14, 100 ),
		new THREE.MeshPhongMaterial({map:texture2})
	);
	wallRight4.position.set(43.5, 2, -125);
	room3.add(wallRight4);
	
	var finalTexture = new THREE.TextureLoader().load('images/muro1.png');
	
	var muro1 = new THREE.Mesh(
		new THREE.CubeGeometry( 10, 20, 1 ),
		new THREE.MeshPhongMaterial({map:finalTexture})
	);
	muro1.position.set(43, 0, -140);
	room3.add(muro1);
		
	var muro2 = muro1.clone();
	muro2.position.set(57, 0, -140);
	room3.add(muro2);
		
	var muro3 = new THREE.Mesh(
		new THREE.CubeGeometry( 10, 20, 0.9 ),
		new THREE.MeshPhongMaterial({map:finalTexture})
	);
	muro3.position.set(50, 13.5, -140);
	room3.add(muro3);
	
	var black = new THREE.Mesh(
		new THREE.PlaneGeometry( 10, 10 ),
		new THREE.MeshBasicMaterial({color:0x000000})
	);
	black.position.set(50, 0, -140);
	room3.add(black);
	
	var light5 = new THREE.AmbientLight( 0xbbbbbb, 0.5, 20);  //vaso
		light5.position.set(50, 8, -100);		
		room3.add(light5);
	
	var b4 = new THREE.Mesh(
		new THREE.CubeGeometry( 1, 0.5, 1 ),
		new THREE.MeshBasicMaterial()
	);
	b4.position.set(50, 8, -100);
	room3.add(b4);
	
	var textureBarrier = new THREE.TextureLoader().load('images/barrier.jpg');
	barrier = new THREE.Mesh(
		new THREE.PlaneGeometry( 15, 8 ),
		new THREE.MeshBasicMaterial({map:textureBarrier, transparent: true, opacity: 0.22})
	);
	barrier.position.set(49.9, 1, -134.3);
	room3.add(barrier);
	
	
	madara = new THREE.Object3D;
	makeMadara();
	room3.add(madara);
	
	
}

function manageRotationRafter(){
	
	if(personaggio.position.z > -60)
			rafter.rotation.y -= 0.015;
		else
			rafter.rotation.y += 0.015;
		
		if(personaggio.position.x > 49.4 && personaggio.position.x < 50.6 && personaggio.position.z < -44 && personaggio.position.z > -60){
			personaggio.position.x += 0.015;
		}
		else if(personaggio.position.x > 49.4 && personaggio.position.x < 50.6 && personaggio.position.z <= -60 && personaggio.position.z > -74.5){
			personaggio.position.x -= 0.015;
		}
		
		else if( (personaggio.position.x >= 46.8 && personaggio.position.x <= 49.4 || personaggio.position.x >= 50.6 && personaggio.position.x <= 52.5 )
					&& personaggio.position.z <= -44 && personaggio.position.z > -75  && personaggio.position.y == -0.45){
			personaggio.position.y -= 0.1;
			rafterRot = false;
			onGround3 = false;
			mov = false;
			manageMov3 = false;
		}
		
		if(personaggio.position.z <= -74.5){
			rafterRot = false;
		}
		
}

function makeMadara(){
	
	
	var madaraTexture = new THREE.TextureLoader().load('images/madaratexture.png');
	
	var visoMadara = new THREE.Object3D;
	loader.load('mod/visomadara.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraTexture});
		visoMadara.add(model);
		
	});
	madara.add(visoMadara);
	
	var capelliMadara = new THREE.Object3D;
	loader.load('mod/capellimadara.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraTexture});
		capelliMadara.add(model);
		
	});
	madara.add(capelliMadara);
	
	var cottacalzoniMadara = new THREE.Object3D;
	loader.load('mod/cottacalzonimadara5.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraTexture});
		cottacalzoniMadara.add(model);
		cottacalzoniMadara.position.set(0, 0.8, 0);
		
	});
	madara.add(cottacalzoniMadara);
	
	var cottaMadara = new THREE.Object3D;
	loader.load('mod/cottamadara.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraTexture});
		cottaMadara.add(model);
		
	});
	madara.add(cottaMadara);
	
	var sharinganMadara = new THREE.Object3D;
	var sharinganTexture = new THREE.TextureLoader().load('images/sharingan.jpg');
	loader.load('mod/sharingan.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:sharinganTexture});
		sharinganMadara.add(model);
		
	});
	madara.add(sharinganMadara);
	
	var sopracciglioMadara = new THREE.Object3D;
	loader.load('mod/sopraccigliomadara.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraTexture});
		sopracciglioMadara.add(model);
		
	});
	madara.add(sopracciglioMadara);
	
	
	var madaraBodyTexture = new THREE.TextureLoader().load('images/sp2.jpg');
	
	var troncoMadara = new THREE.Object3D;
	loader.load('mod/troncomadara.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		troncoMadara.add(model);
		
	});
	madara.add(troncoMadara);
	
	
	var madaraBracciaDX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	var madaraBraccioDX = new THREE.Object3D;
	loader.load('mod/braccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraBraccioDX.add(model);
		
		madaraBracciaDX.add(madaraBraccioDX);
		
	});
	

	var madaraAvambraccioDX = new THREE.Object3D;
	loader.load('mod/avambraccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraAvambraccioDX.add(model);
		madaraAvambraccioDX.position.set(0.2, -4.5, 0.8);
		
		madaraBracciaDX.add(madaraAvambraccioDX);
		madaraBracciaDX.position.set(-0.5, 1, 0);
		madaraBracciaDX.rotation.y = Math.PI;
		
	});
	madaraBracciaDX.scale.set(0.2, 0.2, 0.2);
	madara.add(madaraBracciaDX);
	
    var madaraBracciaSX = new THREE.Object3D; //per tutto il braccio(braccio + avambraccio)
	var madaraBraccioSX = new THREE.Object3D;
	loader.load('mod/braccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraBraccioSX.add(model);
		
		madaraBracciaSX.add(madaraBraccioSX);
	});
	
	
	var madaraAvambraccioSX = new THREE.Object3D;
	loader.load('mod/avambraccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraAvambraccioSX.add(model);
		madaraAvambraccioSX.position.set(-0.2, -4.5, 0.8);
		
		madaraBracciaSX.add(madaraAvambraccioSX);
		madaraBracciaSX.position.set(0.5, 1, 0);
		madaraBracciaSX.rotation.y = Math.PI;
	});
	madaraBracciaSX.scale.set(0.2, 0.2, 0.2);
	madara.add(madaraBracciaSX);
	
	var madaraGambeDX = new THREE.Object3D;
	var madaraGambaDX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraGambaDX.add(model);
	
		madaraGambeDX.add(madaraGambaDX);
	});
	
	
	var madaraStincoDX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraStincoDX.add(model);
		madaraStincoDX.position.set(0, -5.8, -1);
		
		madaraGambeDX.add(madaraStincoDX);
		madaraGambeDX.position.set(-0.2, 0, 0);
		madaraGambeDX.rotation.y = Math.PI;
	});
	madaraGambeDX.scale.set(0.2, 0.2, 0.2);
	madara.add(madaraGambeDX);
	
	var madaraGambeSX = new THREE.Object3D;
	var madaraGambaSX = new THREE.Object3D;
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraGambaSX.add(model);
		
		madaraGambeSX.add(madaraGambaSX);
		
	});
	
	var madaraStincoSX = new THREE.Object3D;
	loader.load('mod/stincoDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:madaraBodyTexture});
		madaraStincoSX.add(model);
		madaraStincoSX.position.set(0, -5.8, -1);
		
		madaraGambeSX.add(madaraStincoSX);
		madaraGambeSX.position.set(0.2, 0, 0);
		madaraGambeSX.rotation.y = Math.PI;
	});
	madaraGambeSX.scale.set(0.2, 0.2, 0.2);
	madara.add(madaraGambeSX);
	
	madara.scale.set(0.65, 0.65, 0.65);
	madara.position.set(50, -0.2, -135);
	madara.rotation.y = 0;

}

function creaShuriken(shu){
	
	var shurikenTexture = new THREE.TextureLoader().load('images/metallo1.jpg');

	loader.load('mod/shuriken.obj',function(model){
		model.scale.set(0.4, 0.4, 0.4);
		model.children[0].material = new THREE.MeshPhongMaterial({map:shurikenTexture});
		shu.add(model);
		
		var randomY = Math.random() * (0.5 - (-0.5)) + (-0.5);
		var randomX = Math.random() * (55.5 - (44.5)) + (44.5);
		shu.position.set(randomX, randomY, -140);
		shu.rotation.z = Math.PI/2;

	});
	room3.add(shu);
	
}

function finalHit(){
	
	countLife = countLife-1;
	soundHitMe.play();
	
	if(countLife == 0){
		goShurikens = false;
		camera.remove(saetta1);
		alert("You are dead. Try again!");
		death2 = true;
		restoreRoom3();
		
	}
	if(countLife==1){
		camera.remove(saetta2);
		
	}if(countLife==2){
		camera.remove(saetta3);
		
	}

}

function manageHitShuriken(){
	
	if(Math.abs(shuriken1.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken1.position.y - personaggio.position.y) <= 1 ){
			if(Math.abs(shuriken1.position.x - personaggio.position.x) <= 0.5 ){
				shuriken1.position.z = -150;
				finalHit();
			}
		}
	}if(Math.abs(shuriken2.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken2.position.y - personaggio.position.y) <= 0.7 ){
			if(Math.abs(shuriken2.position.x - personaggio.position.x) <= 0.5 ){
				shuriken2.position.z = -150;
				finalHit();
			}
		}
	}if(Math.abs(shuriken3.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken3.position.y - personaggio.position.y) <= 0.7 ){
			if(Math.abs(shuriken3.position.x - personaggio.position.x) <= 0.5 ){
				shuriken3.position.z = -150;
				finalHit();
			}
		}
	}if(Math.abs(shuriken4.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken4.position.y - personaggio.position.y) <= 0.7 ){
			if(Math.abs(shuriken4.position.x - personaggio.position.x) <= 0.5 ){
				shuriken4.position.z = -150;
				finalHit();
			}
		}
	}if(Math.abs(shuriken5.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken5.position.y - personaggio.position.y) <= 0.7 ){
			if(Math.abs(shuriken5.position.x - personaggio.position.x) <= 0.5 ){
				shuriken5.position.z = -150;
				finalHit();
			}
		}
	}if(Math.abs(shuriken6.position.z - personaggio.position.z) <= 1){
		if(Math.abs(shuriken6.position.y - personaggio.position.y) <= 0.7 ){
			if(Math.abs(shuriken6.position.x - personaggio.position.x) <= 0.5 ){
				shuriken6.position.z = -150;
				finalHit();
			}
		}
	}
	
	
}

function manageShuriken(){
	
		if(shu1){
			shuriken1.position.z += 1.8 +(personaggio.position.z/100);
			shuriken1.rotation.x += 1;
		}
		if(shu2){
			shuriken2.position.z += 1.8 +(personaggio.position.z/100);
			shuriken2.rotation.x += 1;
		}
		if(shu3){
			shuriken3.position.z += 1.8 +(personaggio.position.z/100);
			shuriken3.rotation.x += 1;
		}
		if(shu4){
			shuriken4.position.z += 1.8 +(personaggio.position.z/100);
			shuriken4.rotation.x += 1;
		}
		if(shu5){
			shuriken5.position.z += 1.8 +(personaggio.position.z/100);
			shuriken5.rotation.x += 1;
		}
		if(shu6){
			shuriken6.position.z += 1.8 +(personaggio.position.z/100);
			shuriken6.rotation.x += 1;
		}
		
		if(shuriken1.position.z > -70){
			shuriken1.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken1.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken1.position.z = -145;
		}
		if(shuriken2.position.z > -70){
			shuriken2.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken2.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken2.position.z = -145;
		}
		if(shuriken3.position.z > -70){
			shuriken3.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken3.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken3.position.z = -145;
		}
		if(shuriken4.position.z > -70){
			shuriken4.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken4.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken4.position.z = -145;
		}
		if(shuriken5.position.z > -70){
			shuriken5.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken5.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken5.position.z = -145;
		}
		if(shuriken6.position.z > -70){
			shuriken6.position.x = Math.random() * (55.5 - (44.5)) + (44.5);
			shuriken6.position.y = Math.random() * (0.5 - (-0.5)) + (-0.5);
			shuriken6.position.z = -145;
		}
	
}

function manageHitMadara(){
	
	if( (spadata1 || spadata2) && !hittingMadara ){
		if( Math.abs(madara.position.z - personaggio.position.z) < 2.5){
			if( Math.abs(madara.position.x - personaggio.position.x) < 2){
				if(personaggio.rotation.y == 0){
					if(spada1.rotation.x < -4){
						
						soundHitMadara.play();
						
						if(!hitMadara_1){
							hitMadara_1 = true;
							hittingMadara = true;
							camera.remove(lifeEnemy2);
						}
						else{
							hitMadara_2 = true;
							hittingMadara = true;
							camera.remove(lifeEnemy1);
							
							shuriken1.position.z = -70;
							shuriken2.position.z = -70;
							shuriken3.position.z = -70;
							shuriken4.position.z = -70;
							shuriken5.position.z = -70;
							shuriken6.position.z = -70;
						}
					}
				}
			}
		}
	}

	if(hitMadara_1 && hittingMadara && !hitMadara_2){
		
		personaggio.position.z += 0.3;
		camera.position.z += 0.3;
		
		if(personaggio.position.z >= -90){
			hittingMadara = false;

			Resetta_Posizioni_PG();
			upIsDown = false;
			downIsDown = false;
			leftIsDown = false;
			rightIsDown = false;
		}
		
	}
	if( hitMadara_2 && hittingMadara ){
			
		if(madara.position.y > -2){
			madara.rotation.z += 0.05;
			madara.position.y -= 0.1;
		}
		else{
			goShurikens = false;
			Resetta_Posizioni_PG();
			upIsDown = false;
			downIsDown = false;
			leftIsDown = false;
			rightIsDown = false;
			madaraDead = true;
			manageMov4 = false;
			room3.remove(madara);
			ora5 = Date.now();
		}
	}
	
	
}



window.onload = function init() {
	
		var canvasW = window.innerWidth *0.95; 
		var canvasH = window.innerHeight *0.90;
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( canvasW, canvasH );
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );
		
		scene = new THREE.Scene;
		
		camera = new THREE.PerspectiveCamera(
			45,
			canvasW/canvasH,
			0.1,
			1000
		);
		camera.position.set( 0, 2, 30 );  //0 2 30
		//camera.rotation.x = -0.03;
		scene.add( camera );	
		
		var light0 = new THREE.AmbientLight(0x555555, 1, 50);
		light0.position.set(0, 0, 0);
		scene.add(light0);
		
		room1 = new THREE.Object3D;
		room2 = new THREE.Object3D;
		room3 = new THREE.Object3D;
		
		loader = new THREE.OBJLoader();
		
		scene.add(room1);
		stanza1();
		
		makeBear();
		
		personaggio = new THREE.Object3D;
		makePG();
		scene.add(personaggio);
		
		
		kunai1 = new THREE.Object3D;
		kunai2 = new THREE.Object3D;
		kunai3 = new THREE.Object3D;
		kunai4 = new THREE.Object3D;
		kunai5 = new THREE.Object3D;
		kunai6 = new THREE.Object3D;
		kunai7 = new THREE.Object3D;
		kunai8 = new THREE.Object3D;
		
		creaKunai( kunai1, 6, 0, -11.4 );
		creaKunai( kunai2, 7, 0.56, -12);
		creaKunai( kunai3, 6, -0.56, -12 );
		creaKunai( kunai4, 7, 0, -12.6 );
		creaKunai( kunai5, -7, 0, -18.4 );
		creaKunai( kunai6, -6, 0.56, -19 );
		creaKunai( kunai7, -7, -0.56, -19 );
		creaKunai( kunai8, -6, 0, -19.6 );
		kunai5.rotation.z = -Math.PI/2;
		kunai6.rotation.z = -Math.PI/2;
		kunai7.rotation.z = -Math.PI/2;
		kunai8.rotation.z = -Math.PI/2;
		
		
		soundtrack1 = new Audio("sound/soundtrackRoom.mp3");
		soundtrack1.loop = true;
		soundtrack1.volume = 0.6;
		
		soundtrackMadara = new Audio("sound/soundtrackMadara.mp3");
		soundtrackMadara.loop = true;
		soundtrackMadara.volume = 0.85;
		
		
		soundFootstep = new Audio("sound/footstep.wav");
		soundFootstep.loop = true;
		soundFootstep.volume = 0.4;
		
		soundKunai1 = new Audio("sound/soundKunai.mp3");
		
		soundKunai2 = new Audio("sound/soundKunai.mp3");
		
		soundTotems = new Audio("sound/soundTotems.mp3");
		soundTotems.loop = true;
		
		soundCheckPoint = new Audio("sound/soundCheckpoint.mp3");
		
		soundFalling = new Audio("sound/falling.mp3");
		
		soundRafter = new Audio("sound/soundRafter.mp3");
		soundRafter.loop = true;
		
		soundHitMe = new Audio("sound/ouch.mp3");
		
		soundHitBear = new Audio("sound/soundHitBear.mp3");
		soundHitBear.volume = 0.7;
		
		soundShuriken = new Audio("sound/soundShurikens.wav");
		soundShuriken.loop = true;
		
		soundHitMadara = new Audio("sound/soundMadaraPain.mp3");
		
		soundBlow = new Audio("sound/sword1.mp3");
		soundBlow.volume = 0.5;
		soundBlow2 = new Audio("sound/sword2.mp3");
		soundBlow2.volume = 0.5;
		
		
		render();
};
	

	
function render() {
	
	
	if(personaggio.position.z > 20 && !starting){
		personaggio.position.z -= 0.15;
		moveLimbs();
	}
	if(personaggio.position.z <= 20 && !starting){
		starting = true;
		
		Resetta_Posizioni_PG();
		upIsDown = false;
		downIsDown = false;
		leftIsDown = false;
		rightIsDown = false;
		
		alert(" ! YOU ARE ALMOST THERE ! \n \n-Use 'ARROW KEYS' to move around \n-Be CAREFUL with the environment \n-Use 'A' to jump \n-Use 'Z' or 'Z+X' for hitting a blow to BIG BEAR\n-Hit it TWICE to take it down \n  (you have only two lifepoints) \n\nPressing 'M' or 'N' you can skip some threats");
		soundtrack1.play();
		manageMov1 = true;
	}
	
	fendente();
	
	if(!deadBabyBear)
		manageBabyBear();

	if(!deadBear)
		manageBear();
	
	if(manageMov2){
		manageTotems();
		manageTotems2();
		
		if(personaggio.position.distanceTo(checkpoint.position) < 0.8 ){
			manageMov2 = false;
			stanza3();
			scene.add(room3);
			checkpointDeath = true;
			soundTotems.pause();
			soundCheckPoint.play();
		}
		
	}
	
	
	if(checkpointDeath){
		if(checkpoint.position.y > -3)
			checkpoint.position.y -= 0.1;
		else{
			room2.remove(checkpoint);
			checkpointDeath = false;
			startRoom3 = true;
			room2.remove(room2.children[3]);
			alert("CheckPoint!");
			var nt = new THREE.TextureLoader().load('images/metallo4.png');
			lifeEnemy1.children[0].children[0].material = new THREE.MeshBasicMaterial({map:nt});
			lifeEnemy2.children[0].children[0].material = new THREE.MeshBasicMaterial({map:nt});
		}
	}
	
	if(startRoom3){
		if( camera.position.x < 50 ){
			camera.position.x += 0.08;
			camera.position.z += 0.07;
			camera.rotation.y += 0.01;
		}
		else{
			camera.position.set(50, 2, -25);
			camera.rotation.y = 0;
		
			rafterRot = true;
			manageMov3 = true;
			scene.remove(room2);
			startRoom3 = false;
			checkpointChecked = true;
			soundRafter.play();
		}
	}
	
	
	if(rafterRot)
		manageRotationRafter()
		
	if(movPlatform)
		animPlatform();
		
	
	if(manageMov1){
		manageMovs1();
		controllokunai();
		manageLuxina();
	}
	else if(manageMov2){
		manageMovs2();
	}
	else if(manageMov3){
		manageMovs3();
	}
	else if(manageMov4 && !hittingMadara){
		manageMovs4();
	}
	
	
	
	
	var c = controllaPosizione();
	
	var limit;
	if(c){
		limit = -10;
		onGround1 = false;
	}
	else{
		onGround1 = true;
		limit = -0.45;
	}
	if(personaggio.position.y < -0.5)
		mov= false;
	
	if(mov){
		if(aIsDown && !salto && !saltato) {
			salto = true; //posso saltare
			saltato = true;
		}
		if(salto && aIsDown){
			if(personaggio.position.y >= 2){
				salto = false;
				aIsDown = false;
			}else
				personaggio.position.y += 0.15;
		
		}
		else if( ( !aIsDown || !salto ) && personaggio.position.y > limit ){
			salto = false;
			personaggio.position.y -= 0.1;
			if(personaggio.position.y < -0.45 && onGround1){
				personaggio.position.y = -0.45;
				saltato = false;
			}
		}
	}
	else if(!onGround1 || !onGround2 || !onGround3){
		soundFalling.play();
		personaggio.position.y -= 0.1;
		manageMov1 = false;
		manageMov2 = false;
		manageMov3 = false;
		if(personaggio.position.y < -3)
			death = true;
	}
	if(death && !dead){
		if(checkpointChecked){
			restoreRoom3();
		}
		else{
			alert("Death. Try again!");
			dead=true;
			location.href = "levelP.html";
		}
	}
	
	
	
	if( manageMov1 && personaggio.position.distanceTo(platform.position) < 1.5){
		movPlatform = true;
		manageMov1 = false;
		room1.remove(li1);
		stanza2();
		scene.add(room2);
		timeTotem1 = Date.now();
		timeTotem2 = Date.now();
		timeTotem3 = Date.now();
		timeTotem4 = Date.now();
		timeTotem5 = Date.now();
		timeTotem6 = Date.now();
		manageTotem1 = true;
		manageTotem2 = true;
		manageTotem3 = true;
		manageTotem4 = true;
		manageTotem5 = true;
		manageTotem6 = true;
	}
	else if(personaggio.position.z < -26.5 && personaggio.position.z >= -40 && !movPlatform && 
				personaggio.position.y <= -0.45 && personaggio.position.x <= 5 ){
		mov = false;
		onGround2 = false;
	}
	
	
	
	if(personaggio.position.z <= -75 && finalAnim){  //surpassing the rafter
		personaggio.position.z -= 0.08;
		camera.position.z -= 0.08;
		manageMov3 = false;
		moveLimbs();
		if(personaggio.position.z <= -80){
			finalAnim = false;
			
			soundtrack1.pause();
			soundRafter.pause();
			soundtrackMadara.play();
			
			if(!death2){
				shuriken1 = new THREE.Object3D;
				shuriken2 = new THREE.Object3D;
				shuriken3 = new THREE.Object3D;
				shuriken4 = new THREE.Object3D;
				shuriken5 = new THREE.Object3D;
				shuriken6 = new THREE.Object3D;
				
				alert("Your enemy is close to the treasure.\nAvoid the SHURIKEN and hit him TWICE at the right moment!");
				ora2 = Date.now();
			}
			else{
				
				alert("Your enemy is close to the treasure.\nAvoid the SHURIKEN and hit him TWICE at the right moment!");
				madara.children[7].rotation.z = 1;
				madara.children[8].rotation.z = -1;
		
				ora3 = Date.now();
				
			}
			
			Resetta_Posizioni_PG();
			upIsDown = false;
			downIsDown = false;
			leftIsDown = false;
			rightIsDown = false;
			
			manageMov4 = true;
			goShurikens = true;
			countLife = 3;
			camera.add(saetta1);
			camera.add(saetta2);
			camera.add(saetta3);
			camera.add(lifeEnemy1);
			camera.add(lifeEnemy2);
	
		}
	}
	
	if(!shu6){
		var currentTime1 = Date.now();
		if(currentTime1 - ora2 >= 1500){
			ora2 = currentTime1;
			if(!shu1){
				shu1 = true;
				creaShuriken(shuriken1);    
				madara.children[7].rotation.z = 1;
				madara.children[8].rotation.z = -1;
				soundShuriken.play();
			}
			else if(!shu2){
				shu2 = true;
				creaShuriken(shuriken2);
			}
			else if(!shu3){
				shu3 = true;
				creaShuriken(shuriken3); 
			}
			else if(!shu4){
				shu4 = true;
				creaShuriken(shuriken4); 
			}
			else if(!shu5){
				shu5 = true;
				creaShuriken(shuriken5); 
			}
			else if(!shu6){
				shu6 = true;
				creaShuriken(shuriken6);
				ora3 = Date.now();
			}
		}
	}
	
	var currentTime2 = Date.now();
	if(currentTime2 - ora3 >= 15000 && goShurikens && !madaraDead && !finalAnim){
		goShurikens = false;
		room3.remove(barrier);
		soundShuriken.pause();
		soundtrackMadara.pause();
		
		madara.children[7].rotation.z = 0;
		madara.children[8].rotation.z = 0;
		
		shuriken1.position.z = -150;
		shuriken2.position.z = -157;
		shuriken3.position.z = -164;
		shuriken4.position.z = -171;
		shuriken5.position.z = -178;
		shuriken6.position.z = -185;
		
		ora4 = Date.now();
	}
	
	var currentTime3 = Date.now();
	if(currentTime3 - ora4 >= 5000 && !goShurikens && !madaraDead && !finalAnim){
		goShurikens = true;
		hittingMadara = false;
		room3.add(barrier);
		soundShuriken.play();
		soundtrackMadara.play();
		
		ora3 = Date.now();
		madara.children[7].rotation.z = 1;
		madara.children[8].rotation.z = -1;
		
	}
	
	
	if(goShurikens && !madaraDead){	
		manageHitShuriken();
		manageShuriken();
	}
	
	
	if(!goShurikens && manageMov4)
		manageHitMadara();
	
		
	if(madaraDead){
		var currentTime4 = Date.now();
		if(currentTime4 - ora5 > 2000){
			personaggio.position.z -= 0.1;
			moveLimbs();
		}
	}
	
	if(personaggio.position.z <= -153)
		location.href = "outro.html";
	
	
	
	
	
	
	if(mIsDown){
		scene.remove(room1);
		stanza2();
		scene.add(room2);
		camera.position.set(4.5, 2, -35);
		camera.rotation.y = -Math.PI/2;
		personaggio.position.set(15, -0.45, -35);
	
		manageMov1 = false;
		manageMov2 = true;
		deadBear = true;
		camera.remove(saetta1);
		camera.remove(saetta2);
		camera.remove(lifeEnemy1);
		camera.remove(lifeEnemy2);
		
		timeTotem1 = Date.now();
		timeTotem2 = Date.now();
		timeTotem3 = Date.now();
		timeTotem4 = Date.now();
		timeTotem5 = Date.now();
		timeTotem6 = Date.now();
		manageTotem1 = true;
		manageTotem2 = true;
		manageTotem3 = true;
		manageTotem4 = true;
		manageTotem5 = true;
		manageTotem6 = true;
		mov = true;
		movPlatform = false;
		
		aIsDown = false; 
		mIsDown = false; 
		salto = false;
		saltato = false;
		
		alert("-Be CAREFUL with the Totems \n-Wait the right moment to hit them with a BLOW");
		
		Resetta_Posizioni_PG();
		upIsDown = false;
		downIsDown = false;
		leftIsDown = false;
		rightIsDown = false;
		
		soundKunai1.volume = 0.01;
		soundKunai2.volume = 0.01;
		soundKunai1.pause();
		soundKunai2.pause();
		soundTotems.play();
	}
	
	
	
	
	
	if(nIsDown){
		
		personaggio.rotation.y = 0;
		personaggio.position.set(50, -0.45, -35);
		
		camera.position.set(50, 2, -25);
		camera.rotation.y = 0;
		
		rafterRot = true;
		soundRafter.play();
		mov = true;
		manageMov1 = false;
		manageMov2 = false;
		manageMov4 = false;
		manageMov3 = true;
		checkpointChecked = true;
		
		deadBear = true;
		deadBabyBear = true;
		
		scene.remove(room1);
		scene.remove(room2);
		
		camera.remove(saetta1);
		camera.remove(saetta2);
		camera.remove(lifeEnemy1);
		camera.remove(lifeEnemy2);
		var nt = new THREE.TextureLoader().load('images/metallo4.png');
		lifeEnemy1.children[0].children[0].material = new THREE.MeshBasicMaterial({map:nt});
		lifeEnemy2.children[0].children[0].material = new THREE.MeshBasicMaterial({map:nt});
		
		stanza3();
		scene.add(room3);
		
		soundKunai1.volume = 0.01;
		soundKunai2.volume = 0.01;
		soundTotems.volume = 0.01;
		soundKunai1.pause();
		soundKunai2.pause();
		soundTotems.pause();
		
	}


	//scene.simulate(); // run physics
	renderer.render( scene, camera); // render the scene
	requestAnimationFrame( render );
}

function onDocumentKeyDown(event){
		switch(event.keyCode){
				case 37:  leftIsDown  =true; break;
				case 38:  upIsDown    =true; break;
				case 39:  rightIsDown =true; break;
				case 40:  downIsDown  =true; break;
				
				case 90: zIsDown = true; break;
				case 88: xIsDown = true; break;
				case 65: aIsDown = true; break;
				case 77: mIsDown = true; break;
				case 78: nIsDown = true; break;
				
		}
}

function onDocumentKeyUp( event ) {
		switch( event.keyCode ) {
				case 37:  leftIsDown  = false; Resetta_Posizioni_PG(); break;
				case 38:  upIsDown    = false; Resetta_Posizioni_PG(); break;
				case 39:  rightIsDown = false; Resetta_Posizioni_PG(); break;
				case 40:  downIsDown  = false; Resetta_Posizioni_PG(); break;
		
				case 90: zIsDown = false; break;
				case 88: xIsDown = false; break;
				case 65: aIsDown = false; break;
				case 77: mIsDown = false; break;
				case 78: nIsDown = false; break;
				
		}
}
