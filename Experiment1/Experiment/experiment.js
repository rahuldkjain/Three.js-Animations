
/* Scene Dimensions (in meters: at z = 0) */
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */

/* ------------------Room Variables------------------ */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */



/* ------Materials------------*/
var cork1;
var cork2;
var pin1;
var pin2;
var dir;
var Magnet;


/*----------------Magnet Variables -------------------*/
var flipped = false;
var magnetizedPin1Forward = false;
var magnetizedPin1Backward = false;
var magnetizedPin2Forward = false;
var magnetizedPin2Backward = false;
var floatPin1 = false;
var floatPin2 = false;
var magnetizingPin1Forward = false;
var magnetizingPin1Backward = false;
var magnetizingPin2Forward = false;
var magnetizingPin2Backward = false;
var yPole = 'S';



/* --------------Geometry Material and all------------*/

var geometry;
var material;
var loader;
var texture;

/*--------Control Variables*/
var control;
var initControl=1;
var startCount = true;
var stopCount;
var dualCount = false;
var rubCountPin1 = false;
var rubCountPin2 = false;

/* For Table */

var headerRow;

var pin1ForwardSCount = 0;
var pin1ForwardNCount = 0;
var pin1BackwardSCount = 0;
var pin1BackwardNCount = 0;

var pin2ForwardSCount = 0;
var pin2ForwardNCount = 0;
var pin2BackwardSCount = 0;
var pin2BackwardNCount = 0;

var rotateCompassCount = 1;

class Stack {
 
    // Array is used to implement stack
    constructor()
    {
        this.items = [];
    }

    // Functions to be implemented
    // push(item)
    // pop()
    // peek()
    // isEmpty()
    // printStack()

    pop()
    {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0)
        return "Underflow";
    return this.items.pop();
    }
  
  // peek function
  peek()
  {
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  }
  size()
  {
    return this.items.length;
  }
  // push function
  push(element)
  {
    // push element into the items
    this.items.push(element);
  }
    
}
var Pin1Stack = new Stack();
var Pin2Stack = new Stack();
var Pin1Rubbed = 0;
var Pin2Rubbed = 0;
var Pin1Direction = "--";
var Pin2Direction = "--";
var p1p1Count = 0;
var p1p2Count = 0;
var p2p1Count = 0;
var p2p2Count = 0;



var helpContent;
	function initialiseHelp(){
	   helpContent="";
     helpContent = helpContent + "<h2>Make your own Magnetic Compass HELP</h2>";
     helpContent = helpContent + "<h3>Animation Elements</h3><ol><li>Bar Magnet</li><li>Compass</li><li>Two Pins</li><li>Corks</li><li>Observation Table</li><li>Control Buttons</li></ol>";
     helpContent = helpContent + "<h4>Magnet</h4><ul>";
     helpContent = helpContent + "<li>Magnet is used to magnetise the Pins</li>";
	   helpContent = helpContent + "<li>Lower end of the magnet will always be used to rub the pin</li>";
	   helpContent = helpContent + "<li>This will help in analysing the result</li></ul>";
     helpContent = helpContent + "<h4>Pin(Needles)</h4><ul><li>There are two pins (Pin1 and Pin2)</li><li>Two Pins provided to experiment different rubbing combinations</li></ul>";
     helpContent = helpContent + "<h4>Observation Table</h4><ul><li>To supervise the Magnetization % and Rub Direction of the Pins</li></ul>";
     helpContent = helpContent + "<h4>Control Buttons</h4><ul><li>To perform different operations</li></ul>";
	   helpContent = helpContent + "<h4>Compass</h4><ul><li>To determine the directions of experiment</li></ul>";
     helpContent = helpContent + "<h3>Note: </h3><ul><li> Don't forget to start the experiment before doing anything</li><li>Make sure to drag the magnet from the starting to ending point of the Pin(Check the status from the table).</li></ul>";
     helpContent = helpContent + "<h3>Steps</h3><ol>";
     helpContent = helpContent + "<li>Click the <b>Start</b> Button to start the Animation </li>";
     helpContent = helpContent + "<li>Try to magnetizing the pin either by dragging the magnet or by pressing <b>Rub</b> buttons in the control Panel</li>";
     helpContent = helpContent + "<li>Press the Float button after the pin is completely magnetized to learn and observe the making of a magnetic compass</li></ol>";
	   helpContent = helpContent + "<h4>Other</h4><ul>";
     helpContent = helpContent + "<li>Seperate Buttons for rubbing the pin by magnet in specific direction</li>";
     helpContent = helpContent + "<li>Compass Rose is shown to know the direction</li><li>You can float the Pin without magnetizing and can observe the effect.</li></ul>";
	   helpContent = helpContent + "<h3>Animation Control</h3><ul><li>Click the <b>Start</b> Button to start the Animation</li><li>Click the <b>Stop</b> Button to stop the Animation</li><li>Click the <b>Reset</b> Button to reset the experiment</li><li>Click the <b>Toggle_Magnet</b> Button in the Control Panel to toggle the Magnet</li>";
	   helpContent = helpContent + "<li>Click the <b>Rotate_Compass</b> button to change the direction of experiment.</li><li>Click the <b>Rub_Backward</b> Button in the Control Panel to see the results after rubbing the respective pin in backward direction</li>";
     helpContent = helpContent + "<li>Click the <b>Rub_Forward</b> Button in the Control Panel to see the results after rubbing the respective pin in forward direction</li><li>Click the <b>Demagnetize</b> Button in the Control Panel to demagnetize the respective Pin</li>";
	   helpContent = helpContent + "<li>Click the <b>Float_Pin</b> Button in the Control Panel to place the pin on the cork and observe the effect after the respective pin is magnetized</li></ul>";
	   helpContent = helpContent + "<h2>Result and verification</h2><h4><i>When you rub the pin with North Pole</i></h4><ul><li>Rub in Backward Direction: Pin will rotate <b>CLOCKWISE</b> untill aligned to North-South direction</li>";
	   helpContent = helpContent + "<li>Rub in Forward Direction: Pin will rotate <b>ANTI-CLOCKWISE</b> untill aligned to North-South direction</li></ul>";
	   helpContent = helpContent + "<h4><i>When you rub the pin with South Pole</i></h4><ul>";
	   helpContent = helpContent + "<li>Rub in Backward Direction: Pin will rotate <b>ANTI-CLOCKWISE</b> untill aligned to North-South direction</li>";
     helpContent = helpContent + "<li>Rub in Forward Direction: Pin will rotate <b>CLOCKWISE</b> untill aligned to North-South direction</li></ul>";
     helpContent = helpContent + "<h4><i>When you Float the pin without magnetizing</i>: the pin will not rotate</h4>";
	   

     helpContent = helpContent + "<h2>Happy Experimenting</h2>";


    PIEupdateHelp(helpContent);
	}

	var infoContent;
	function initialiseInfo(){
		infoContent =  "";
    infoContent = infoContent + "<h2>Make your own Magnetic Compass INFO</h2>";
    infoContent = infoContent + "<h3>Aim</h3>";
    infoContent = infoContent + "<p>Make Magnetic Compass on your own.</p>";
    infoContent = infoContent + "<h3>Equipments Required</h3>";
    infoContent = infoContent + "<ol><li>Bar Magnet</li><li>Pin or Needle</li><li>Cork</li></ol>";
    infoContent = infoContent + "<h3>About the Experiment</h3>";
    infoContent = infoContent + "<p> This experiment turn the pin into a magnet. To do this, rub the Magnet across the pin few times.</p>";
    infoContent = infoContent + "<p>Be sure to rub in one direction only, not back and forth. The pin will now be magnetized.</p>";
    infoContent = infoContent + "<p>Next, place the pin on the cork and place it on top of the water. Try to place it in the center of the cork, keeping it away from the edges.</p>";
    infoContent = infoContent + "<p>The pin will begin to slowly turn around and eventually the pin will point North and South.</p>";
    infoContent = infoContent + "<h3>How it Works</h3>";
    infoContent = infoContent + "<p>Every magnet has a north and south pole. A compass is small magnet that aligns itself with the north and south poles of the Earth's magnetic field.</p>";
    infoContent = infoContent + "<p>As the magnet is rubbed across the pin, it becomes magnetized because the electrons within the pin straighten up and align themselves with the magnet.</p>";
    infoContent = infoContent + "<p>The magnetized pin then aligns itself with the EarthÃ¢â‚¬â„¢s magnetic field when it is placed on top of the water.</p>";
    infoContent = infoContent + "<h3>Happy Experimenting</h3>";
    PIEupdateInfo(infoContent);
	}



