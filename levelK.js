var personaggio, invisibleBox;

var testa, tronco,
	braccioDX, braccioSX, 
	avambraccioDX, avambraccioSX, 
	gambaDX, gambaSX, 
	stincoDX, stincoSX,
	bracciaDX, bracciaSX, 
	gambeDX, gambeSX;

var geometry, material;
var camera, scene, renderer, loader;
var texture, texture1, texture2, textureButton;

var ambientLight,spotLight, spotLightObj; 
var light1, light2, light3, light4, light5, buttonLight, floor5Light, floor6Light, floor7Light, floor9Light;
var laser1Light, laser2Light, laser3Light, laser4Light, laser5Light, laser6Light, laser7Light, laser8Light;
var fire1Light, fire2Light, fire3Light, fire4Light,  mainfireLight,  mainfireFakeLight,  fire5Light;0

var traptex, trap1, trap2, trap3, trap4, trap5, trap6;
var lasertex, laser1, laser2, laser3, laser4, laser5, laser6, laser7, laser8;
var firetex, mainfire, mainfireFake;
var statuetex, statue1, statue2, statue3, statue4, key, keyFound=false, doorOpen = false;
var invisibleStatue1, invisibleStatue2, invisibleStatue3, invisibleStatue4;
var randomLaser = [], randomNumber = [];
var button, buttonWall;

var floor1, roof, wallSx1, wallDx1;
var floor2, wallSx2, wallDx2;
var floor3, wallSx3, wallDx3;
var floor4, wallSx4, wallDx4;
var floor5, floor6;
var floor7, floor8, wallSx8, wallDx8;
var floor9, stick1, stick2,wallSx9, wallDx9;
var floor10, wallSx10, wallDx10, wallSx11, wallDx11, wallSx12, wallDx12;
var lastDoor, doorLock ,lastFloor;

var rotationLimbs=0.03;

var room1 = true, room2 = true, room3 = true, roomPlatform = true, greenPlatforms = false, room4 = true, room5 = true;
var roomOne, roomTwo, roomThree, roomPlat, roomFour, roomFive;

var alert1 = true, alert2 = true, alert3 = true, alert4= true, alert5 = true, alert6 = true, alert7 = true, alert8 = true;
var soundtrack, soundButton, soundFootstep, soundFalling, soundHit, soundKey, audioLoader;

var canvasW=window.innerWidth/1.01, canvasH=window.innerHeight/1.05;
document.addEventListener( 'keydown', onDocumentKeyDown, false );
document.addEventListener( 'keyup', onDocumentKeyUp, false );
document.getElementById("skipLevel").onclick = function(){location.href = "levelP.html";};

Physijs.scripts.worker = 'utils/physijs_worker.js';
Physijs.scripts.ammo = 'Physijs/ammo.js';

var leftIsDown  = false,
	upIsDown    = false,
	rightIsDown = false,
	downIsDown  = false,

	wIsDown = false,
	aIsDown = false,
	dIsDown = false,
	sIsDown = false,

	oneIsDown = false,
	twoIsDown = false;

var start = true, floor5tween, floor5Tween2, floor6Tween, floor6Tween2;
var start2 = true, laser1Tween, laser2Tween, laser3Tween, laser4Tween, laser5Tween, laser6Tween, laser7Tween, laser8Tween;
var laser1Tween2, laser2Tween2, laser3Tween2, laser4Tween2, laser5Tween2, laser6Tween2, laser7Tween2, laser8Tween2;
var armSxTween, armSxTween2;
var floor5Green = false, floor5Red = false, floor6Green = false, floor6Red = false;

//
//-------------------------------------------------------- INIT FUNCTION -------------------------------------------------------- //
//

window.onload = function init() {
	
		renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize( canvasW, canvasH );
		document.getElementById( 'viewport' ).appendChild( renderer.domElement );
		
		//scene = new THREE.Scene;
		scene = new Physijs.Scene;
		scene.setGravity(new THREE.Vector3(0,-100,0))
		roomOne = new THREE.Group;
		roomTwo = new THREE.Group;
		roomThree = new THREE.Group;
		roomPlat = new THREE.Group;
		roomFour = new THREE.Group;
		roomFive = new THREE.Group;

		var listener = new THREE.AudioListener();

		camera = new THREE.PerspectiveCamera(
			45,
			canvasW/canvasH,
			0.1,
			1000
		);
		camera.position.set( 0, 2, 3.9 );
		camera.rotation.x = -0.283;
		camera.add( listener );
		scene.add( camera );

		
		personaggio = new THREE.Object3D;
		trap1 = new THREE.Object3D;
		trap2 = new THREE.Object3D;
		trap3 = new THREE.Object3D;
		trap4 = new THREE.Object3D;
		trap5 = new THREE.Object3D;
		trap6 = new THREE.Object3D;

		statue1 = new THREE.Object3D;
		statue2 = new THREE.Object3D;
		statue3 = new THREE.Object3D;
		statue4 = new THREE.Object3D;

		mainfire = new THREE.Object3D;
		mainfireFake = new THREE.Object3D;
		key = new THREE.Object3D;

		soundtrack = new THREE.Audio( listener );
		soundButton = new THREE.Audio( listener );
		soundFootstep = new THREE.Audio( listener );
		soundFalling = new THREE.Audio( listener );
		soundHit = new THREE.Audio( listener );
		soundKey = new THREE.Audio( listener );

		audioLoader = new THREE.AudioLoader();
		audioLoader.load( 'sound/soundtrack_levelk.mp3', function( buffer ) {
			soundtrack.setBuffer( buffer );
			soundtrack.setLoop( true );
			soundtrack.setVolume( 0.2 );
			soundtrack.play();
		});

		audioLoader.load( 'sound/footstep.wav', function( buffer ) {
			soundFootstep.setBuffer( buffer );
			soundFootstep.setVolume( 0.5 );
		});

		audioLoader.load( 'sound/button.wav', function( buffer ) {
			soundButton.setBuffer( buffer );
			soundButton.setVolume( 0.4 );
		});

		audioLoader.load( 'sound/falling.mp3', function( buffer ) {
			soundFalling.setBuffer( buffer );
			soundFalling.setVolume( 0.3 );
		});

		audioLoader.load( 'sound/ouch.mp3', function( buffer ) {
			soundHit.setBuffer( buffer );
			soundHit.setVolume( 1.0 );
		});
		
		audioLoader.load( 'sound/keys.wav', function( buffer ) {
			soundKey.setBuffer( buffer );
			soundKey.setVolume( 1.0 );
		});
		
		character();
		scene.add(personaggio);
		//camera.lookAt( personaggio.position );

		createRooms();
		createObstacles();
		tweenAnimation();
		addLights();
		ambientLight = new THREE.AmbientLight(0xaaaaaa, 1, 50);
		//scene.add(ambientLight);
		
		setTimeout(function(){alert(" !! FIND A WAY TO GET OUT !! \n \n-Use 'ARROW KEYS' to move around \n-Use 'W,A,S,D' to move the spotlight \n-Be CAREFUL with the environment \n\nGood luck..");
		},800);
		
		render();
};

