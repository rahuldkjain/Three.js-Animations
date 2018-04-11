/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

// Fixed Coordinates
var PoleCoordinates = [4, -2, 100];
var LensTopCoordinates = [4, 17, 100];
var LensBottomCoordinates = [4, -21, 100];
var RetinaCoordinates = [81, -2, 100];

// Varying cOORDINATES
var PhoneObjectCoordinates = [-80, -15, 100];
var IncidentPointCoordinates = [PhoneObjectCoordinates[0]-5, PhoneObjectCoordinates[1]+13, 100];
var FinalPointCoordinates = [81, -2, 100];
var PhoneImageCoordinates = [FinalPointCoordinates[0]-5, FinalPointCoordinates[1] + 13, 100];

// Ray Diagram Variables
var humanEye;
var phoneObject;
var principalAxis;
var leftConvex, rightConvex;
var f1, f2;

var incidentRay1Geometry, incidentRay1;
var incidentRay2Geometry, incidentRay2;
var incidentRay3Geometry, incidentRay3;

var refractedRay1Geometry, refractedRay1;
var refractedRay2Geometry, refractedRay2;
var refractedRay3Geometry, refractedRay3;

var image;
var imageCount = false;


/* For Table */
var headerRow;
var tableTitle = "Distances(u,v,f)";
var tableCreated = true;

// Experiment Variables
var u = [-89, 0];
var v = [77, 0];
var f = 41.28;
var m = -0.86;
var lastF;
var calculatedF = 0;
var calculatedM = 0;

var updatedIR1Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
var updatedIR2Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
var updatedIR3Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
var IR1slope = 0.213;
var IR2slope = 0;
var IR3slope = -0.213;
var updatedRR1Coordinates = [LensTopCoordinates[0], LensTopCoordinates[1]];
var updatedRR2Coordinates = [PoleCoordinates[0], PoleCoordinates[1]];
var updatedRR3Coordinates = [LensBottomCoordinates[0], LensBottomCoordinates[1]];
var RR1slope = -0.246;
var RR2slope = 0;
var RR3slope = 0.246;

var geometry, material, texture, img;
var startCount = false;
var finalFocus = 0;
var finalImagePoint;
var speed = 0.92;

var refractionCompleted = false;
var incidentCompleted = false;
var refractionCompleted = false;
var AnimationCompleted = false;
var showImage = false;


var control;
var calculateFocusCount = false;


function initialiseControlVariables(){
	control = ["Adjust Lens","Show Image"];
}

function initialiseControls(){
	PIEaddDualCommand(control[0], function(){
		calculateFocusCount = true;
		v[0] = 77;
		f = (u[0]*v[0])/(u[0] - v[0]);
		m = v[0]/u[0];
		u[0] = -89;
		calculatedF = f;
		calculatedM = m;
		
	});
	PIEaddDualCommand(control[1], function(){
		
		
			showImage = true;
			});
  }

  function initialiseScene()
{
    /* -------Initialise Scene Variables---------------*/
    mySceneTLX = -100.0;
    mySceneTLY = 100.0;
    mySceneBRX = 100.0;
    mySceneBRY = -100.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;

   



}

function initialiseOtherVariables(){
	headerRow = ["Object(u)", "FocalLength(f)", "Image(v)"];
}