function initialiseControlVariables(){
	control = ["Toggle_Magnet","Float_Pin1","Rub_Forward","--------Pin 1--------","--------Pin 2--------","Float_Pin2","Rub_Backward","Rotate_Compass","DeMagnetize"];

}
function startOrbitalControls() {
    controls = new THREE.OrbitControls(PIEcamera, PIErenderer.domElement);
 lse;
}

function initialiseControls(){
	initialiseControlVariables();
  if(startCount == true){
  PIEaddDualCommand(control[0], toggleMagnet);
  PIEaddDualCommand(control[7], rotateCompass);
  PIEaddDualCommand(control[3], function(){});
  PIEaddDualCommand(control[2], magnetizePin1Forward);
  PIEaddDualCommand(control[6], magnetizePin1Backward);
  PIEaddDualCommand(control[8], deMagnetizePin1);
  PIEaddDualCommand(control[1], FloatPin1);
  PIEaddDualCommand(control[4], function(){});
  PIEaddDualCommand(control[2], magnetizePin2Forward);
  PIEaddDualCommand(control[6], magnetizePin2Backward);
  PIEaddDualCommand(control[8], deMagnetizePin2);
  PIEaddDualCommand(control[5], FloatPin2);
  }

	
}
function toggleMagnet() {
    flipped = !flipped;
    if(flipped) {
        yPole = 'N';
        Magnet.rotation.z -= Math.PI;
    } else {
        yPole = 'S';
        Magnet.rotation.z += Math.PI;
    }
    PIErender();
}

function rotateCompass(){
  if(!magnetizingPin2Forward && !magnetizingPin2Backward && !magnetizingPin1Forward && !magnetizingPin1Backward && !magnetizedPin1Forward && !magnetizedPin1Backward && !magnetizedPin2Forward && !magnetizedPin2Backward){
        if (rotateCompassCount % 2 == 1) {
            rotateCompassCount = 2;
            dir.rotation.y += THREE.Math.degToRad(-90);
        }
        else if(rotateCompassCount % 2 == 0){
            rotateCompassCount = 1;
            dir.rotation.y += THREE.Math.degToRad(-90);
        }
       
  }
  else
      window.alert("Please change the direction before magnetizing");  
  }

function deMagnetizePin1(){

    Pin1Rubbed = 0;
    p1p1Count = 0;
    p1p2Count = 0;
    Pin1Stack.pop();
    Pin1Stack.pop();
    Pin1Direction = "--";
    

      if(!magnetizingPin1Forward) {
    
        floatPin1 = false;
        rubCountPin1 = false;
        magnetizedPin1Forward = false;
        magnetizingPin1Forward = false;
        
       
    }
   
    else {
           window.alert("Wait for the current action to be finished!");       
     }


     if(!magnetizingPin1Backward) {
        floatPin1 = false;
        rubCountPin1 = false;
        magnetizedPin1Backward = false;
        magnetizingPin1Backward = false;
        window.alert('Pin1 Demagnetized');
   
    } 
          else {
           window.alert("Wait for the current action to be finished!");       
     }
     
}