//
//-------------------------------------------------------- RENDER -------------------------------------------------------- //
//

function render() {
	if(aIsDown){
		if(spotLight.target.position.x > -1.5 ){
			spotLight.target.position.x -= 0.1;
		}
	}
	if(dIsDown){
		if(spotLight.target.position.x < 1.5 ){
			spotLight.target.position.x += 0.1;
		}
	}
	if(wIsDown){
		if(spotLight.target.position.y < -1.3 ){
			spotLight.target.position.y += 0.1;
		}
	}
	if(sIsDown){
		if(spotLight.target.position.y > -3 ){
			spotLight.target.position.y -= 0.1;
		}
	}
	if(personaggio.position.z > -12.7 ){
		room1Mov();
	}
	if(personaggio.position.z < -12.7 && room2){
		scene.remove(roomOne);
		room2Mov();
	}
	if(personaggio.position.z < -26.6 && room3 ){
		room2 = false;
		scene.remove(roomTwo);
		floor5Light.position.set(floor5.position.x, floor5.position.y + 1, floor5.position.z); //The lights update dinamically their position following the platforms
		floor6Light.position.set(floor6.position.x, floor6.position.y + 1, floor6.position.z);
		if(start){				//Avoiding strange loop behaviours
			floor5Tween.start();
			floor6Tween.start();
			start = false;
		}
		
		if(personaggio.position.z < -31 && personaggio.position.x > 1.7 && personaggio.position.x < 2.3){	
			personaggio.rotation.y = 0;
			if(alert1){
				setTimeout(function(){
					alert("Try to align the three platforms by using number 2 (farthest platform) and 1 (nearest platform) to stop them. If the alignment is good the platforms will turn green, otherwise they'll turn red. YOU HAVE ONLY ONE CHANCE, BE CAREFUL ");
				},2000);
				alert1=false;
			}
			if(!greenPlatforms){
				roomPlatformMov();
			}
			else room3Mov();
		}
		else room3Mov();
	}

	if(personaggio.position.z < -32 && roomPlatform){
		room3=false;
		scene.remove(roomThree);
		spotLightObj.remove(spotLight);
		spotLightObj.remove(spotLight.target);
		spotLightObj.visible= false;
		scene.remove(spotLightObj);
		roomTraversePlatform();
	}

	if(personaggio.position.z < -43.8 && room4){
		if(start2){				//Avoiding strange loop behaviours
			laser1Tween.start();
			laser2Tween.start();
			laser3Tween.start();
			laser4Tween.start();
			laser5Tween.start();
			laser6Tween.start();
			laser7Tween.start();
			laser8Tween.start();
			start2 = false;
		}
		room3 = false;
		roomPlatform = false;
		scene.remove(roomPlat);
		laser1Light.position.set(laser1.position.x, laser1.position.y , laser1.position.z + 0.3); //As said, the lights change their position, depending on the laser object
		laser2Light.position.set(laser2.position.x, laser2.position.y , laser2.position.z + 0.3);
		laser3Light.position.set(laser3.position.x, laser3.position.y , laser3.position.z + 0.3);
		laser4Light.position.set(laser4.position.x, laser4.position.y , laser4.position.z + 0.3);
		laser5Light.position.set(laser5.position.x, laser5.position.y , laser5.position.z + 0.3);
		laser6Light.position.set(laser6.position.x, laser6.position.y , laser6.position.z + 0.3);
		laser7Light.position.set(laser7.position.x, laser7.position.y , laser7.position.z + 0.3);
		laser8Light.position.set(laser8.position.x, laser8.position.y , laser8.position.z + 0.3);
		room4Mov();
	}
	if(personaggio.position.z < -55.5 && room5){
		room4 = false;
		roomTraverse4();
	}
	if (personaggio.position.z < -59) {
		room5 = false;
		if(camera.fov < 60){
			camera.fov += 1;
		}
		room5Mov();
		camera.position.set( 0, 2, personaggio.position.z + 4 );
		camera.updateProjectionMatrix();
		scene.remove(roomFour);
		braccioDX.add(mainfire);
		mainfireLight.position.set(personaggio.position.x + 0.1 , personaggio.position.y + 1 , personaggio.position.z + 0.15);
		//roomFive.remove(mainfireFakeLight);
		roomFive.remove(mainfireFake);
		bracciaDX.rotation.x = 1;
		
	}
	if(personaggio.position.z < -72){
		location.href = "levelP.html";
	}
	//console.log(['xpos= ',personaggio.position.x,'zpos= ',personaggio.position.z]);
	TWEEN.update();
	scene.simulate();
	renderer.render( scene, camera); // render the scene
	requestAnimationFrame( render );
}

//
//-------------------------------------------------------- MOVEMENTS & ANIMATION -------------------------------------------------------- //
//

function moveLimbs(){	//Character limbs movement in the environment
	bracciaSX.rotation.x -= rotationLimbs;
	bracciaDX.rotation.x += rotationLimbs;
	gambeSX.rotation.x += rotationLimbs;
	gambeDX.rotation.x -= rotationLimbs;
				
	if(gambeSX.rotation.x > 0.5 || gambeDX.rotation.x > 0.5) {rotationLimbs = -rotationLimbs;}
	soundFootstep.play();
}

function moveLimbsRoom5(){	//Character limbs movement in the last room (right arm is static)
	bracciaSX.rotation.x -= rotationLimbs;
	gambeSX.rotation.x += rotationLimbs;
	gambeDX.rotation.x -= rotationLimbs;
				
	if(gambeSX.rotation.x > 0.5 || gambeDX.rotation.x > 0.5) {rotationLimbs = -rotationLimbs;}
	soundFootstep.play();
}

function room1Mov(){	//Character movement in the first room (only one trap)
	
	if(rightIsDown && upIsDown==false && downIsDown==false){	//Avoids diagonal movements
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x - wallDx1.position.x < -0.7){	//Avoids objects intersections
			personaggio.position.x += 0.05;
			spotLightObj.position.x += 0.05;
			camera.position.x += 0.05;
		}
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x - wallSx1.position.x > 0.7){
			personaggio.position.x -= 0.05;
			spotLightObj.position.x -= 0.05;
			camera.position.x -= 0.05;
		}
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){

		personaggio.rotation.y = 0;
		personaggio.position.z -= 0.05;
		spotLightObj.position.z -= 0.05;
		camera.position.z -= 0.05;
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < 2){
			personaggio.position.z += 0.05;
			spotLightObj.position.z += 0.05;
			camera.position.z += 0.05;
		}
		moveLimbs();
	}

	if (personaggio.position.distanceTo(trap1.position) < 1.7) {
		soundHit.play();
		setTimeout(function(){ if(alert3){alert("DEAD");alert3 = false;location.reload();} },150);
	}
}