function phoneObjectDrag(element, newpos)
{

	
	
		if(newpos.x <= -37.18){
		
		PhoneObjectCoordinates[0] = newpos.x;
    	IncidentPointCoordinates[0] = PhoneObjectCoordinates[0] - 5;
	}
    

    if(newpos.y == -2){
    	PhoneObjectCoordinates[1] = newpos.y;
    	IncidentPointCoordinates[1] = PhoneObjectCoordinates[1] + 13;
    }

    if(newpos.x > -37.18){
    	window.alert("Beyond this point image will become blur");
    	resetExperiment();
    }

    u[0] = IncidentPointCoordinates[0]-4;
    v[0] = 77;
    f = (u[0]*v[0])/(u[0] - v[0]);

    m = v[0]/u[0];

    incidentRay1Geometry.vertices.shift();
    incidentRay1Geometry.vertices.unshift(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
    PIEscene.remove(incidentRay1);
    iRay1();

    incidentRay2Geometry.vertices.shift();
    incidentRay2Geometry.vertices.unshift(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
    PIEscene.remove(incidentRay2);
    iRay2();

    incidentRay3Geometry.vertices.shift();
    incidentRay3Geometry.vertices.unshift(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
    PIEscene.remove(incidentRay3);
    iRay3();

    updatedIR1Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
    updatedIR2Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
    updatedIR3Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
    IR1slope = (LensTopCoordinates[1] - updatedIR1Coordinates[1])/(LensTopCoordinates[0] - updatedIR1Coordinates[0]);
    IR2slope = (PoleCoordinates[1] - updatedIR1Coordinates[1])/(PoleCoordinates[0] - updatedIR1Coordinates[0]);
    IR3slope = (LensBottomCoordinates[1] - updatedIR3Coordinates[1])/(LensBottomCoordinates[0] - updatedIR3Coordinates[0]);


	/*

    u[0] = IncidentPointCoordinates[0]-4;
    v[0] = (u[0]*f)/(u[0]+f);
    u[1] = IncidentPointCoordinates[1]+2;
    m = (v[0])/(u[0]);
    v[1] = m*u[1];
*/
	PIEupdateTableCell(1, 0, parseFloat(u[0]).toFixed(2));
	PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
	PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

	PIEupdateTable();

    FinalPointCoordinates[0] = RetinaCoordinates[0];
    FinalPointCoordinates[1] = RetinaCoordinates[1];

/*
    if(m > -0.86){
    	PhoneImageCoordinates[0] = FinalPointCoordinates[0] - 5 - 2*m;
    	PhoneImageCoordinates[1] = FinalPointCoordinates[1] + 13;
    }
    else if( m < 0.86){
    	PhoneImageCoordinates[0] = FinalPointCoordinates[0] - 5 + 2*m;
    	PhoneImageCoordinates[1] = FinalPointCoordinates[1] + 13;
    }
    	else if(m == 0.86){
    		PhoneImageCoordinates[0] = FinalPointCoordinates[0] - 5;
    		PhoneImageCoordinates[1] = FinalPointCoordinates[1] + 13;
    	}
*/
     updatedRR1Coordinates = [LensTopCoordinates[0], LensTopCoordinates[1]];
     updatedRR2Coordinates = [PoleCoordinates[0], PoleCoordinates[1]];
     updatedRR3Coordinates = [LensBottomCoordinates[0], LensBottomCoordinates[1]];
     RR1slope = (FinalPointCoordinates[1] - updatedRR1Coordinates[1])/(FinalPointCoordinates[0] - updatedRR1Coordinates[0]);
     RR2slope = (FinalPointCoordinates[1] - updatedRR2Coordinates[1])/(FinalPointCoordinates[0] - updatedRR2Coordinates[0]);
     RR3slope = (FinalPointCoordinates[1] - updatedRR3Coordinates[1])/(FinalPointCoordinates[0] - updatedRR3Coordinates[0]);
   
 /* 
    PIEscene.remove(refractedRay1);
    rRay1();
    PIEscene.remove(refractedRay2);
    rRay2();
    PIEscene.remove(refractedRay3);
    rRay3();

    PIEscene.remove(image);
    Image();
*/   
	

   
    PIErender();
  		
  			phoneObject.position.set(PhoneObjectCoordinates[0], PhoneObjectCoordinates[1], PhoneObjectCoordinates[2]);
  		
   		
   
    
	}
	


function imageDrag(element, newpos){


	FinalPointCoordinates[0] = newpos.x;
	if(newpos.y == -2){
		FinalPointCoordinates[1] = newpos.y;
	}
    
    PhoneImageCoordinates[0] = FinalPointCoordinates[0] - 5;
    PhoneImageCoordinates[1] = FinalPointCoordinates[1] + 13;


    PIEscene.remove(refractedRay1);
    rRay1();
    PIEscene.remove(refractedRay2);
    rRay2();
    PIEscene.remove(refractedRay3);
    rRay3();

    v[0] = FinalPointCoordinates[0] - 4;
    f = (u[0]*v[0])/(u[0] - v[0]);
    m = v[0]/u[0];

   	PIEupdateTableCell(1, 0, parseFloat(IncidentPointCoordinates[0]-4).toFixed(2));
	PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
	PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

	PIEupdateTable();

    PIEscene.remove(leftConvex);
    leftConvexLens();

    PIEscene.remove(rightConvex);
  	rightConvexLens();
 	rightConvex.scale.set(0.8*Math.abs(m),4,1);
   	leftConvex.scale.set(0.8*Math.abs(m),4,1);

   	PIEscene.remove(f1, f2);
   	focalPoints();
    
     updatedRR1Coordinates = [LensTopCoordinates[0], LensTopCoordinates[1]];
     updatedRR2Coordinates = [PoleCoordinates[0], PoleCoordinates[1]];
     updatedRR3Coordinates = [LensBottomCoordinates[0], LensBottomCoordinates[1]];
     RR1slope = (FinalPointCoordinates[1] - updatedRR1Coordinates[1])/(FinalPointCoordinates[0] - updatedRR1Coordinates[0]);
     RR2slope = (FinalPointCoordinates[1] - updatedRR2Coordinates[1])/(FinalPointCoordinates[0] - updatedRR2Coordinates[0]);
     RR3slope = (FinalPointCoordinates[1] - updatedRR3Coordinates[1])/(FinalPointCoordinates[0] - updatedRR3Coordinates[0]);

    PIEscene.remove(image);
    Image();
   
    PIErender();

    image.position.set(PhoneImageCoordinates[0], PhoneImageCoordinates[1], PhoneImageCoordinates[2]);
	
	

}

function iRay1(){
	incidentRay1Geometry = new THREE.Geometry();
  	incidentRay1Geometry.vertices.push(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
  	incidentRay1Geometry.vertices.push(new THREE.Vector3(LensTopCoordinates[0], LensTopCoordinates[1], LensTopCoordinates[2]));
  	incidentRay1Geometry.computeLineDistances();
  	var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  	incidentRay1 = new THREE.Line(incidentRay1Geometry, RayMaterial);
  	PIEaddElement(incidentRay1);
  	incidentRay1.visible = false;
  	
}

function iRay2(){
		incidentRay2Geometry = incidentRay1Geometry.clone();
  		incidentRay2Geometry.vertices.pop();
  		incidentRay2Geometry.vertices.push(new THREE.Vector3(PoleCoordinates[0], PoleCoordinates[1], PoleCoordinates[2]));
  		incidentRay2Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		incidentRay2 = new THREE.Line(incidentRay2Geometry, RayMaterial);
  		PIEaddElement(incidentRay2);
  		incidentRay2.visible = false;
	}

function iRay3(){
		incidentRay3Geometry = incidentRay1Geometry.clone();
  		incidentRay3Geometry.vertices.pop();
  		incidentRay3Geometry.vertices.push(new THREE.Vector3(LensBottomCoordinates[0], LensBottomCoordinates[1], LensBottomCoordinates[2]));
  		incidentRay3Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		incidentRay3 = new THREE.Line(incidentRay3Geometry, RayMaterial);
  		PIEaddElement(incidentRay3);
  		incidentRay3.visible = false;
	}

function rRay1(){
  		refractedRay1Geometry = new THREE.Geometry();
  		refractedRay1Geometry.vertices.push(new THREE.Vector3(LensTopCoordinates[0], LensTopCoordinates[1], LensTopCoordinates[2]));
  		refractedRay1Geometry.vertices.push(new THREE.Vector3(FinalPointCoordinates[0], FinalPointCoordinates[1], FinalPointCoordinates[2]));
  		refractedRay1Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay1 = new THREE.Line(refractedRay1Geometry, RayMaterial);
  		PIEaddElement(refractedRay1);
  		refractedRay1.visible = false;
  	}

function rRay2(){
  		refractedRay2Geometry = new THREE.Geometry();
  		refractedRay2Geometry.vertices.push(new THREE.Vector3(PoleCoordinates[0], PoleCoordinates[1], PoleCoordinates[2]));
  		refractedRay2Geometry.vertices.push(new THREE.Vector3(FinalPointCoordinates[0], FinalPointCoordinates[1], FinalPointCoordinates[2]));
  		refractedRay2Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay2 = new THREE.Line(refractedRay2Geometry, RayMaterial);
  		PIEaddElement(refractedRay2);
  		refractedRay2.visible = false;
  	}

function rRay3(){
  		refractedRay3Geometry = new THREE.Geometry();
  		refractedRay3Geometry.vertices.push(new THREE.Vector3(LensBottomCoordinates[0], LensBottomCoordinates[1], LensBottomCoordinates[2]));
  		refractedRay3Geometry.vertices.push(new THREE.Vector3(FinalPointCoordinates[0], FinalPointCoordinates[1], FinalPointCoordinates[2]));
  		refractedRay3Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay3 = new THREE.Line(refractedRay3Geometry, RayMaterial);
  		PIEaddElement(refractedRay3);
  		refractedRay3.visible = false;
  	}
function object(){
		geometry = new THREE.PlaneGeometry( 300, 150 );
		texture = new THREE.TextureLoader().load( "phone.png" );
		texture.wrapS = THREE.ClampToEdgeWrapping
		texture.wrapT = THREE.ClampToEdgeWrapping
		var img = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		//side: THREE.DoubleSide,
        map: texture,
        opacity: 1,
		transparent: true,
    });
		phoneObject = new THREE.Mesh( geometry, img );
		phoneObject.position.set(PhoneObjectCoordinates[0], PhoneObjectCoordinates[1], PhoneObjectCoordinates[2]);
		phoneObject.scale.set(0.1,0.2,1) ;
   	 	phoneObject.overflow = true;
		PIEaddElement(phoneObject);
		PIEdragElement(phoneObject);
    	PIEsetDrag(phoneObject, phoneObjectDrag);
		PIErender();
	}

 function Image(){
  		image = phoneObject.clone();
  		image.scale.set(-0.1*m,0.2,1);
  		image.position.set(PhoneImageCoordinates[0], PhoneImageCoordinates[1], PhoneImageCoordinates[2]);
  		image.rotation.z = Math.PI;
  		PIEaddElement(image);
  		PIEdragElement(image);
    	PIEsetDrag(image, imageDrag);
    	image.visible = false;


  	}

 function leftConvexLens(){
  		geometry = new THREE.SphereBufferGeometry(5,32,32,0,Math.PI/2);
   		material =new THREE.MeshLambertMaterial({color:0x295DD5});
   		leftConvex= new THREE.Mesh(geometry,material);
   		PIEaddElement(leftConvex);
   		leftConvex.position.set(myCenterX+4, myCenterY-2, 100);
  	}
  	
 function rightConvexLens(){
  		rightConvex= new THREE.Mesh(geometry,material);
  		rightConvex.rotation.z+=Math.PI;
   		rightConvex.position.set(myCenterX+4, myCenterY-2, 100);
   		PIEaddElement(rightConvex);
  	}

function focalPoints(){
		var geometry = new THREE.CircleBufferGeometry( 1, 32 );
		var material = new THREE.MeshBasicMaterial( { color: 0xff1100 } );
		f1 = new THREE.Mesh( geometry, material );
		f1.position.set(PoleCoordinates[0]+f, -2, 100);
		PIEaddElement(f1);

		f2 = f1.clone();
		f1.position.set(PoleCoordinates[0]-f, -2, 100);
		PIEaddElement(f2);
	}
function FinalImagePoint(){
			var geometry = new THREE.CircleBufferGeometry( 3, 32 );
			var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
			finalImagePoint = new THREE.Mesh( geometry, material );
			finalImagePoint.position.set(FinalPointCoordinates[0], FinalPointCoordinates[1], FinalPointCoordinates[2]);
			PIEaddElement( finalImagePoint );
			finalImagePoint.visible = false;
}
function loadExperimentElements(){


  PIEsetExperimentTitle("Human Eye Lens Accommodation");
  PIEsetDeveloperName("Rahul Jain");



  /* initialise Scene */
  initialiseScene();

  /* initialise help and info content */
  initialiseHelp();
  initialiseInfo();
  initialiseControlVariables();
  initialiseControls();

  /* initialise Other Variables */
  initialiseOtherVariables();

  		u = [-89, 0];
		v = [77, 0];
		f = 41.28;
		m = -0.86;
		speed = 0.92;
		frameSpeed = [120, 170, 270, 370];
		i=0,j=0;
		Count = 0;
		flag = true;

		


  	geometry = new THREE.PlaneGeometry( 300, 150 );
	texture = new THREE.TextureLoader().load( "HumanEyeHd.png" );
	texture.wrapS = THREE.ClampToEdgeWrapping
	texture.wrapT = THREE.ClampToEdgeWrapping
	img = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		//side: THREE.DoubleSide,
        map: texture,
        opacity: 1,
		transparent: true,
    });
	humanEye = new THREE.Mesh( geometry, img );
	humanEye.position.set( myCenterX, myCenterY, 50);
   	humanEye.overflow = true;
	PIEaddElement(humanEye);
	PIErender();



  var geometry = new THREE.Geometry();
  geometry.vertices.push(new THREE.Vector3(-200, -2, 100));
  geometry.vertices.push(new THREE.Vector3(200, -2, 100));
  geometry.computeLineDistances();
  var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.8, linecap: 'round', linejoin:  'round'  });
  principalAxis = new THREE.Line(geometry, material);
  PIEaddElement(principalAxis);
  
  
  	
  
	
   	/*----------------------Point------------------------*/
   	var geometry = new THREE.CircleBufferGeometry( 1, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0xff1100 } );
	var pole = new THREE.Mesh( geometry, material );
	pole.position.set(PoleCoordinates[0], PoleCoordinates[1], PoleCoordinates[2]);
	PIEaddElement( pole );
	

	var incidentPoint = new THREE.Mesh( geometry, material );
	incidentPoint.position.set(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]);
	//PIEaddElement(incidentPoint);
	

	var lensTop = new THREE.Mesh( geometry, material );
	lensTop.position.set(LensTopCoordinates[0], LensTopCoordinates[1], LensTopCoordinates[2]);
	PIEaddElement(lensTop);
	

	var lensBottom = new THREE.Mesh( geometry, material );
	lensBottom.position.set(LensBottomCoordinates[0], LensBottomCoordinates[1], LensBottomCoordinates[2]);
	PIEaddElement(lensBottom);
	

	var retina = new THREE.Mesh( geometry, material );
	retina.position.set(RetinaCoordinates[0], RetinaCoordinates[1], RetinaCoordinates[2]);
	//PIEaddElement(retina);

	
	object();
	FinalImagePoint();
	/*-----------------------------Lens------------------------------------------*/

  	leftConvexLens();
  	rightConvexLens();
 	rightConvex.scale.set(0.8,4,1);
   	leftConvex.scale.set(0.8,4,1);
	
	
	/*----------------------------Initial Ray Diagram --------------------------------*/
	
	iRay1();
	iRay2();
	iRay3();


  	/*--------------------------------------Refracted Ray Diagram------------------------------------------------*/
  	
  	rRay1();
  	rRay2();
  	rRay3();
  	
  	

  	/*------------------------------Image------------------------------------------*/
  	
  	Image();

	focalPoints();

	
  	

	
		

    resetExperiment();
    PIEstopAnimation();


	//PIEturnCamera(1, 1.2, 0.1);
	PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

	document.getElementById("start").addEventListener('click', function(){
		lastF = f;

	});

    
    
	document.getElementById(">>").addEventListener('click', function(){
		if(speed < 1 ){
			speed = speed + 0.04;
			
		}
		
	});
	document.getElementById("<<").addEventListener('click', function(){
		if(speed < 1){
			speed = speed - 0.04;
			
		}

	});

	document.getElementById("reset").addEventListener('click', function(){
		u = [-89, 0];
		v = [77, 0];
		f = 41.28;
		m = -0.86;
		speed = 0.92;
		lastF = f;
		i=0,j=0;
		Count = 0;
		flag = true;
	});
   
    var mouse = new THREE.Vector2(), INTERSECTED;
    raycaster = new THREE.Raycaster();
    document.addEventListener('click',Mouseclick);

		

	}