function deMagnetizePin2(){

      Pin2Rubbed = 0;
      p2p1Count = 0;
      p2p2Count = 0;
      Pin2Stack.pop();
      Pin2Stack.pop();
      Pin2Direction = "--";

    if(!magnetizingPin2Forward) {
        floatPin2 = false;
        rubCountPin2 = false;
        magnetizedPin2Forward = false;
        magnetizingPin2Forward = false;
        
  
    } 

     else {
            window.alert("Wait for the current action to be finished!");       
       }
    
     if(!magnetizingPin2Backward) {
        floatPin2 = false;
        rubCountPin2 = false;
        magnetizedPin2Backward = false;
        magnetizingPin2Backward = false;
        window.alert('Pin2 Demagnetized');
        
    } 
          else {
            window.alert("Wait for the current action to be finished!");       
       }


}


function FloatPin1() {

      if (yPole == 'S') {
            if(!magnetizingPin1Forward) {
       pin1.rotation.z += Math.PI/4;
      // cork1.rotation.y += Math.PI/4;
       pin1.position.set(pin1X-1.4, pin1Y-0.5, pin1Z);
       floatPin1 = true;
    }
      else if (!magnetizingPin1Backward) {
          pin1.rotation.z -= Math.PI/4;
            //  cork1.rotation.y += Math.PI/4;
                  pin1.position.set(pin1X-1.4, pin1Y-0.5, pin1Z);
                  floatPin1 = true;
      }

            else {
        window.alert("Wait for the pin to be magnetized!");
    }
      }

      else if (yPole == 'N') {
            if(!magnetizingPin1Forward) {
       pin1.rotation.z -= Math.PI/4;
       pin1.position.set(pin1X-1.4, pin1Y-0.5, pin1Z);
       floatPin1 = true;
    }
      else if (!magnetizingPin1Backward) {
            pin1.rotation.z += Math.PI/4;
                  pin1.position.set(pin1X-1.4, pin1Y-0.5, pin1Z);
                  floatPin1 = true;
      }

            else {
        window.alert("Wait for the pin to be magnetized!");
    }
      }

}

function FloatPin2() {
  if (yPole == 'S') {
            if(!magnetizingPin2Forward) {
       pin2.rotation.z += Math.PI/8;
       pin2.position.set(pin2X+1.4, pin2Y-0.5, pin2Z);
       floatPin2 = true;
    } else if (magnetizingPin2Backward) {

            pin2.rotation.z -= Math.PI/4;
                  pin2.position.set(pin2X+1.4, pin2Y-0.5, pin2Z);
                  floatPin2 = true;

    }
      else {
        window.alert("Wait for the pin to be magnetized!");
    }
      }

      if (yPole == 'N') {
            if(!magnetizingPin2Forward) {
       pin2.rotation.z -= Math.PI/4;
       pin2.position.set(pin2X+1.4, pin2Y-0.5, pin2Z);
       floatPin2 = true;
    } 
      else if (magnetizingPin2Backward) {

            pin2.rotation.z += Math.PI/4;
                  pin2.position.set(pin2X+1.4, pin2Y-0.5, pin2Z);
                  floatPin2 = true;

    }
      else {
        window.alert("Wait for the pin to be magnetized!");
    }
      }
}


function magnetizePin1Forward() {

	if(yPole == 'S'){
		 if(!floatPin1 && !rubCountPin1) {
    	//Magnet.rotation.z = Math.PI*(1/5);
    	Magnet.position.set(myCenterX-0.5,myCenterY-0.05,-1);
        magnetizingPin1Forward = true;
    } 		
   		 else if (rubCountPin1) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}
	else if (yPole == 'N') {
		 if(!floatPin1 && !rubCountPin1) {
    	//Magnet.rotation.z = Math.PI*(6/5);
    	Magnet.position.set(myCenterX-0.5,myCenterY-0.05,-1);
        magnetizingPin1Forward = true;
    } 		
    	 else if (rubCountPin1) {
          window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}

   
}

function magnetizePin1Backward() {
	if(yPole == 'S' ){
		 if(!floatPin1 && !rubCountPin1) {
    	//Magnet.rotation.z = Math.PI*(1/5);
    	Magnet.position.set(myCenterX-0.05,myCenterY+0.05,-1);
        magnetizingPin1Backward = true;
    } 		
   		 else if (rubCountPin1) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }


	}
	else if (yPole == 'N') {
		 if(!floatPin1 && !rubCountPin1) {
    	//Magnet.rotation.z = Math.PI*(6/5);
    	Magnet.position.set(myCenterX-0.05,myCenterY+0.05,-1);
        magnetizingPin1Backward = true;
    } 		
    	 else if (rubCountPin1) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}

   
}

function magnetizePin2Forward() {

	if(yPole == "S"){
		 if(!floatPin2 && !rubCountPin2) {
    	//Magnet.rotation.z = Math.PI/6;
    	Magnet.position.set(myCenterX+0.11,myCenterY-0.05,-1);
        magnetizingPin2Forward = true;
    } 		
   else if (rubCountPin2) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}
	else if (yPole == "N") {
		 if(!floatPin2 && !rubCountPin2) {
    	//Magnet.rotation.z = Math.PI*(7/6);
    	Magnet.position.set(myCenterX+0.11,myCenterY-0.05,-1);
        magnetizingPin2Forward= true;
    } 		
    else if (rubCountPin2) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}


}


function magnetizePin2Backward() {

	if(yPole == "S"){
		 if(!floatPin2 && !rubCountPin2) {
    	//Magnet.rotation.z = Math.PI/6;
    	Magnet.position.set(myCenterX+0.55,myCenterY+0.05,-1);
        magnetizingPin2Backward = true;
    } 		
    else if (rubCountPin2) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}
	else if (yPole == "N") {
		 if(!floatPin2 && !rubCountPin2) {
    	//Magnet.rotation.z = Math.PI*(7/6);
    	Magnet.position.set(myCenterX+0.39,myCenterY+0.05,-1);
        magnetizingPin2Backward = true;
    } 		
    else if (rubCountPin2) {
        window.alert("Pin already magnetized in opposite direction");
       }

        else {
        window.alert("Cannot magnetize a floating pin!");
    }
	}


}