function room2Mov(){	//Character movement in the second room (all the traps)
	
	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x - wallDx2.position.x < -1.3 || personaggio.position.x - wallDx3.position.x < -1.3){
			personaggio.position.x += 0.05;
			spotLightObj.position.x += 0.05;
			camera.position.x += 0.05;
		}
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x - wallSx2.position.x > 1.5 || personaggio.position.x - wallSx3.position.x > 1.5){
			personaggio.position.x -= 0.05;
			spotLightObj.position.x -= 0.05;
			camera.position.x -= 0.05;
		}
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		personaggio.position.z -= 0.05;
		spotLightObj.position.z -= 0.05;
		camera.position.z -= 0.05;
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -12.8){
			personaggio.position.z += 0.05;
			spotLightObj.position.z += 0.05;
			camera.position.z += 0.05;
		}
		moveLimbs();

	}

	if (personaggio.position.distanceTo(trap1.position) < 1.95 || //Checks if the character's object collides with the traps
		personaggio.position.distanceTo(trap2.position) < 1.95 ||
		personaggio.position.distanceTo(trap3.position) < 1.95 ||
		personaggio.position.distanceTo(trap4.position) < 1.95 ||
		personaggio.position.distanceTo(trap5.position) < 1.95 ||
		personaggio.position.distanceTo(trap6.position) < 1.95 ) {
		soundHit.play();
		setTimeout(function(){ if(alert4){alert("DEAD");alert4 = false;location.reload();} },150);
	}

	if ((personaggio.position.x > 2.5 && personaggio.position.z < -23.5) || (personaggio.position.x < -2.5 && personaggio.position.z < -23.5)) {	//Checks if the character falls from the boardwalk
			personaggio.position.y -= 0.5;
			spotLightObj.position.y -= 1;
			soundFalling.play();
			if(personaggio.position.y < -4){
				setTimeout(function(){ if(alert5){alert("DEAD");alert5 = false;location.reload();}},400);
			}
		}
}

function room3Mov(){ 	//Character movement in the third room before the moving platforms
	
	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x - wallDx4.position.x < -0.7 ){
			personaggio.position.x += 0.05;
			spotLightObj.position.x += 0.05;
			camera.position.x += 0.05;
		}
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x - wallSx4.position.x > 0.7 ){
			personaggio.position.x -= 0.05;
			spotLightObj.position.x -= 0.05;
			camera.position.x -= 0.05;
		}
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		if(!greenPlatforms){
			if (personaggio.position.z > -31){
				personaggio.position.z -= 0.05;
				spotLightObj.position.z -= 0.05;
				camera.position.z -= 0.05;
			}
		}
		else{
			if (personaggio.position.z > -32){
				personaggio.position.z -= 0.05;
				spotLightObj.position.z -= 0.05;
				camera.position.z -= 0.05;
			}
		}
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -26.7){
			personaggio.position.z += 0.05;
			spotLightObj.position.z += 0.05;
			camera.position.z += 0.05;
		}
		moveLimbs();
	}

}

function roomPlatformMov(){ 	//Character movement during the platform alignment interaction
	if(camera.position.x > 0.0){
		camera.position.x -= 0.1;
	}
	if(floor5Green && floor6Green){
		greenPlatforms = true;
		camera.position.x = personaggio.position.x;
	}
	if((floor5Red && floor6Red) || (floor5Green && floor6Red) || (floor5Red && floor6Green)){
		setTimeout(function(){ if(alert8){alert("YOU FAILED");alert8 = false;location.reload();} }, 500);
	}

	if(oneIsDown){
		soundButton.play();
		floor5Tween.stop();
		armSxTween.start();
		if(floor5.position.x < 0.2 && floor5.position.x > -0.2){
			floor5.material.color.setHex(0x00ff00);
			floor5Green = true;
		}
		else{
			floor5.material.color.setHex(0xff0000);
			floor5Red = true;
		}
	}
	if(twoIsDown){
		soundButton.play();
		floor6Tween.stop();
		armSxTween.start();
		if(floor6.position.x < 0.2 && floor6.position.x > -0.2){
			floor6.material.color.setHex(0x00ff00);
			floor6Green = true;
		}
		else{
			floor6.material.color.setHex(0xff0000);
			floor6Red = true;
		}
	}
}

function roomTraversePlatform(){ 	//Character movement on the aligned platform

	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		personaggio.position.x += 0.05;
		camera.position.x += 0.05;
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		personaggio.position.x -= 0.05;
		camera.position.x -= 0.05;
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		personaggio.position.z -= 0.05;
		camera.position.z -= 0.05;
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -32.1){
			personaggio.position.z += 0.05;
			camera.position.z += 0.05;
		}	
		moveLimbs();
	}	
	if ((personaggio.position.x > 1.8 && personaggio.position.z < -31.2) || (personaggio.position.x < -1.8 && personaggio.position.z < -31.2)) {
			personaggio.position.y -= 0.5;
			soundFalling.play();
			if(personaggio.position.y < -4){
				setTimeout(function(){ if(alert6){alert("DEAD");alert6 = false;location.reload();} },400);	//Falling from boardwalk
			}
		}
}

function room4Mov(){ 	//Character movement in the fourth room (lasers)
	
	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x - wallDx8.position.x < -1 ){
			personaggio.position.x += 0.05;
			camera.position.x += 0.05;
		}
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x - wallSx8.position.x > 1 ){
			personaggio.position.x -= 0.05;
			camera.position.x -= 0.05;
		}
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		if(personaggio.position.z - wallSx9.position.z > 1){
			personaggio.position.z -= 0.05;
			camera.position.z -= 0.05;
		}
		if(personaggio.position.z < -55.2 && personaggio.position.x > -0.3 && personaggio.position.x < 0.3){
			personaggio.position.z -= 0.05;
			camera.position.z -= 0.05;
		}
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -43.9){
			personaggio.position.z += 0.05;
			camera.position.z += 0.05;
		}
		moveLimbs();
	}
	if(	personaggio.position.distanceTo(laser1.position) < 0.4 || //Checks if the character's object collides with the lasers
		personaggio.position.distanceTo(laser2.position) < 0.4 ||
		personaggio.position.distanceTo(laser3.position) < 0.4 ||
		personaggio.position.distanceTo(laser4.position) < 0.4 ||
		personaggio.position.distanceTo(laser5.position) < 0.4 ||
		personaggio.position.distanceTo(laser6.position) < 0.4 ||
		personaggio.position.distanceTo(laser7.position) < 0.4 ||
		personaggio.position.distanceTo(laser8.position) < 0.4 ){
		soundHit.play();
		setTimeout(function(){ if(alert7){alert("DEAD");alert7 = false;location.reload();} },150);
	}
}