var intersects;
function Mouseclick(event){
	event.preventDefault();
	intersects;
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
	intersects = PIEraycaster.intersectObjects(PIEscene.children);
}

function resetExperiment(){

	calculatedF = 0;
	calculatedM = 0;
	refractionCompleted = false;
	incidentCompleted = false;
	refractionCompleted = false;
	AnimationCompleted = false;
	calculateFocusCount = false;
	LensAccomodate = false;
	showImage = false;
	
	imageCount = false;
	//startCount = false;
	PoleCoordinates = [4, -2, 100];
	LensTopCoordinates = [4, 17, 100];
	LensBottomCoordinates = [4, -21, 100];
	RetinaCoordinates = [81, -2, 100];

	// Varying cOORDINATES
	PhoneObjectCoordinates = [-80, -15, 100];
	IncidentPointCoordinates = [PhoneObjectCoordinates[0]-5, PhoneObjectCoordinates[1]+13, 100];
	FinalPointCoordinates = [81, -2, 100];
	PhoneImageCoordinates = [FinalPointCoordinates[0]-5, FinalPointCoordinates[1] + 13, 100];

	

	updatedIR1Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
	updatedIR2Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
	updatedIR3Coordinates = [IncidentPointCoordinates[0], IncidentPointCoordinates[1]];
	IR1slope = 0.213;
	IR2slope = 0;
	IR3slope = -0.213;
	updatedRR1Coordinates = [LensTopCoordinates[0], LensTopCoordinates[1]];
	updatedRR2Coordinates = [PoleCoordinates[0], PoleCoordinates[1]];
	updatedRR3Coordinates = [LensBottomCoordinates[0], LensBottomCoordinates[1]];
	RR1slope = -0.246;
	RR2slope = 0;
	RR3slope = 0.246;
	finalFocus = 0;

	//finalImagePoint.visible = false;
	PIEscene.remove(phoneObject);
	PIEscene.remove(image);
	PIEscene.remove(incidentRay1, incidentRay2, incidentRay3);
	PIEscene.remove(refractedRay1, refractedRay2, refractedRay3);
	PIEscene.remove(leftConvex, rightConvex);
	PIEscene.remove(f1, f2);
	

	object();

	if (tableCreated == true) {
		PIEcreateTable(tableTitle, 2, 3, true);
		PIEupdateTableRow(0, headerRow);
		tableCreated = false;
	}
	PIEupdateTableCell(1, 0, parseFloat(u[0]).toFixed(2));
	PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
	PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

	PIEupdateTable();
	/*-----------------------------Lens------------------------------------------*/

  	leftConvexLens();
  	rightConvexLens();
 	rightConvex.scale.set(0.8,4,1);
   	leftConvex.scale.set(0.8,4,1);

   	/*----------------------------Initial Ray Diagram --------------------------------*/
	
	iRay1();
	iRay2();
	iRay3();


  	/*--------------------------------------Refracted Ray Diagram------------------------------------------------*/
  	
  	rRay1();
  	rRay2();
  	rRay3();
  	
  	

  	/*------------------------------Image------------------------------------------*/
  	
  	Image();

	focalPoints();
	
	
	
}
var i=0,j=0;
var Count = 0;
var flag = true;
var LensAccomodate = false;
function updateExperimentElements(t,dt){
	

	
		if(calculateFocusCount == true){
			finalFocus = (77*89)/(77+89);
			
			if( parseFloat(f).toFixed(1) != parseFloat(finalFocus).toFixed(1) && LensAccomodate == false){
					if( parseFloat(f).toFixed(1) >  parseFloat(finalFocus).toFixed(1) ){
 				
 						u[0] -= 0.5;
 						
    					f = (u[0]*v[0])/(u[0] - v[0]);
    					m = v[0]/u[0];
    					
    					
    					PIEupdateTableCell(1, 0, parseFloat(u[0]).toFixed(2));
						PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
						PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

						PIEupdateTable();
						if(parseFloat(f).toFixed(1) == parseFloat(calculatedF).toFixed(1)){
							f = finalFocus;
							LensAccomodate = true;
						}
						rightConvex.scale.set(0.8*Math.abs(m),4,1);
   						leftConvex.scale.set(0.8*Math.abs(m),4,1);
						PIEscene.remove(f1, f2);
   						focalPoints();
   						
 				
  		   		
				}	else if( parseFloat(f).toFixed(1) < parseFloat(finalFocus).toFixed(1)){
						
 						u[0] += 0.3;
    					f = (u[0]*v[0])/(u[0] - v[0]);
    					m = v[0]/u[0];
    					
    					
    					PIEupdateTableCell(1, 0, parseFloat(u[0]).toFixed(2));
						PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
						PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

						PIEupdateTable();
						if(parseFloat(f).toFixed(1) == parseFloat(calculatedF).toFixed(1)){
							f = finalFocus;
							LensAccomodate = true;
						}
						rightConvex.scale.set(0.8*Math.abs(m),4,1);
   						leftConvex.scale.set(0.8*Math.abs(m),4,1);
						PIEscene.remove(f1, f2);
   						focalPoints();
   						
 				
				
		}
			}

			
			if( parseFloat(f).toFixed(1) == parseFloat(finalFocus).toFixed(1) || LensAccomodate == true){
				f = (u[0]*v[0])/(u[0] - v[0]);
				m = v[0]/u[0];

    					PIEupdateTableCell(1, 0, parseFloat(u[0]).toFixed(2));
						PIEupdateTableCell(1, 1, parseFloat(f).toFixed(2));
						PIEupdateTableCell(1, 2, parseFloat(v[0]).toFixed(2));

						PIEupdateTable();
						rightConvex.scale.set(0.8*Math.abs(m),4,1);
   						leftConvex.scale.set(0.8*Math.abs(m),4,1);
						PIEscene.remove(f1, f2);
   						focalPoints();

   						
   					if (showImage == true) {
   						if(updatedIR1Coordinates[0] <= LensTopCoordinates[0] && updatedIR1Coordinates[1] <= LensTopCoordinates[1]){
		updatedIR1Coordinates[0] += 1*speed;
		updatedIR1Coordinates[1] += IR1slope*speed;
		
		PIEscene.remove(incidentRay1);
		PIEscene.remove(refractedRay1);

		if(updatedIR1Coordinates[0] >= LensTopCoordinates[0] && updatedIR1Coordinates[1] >= LensTopCoordinates[1]){
			incidentCompleted = true;
		}
		
		incidentRay1Geometry = new THREE.Geometry();
  		incidentRay1Geometry.vertices.push(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
  		incidentRay1Geometry.vertices.push(new THREE.Vector3(updatedIR1Coordinates[0], updatedIR1Coordinates[1], LensTopCoordinates[2]));
  		incidentRay1Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		incidentRay1 = new THREE.Line(incidentRay1Geometry, RayMaterial);
  		PIEaddElement(incidentRay1);
  		
  		

  		

	}

		if(updatedIR2Coordinates[0] <= LensTopCoordinates[0] && updatedIR2Coordinates[1] <= LensTopCoordinates[1] ){
		updatedIR2Coordinates[0] += 1*speed;
		updatedIR2Coordinates[1] += IR2slope*speed;

		PIEscene.remove(incidentRay2);
		PIEscene.remove(refractedRay2);
		
		incidentRay2Geometry = new THREE.Geometry();
  		incidentRay2Geometry.vertices.push(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
  		incidentRay2Geometry.vertices.push(new THREE.Vector3(updatedIR2Coordinates[0], updatedIR2Coordinates[1], LensTopCoordinates[2]));
  		incidentRay2Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		incidentRay2 = new THREE.Line(incidentRay2Geometry, RayMaterial);
  		PIEaddElement(incidentRay2);

	}

		if(updatedIR3Coordinates[0] <= LensBottomCoordinates[0] && updatedIR3Coordinates[1] >= LensBottomCoordinates[1] ){
		updatedIR3Coordinates[0] += 1*speed;
		updatedIR3Coordinates[1] += IR3slope*speed;	

		PIEscene.remove(incidentRay3);
		PIEscene.remove(refractedRay3);

		incidentRay3Geometry = new THREE.Geometry();
  		incidentRay3Geometry.vertices.push(new THREE.Vector3(IncidentPointCoordinates[0], IncidentPointCoordinates[1], IncidentPointCoordinates[2]));
  		incidentRay3Geometry.vertices.push(new THREE.Vector3(updatedIR3Coordinates[0], updatedIR3Coordinates[1], LensTopCoordinates[2]));
  		incidentRay3Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		incidentRay3 = new THREE.Line(incidentRay3Geometry, RayMaterial);
  		PIEaddElement(incidentRay3);

	}

		if (incidentCompleted == true) {

			if(updatedRR1Coordinates[0] <= RetinaCoordinates[0] && updatedRR1Coordinates[1] >= RetinaCoordinates[1] ){
		updatedRR1Coordinates[0] += 1*speed;
		updatedRR1Coordinates[1] += RR1slope*speed;
		

		PIEscene.remove(refractedRay1);

		if(updatedRR1Coordinates[0] >= FinalPointCoordinates[0] && updatedRR1Coordinates[1] <= FinalPointCoordinates[1]){
			refractionCompleted = true;
		}
		refractedRay1Geometry = new THREE.Geometry();
  		refractedRay1Geometry.vertices.push(new THREE.Vector3(LensTopCoordinates[0], LensTopCoordinates[1], LensTopCoordinates[2]));
  		refractedRay1Geometry.vertices.push(new THREE.Vector3(updatedRR1Coordinates[0], updatedRR1Coordinates[1], FinalPointCoordinates[2]));
  		refractedRay1Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay1 = new THREE.Line(refractedRay1Geometry, RayMaterial);
  		PIEaddElement(refractedRay1);
  		

  		

	}

			if(updatedRR2Coordinates[0] <= FinalPointCoordinates[0] && updatedRR2Coordinates[1] <= FinalPointCoordinates[1] ){
		updatedRR2Coordinates[0] += 1*speed;
		updatedRR2Coordinates[1] += RR2slope*speed;
		

		PIEscene.remove(refractedRay2);
		refractedRay2Geometry = new THREE.Geometry();
  		refractedRay2Geometry.vertices.push(new THREE.Vector3(PoleCoordinates[0], PoleCoordinates[1], LensTopCoordinates[2]));
  		refractedRay2Geometry.vertices.push(new THREE.Vector3(updatedRR2Coordinates[0], updatedRR2Coordinates[1], FinalPointCoordinates[2]));
  		refractedRay2Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay2 = new THREE.Line(refractedRay2Geometry, RayMaterial);
  		PIEaddElement(refractedRay2);

	}

			if(updatedRR3Coordinates[0] <= FinalPointCoordinates[0] && updatedRR3Coordinates[1] <= FinalPointCoordinates[1] ){
		updatedRR3Coordinates[0] += 1*speed;
		updatedRR3Coordinates[1] += RR3slope*speed;
		
		PIEscene.remove(refractedRay3);
		refractedRay3Geometry = new THREE.Geometry();
  		refractedRay3Geometry.vertices.push(new THREE.Vector3(LensBottomCoordinates[0], LensBottomCoordinates[1], LensTopCoordinates[2]));
  		refractedRay3Geometry.vertices.push(new THREE.Vector3(updatedRR3Coordinates[0], updatedRR3Coordinates[1], FinalPointCoordinates[2]));
  		refractedRay3Geometry.computeLineDistances();
  		var RayMaterial = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.4, linecap: 'round', linejoin:  'round'  });
  		refractedRay3 = new THREE.Line(refractedRay3Geometry, RayMaterial);
  		PIEaddElement(refractedRay3);

	}

	}

	if( refractionCompleted == true ){
		if(imageCount == false){
			
			finalImagePoint.visible = true;
			imageCount = true;


			
		}
		
	}

	

	if(imageCount == true ){
		image.visible = true;
		AnimationCompleted = true;		
	}
		
		

	if(AnimationCompleted == true ){
			startCount = false;
			flag = false;
			//u = [-89, 0];
			//v = [77, 0];
			//f = 41.28;
			//m = -0.86;
			speed = 0.92;
			
			i++;
			j=0;
			Count = 0;
			flag = true;
			
	}

	if( i >100 ){
		i=0;
		finalImagePoint.visible = false;
		
		
	}

	

   					}

				
}
}
}