function initialiseScene()
{
    /* -------Initialise Scene Variables---------------*/
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;


}

function initialiseOtherVariables(){
	count = false;
	stopCount = false;
	

	pin1X = myCenterX-0.3;
	pin1Y = myCenterY-0.5;
	pin1Z = -2;

	pin2X = myCenterX+0.3;
	pin2Y = myCenterY-0.5;
	pin2Z = -2;


  flipped = false;
  magnetizedPin1Forward = false;
  magnetizedPin1Backward = false;
  magnetizedPin2Forward = false;
  magnetizedPin2Backward = false;
  floatPin1 = false;
  floatPin2 = false;
  magnetizingPin1Forward = false;
  magnetizingPin1Backward = false;
  magnetizingPin2Forward = false;
  magnetizingPin2Backward = false;
  yPole = 'S';

	nPosition = "Down";
	sPosition = "Up";

	headerRow = ["PIN", "Magnetized(%)", "RubDirection"];
}

function Magnet(){
	
		    texture = new THREE.TextureLoader().load( "magnet.jpg", function(texture) {
        var bodyGeom = new THREE.CubeGeometry(0.8,0.25,0.25);
        Magnet = new THREE.Mesh(bodyGeom, new THREE.MeshBasicMaterial({map: texture}));
        Magnet.rotation.z += Math.PI/2;
       // magnet.position.x -= 3;
       Magnet.position.set(myCenterX,myCenterY+1,-3);
       //Magnet.position.set(myCenterX+0.39,myCenterY+0.05,-1);
       //Magnet.position.set(myCenterX-0.05,myCenterY+0.05,-1);
        PIEaddElement(Magnet);
        var edges = new THREE.EdgesGeometry( bodyGeom );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        Magnet.add(line);
    });
	

}




/* -------------------------------------------Water---------------------------------------*/
function Water(){


				var groundGeometry = new THREE.PlaneBufferGeometry( 20,15,1,1);
				var groundMaterial = new THREE.MeshBasicMaterial( { color: 0xcccccc } );
				var ground = new THREE.Mesh( groundGeometry, groundMaterial );
				ground.rotation.x = Math.PI * -(1/2);
				ground.position.set(0.7,0,-3);
				PIEaddElement( ground );
				var textureLoader = new THREE.TextureLoader();
				textureLoader.load( 'waternormals.jpg', function( texture ) {
				texture.wrapS = THREE.RepeatWrapping;
				texture.wrapT = THREE.RepeatWrapping;
				texture.anisotropy = 16;
				texture.repeat.set( 4, 4 );
				groundMaterial.map = texture;
				groundMaterial.needsUpdate = true;
				} );
				PIErender();
}

/* ----------------------------Cork---------------------------- */
function Cork(){

		geometry = new THREE.CylinderBufferGeometry( 0.6, 0.6, 0.8, 8  );
		material = new THREE.MeshBasicMaterial( {color: 0x402009} );
		var cork = new THREE.Mesh( geometry, material );
		//cork.rotation.x = Math.PI * (1/9);

		cork.position.set(myCenterX,myCenterY-1,-3);

		return cork;
}


/* ------------------------------PINs------------------------------------------------ */
function Pin(){


		geometry = new THREE.CylinderBufferGeometry( 0.05, 0.05, 1.5, 64 );
		material = new THREE.MeshBasicMaterial({map: THREE.ImageUtils.loadTexture( 'pin.png' )});
		var pin = new THREE.Mesh( geometry, material );
		return pin;

}


	/*  -----------------------Compass Rose--------------------------------- */
function Compass(){

		loader = new THREE.TextureLoader();
		loader.load('dr.jpg', function (texture){
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 1, 1 );
			material = new THREE.MeshLambertMaterial( { map:texture}  );
			geometry = new THREE.CylinderGeometry( 0.4, 0.4, 0.1, 64,64);
			dir = new THREE.Mesh( geometry, material );
			//start.position.set(-0.9,2.1,-2.8);
			dir.receiveShadow=false;
			dir.rotation.x=THREE.Math.degToRad(90);
			//dir.rotation.y=THREE.Math.degToRad(90);
			//dir.rotation.z=THREE.Math.degToRad(45);

			dir.castshadow=false;
			PIEaddElement(dir);
			dir.position.set(myCenterX,myCenterY,-3);
			PIErender();
			});
}