function roomTraverse4(){ 	//Character movement on the boardwalk

	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x < 0.3 ){
			personaggio.position.x += 0.05;
			camera.position.x += 0.05;
		}
		moveLimbs();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x > -0.3 ){
			personaggio.position.x -= 0.05;
			camera.position.x -= 0.05;
		}
		moveLimbs();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		if(personaggio.position.z > -71){
			personaggio.position.z -= 0.05;
			camera.position.z -= 0.05;
		}
		moveLimbs();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -59){
			personaggio.position.z += 0.05;
			camera.position.z += 0.05;
		}
		moveLimbs();
	}
}

function room5Mov(){ //Character movement in the fifth and last room (statues)

	if(rightIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = -Math.PI/2;
		if(personaggio.position.x - wallDx11.position.x < -0.7 ){
			invisibleBox.position.x += 0.05;
			//camera.position.x += 0.05;
		}
		moveLimbsRoom5();
	}
	if(leftIsDown && upIsDown==false && downIsDown==false){
		personaggio.rotation.y = Math.PI/2;
		if(personaggio.position.x - wallSx11.position.x > 0.7 ){
			invisibleBox.position.x -= 0.05;
			//camera.position.x -= 0.05;
		}
		moveLimbsRoom5();
	}
	if(upIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = 0;
		if(personaggio.position.z > -71 && !keyFound){
			invisibleBox.position.z -= 0.05;
			//camera.position.z -= 0.05;
		}
		else if(personaggio.position.z > -71 && keyFound){
			invisibleBox.position.z -= 0.05;
			//camera.position.z -= 0.05;
		}
		else if(personaggio.position.z > -75 && keyFound && doorOpen && personaggio.position.x > -2.5 && personaggio.position.x < 2.5){
			invisibleBox.position.z -= 0.05;
		}
		moveLimbsRoom5();
	}
	if(downIsDown && leftIsDown==false && rightIsDown==false){
		personaggio.rotation.y = -Math.PI;
		if(personaggio.position.z < -60){
			invisibleBox.position.z += 0.05;
			//camera.position.z += 0.05;
		}
		moveLimbsRoom5();
	}

	if((personaggio.position.z < -71 && personaggio.position.x > 2.5 && personaggio.position.x <3.5) && keyFound){
		if(lastDoor.rotation.y < 1.6){
			lastDoor.rotation.y += 0.05;
		}
		doorOpen = true;
	}
	
	if((personaggio.position.z < -71 && personaggio.position.x > 2.5 && personaggio.position.x <3.5) && !keyFound){
		if(alert2){
			alert("Find the key to open the door. \n\nHINT : Some statues have a particular material..." );
			alert2=false;
			upIsDown = false;
			downIsDown = false;
			rightIsDown = false;
			leftIsDown = false;
		}
	}
	
	invisibleBox.addEventListener( 'collision', function( other_object) {	//Collision event handler -> If the character collides with a certain statue, I remove that statue
    		if(other_object == invisibleStatue3){
				setTimeout(function(){
					roomFive.remove(statue3);
					scene.remove(invisibleStatue3);
			 	}, 5000);
    		}
	});
	personaggio.position.z = invisibleBox.position.z;	//The character's position depends on the invisibleBox position
	personaggio.position.x = invisibleBox.position.x;
	invisibleBox.__dirtyPosition = true;
	if(personaggio.position.distanceTo(key.position)<0.5 && !keyFound){
		soundKey.play();
		keyFound = true;
		roomFive.remove(key);
	}
}

function tweenAnimation(){		//Lasers and platforms movements (IMPLEMENTED WITH TWEEN.js library)
	
	//var target = new THREE.Vector3(personaggio.position.x, personaggio.position.y, -10);
	floor5Tween = new TWEEN.Tween(floor5.position).to({x:5, y:floor5.position.y, z:floor5.position.z}, Math.floor(Math.random() * 1000) + 2500);
	floor5Tween2 = new TWEEN.Tween(floor5.position).to({x:floor5.position.x, y:floor5.position.y, z:floor5.position.z}, Math.floor(Math.random() * 1000) + 2500);

	floor5Tween.chain(floor5Tween2);
	floor5Tween2.chain(floor5Tween);

	floor6Tween = new TWEEN.Tween(floor6.position).to({x:-5, y:floor6.position.y, z:floor6.position.z}, Math.floor(Math.random() * 1000) + 2000);
	floor6Tween2 = new TWEEN.Tween(floor6.position).to({x:floor6.position.x, y:floor6.position.y, z:floor6.position.z}, Math.floor(Math.random() * 1000) + 2500);

	floor6Tween.chain(floor6Tween2);
	floor6Tween2.chain(floor6Tween);

	laser1Tween = new TWEEN.Tween(laser1.position).to({x:laser1.position.x, y:-4, z:laser1.position.z}, Math.floor(Math.random() * 600) + 200);
	laser1Tween2 = new TWEEN.Tween(laser1.position).to({x:laser1.position.x, y:laser1.position, z:laser1.position.z}, Math.floor(Math.random() * 600) + 200);
	laser1Tween.chain(laser1Tween2);
	laser1Tween2.chain(laser1Tween);

	laser2Tween = new TWEEN.Tween(laser2.position).to({x:laser2.position.x, y:-4, z:laser2.position.z}, Math.floor(Math.random() * 600) + 200);
	laser2Tween2 = new TWEEN.Tween(laser2.position).to({x:laser2.position.x, y:laser2.position, z:laser2.position.z}, Math.floor(Math.random() * 600) + 200);
	laser2Tween.chain(laser2Tween2);
	laser2Tween2.chain(laser2Tween);

	laser3Tween = new TWEEN.Tween(laser3.position).to({x:laser3.position.x, y:-4, z:laser3.position.z}, Math.floor(Math.random() * 600) + 200);
	laser3Tween2 = new TWEEN.Tween(laser3.position).to({x:laser3.position.x, y:laser3.position, z:laser3.position.z}, Math.floor(Math.random() * 600) + 200);
	laser3Tween.chain(laser3Tween2);
	laser3Tween2.chain(laser3Tween);


	laser4Tween = new TWEEN.Tween(laser4.position).to({x:laser4.position.x, y:-4, z:laser4.position.z}, Math.floor(Math.random() * 600) + 200);
	laser4Tween2 = new TWEEN.Tween(laser4.position).to({x:laser4.position.x, y:laser4.position, z:laser4.position.z}, Math.floor(Math.random() * 600) + 200);
	laser4Tween.chain(laser4Tween2);
	laser4Tween2.chain(laser4Tween);

	laser5Tween = new TWEEN.Tween(laser5.position).to({x:laser5.position.x, y:-4, z:laser5.position.z}, Math.floor(Math.random() * 600) + 200);
	laser5Tween2 = new TWEEN.Tween(laser5.position).to({x:laser5.position.x, y:laser5.position, z:laser5.position.z}, Math.floor(Math.random() * 600) + 200);
	laser5Tween.chain(laser5Tween2);
	laser5Tween2.chain(laser5Tween);

	laser6Tween = new TWEEN.Tween(laser6.position).to({x:laser6.position.x, y:-4, z:laser6.position.z}, Math.floor(Math.random() * 600) + 200);
	laser6Tween2 = new TWEEN.Tween(laser6.position).to({x:laser6.position.x, y:laser6.position, z:laser6.position.z}, Math.floor(Math.random() * 600) + 200);
	laser6Tween.chain(laser6Tween2);
	laser6Tween2.chain(laser6Tween);

	laser7Tween = new TWEEN.Tween(laser7.position).to({x:laser7.position.x, y:-4, z:laser7.position.z}, Math.floor(Math.random() * 600) + 200);
	laser7Tween2 = new TWEEN.Tween(laser7.position).to({x:laser7.position.x, y:laser7.position, z:laser7.position.z}, Math.floor(Math.random() * 600) + 200);
	laser7Tween.chain(laser7Tween2);
	laser7Tween2.chain(laser7Tween);

	laser8Tween = new TWEEN.Tween(laser8.position).to({x:laser8.position.x, y:-4, z:laser8.position.z}, Math.floor(Math.random() * 600) + 200);
	laser8Tween2 = new TWEEN.Tween(laser8.position).to({x:laser8.position.x, y:laser8.position, z:laser8.position.z}, Math.floor(Math.random() * 600) + 200);
	laser8Tween.chain(laser8Tween2);
	laser8Tween2.chain(laser8Tween);

	armSxTween = new TWEEN.Tween(bracciaSX.rotation).to({x:0.5, y:bracciaSX.rotation.y, z:bracciaSX.rotation.z}, 250);
	armSxTween2 = new TWEEN.Tween(bracciaSX.rotation).to({x:0, y:bracciaSX.rotation.y, z:bracciaSX.rotation.z}, 250);
	armSxTween.chain(armSxTween2);

}