var helpContent;
	function initialiseHelp(){
	   helpContent="";
     helpContent = helpContent + "<h2>Human Eye Lens Accommodation HELP</h2>";
     helpContent = helpContent + "<h4>Animation Elements</h4><ul><li>Human Eye(Schematic)</li><li>Object(Mobile)</li><li>Principal Axis</li><li>Image</li><li>Distances Table</li></ul>";
	 helpContent = helpContent + "<h4>How to use(STEPS)</h4>";  
	 helpContent = helpContent + "<ol><li>Click the <b>Start</b> button</li><li>Drag the object and observe the focal length required to create an image at the retina.(See Observation table)</li>";  
	 helpContent = helpContent + "<li>Click <b>AdjustLens</b> button to adjust the lens so that the image appears on the retina.</li>";  
	 helpContent = helpContent + "<li>Now drag and drop the image towards or away from the lens and observe that the lens adjusts its thickness accordingly</li>";  
	 helpContent = helpContent + "<li>Again drag the image towards the lens and you will observe that beyond a point, the lens does not adjust and image becomes blurred.</li>"; 
	 helpContent = helpContent + "<li>Click <b>Reset</b> button to and repeat above steps to show the image</li></ol>";  
 
	 helpContent = helpContent + "<h3>Animation Control</h3><ul><li>Click the <b>Reset</b> Button to reset the Animation</li><li>Click the <b>Stop</b> Button to stop the Animation</li><li>Click the speed buttons to change the speed of the experiment</li></ul>";
	 helpContent = helpContent + "<h3>Note</h3><ul><li>Don't forget to start the experiment before doing anything</li></ul>";
     helpContent = helpContent + "<h2>Happy Experimenting</h2>";


    PIEupdateHelp(helpContent);
	}

	var infoContent;
	function initialiseInfo(){
		infoContent =  "";
    infoContent = infoContent + "<h2>Human Eye Lens Accommodation INFO</h2>";
    infoContent = infoContent + "<h3>Aim</h3>";
    infoContent = infoContent + "<p>To learn how human eye lens accommodate itself.</p>";
    infoContent = infoContent + "<h3>Keywords</h3>";
    infoContent = infoContent + "<ol><li>Retina</li><li>Lens</li><li>Focus</li><li>Object</li><li>Image</li></ol>";
    infoContent = infoContent + "<h3>Lens Accommodation</h3>";
    infoContent = infoContent + "<p>Accommodation is the process by which the vertebrate eye changes optical power to maintain a clear image or focus on an object as its distance varies.</p>";
    infoContent = infoContent + "<h3>Definitions</h3><ul><li>Retina- a layer at the back of the eyeball that contains cells sensitive to light, which trigger nerve impulses that pass via the optic nerve to the brain, where a visual image is formed</li>";
    infoContent = infoContent + "<li>Focal Length - the distance between the centre of a lens or curved mirror and its focus.</li></ul>";
   infoContent = infoContent + "<h3>Theory</h3>";
   infoContent = infoContent + "<p>The lens of the human eye is flattened by passive tension in the zonular fibres that run radially from its equator to the ciliary body on the wall of the globe. Accommodation is achieved by contraction of the annular ciliary muscle.</p>";
   infoContent = infoContent + " <p>This reduces the tension in the zonular fibres and causes the curvature of the lens surfaces to increase with a consequential increase in optical power.</p></p>";
    infoContent = infoContent + "<h3>Formulae</h3>";
    
    infoContent = infoContent + "<ol><li>1/v - 1/u = 1/f</li><li> m = v/u </li><li> P = 1/f</li></ol>";
    infoContent = infoContent + "where <br> u: distance of object from Pole <br> f: focal length of Lens <br> v: distance of image from Pole <br> m: magnification <br> P: Power of Lens";
    infoContent = infoContent + "<h3>Happy Experimenting</h3>";
    PIEupdateInfo(infoContent);
	}