function loadExperimentElements(){


  PIEsetExperimentTitle("Make your Magnetic Compass");
  PIEsetDeveloperName("Rahul Jain");



  /* initialise Scene */
  initialiseScene();

  /* initialise help and info content */
  initialiseHelp();
  initialiseInfo();

  /* initialise Other Variables */
  initialiseOtherVariables();



	/* ----------Background---------------- */
	  geometry = new THREE.PlaneGeometry( 100, 100, 32 );;
	  material = new THREE.MeshLambertMaterial( {color: 0xBBFFA8} );
	  var myBack = new THREE.Mesh( geometry, material );
	  myBack.position.set(myCenterX, myCenterY, -10);
	  myBack.receiveShadow = false;
	  PIEaddElement(myBack);
	  PIErender();

		Water();
		
		//redBar.visible = false;
		//blackBar.visible = false;
	

		


     texture = new THREE.TextureLoader().load( "bricks.png", function(texture) {
        var geometry = new THREE.BoxBufferGeometry( 1/15, 14, 0.3 );
        var material = new THREE.MeshBasicMaterial( {map: texture} );
        var leftBoundary = new THREE.Mesh( geometry, material );
        leftBoundary.position.set(myCenterX-4, myCenterY-0.7,-3);
        leftBoundary.rotation.x = Math.PI*(1/2 - 0.025);
        leftBoundary.rotation.z = -Math.PI/8;
        PIEaddElement( leftBoundary );
        var edges = new THREE.EdgesGeometry( leftBoundary );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        leftBoundary.add(line);
    });

      texture = new THREE.TextureLoader().load( "bricks.png", function(texture) {
          var geometry = new THREE.BoxBufferGeometry( 1/15, 14, 0.3 );
          var material = new THREE.MeshBasicMaterial( {map: texture} );
          var rightBoundary = new THREE.Mesh( geometry, material );
          rightBoundary.position.set(myCenterX+4, myCenterY-0.7,-3);
          rightBoundary.rotation.x = Math.PI*(1/2 - 0.025);
          rightBoundary.rotation.z = Math.PI/8;
          PIEaddElement( rightBoundary );
          var edges = new THREE.EdgesGeometry( rightBoundary );
          var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
          leftBoundary.add(line);
    });
   
      texture = new THREE.TextureLoader().load( "bricks.png", function(texture) {
          var geometry = new THREE.PlaneBufferGeometry( 8, 0.3, 32 );
          var material = new THREE.MeshBasicMaterial( {map: texture, side: THREE.DoubleSide} );
          var backBoundary = new THREE.Mesh( geometry, material );
          backBoundary.position.set(myCenterX, myCenterY-0.7,-3);
          PIEaddElement( backBoundary );
          var edges = new THREE.EdgesGeometry( backBoundary );
          var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
          backBoundary.add(line);
    });
   

    
/*
    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX-3.95,myCenterY-0.85,-3));
    geometry.vertices.push(new THREE.Vector3(myCenterX+3.95,myCenterY-0.85,-3));
    geometry.computeLineDistances();
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 0.2, linecap: 'round', linejoin:  'round'  });
    var backBottomEdge = new THREE.Line(geometry, material);
    PIEaddElement(backBottomEdge);

   
     var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX+3.95,myCenterY-0.55,-3));
    geometry.vertices.push(new THREE.Vector3(myCenterX+5,myCenterY-0.2,-3));
    geometry.computeLineDistances();
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 0.2, linecap: 'round', linejoin:  'round'  });
    var rightTopEdge = new THREE.Line(geometry, material);
    PIEaddElement(rightTopEdge);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX+3.95,myCenterY-0.85,-3));
    geometry.vertices.push(new THREE.Vector3(myCenterX+5,myCenterY-1.3,-3));
    geometry.computeLineDistances();
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 0.2, linecap: 'round', linejoin:  'round'  });
    var rightBottomEdge = new THREE.Line(geometry, material);
    PIEaddElement(rightBottomEdge);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX-3.95,myCenterY-0.85,-3));
    geometry.vertices.push(new THREE.Vector3(myCenterX-3.95,myCenterY-0.56,-3));
    geometry.computeLineDistances();
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 0.2, linecap: 'round', linejoin:  'round'  });
    var edge1 = new THREE.Line(geometry, material);
    PIEaddElement(edge1);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(myCenterX+3.95,myCenterY-0.85,-3));
    geometry.vertices.push(new THREE.Vector3(myCenterX+3.95,myCenterY-0.56,-3));
    geometry.computeLineDistances();
    var material = new THREE.LineBasicMaterial({ color: 0x000000, linewidth: 0.2, linecap: 'round', linejoin:  'round'  });
    var edge2 = new THREE.Line(geometry, material);
    PIEaddElement(edge2);
*/

		geometry = new THREE.CylinderBufferGeometry( 0.6, 0.6, 0.8, 8  );
		material = new THREE.MeshBasicMaterial( {color: 0xF0F156} );
		var corkStand = new THREE.Mesh( geometry, material );
		//cork.rotation.x = Math.PI * (1/9);

		corkStand.position.set(myCenterX,myCenterY-1,-3);
		PIEaddElement(corkStand);
		PIErender();


		

    resetExperiment();
    PIEstopAnimation();


		//PIEturnCamera(1, 1.2, 0.1);
		PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);

    document.getElementById("start").addEventListener("click", startanim);
    document.getElementById("stop").addEventListener("click", stopanim);
    
		/* -----------------Table---------------------*/
		PIEcreateTable("Observation Table", 3, 3, true);
		PIEupdateTableRow(0, headerRow);
		PIEupdateTableCell(1, 0, "Pin1");
		PIEupdateTableCell(1, 1, Pin1Rubbed*10 + "%");
		PIEupdateTableCell(1, 2, Pin1Direction);
		PIEupdateTableCell(2, 0, "Pin2");
		PIEupdateTableCell(2, 1, Pin2Rubbed*10 + "%");
		PIEupdateTableCell(2, 2, Pin2Direction);

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

function startanim(){
	stopCount = false;
  
  if (startCount == true) {
    initialiseControls();
    startCount = !startCount;
  }
	
	document.getElementById("stop").addEventListener("click", stopanim);
	
	

	PIErender();
}

function stopanim(){

	stopCount = true;
	
	document.getElementById("start").addEventListener("click", startanim);

	PIErender();
}