//
//-------------------------------------------------------- CHARACTER -------------------------------------------------------- //
//

function character(){

	texture = new THREE.TextureLoader().load('images/Face.bmp');
	testa = new THREE.Object3D;	//Character's HEAD
	loader = new THREE.OBJLoader();
	loader.load('mod/testac.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture});
		testa.add(model);
		testa.position.set(0, 7, 0.2);
		
	});
	personaggio.add(testa);
	
	texture1 = new THREE.TextureLoader().load('images/metallo1.jpg');
	tronco = new THREE.Object3D;	//Character's TORSO
	loader.load('mod/tronco2.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		tronco.add(model);
		
		
	});
	personaggio.add(tronco);	
	
	bracciaDX = new THREE.Object3D; //Character's entire right ARM
	braccioDX = new THREE.Object3D;	//Character's right UPPER ARM
	loader.load('mod/braccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		
		braccioDX.add(model);
		//braccioDX.position.set(2.9, 5.9, 0.5);
		
		bracciaDX.add(braccioDX);
		
	});
	

	avambraccioDX = new THREE.Object3D;	//Character's right LOWER ARM
	loader.load('mod/avambraccioDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		avambraccioDX.add(model);
		//avambraccioDX.position.set(3.1, 1.3, 1.3);
		avambraccioDX.position.set(0.2, -4.5, 0.8);
		
		bracciaDX.add(avambraccioDX);
		bracciaDX.position.set(2.9, 5.9, 0.5);
		
	});
	
	personaggio.add(bracciaDX);
	
    bracciaSX = new THREE.Object3D; //Character's entire left ARM
	braccioSX = new THREE.Object3D;	//Character's left UPPER ARM
	loader.load('mod/braccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		braccioSX.add(model);
		//braccioSX.position.set(-2.9, 6, 0.5);
		
		bracciaSX.add(braccioSX);
	});
	
	
	avambraccioSX = new THREE.Object3D;	//Character's left LOWER ARM
	loader.load('mod/avambraccioSX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		avambraccioSX.add(model);
		avambraccioSX.position.set(-0.2, -4.5, 0.8);
		
		bracciaSX.add(avambraccioSX);
		bracciaSX.position.set(-2.9, 5.9, 0.5);
	});
	
	personaggio.add(bracciaSX);
	
	gambeDX = new THREE.Object3D;	//Character's entire right LEG
	gambaDX = new THREE.Object3D;	//Character's right UPPER LEG
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		gambaDX.add(model);
		//gambaDX.position.set(1.1, -0.3, 0.3);
		
		gambeDX.add(gambaDX);
	});
	
	
	stincoDX = new THREE.Object3D;	//Character's right LOWER LEG
	loader.load('mod/stincoDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		stincoDX.add(model);
		stincoDX.position.set(0, -5.8, -1);
		
		gambeDX.add(stincoDX);
		gambeDX.position.set(1.1, -0.5, 0.3);
	});
	personaggio.add(gambeDX);
	
	gambeSX = new THREE.Object3D;	//Character's entire left LEG
	gambaSX = new THREE.Object3D;	//Character's left UPPER LEG
	loader.load('mod/gambaDX.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:texture1});
		gambaSX.add(model);
		//gambaSX.position.set(-1.1, -0.3, 0.3);
		
		gambeSX.add(gambaSX);
		
	});
	
	stincoSX = new THREE.Object3D;	//Character's left LOWER LEG
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

	invisibleBox = new Physijs.BoxMesh(		//Character's hitbox for the last room (IMPLEMENTED with Physi.js library)
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0x00ff00}),
			//Physijs.createMaterial(new THREE.MeshBasicMaterial({color: 0x00ff00}), 1, 0),
			10 //MASSA
		);
	invisibleBox.visible = false;
	invisibleBox.position.set(0, -0.5, -59);
	scene.add(invisibleBox);
	
}

//
//-------------------------------------------------------- OBSTACLES -------------------------------------------------------- //
//

function createObstacles(){

	// ------ TRAPS ------ //

	traptex = new THREE.TextureLoader().load('images/metallo3.jpg');
	statuetex = new THREE.TextureLoader().load('images/statue.jpg');
	firetex = new THREE.TextureLoader().load('images/torcia2.png');

	loader = new THREE.OBJLoader();
	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex, color:0xc0c0c0});
		
		trap1.add(model);
		
	});
	trap1.scale.set(20,11,20);
	trap1.position.set(0, -1.5, -12);
	roomTwo.add(trap1);

	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex});
		
		trap2.add(model);
		
	});
	trap2.scale.set(25,13,20);
	trap2.position.set(-3.7, -1.5, -20);
	roomTwo.add(trap2);

	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex});
		
		trap3.add(model);
		
	});
	trap3.scale.set(25,13,20);
	trap3.position.set(-1.7, -1.5, -17);
	roomTwo.add(trap3);

	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex});
		
		trap4.add(model);
		
	});
	trap4.scale.set(25,13,20);
	trap4.position.set(0, -1.5, -15);
	roomTwo.add(trap4);

	loader = new THREE.OBJLoader();
	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex});
		
		trap5.add(model);
		
	});
	trap5.scale.set(25,13,20);
	trap5.position.set(3.5, -1.5, -17);
	roomTwo.add(trap5);

	loader.load('mod/trap.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map:traptex});
		
		trap6.add(model);
		
	});
	trap6.scale.set(25,13,20);
	trap6.position.set(0.9, -1.5, -18);
	roomTwo.add(trap6);

	// ------ LASER ------ //

	laser1 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser1.position.set(-2.3, 2.5, -48);
	roomFour.add(laser1);

	laser2 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser2.position.set(0.0, 2.5, -49);
	roomFour.add(laser2);

	laser3 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser3.position.set(2.3, 2.5, -48);
	roomFour.add(laser3);

	laser4 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser4.position.set(-1, 2.5, -51);
	roomFour.add(laser4);

	laser5 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser5.position.set(1.5, 2.5, -51);
	roomFour.add(laser5);

	laser6 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser6.position.set(-2.5, 2.5, -53);
	roomFour.add(laser6);

	laser7 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser7.position.set(0.0, 2.5, -55);
	roomFour.add(laser7);

	laser8 = new THREE.Mesh(
			new THREE.CylinderGeometry( 0.1,0.1,1,7),
			new THREE.MeshPhongMaterial({color:0xff0000})
		);

	laser8.position.set(3.5, 2.5, -53);
	roomFour.add(laser8);
	
	// ------ STATUES ------ //
	
	//Statue hitboxes for the last room
	loader.load('mod/statue.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: statuetex});
		statue1.add(model);
		
	});
	statue1.scale.set(0.015,0.015,0.015);
	statue1.rotation.x = - Math.PI/2;
	statue1.position.set(-3.0, -1.0, -62);
	roomFive.add(statue1);

	invisibleStatue1 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0xff0000}),
			0 //MASSA
		);
	invisibleStatue1.visible = false;
	invisibleStatue1.position.set(statue1.position.x - 0.09, -0.5, statue1.position.z);
	scene.add(invisibleStatue1);

	loader.load('mod/statue.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: statuetex});
		statue2.add(model);
		
	});
	statue2.scale.set(0.015,0.015,0.015);
	statue2.rotation.x = - Math.PI/2;
	statue2.position.set(3.0, -1.0, -62);
	roomFive.add(statue2);

	invisibleStatue2 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0xff0000}),
			0 //MASSA
		);
	invisibleStatue2.visible = false;
	invisibleStatue2.position.set(statue2.position.x - 0.09, -0.5, statue2.position.z);
	scene.add(invisibleStatue2);

	loader.load('mod/statue.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: statuetex});
		statue3.add(model);
		
	});
	statue3.scale.set(0.015,0.015,0.015);
	statue3.rotation.x = - Math.PI/2;
	statue3.position.set(-3.0, -1.0, -67);
	roomFive.add(statue3);

	loader.load('mod/key.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({color: 0xffff00});
		key.add(model);
		
	});
	key.scale.set(0.005,0.005,0.005);
	key.rotation.y = Math.PI/2;
	key.position.set(statue3.position.x, 0.4, statue3.position.z);
	roomFive.add(key);

	invisibleStatue3 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0xff0000}),
			0 //MASSA
		);
	invisibleStatue3.visible = false;
	invisibleStatue3.position.set(statue3.position.x - 0.09, -0.5, statue3.position.z);
	scene.add(invisibleStatue3);

	loader.load('mod/statue.obj',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: statuetex});
		statue4.add(model);
		
	});
	statue4.scale.set(0.015,0.015,0.015);
	statue4.rotation.x = - Math.PI/2;
	statue4.position.set(3.0, -1.0, -67);
	roomFive.add(statue4);

	invisibleStatue4 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 1, 2, 1 ),
			new THREE.MeshBasicMaterial({color: 0xff0000}),
			0 //MASSA
		);
	invisibleStatue4.visible = false;
	invisibleStatue4.position.set(statue4.position.x - 0.09, -0.5, statue4.position.z);
	scene.add(invisibleStatue4);

	// ------ TORCH ------ //
	
	loader = new THREE.FBXLoader();

	loader.load('mod/Torch.fbx',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: firetex});
		mainfire.add(model);
		
	});
	mainfire.scale.set(0.1,0.1,0.1);
	mainfire.position.y = -10;
	mainfire.rotation.x = -1;
	//braccioDX.add(mainfire);

	loader.load('mod/Torch.fbx',function(model){
		
		model.children[0].material = new THREE.MeshPhongMaterial({map: firetex});
		mainfireFake.add(model);
		
	});
	mainfireFake.scale.set(0.015,0.015,0.015);
	mainfireFake.position.set(0.5, -0.3, -59);
	roomFive.add(mainfireFake);

}

//
//-------------------------------------------------------- LIGHTS -------------------------------------------------------- //
//