function magnetDrag(element, newpos){

  if (newpos.x >= 1.26 && newpos.x <= 2.60){
       Magnet.position.x = newpos.x;
  }
   
  if (newpos.y >= 1.35) {
      Magnet.position.y = newpos.y;
    }
    


    if (newpos.x >= 1.28 && newpos.x <= 1.48 && newpos.y-0.45 >= 0.95 && newpos.y-0.45 <= 1){
        console.log('p1p1');
        p1p1Count++;
        if(Pin1Stack.peek() != 1 && Pin1Stack.size() < 2){
          Pin1Stack.push(1);
        }
        
    }

    if (newpos.x >= 1.74 && newpos.x <= 1.94 && newpos.y-0.45 >= 1.02 && newpos.y-0.45 <= 1.07){
        console.log('p1p2');
        p1p2Count++;
        if(Pin1Stack.peek() !=2 && Pin1Stack.size() < 2){
          Pin1Stack.push(2);
        }
        
    }

    if (newpos.x >= 2 && newpos.x <= 2.2 &&  newpos.y-0.45 >= 0.93 && newpos.y-0.45 <= 0.98){
        console.log('p2p1');
        p2p1Count++;
        if(Pin2Stack.peek() != 1 && Pin2Stack.size() < 2){
          Pin2Stack.push(1);
        }
    }

    if (newpos.x >= 2.32 && newpos.x <= 2.52 && newpos.y-0.45 >= 0.99 && newpos.y-0.45 <= 1.06){
        console.log('p2p2');
        p2p2Count++;
        if(Pin2Stack.peek() !=2 && Pin2Stack.size() < 2){
          Pin2Stack.push(2);
        }
    }

    

    Magnet.position.z = -1;


}

	function resetExperiment(){
    Pin1Rubbed = 0;
    Pin2Rubbed = 0;
    p1p1Count = 0;
    p1p2Count = 0;
    p2p1Count = 0;
    p2p2Count = 0;
    Pin1Stack.pop();
    Pin1Stack.pop();
    Pin2Stack.pop();
    Pin2Stack.pop();
    Pin1Direction = "--";
    Pin2Direction = "--";

    i=0;
    j=0;
    PIEremoveElement(dir);
      /*-----Compass----------*/  
    loader = new THREE.TextureLoader();
    loader.load('dr.jpg', function (texture){
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 1, 1 );
      material = new THREE.MeshLambertMaterial( { map:texture}  );
      geometry = new THREE.CylinderGeometry( 0.4, 0.4, 0.1, 64,64);
      dir = new THREE.Mesh( geometry, material );
      //start.position.set(-0.9,2.1,-2.8);
      dir.receiveShadow=false;
      dir.rotation.x=THREE.Math.degToRad(10);
      //dir.rotation.y=THREE.Math.degToRad(90);
      //dir.rotation.z=THREE.Math.degToRad(45);

      dir.castshadow=false;
      PIEaddElement(dir);
      dir.position.set(myCenterX,myCenterY-1.2,0);
      PIErender();
      });


    if(rotateCompassCount != 1){
      dir.rotation.y += THREE.Math.degToRad(90*(rotateCompassCount-1));
       rotateCompassCount = 1;
    }
	 

    console.log('Reset');

    PIEstartAnimation();
    if(yPole == 'N'){
      yPole = 'S';
      Magnet.rotation.z -= Math.PI;
    }

    initialiseOtherVariables();

    

        PIEremoveElement(pin1);
        PIEremoveElement(pin2);
        PIEremoveElement(cork1);
        PIEremoveElement(cork2);
        PIEremoveElement(Magnet);
        

        

    cork1 = Cork();
    cork1.position.set(myCenterX-1.9,myCenterY-1.5,-3);
    PIEaddElement( cork1 );
    PIErender();


    cork2 = Cork();
    cork2.position.set(myCenterX+1.9,myCenterY-1.5,-3);
    PIEaddElement( cork2 );
    PIErender();


    pin1 = Pin();
    //pin1.rotation.z = Math.PI * (0.5);
    pin1.rotation.x = Math.PI * (0.5);
    pin1.rotation.z = Math.PI * (0.1);
    pin1.position.set(pin1X, pin1Y, pin1Z);
    PIEaddElement( pin1 );
    PIErender();


    pin2 = Pin();
    //pin2.rotation.z = Math.PI * (0.5);
    pin2.rotation.x = Math.PI * (0.5);
    pin2.rotation.z = Math.PI * (0.1);
    pin2.position.set(pin2X, pin2Y, pin2Z);
    PIEaddElement( pin2 );
    PIErender();

  /*-----------Magnet-----------*/
      texture = new THREE.TextureLoader().load( "magnet.jpg", function(texture) {
        var bodyGeom = new THREE.CubeGeometry(0.8,0.25,0.25);
        Magnet = new THREE.Mesh(bodyGeom, new THREE.MeshBasicMaterial({map: texture}));
        Magnet.rotation.z += Math.PI/2;
       // magnet.position.x -= 3;
       Magnet.position.set(myCenterX,myCenterY+1,-3);
       //Magnet.position.set(myCenterX+0.39,myCenterY+0.05,-1);
       //Magnet.position.set(myCenterX-0.05,myCenterY+0.05,-1);
        PIEaddElement(Magnet);
        
        PIEdragElement(Magnet);
        PIEsetDrag(Magnet, magnetDrag);
        
        var edges = new THREE.EdgesGeometry( bodyGeom );
        var line = new THREE.LineSegments( edges, new THREE.LineBasicMaterial( { color: 0x000 } ) );
        Magnet.add(line);
        PIErender();
    });
  
   
    

     if(!magnetizingPin1Forward) {
    
        floatPin1 = false;
        rubCountPin1 = false;
        magnetizedPin1Forward = false;
        magnetizingPin1Forward = false;
       
    }
    else {
        window.alert("Wait for the current action to be finished!");       
    } 
    

     if(!magnetizingPin1Backward) {
        floatPin1 = false;
        rubCountPin1 = false;
        magnetizedPin1Backward = false;
        magnetizingPin1Backward = false;
   
    } 
    else {
        window.alert("Wait for the current action to be finished!");       
    }


     if(!magnetizingPin2Forward) {
        floatPin2 = false;
        rubCountPin2 = false;
        magnetizedPin2Forward = false;
        magnetizingPin2Forward = false;
  
    } 
    else {
        window.alert("Wait for the current action to be finished!");       
    }



     if(!magnetizingPin2Backward) {
        floatPin2 = false;
        rubCountPin2 = false;
        magnetizedPin2Backward = false;
        magnetizingPin2Backward = false;
    } 
    else {
        window.alert("Wait for the current action to be finished!");       
    }

    
    

	
		 //PIEupdateTableCell(1, 2, "Down");
 	 	 //PIEupdateTableCell(2, 2, "Up");
		 PIErender();
	}