function addLights(){
	spotLightObj = new THREE.Mesh(
			new THREE.CubeGeometry( 0.1, 0.1, 0.1 ),
			new THREE.MeshBasicMaterial({color:0x000000})
		);
	spotLightObj.position.set(personaggio.position.x, personaggio.position.y + 0.1, personaggio.position.z);
	scene.add(spotLightObj);

	spotLight = new THREE.SpotLight( 0xcccccc, 1.0, 20 , Math.PI/9);
	spotLight.position.set( personaggio.position.x , personaggio.position.y , personaggio.position.z );

	spotLight.target.position.y = -2.5;
	spotLight.target.position.z = -5;
	spotLightObj.add( spotLight );
	spotLightObj.add( spotLight.target );

	light1 = new THREE.PointLight( 0xffffff, 1, 3 );
	light1.position.set(0, 1, 1 );

	light2 = new THREE.PointLight( 0xffffff, 1, 3 );
	light2.position.set(0, 1, -5 );

	//light3 = new THREE.PointLight( 0xffffff, 1, 4 );
	//light3.position.set(3, 1, -24 );

	//light4 = new THREE.PointLight( 0xffffff, 1, 4 );
	//light4.position.set(-3, 1, -24 );

	buttonLight = new THREE.PointLight( 0xffffff, 1, 5 );
	buttonLight.position.set(2, 0, -31 );

	floor5Light = new THREE.PointLight( 0xffffff, 1, 4 );
	floor5Light.position.set(floor5.position.x, floor5.position.y + 1, floor5.position.z);

	floor6Light = new THREE.PointLight( 0xffffff, 1, 4 );
	floor6Light.position.set(floor6.position.x, floor6.position.y + 1, floor6.position.z);

	floor7Light = new THREE.PointLight( 0xffffff, 1, 4 );
	floor7Light.position.set(floor7.position.x, floor7.position.y + 1, floor7.position.z);

	floor9Light = new THREE.PointLight( 0xffffff, 1, 4 );
	floor9Light.position.set(floor9.position.x, floor9.position.y + 1, floor9.position.z);

	laser1Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser1Light.position.set(laser1.position.x, laser1.position.y , laser1.position.z + 0.2);

	laser2Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser2Light.position.set(laser2.position.x, laser2.position.y , laser2.position.z + 0.2);

	laser3Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser3Light.position.set(laser3.position.x, laser3.position.y , laser3.position.z + 0.2);

	laser4Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser4Light.position.set(laser4.position.x, laser4.position.y , laser4.position.z + 0.2);

	laser5Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser5Light.position.set(laser5.position.x, laser5.position.y , laser5.position.z + 0.2);

	laser6Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser6Light.position.set(laser6.position.x, laser6.position.y , laser6.position.z + 0.2);

	laser7Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser7Light.position.set(laser7.position.x, laser7.position.y , laser7.position.z + 0.2);

	laser8Light = new THREE.PointLight( 0xff0000, 1, 4 );
	laser8Light.position.set(laser8.position.x, laser8.position.y , laser8.position.z + 0.2);

	fire5Light = new THREE.PointLight( 0xffffff, 1, 5 );	//Last door light
	fire5Light.position.set(0.0, 2, -71.5);
	
	scene.add( light1);
	scene.add( light2);
	
	//scene.add( light3);
	//scene.add( light4);
	scene.add( buttonLight);
	scene.add( floor5Light);
	scene.add( floor6Light);
	scene.add( floor7Light);

	scene.add( floor9Light);
	scene.add( laser1Light);
	scene.add( laser2Light);
	scene.add( laser3Light);
	scene.add( laser4Light);
	scene.add( laser5Light);
	scene.add( laser6Light);
	scene.add( laser7Light);
	scene.add( laser8Light);
	
	scene.add(fire5Light);
	

	mainfireLight = new THREE.PointLight( 0xff8c00, 1, 7 );
	mainfireLight.position.set(mainfire.position.x, mainfire.position.y , mainfire.position.z);

	mainfireFakeLight = new THREE.PointLight( 0xff8c00, 1, 5 );
	mainfireFakeLight.position.set(mainfireFake.position.x, 1, -58.8);
	
	scene.add( mainfireFakeLight);
	scene.add( mainfireLight );
}

//
//-------------------------------------------------------- LEVEL'S ROOMS -------------------------------------------------------- //
//