var ctr = 0, j=0, i=0;
	function updateExperimentElements(t,dt){

   


    if(p1p1Count != 0 && p1p2Count != 0 ){
        Pin1Rubbed++;
        p1p1Count = 0;
        p1p2Count = 0;
        if(Pin1Stack.peek() == 1){
          Pin1Direction = "Backward";
        }
        else if(Pin1Stack.peek() == 2){
          Pin1Direction = "Forward";
        }
        if (Pin1Rubbed < 10) {
          Pin1Rubbed++;
          PIEupdateTableCell(1, 1, Pin1Rubbed*10 + "%");
          PIEupdateTableCell(1, 2, Pin1Direction);
         
          console.log(Pin1Rubbed);
        }

    }

    if(p2p1Count != 0 && p2p2Count != 0 ){
      
        if(Pin2Stack.peek() == 1){
          Pin2Direction = "Backward";
        }
        else if(Pin2Stack.peek() == 2){
          Pin2Direction = "Forward";
        }
        p2p1Count = 0;
        p2p2Count = 0;
        if (Pin2Rubbed < 10) {
          Pin2Rubbed++;
          
          PIEupdateTableCell(2, 1, Pin2Rubbed*10 + "%");
          PIEupdateTableCell(2, 2, Pin2Direction); 
          console.log(Pin2Rubbed);
        }

    }
    
    if(Pin1Rubbed == 10){
      if (Pin1Stack.peek() == 1) {

          //Backward
              magnetizingPin1Backward = false;
              magnetizedPin1Backward = true; 
              Magnet.position.set(myCenterX,myCenterY+1,-3);         
              rubCountPin1 = true;
              Pin1Direction = "Backward";
              window.alert("Pin1 is magnetized Backward");
  
        }
        else if(Pin1Stack.peek() == 2){
          //Forward
            magnetizingPin1Forward = false;
            magnetizedPin1Forward = true;
            Magnet.position.set(myCenterX,myCenterY+1,-3);
            rubCountPin1 = true;
            Pin1Direction = "Forward";
            window.alert("Pin1 is magnetized Forward");
        }
        Pin1Rubbed = 0;
    }

    if(Pin2Rubbed == 10){
        if (Pin2Stack.peek() == 1) {
          //Backward
            magnetizingPin2Backward = false;
            magnetizedPin2Backward = true;
            Magnet.position.set(myCenterX,myCenterY+1,-3);  
            rubCountPin2 = true;
            Pin2Direction = "Backward";
             window.alert("Pin2 is magnetized Backward");

        }
        else if(Pin2Stack.peek() == 2){
          //Forward
            magnetizingPin2Forward = false;
            magnetizedPin2Forward = true;
            Magnet.position.set(myCenterX,myCenterY+1,-3);                 
            rubCountPin2 = true;
            Pin2Direction = "Forward";
            window.alert("Pin2 is magnetized Forward");
        }

        Pin2Rubbed = 0;
    }

		if(floatPin1) {
       if(magnetizedPin1Forward) {
            if(yPole == 'S') {
                if((cork1.rotation.y <= 0 && cork1.rotation.y >= -Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin1.rotation.z <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin1.rotation.z >= 0)) {
                    //cork.rotation.y += 0.008;

                    pin1ForwardSCount++;
                    cork1.rotation.y -= 0.008;
                    pin1.rotation.z += 0.008;
                }
            }
            else if(yPole == 'N') {
                if((cork1.rotation.y <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && cork1.rotation.y >= 0 && pin1.rotation.z <= 0 && pin1.rotation.z >= -Math.PI*((1/2)+(rotateCompassCount-1)/2))) {
                   // cork.rotation.y -= 0.008;
                   pin1ForwardNCount++;
                   cork1.rotation.y += 0.008;
                    
                    pin1.rotation.z -= 0.008;
                }
            }
        } 
        else if (magnetizedPin1Backward) {

            if(yPole == 'S') {
                  if((cork1.rotation.y <= Math.PI*((11/12)+(rotateCompassCount-1)/2) && cork1.rotation.y >= -Math.PI/2 && pin1.rotation.z <= Math.PI/2 && pin1.rotation.z >= -Math.PI*((1/2)+(rotateCompassCount-1)/2))) {
                    //cork.rotation.y += 0.008;
                    pin1BackwardSCount++;
                    cork1.rotation.y += 0.008;
                    pin1.rotation.z -= 0.008;
                }
            }
             else if(yPole == 'N') {
                  if((cork1.rotation.y <= Math.PI*(1/2) && cork1.rotation.y >= -Math.PI*((3/4)+(rotateCompassCount-1)/2) && pin1.rotation.z <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin1.rotation.z >= -Math.PI/2)) {
                   // cork.rotation.y -= 0.008;
                   pin1BackwardNCount++;
                    cork1.rotation.y -= 0.008;
                    pin1.rotation.z += 0.008;
                }
            }

        }

          else{
            //cork.rotation.y += 0.008;
            //pin1.rotation.z += 0.005;
            //cork1.rotation.y -= 0.005;
        }
        //Magnet.position.y = 0;
        //Magnet.rotation.z = 0;
        if(dualCount == false){
          Magnet.position.set(myCenterX,myCenterY+1,-3);
          dualCount = !dualCount;
        }
       
    }


    if(floatPin2) {
        if(magnetizedPin2Forward) {
            if(yPole == 'S') {
                if((cork2.rotation.y <= 0 && cork2.rotation.y >= -Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin2.rotation.z <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin2.rotation.z >= 0)) {
                    //cork.rotation.y += 0.008;

                    pin2ForwardSCount++;
                    cork2.rotation.y -= 0.008;
                    pin2.rotation.z += 0.008;
                }
            }
            else if(yPole == 'N') {
                if((cork2.rotation.y <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && cork2.rotation.y >= 0 && pin2.rotation.z <= 0 && pin2.rotation.z >= -Math.PI*((1/2)+(rotateCompassCount-1)/2))) {
                   // cork.rotation.y -= 0.008;
                   pin2ForwardNCount++;
                   cork2.rotation.y += 0.008;
                    
                    pin2.rotation.z -= 0.008;
                }
            }
        } 
        else if (magnetizedPin2Backward) {

            if(yPole == 'S') {
                  if((cork2.rotation.y <= Math.PI*((11/12)+(rotateCompassCount-1)/2) && cork2.rotation.y >= -Math.PI/2 && pin2.rotation.z <= Math.PI/2 && pin2.rotation.z >= -Math.PI*((1/2)+(rotateCompassCount-1)/2))) {
                    //cork.rotation.y += 0.008;
                    pin2BackwardSCount++;
                    cork2.rotation.y += 0.008;
                    pin2.rotation.z -= 0.008;
                }
            }
             else if(yPole == 'N') {
                  if((cork2.rotation.y <= Math.PI*(1/2) && cork2.rotation.y >= -Math.PI*((3/4)+(rotateCompassCount-1)/2) && pin2.rotation.z <= Math.PI*((1/2)+(rotateCompassCount-1)/2) && pin2.rotation.z >= -Math.PI/2)) {
                   // cork.rotation.y -= 0.008;
                   pin2BackwardNCount++;
                    cork2.rotation.y -= 0.008;
                    pin2.rotation.z += 0.008;
                }
            }

        }

          else{
            //cork.rotation.y += 0.008;
            //pin2.rotation.z += 0.005;
           // cork2.rotation.y -= 0.005;
        }
        //Magnet.position.y = 0;
        //Magnet.rotation.z = 0;
        
          if(dualCount == true){
          Magnet.position.set(myCenterX,myCenterY+1,-3);
          dualCount = !dualCount;
        }
        
    }

    if(magnetizingPin1Forward && !rubCountPin1) {
        if(i<10) {
            Magnet.position.x += 5/100;
            Magnet.position.y += 1/100;
        } 
        else if(i > 100) {
            j += 1;
            Pin1Direction = "Forward";
            Pin1Rubbed += 2; 
            PIEupdateTableCell(1, 1, Pin1Rubbed*10 + "%");
            PIEupdateTableCell(1, 2, Pin1Direction);
           	Magnet.position.set(myCenterX-0.5,myCenterY-0.05,-1);                       
            i=0;
        }

        if(j == 5) {
            magnetizingPin1Forward = false;
            magnetizedPin1Forward = true;
           // Magnet.rotation.z = Math.PI*(+1/2);
           // Magnet.visible = false;
           	Magnet.position.set(myCenterX,myCenterY+1,-3);         
            j=0;
            rubCountPin1 = true;
        }

        i += 1;
        
    } else if(magnetizingPin1Backward && !rubCountPin1) {
        		if(i<10) {
           			 Magnet.position.x -= 5/100;
            		 Magnet.position.y -= 1/100;
        } 
        		else if(i > 100) {
            		j += 1;
                Pin1Direction = "Backward";
                Pin1Rubbed += 2; 
                PIEupdateTableCell(1, 1, Pin1Rubbed*10 + "%");
                PIEupdateTableCell(1, 2, Pin1Direction);
           			Magnet.position.set(myCenterX-0.05,myCenterY+0.05,-1);                      
            		i=0;
        }

        	if(j == 5) {
           	 magnetizingPin1Backward = false;
           	 magnetizedPin1Backward = true;
           //  Magnet.rotation.z = Math.PI*(+1/2);
           // Magnet.visible = false;
           	 Magnet.position.set(myCenterX,myCenterY+1,-3);         
           	 j=0;
             rubCountPin1 = true;
        }

        i += 1;
        
    }

    if(magnetizingPin2Forward) {
        if(i<10) {
            Magnet.position.x += 5/100;
            Magnet.position.y += 1/100;
        } 
        else if(i > 100) {
            j += 1;
            Pin2Direction = "Forward";
            Pin2Rubbed += 2; 
            PIEupdateTableCell(2, 1, Pin2Rubbed*10 + "%");
            PIEupdateTableCell(2, 2, Pin2Direction);
           	Magnet.position.set(myCenterX+0.11,myCenterY-0.05,-1);                      
            i=0;
        }

        if(j == 5) {
            magnetizingPin2Forward = false;
            magnetizedPin2Forward = true;
           // Magnet.rotation.z = Math.PI*(+1/2);
           // Magnet.visible = false;
           	Magnet.position.set(myCenterX,myCenterY+1,-3);        
            j=0;
            rubCountPin2 = true;
        }

        i += 1;
        
    }	
    else if (magnetizingPin2Backward) {

    	if(i<10) {
            Magnet.position.x -= 5/100;
            Magnet.position.y -= 1/100;
        } 
        else if(i > 100) {
            j += 1;
            Pin2Direction = "Backward";
            Pin2Rubbed += 2; 
            PIEupdateTableCell(2, 1, Pin2Rubbed*10 + "%");
            PIEupdateTableCell(2, 2, Pin2Direction);
           	Magnet.position.set(myCenterX+0.55,myCenterY+0.05,-1);                     
            i=0;
        }

        if(j == 5) {
            magnetizingPin2Backward = false;
            magnetizedPin2Backward = true;
          //  Magnet.rotation.z = Math.PI*(+1/2);
           // Magnet.visible = false;
           
                Magnet.position.set(myCenterX,myCenterY+1,-3);  
              
           
               
            j=0;
            rubCountPin2 = true;
        }

        i += 1;
    }
}