function createRooms(){
	texture2 = new THREE.TextureLoader().load('images/matt.jpg');
	textureButton = new THREE.TextureLoader().load('images/button.jpeg');
	
	//----- FIRST ROOM -----//

	floor1 = new THREE.Mesh(
			new THREE.CubeGeometry( 4, 1, 15 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor1.position.y = -1.6;
	floor1.position.z = -4;
	roomOne.add(floor1);

	roof = new THREE.Mesh(
			new THREE.CubeGeometry( 4, 1, 15 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	roof.position.y = 3;
	roof.position.z = -4;
	roomOne.add(roof);

	wallSx1 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 15 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx1.position.x = -2.2;
	wallSx1.position.z = -4;
	roomOne.add(wallSx1);

	wallDx1 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 15 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx1.position.x = 2.2;
	wallDx1.position.z = -4;
	roomOne.add(wallDx1);
	scene.add(roomOne);
	
	//----- SECOND ROOM -----//
	
	floor2 = new THREE.Mesh(
			new THREE.CubeGeometry( 14, 1, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor2.position.y = -1.6;
	floor2.position.z = -17.5;
	roomTwo.add(floor2);

	roof = new THREE.Mesh(
			new THREE.CubeGeometry( 14, 1, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	roof.position.y = 3;
	roof.position.z = -17.5;
	roomTwo.add(roof);

	wallSx2 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 9 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx2.position.x = -5.9;
	wallSx2.position.z = -16.2;
	roomTwo.add(wallSx2);

	wallDx2 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 9 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx2.position.x = 5.9;
	wallDx2.position.z = -16.2;
	roomTwo.add(wallDx2);


	wallSx3 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 2.8 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx3.position.x = -5.9;
	wallSx3.position.z = -22;
	roomTwo.add(wallSx3);

	wallDx3 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 5, 2.8 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx3.position.x = 5.9;
	wallDx3.position.z = -22;
	roomTwo.add(wallDx3);
	scene.add(roomTwo);

	// ----- BOARDWALK ----- //

	floor3 = new THREE.Mesh(
			new THREE.CubeGeometry( 5, 1, 3 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor3.position.y = -1.6;
	floor3.position.z = -25;
	roomThree.add(floor3);

	// ----- ROOM THREE ----- //
	
	floor4 = new THREE.Mesh(
			new THREE.CubeGeometry( 14, 1, 5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor4.position.y = -1.6;
	floor4.position.z = -29;
	roomThree.add(floor4);

	roof = new THREE.Mesh(
			new THREE.CubeGeometry( 14, 1, 5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	roof.position.y = 3;
	roof.position.z = -29;
	roomThree.add(roof);

	wallSx4 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx4.position.x = -6.7;
	wallSx4.position.y = 0.7;
	wallSx4.position.z = -29;
	roomThree.add(wallSx4);

	wallDx4 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx4.position.x = 6.7;
	wallDx4.position.y = 0.7;
	wallDx4.position.z = -29;
	roomThree.add(wallDx4);

	buttonWall = new THREE.Mesh(
			new THREE.CubeGeometry( 1, 2, 0.1 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	buttonWall.position.x = 2.0;
	buttonWall.position.y = -0.5;
	buttonWall.position.z = -31.5;
	roomThree.add(buttonWall);

	button = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 0.7, 0.1 ),
			new THREE.MeshPhongMaterial({map:textureButton})
		);
	button.position.x = 2.0;
	button.position.y = 0.0;
	button.position.z = -31.4;
	roomThree.add(button);

	scene.add(roomThree);

	// ----- MOVING PLATFORMS ----- //

	floor5 = new THREE.Mesh(
			new THREE.CubeGeometry( 3, 1, 4.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor5.position.x = -5;
	floor5.position.y = -1.6;
	floor5.position.z = -33.8;
	roomPlat.add(floor5);

	floor6 = new THREE.Mesh(
			new THREE.CubeGeometry( 3, 1, 4 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor6.position.x = 5;
	floor6.position.y = -1.6;
	floor6.position.z = -38;
	roomPlat.add(floor6);

	scene.add(roomPlat);

	// ----- FOURTH ROOM ----- //

	floor7 = new THREE.Mesh(
			new THREE.CubeGeometry( 3, 1, 4 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor7.position.y = -1.6;
	floor7.position.z = -42;
	roomFour.add(floor7);

	floor8 = new THREE.Mesh(
			new THREE.CubeGeometry( 10, 1, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor8.position.y = -1.6;
	floor8.position.z = -50;
	roomFour.add(floor8);

	roof = new THREE.Mesh(
			new THREE.CubeGeometry( 10, 1, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	roof.position.y = 3.0;
	roof.position.z = -50;
	roomFour.add(roof);

	wallSx8 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx8.position.x = -5;
	wallSx8.position.y = 0.7;
	wallSx8.position.z = -50;
	roomFour.add(wallSx8);

	wallDx8 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 12 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx8.position.x = 5;
	wallDx8.position.y = 0.7;
	wallDx8.position.z = -50;
	roomFour.add(wallDx8);

	wallSx9 = new THREE.Mesh(
			new THREE.CubeGeometry( 6, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx9.position.x = -4;
	wallSx9.position.y = 0.7;
	wallSx9.position.z = -56.2;
	roomFour.add(wallSx9);

	wallDx9 = new THREE.Mesh(
			new THREE.CubeGeometry( 6, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx9.position.x = 4;
	wallDx9.position.y = 0.7;
	wallDx9.position.z = -56.2;
	roomFour.add(wallDx9);
	scene.add(roomFour);

	// ------ BOARDWALK ------ //

	stick1 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.1, 1.2, 0.1 ),
			new THREE.MeshPhongMaterial({map: texture2, color:0xc0c0c0})
		);
	stick1.position.x = 1.45;
	stick1.position.y = -0.45;
	stick1.position.z = -59;
	roomFour.add(stick1);

	stick2 = new THREE.Mesh(
			new THREE.CubeGeometry( 1, 0.1, 0.1 ),
			new THREE.MeshPhongMaterial({map: texture2, color:0xc0c0c0})
		);
	stick2.position.x = 1;
	stick2.position.y = 0.2;
	stick2.position.z = -59;
	roomFour.add(stick2);

	floor9 = new THREE.Mesh(
			new THREE.CubeGeometry( 1, 1, 3 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	floor9.position.y = -1.6;
	floor9.position.z = -57.5;
	scene.add(floor9);


	// ------ FIFTH ROOM ------ //

	floor10 = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 13, 1, 13 ),
			new THREE.MeshPhongMaterial({map:texture2}),
			0 //MASSA
		);
	floor10.position.set(0, -1.6, -65.5);
	scene.add(floor10);

	roof = new THREE.Mesh(
			new THREE.CubeGeometry( 16, 1, 13 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	roof.position.y = 3;
	roof.position.z = -65.5;
	roomFive.add(roof);

	wallSx10 = new THREE.Mesh(
			new THREE.CubeGeometry( 5.5, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx10.position.x = -5.3;
	wallSx10.position.y = 0.7;
	wallSx10.position.z = -59;
	//roomFive.add(wallSx10);

	wallDx10 = new THREE.Mesh(
			new THREE.CubeGeometry( 5.5, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx10.position.x = 5.3;
	wallDx10.position.y = 0.7;
	wallDx10.position.z = -59;
	//roomFive.add(wallDx10);

	wallSx11 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 13 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx11.position.x = -6;
	wallSx11.position.y = 0.7;
	wallSx11.position.z = -65.5;
	roomFive.add(wallSx11);

	wallDx11 = new THREE.Mesh(
			new THREE.CubeGeometry( 0.5, 4, 13 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx11.position.x = 6;
	wallDx11.position.y = 0.7;
	wallDx11.position.z = -65.5;
	roomFive.add(wallDx11);

	wallSx12 = new THREE.Mesh(
			new THREE.CubeGeometry( 5, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallSx12.position.x = -5.3;
	wallSx12.position.y = 0.7;
	wallSx12.position.z = -72;
	roomFive.add(wallSx12);

	wallDx12 = new THREE.Mesh(
			new THREE.CubeGeometry( 5, 4, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	wallDx12.position.x = 5.3;
	wallDx12.position.y = 0.7;
	wallDx12.position.z = -72;
	roomFive.add(wallDx12);

	lastFloor = new Physijs.BoxMesh(
			new THREE.CubeGeometry( 5.6, 1, 5 ),
			new THREE.MeshPhongMaterial({map:texture2}),
			0 //MASSA
		);
	lastFloor.position.set(0, -1.6, -74.5);
	scene.add(lastFloor);

	texture2 = new THREE.TextureLoader().load('images/door.jpg');
	lastDoor = new THREE.Mesh(
			new THREE.CubeGeometry( 5.6, 3.8, 0.5 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	lastDoor.position.x = -3.0;
	lastDoor.position.y = 0.8;
	lastDoor.position.z = -72.2;
	lastDoor.geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 3, 0, 0 ) );
	roomFive.add(lastDoor);

	texture2 = new THREE.TextureLoader().load('images/lock.jpg');
	doorLock = new THREE.Mesh(
			new THREE.CubeGeometry( 0.9, 0.5, 0.1 ),
			new THREE.MeshPhongMaterial({map:texture2})
		);
	doorLock.position.x = 3.5;
	doorLock.position.y = 0.7;
	doorLock.position.z = -71.7;
	roomFive.add(doorLock);
	scene.add(roomFive);
}

//
// ------ KEYBOARD EVENT LISTENERS ------ //
//

function onDocumentKeyDown(event){
		switch(event.keyCode){
				case 37:  leftIsDown  =true; break;
				case 38:  upIsDown    =true; break;
				case 39:  rightIsDown =true; break;
				case 40:  downIsDown  =true; break;
				
				case 87: wIsDown = true; break;
				case 65: aIsDown = true; break;
				case 83: sIsDown = true; break;
				case 68: dIsDown = true; break;

				case 49: oneIsDown = true; break;
				case 50: twoIsDown = true; break;

				
		}
}

function onDocumentKeyUp( event ) {
		switch( event.keyCode ) {
				case 37:  leftIsDown  = false; gambeDX.rotation.x=0; gambeSX.rotation.x=0; bracciaSX.rotation.x = 0; bracciaDX.rotation.x = 0; break;
				case 38:  upIsDown    = false; gambeDX.rotation.x=0; gambeSX.rotation.x=0; bracciaSX.rotation.x = 0; bracciaDX.rotation.x = 0; break;
				case 39:  rightIsDown = false; gambeDX.rotation.x=0; gambeSX.rotation.x=0; bracciaSX.rotation.x = 0; bracciaDX.rotation.x = 0; break;
				case 40:  downIsDown  = false; gambeDX.rotation.x=0; gambeSX.rotation.x=0; bracciaSX.rotation.x = 0; bracciaDX.rotation.x = 0; break;
				
				case 87: wIsDown = false; break;
				case 65: aIsDown = false; break;
				case 83: sIsDown = false; break;
				case 68: dIsDown = false; break;

				case 49: oneIsDown = false; break;
				case 50: twoIsDown = false; break;

		}
}
