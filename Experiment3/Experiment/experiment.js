
var mySceneTLX;        /* Top Left corner X coordinate */
var mySceneTLY;        /* Top Left corner Y coordinate */
var mySceneBRX;        /* Bottom Right corner X coordinate */
var mySceneBRY;        /* Bottom Right corner Y coordinate */
var mySceneW;          /* Scene Width */
var mySceneH;          /* Scene Height */
var myCenterX;         /* Scene Center X coordinate */
var myCenterY;         /* Scene Center Y coordinate */
var value;
/* Room Variables */
var leftB;              /* Left Barrier */
var rightB;             /* Right Barrier */
var bottomB;            /* Bottom Barrier */
var topB;               /* Top Barrier */
var backB=-4.0;         /* Back Barrier */
var wallThickness;      /* Wall Thickness */

/* Variables*/
var ConvexLens
var ConcaveLens
var planoConvex;
var planoConcave;
var cpow = '-1.0 D', vpow = '+1.0 D';
var pvpow = '+1.0 D', pcpow = '-1.0 D';
var ccpow=-1.0,vvpow=+1,spow=0.0,cnt=0,sum=0;
var pvvpow = +1.0, pccpow = -1.0;
var cplus;
var cminus;
var cbut;
var ctextpow;
var vtextpow;
var pvtextpow;
var pctextpow;
var tctextpow = [];
var tvtextpow = [];
var tpvtextpow = [];
var tpctextpow = [];
var tc=0,tv=0,tpv=0,tpc=0;
var cratio=0.5;
var lenh1,lenh2;
var xpos=1.5,xpos1=1.5;
var vbut,vminus,vplus;
var vlens;
var flen1,flen2;
var clens1;
var out; var reset;
var mflag=0,obflag=0;
var final,final1,final2;
var rem;
var myobj={},j=0,tot;
var startCount = true;
var deleteIdentifier = 0;
var Pole = 1.8;
var resetCount = 0;

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

	// push function
	push(element)
	{
    // push element into the items
    this.items.push(element);
	}
    
}
var stack = new Stack();
var cCount=0, vCount=0;

/* ------------Control Variables -----------*/
var ConcavePower;           
var ConvexPower;
var PlanoConvexPower;
var PlanoConcavePower;          

var ConcavePowerDefault;     
var ConvexPowerDefault;
var PlanoConvexPowerDefault;
var PlanoConcavePowerDefault;       

var ConcavePowerMin;        
var ConcavePowerMax;         
var ConvexPowerMin;         
var ConvexPowerMax;
var PlanoConvexPowerMin;
var PlanoConvexPowerMax;
var PlanoConcavePowerMin;
var PlanoConcavePowerMax;          

var ConcavePowerStep;          
var ConvexPowerStep;
var PlanoConvexPowerStep;
var PlanoConcavePowerStep;          

var control;

/* For Table */
var num = 0, type = 'Plane', power = '1.0 D';
var headerRow;
var tableTitle = "Power Timeline";
var tableCreated = true;


/*------------Ray Diagram ------------*/
var lampBottom1;
var lampBulb1;
var lampBottom2;
var lampBulb2;
var light1, light2;
var incidentRay1, arrowHelper1;
var incidentRay2, arrowHelper2;
var combineCount;

//Concave-Concave
var realRay1, virtualRay1, image1;
var lens2Xpos;
var realRay2, realReflectedRay2, virtualRay2, image2;
var finalIncidentRay1, finalArrowHelper1;
var finalIncidentRay2, finalArrowHelper2;
var finalRealRay, finalVirtualRay, finalImage;
var ccCount = 0;

//Convex-Convex
var vvFinalIncidentRay2;
var convex1Focus, convex2Focus;
var vvRealRay1, vvImage1, vvVirtualRay1;
var vvVirtualRay2, vvImage2;
var finalConvexFocus;
var vvFinalRealRay, vvFinalImage;
var vvCount = 0;

//Concave-Convex
var cvRealRay2, cvRealReflectedRay2, cvRealReflectedRay3;
var cvImage;
var cvCount = 0;

var slider;

//Convex-Concave
var vcRealRay1, vcRealRay2;
var vcCount = 0;

//Plane Lens
var planeLens;
var planeFinalRay;




function initialiseControlVariables()
{
    /* Labels */
    ConcavePower = "ConcavePower";                  /* X Position Slider Label */
    ConvexPower = "ConvexPower";                  /* Y Position Slider Label */
   	PlanoConvexPower = "PlanoConvexPower";
   	PlanoConcavePower = "PlanoConcavePower";

    /* Default (initial) Values */
    ConcavePowerDefault = -1;        /* X Position Slider Default Value */
   	ConvexPowerDefault = 1;        /* Y Position Slider Default Value */
    PlanoConvexPowerDefault = 1;
    PlanoConcavePowerDefault = -1;


    /* Slider Limits */
    ConcavePowerMin = -3;   /* X Position Slider Minimum Value */
    ConcavePowerMax = -1;  /* X Position Slider Maximum Value */
    ConvexPowerMin = 1; /* Y Position Slider Minimum Value */
    ConvexPowerMax = 3;    /* Y Position Slider Maximum Value */
    PlanoConvexPowerMin = 1;
    PlanoConvexPowerMax = 3;
    PlanoConcavePowerMin = -3;
    PlanoConcavePowerMax = -1;

    /* Slider Steps */
    ConcavePowerStep = 1;                 /* X Position Slider Step */
    ConvexPowerStep = 1;                  /* Y Position Slider Step */
    PlanoConvexPowerStep = 1;
    PlanoConcavePowerStep = 1;

    control = ["Select Concave","Select Convex","Add PConvex","Add PConcave","Combine"];
}


function initialiseControls()
{
    initialiseControlVariables();
    /* Create Input Panel */
    

    slider = PIEaddInputSlider(ConcavePower, ConcavePowerDefault, handleConcavePower, ConcavePowerMin, ConcavePowerMax, ConcavePowerStep);
    PIEaddInputSlider(ConvexPower, ConvexPowerDefault, handleConvexPower, ConvexPowerMin, ConvexPowerMax, ConvexPowerStep);
    
    /* Create Display Panel */
    PIEaddDisplayText(ConcavePower, ConcavePowerDefault);
    PIEaddDisplayText(ConvexPower, ConvexPowerDefault);
    
   	
   	PIEaddDualCommand(control[0], addConcave);
   	PIEaddDualCommand(control[1], addConvex);
   	//PIEaddDualCommand(control[2], addPlanoConvex);
   	//PIEaddDualCommand(control[3], addPlanoConcave);
   	PIEaddDualCommand(control[4], combineLens);
}

function myLensDrag(element, newpos)
{
   var lensX = newpos.x;
   
   var lensY = newpos.y;
   
   var lensZ = newpos.z;
   var lens = element;
   console.log(newpos+element);
   lens.position.set(lensX, lensY, lensZ);
}

function handleConcavePower(newValue){
		
		if(ccpow!=-3 && newValue < ccpow){
             		ccpow = newValue;
             		cpow= ccpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(ctextpow);
					ctextpow= new THREE.Mesh(text,material);
					ctextpow.position.set(-0.9,2.5,-3);
					PIEaddElement(ctextpow);
					vlens.scale.set(0.3*Math.abs(ccpow),2.5,1);
					PIErender();
	});

             	}
        if(ccpow!=-1 && newValue > ccpow){
             		ccpow = newValue;
             		cpow= ccpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(ctextpow);
					ctextpow= new THREE.Mesh(text,material);
					ctextpow.position.set(-0.9,2.5,-3);
					PIEaddElement(ctextpow);
					vlens.scale.set(0.3*Math.abs(ccpow),2.5,1);
					PIErender();});
             	}
}

function handleConvexPower(newValue){
	if(vvpow!=3 && newValue > vvpow){
					vvpow = newValue; 
					            	
             		vpow= '+'+vvpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(vtextpow);
					vtextpow= new THREE.Mesh(text,material);
					vtextpow.position.set(3.1,2.5,-3);
					PIEaddElement(vtextpow);
					lenh1.scale.set(0.55*vvpow,5,1);
             	lenh2.scale.set(0.55*vvpow,5,1);
					PIErender();
	});

             }
    if(vvpow!=1 && newValue < vvpow){
					vvpow = newValue; 
					//console.error(-1);            	
             		vpow= '+'+vvpow.toString()+'.0 D';
             		var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					PIEscene.remove(vtextpow);
					vtextpow= new THREE.Mesh(text,material);
					vtextpow.position.set(3.1,2.5,-3);
					PIEaddElement(vtextpow);
					lenh1.scale.set(0.55*vvpow,5,1);
             	lenh2.scale.set(0.55*vvpow,5,1);
					PIErender();
	});

             }
}


function addConcave(){
	if(cnt!=2 && startCount == true){
				if(cCount <= 2){
					stack.push('c');
					cCount++;
				}

				
				
				deleteIdentifier = 1;
             	rem.position.set(xpos+0.4,1.1,-2);
             	obflag=1;
             	sum+=ccpow;
             	val=ccpow;
             	cpow= ccpow.toString()+'.0 D';

             	myobj['obj'+j]=vlens.clone();
             	PIEaddElement(myobj['obj'+j]);
             	
             	if(ccpow == -1){
             		
             		myobj['obj'+j].position.set(xpos,1,-3);
             		myobj['obj'+j].scale.set(0.3*Math.abs(ccpow),2.5,1);
             	}
             	else if( ccpow == -2 ){
             		myobj['obj'+j].position.set(xpos-0.15,1,-3);
             		myobj['obj'+j].scale.set(0.3*Math.abs(ccpow),2.5,1);
             	}
             		 else if( ccpow == -3 ){
             		 	myobj['obj'+j].position.set(xpos-0.2,1,-3);
             			myobj['obj'+j].scale.set(0.3*Math.abs(ccpow),2.5,1);
             		 }
             	
             

             	var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(cpow, {size: 0.05,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					//PIEscene.remove(vtextpow);
					tctextpow[tc]= new THREE.Mesh(text,material);
					tctextpow[tc].position.set(xpos-0.1,0.8,-3);
					PIEaddElement(tctextpow[tc]);
					tc++;
	



		num++;
		type = 'Concave';
		power = cpow;			
		PIEupdateTableCell(num, 0, num);
		PIEupdateTableCell(num, 1, type);
		PIEupdateTableCell(num, 2, power);

             	xpos+=0.35;
             	lens2Xpos = xpos;
             	
             	cnt++;
             	j++;
             	PIErender();
	});
             }
     
}

function addConvex(){
	if(cnt!=2 && startCount == true){
				if(vCount <= 2){
					stack.push('v');
					vCount++;
				}

				
				deleteIdentifier = 2;
             	rem.position.set(xpos+0.4,1.1,-2);
             	obflag=2;
             	myobj['obj'+j]=lenh1.clone();
             	myobj['obj'+(j+1)]=lenh2.clone();
             	PIEaddElement(myobj['obj'+j]);
             	PIEaddElement(myobj['obj'+(j+1)]);
             	if(true){
             		
             		myobj['obj'+j].position.set(xpos,1.5,-3.0);
             		myobj['obj'+(j+1)].position.set(xpos,1.5,-3.0);
             		myobj['obj'+j].scale.set(0.55*vvpow,5,1);
             		myobj['obj'+(j+1)].scale.set(0.55*vvpow,5,1);
             	}
             	/*
             	else if( vvpow == 2 ){
             		myobj['obj'+j].position.set(xpos-0.15,1.5,-3.0);
             		myobj['obj'+(j+1)].position.set(xpos-0.15,1.5,-3.0);
             		myobj['obj'+j].scale.set(0.55*vvpow,5,1);
             		myobj['obj'+(j+1)].scale.set(0.55*vvpow,5,1);
             	}
             		 else if( vvpow == 3 ){
             		 	myobj['obj'+j].position.set(xpos-0.2,1.5,-3.0);
             			myobj['obj'+(j+1)].position.set(xpos-0.2,1.5,-3.0);
             			myobj['obj'+j].scale.set(0.55*vvpow,5,1);
             			myobj['obj'+(j+1)].scale.set(0.55*vvpow,5,1);
             		 }
				*/
             	
             	xpos+=0.35;
             	lens2Xpos = xpos;
             	PIErender();
             	cnt++;
             	sum+=vvpow;
             	j+=2;
             	val=vvpow;
             	vpow= vvpow.toString()+'.0 D';
             	var loader= new THREE.FontLoader();
	 				var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 				function ( font ) {
					var text = new THREE.TextGeometry(vpow, {size: 0.05,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
					var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
					//PIEscene.remove(vtextpow);
					tvtextpow[tv]= new THREE.Mesh(text,material);
					tvtextpow[tv].position.set(xpos-0.5,0.8,-3);
					PIEaddElement(tvtextpow[tv]);
					tv++;
					PIErender();

		num++;
		type = 'Convex';
		power = vpow;			
		PIEupdateTableCell(num, 0, num);
		PIEupdateTableCell(num, 1, type);
		PIEupdateTableCell(num, 2, power);
					});
             }
     
}


function combineLens(){

        if(mflag>0 && startCount == true){
             		PIEscene.remove(tot);
             		PIEscene.remove(final);
             		PIEscene.remove(final1);
             		PIEscene.remove(final2);
             	}
             	mflag++;
             	var loader= new THREE.FontLoader();
	 			var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 			function ( font ) {
				var text = new THREE.TextGeometry(sum.toString()+'.0 D', {size: 0.1,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
				var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
				tot= new THREE.Mesh(text,material);
				tot.position.set(1.35,-0.7,-2.9);
				if(startCount == true){
					PIEaddElement(tot);
				}
				
				PIErender();
		
		if(sum<0){
			type = 'Concave';
		}
		else if(sum>0){
			type = 'Convex';
		}
			 else if(sum == 0){
			 	type = 'Plane';
			 }
		power = pvpow;
		if(startCount == true){
			PIEupdateTableCell(3, 0, "--");
			PIEupdateTableCell(3, 1, "Result");
			PIEupdateTableCell(3, 2, sum+'.0 D');
		}		
		
			});
        if(sum==0 && startCount == true){
        			combineCount = true;
             			var	material = new THREE.MeshLambertMaterial( { color:0xffffff}  );
						var geometry = new THREE.BoxGeometry( 0.25,1,0.02 );
    					final = new THREE.Mesh( geometry, material );
    					PIEaddElement(final); final.position.set(1.5,0,-3.0);
             	}
        else if(sum>0 && startCount == true){
        	combineCount = true;
             			final1=lenh1.clone();
             			final2=lenh2.clone();
             			PIEaddElement(final1);
             			PIEaddElement(final2);
             			final1.position.set(1.5,0,-3.0);
             			final2.position.set(1.5,0,-3.0);
             			final1.scale.set(0.5*sum,5,1);
             			final2.scale.set(0.5*sum,5,1);
             			PIErender();
             	}
        else if(sum<0 && startCount == true){
        	combineCount = true;
             	final=vlens.clone();
             	PIEaddElement(final);
             	if(sum == -1){
             		final.position.set(1.53,-0.5,-3);
             		final.scale.set(0.3*Math.abs(1.5),2.5,1);
             	}
             	else if( sum == -2){
             		final.position.set(1.5,-0.5,-3);
             		final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}
             	else if(sum == -3){
             			final.position.set(1.4,-0.5,-3);
             			final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}     else if( sum == -4){
             				final.position.set(1.3,-0.5,-3);
             				final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}			else if( sum == -5){
             					final.position.set(1.2,-0.5,-3);
             					final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}				else if( sum == -6){
             						final.position.set(1.1,-0.5,-3);
             						final.scale.set(0.3*Math.abs(sum),2.5,1);
             	}


             	
             	}
        if(startCount == false){
     	window.alert("Please Start the Experiment");
     }
             
}
function initialiseScene()
{
    /* Initialise Scene Variables */
    mySceneTLX = 0.0;
    mySceneTLY = 3.0;
    mySceneBRX = 4.0;
    mySceneBRY = 0.0;
    mySceneW   = (mySceneBRX - mySceneTLX);
    mySceneH   = (mySceneTLY - mySceneBRY);
    myCenterX  = (mySceneTLX + mySceneBRX) / 2.0;
    myCenterY  = (mySceneTLY + mySceneBRY) / 2.0;
}

function initialiseOtherVariables()
{
	headerRow = ["Lens", "Type", "Power"];
	combineCount = false;
}

var lens;
function loadExperimentElements(){
var geometry;
var material;
var loader;
var texture;
	PIEsetExperimentTitle("Multiple lenses together");
    PIEsetDeveloperName("Rahul Jain");
    initialiseHelp();
    initialiseInfo();
    initialiseControls();
    /* initialise Scene */
    initialiseScene();
    

    /* initialise Other Variables */
    initialiseOtherVariables();
    /* Back */
    geometry = new THREE.BoxGeometry( mySceneW * 2*10, mySceneH * 2, wallThickness );
    material = new THREE.MeshLambertMaterial( {color: 0x44ABDA} );
    myBack = new THREE.Mesh( geometry, material );
    myBack.position.set(myCenterX, myCenterY, -5);
    myBack.receiveShadow = true;
    PIEaddElement(myBack);

     /* Instantiate experiment controls */
   

    /* Reset all positions */
    resetExperiment();
    startCount = true;

    PIEsetAreaOfInterest(mySceneTLX, mySceneTLY, mySceneBRX, mySceneBRY);
   geometry = new THREE.SphereBufferGeometry(0.1,32,32,0,Math.PI/2);
   material =new THREE.MeshLambertMaterial({color:0xcccccc});
   lenh1= new THREE.Mesh(geometry,material);
   lenh1.scale.set(0.3,1.5,1);
  	PIEdragElement(lenh1);


   PIEaddElement(lenh1);
   lenh1.position.set(4,2.6,-3);
   lenh2= new THREE.Mesh(geometry,material);
   PIEaddElement(lenh2);
   lenh2.rotation.z+=Math.PI;
   lenh2.position.set(4,2.6,-3);
   lenh2.scale.set(0.5,5,1);
   lenh1.scale.set(0.5,5,1);
   //lens = new THREE.Mesh(lenh1, lenh2);
   //PIEdragElement(new THREE.Mesh(lenh1,lenh2));
   //PIEaddElement(lens);
   PIEdragElement(lenh2);
 
  

   var lens2=new THREE.Shape();
   lens2.moveTo(0,0);
   lens2.bezierCurveTo(0,0,0.2,0,0.4,0);
   lens2.bezierCurveTo(0.4,0,0.1,0.2,0.4,0.4);
   lens2.bezierCurveTo(0.4,0.4,0.2,0.4,0,0.4);
   lens2.bezierCurveTo(0,0.4,0.4,0.2,0,0);
   var extrudeSettings = { amount: 0.02, bevelEnabled: false, steps: 2 };

	var geometry = new THREE.ExtrudeGeometry( lens2, extrudeSettings );
 	vlens = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial({color:0xcccccc}) );
	vlens.position.set(-0.2,2.1,-3);
	vlens.scale.set(0.3,2.5,1);
	PIEaddElement(vlens);	
	PIEdragElement(vlens);
   //PIEsetDrag(ConcaveLens, myLensDrag);

 
loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry('Concave lens', {
		size: 0.1,
		height: 0.05,
		curveSegments : 2,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		var textV= new THREE.Mesh(text,material);

		textV.position.set(-0.65,3.3,-3);
		PIEaddElement(textV);
		PIErender();
	});	


loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry('Convex lens', {
		size: 0.1,
		height: 0.05,
		curveSegments : 2,
		font : font,
		weight: 'normal' ,
		style: 'normal',
	});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		var  textV1= new THREE.Mesh(text,material);

		textV1.position.set(3.6,3.3,-3);
		PIEaddElement(textV1);
		PIErender();
	});	





	/*----------- Buttons -----------*/
	 
	 var loader = new THREE.TextureLoader();
	 loader.load('reset.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1, 1 );
		material = new THREE.MeshLambertMaterial( { map:texture,color:0xffffff}  );
	geometry = new THREE.BoxGeometry( 0.2,0.2,0.02 );
    reset = new THREE.Mesh( geometry, material );
    reset.position.set(1.7,3.5,-3);
    //PIEaddElement(reset);
    PIErender();
	});
	


	
	
	loader.load('Delete.png',function(texture){
		texture.wrapS = texture.wrapT = THREE.RepeatWrapping; 
		texture.repeat.set( 1,1 );
		material = new THREE.MeshLambertMaterial( { map:texture}  );
	geometry = new THREE.BoxGeometry( 0.2,0.2,0.01 );
    rem = new THREE.Mesh( geometry, material );
    rem.position.set(1.5,4,2);
    rem.receiveShadow=false;
    PIEaddElement(rem);
    PIErender();
	});

	
		
		

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10,1.5,-3.0));
	geometry.vertices.push(new THREE.Vector3(10,1.5,-3.0));
	geometry.computeLineDistances();
	var material = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.1, gapSize: 0.05, linewidth: 3 });
	var mesh = new THREE.Line(geometry, material);
	PIEaddElement(mesh);
	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-10,0,-3.0));
	geometry.vertices.push(new THREE.Vector3(10,0,-3.0));
	geometry.computeLineDistances();
	var material = new THREE.LineDashedMaterial({ color: 0xffffff, dashSize: 0.1, gapSize: 0.05, linewidth: 3 });
	var mesh = new THREE.Line(geometry, material);
	PIEaddElement(mesh);

	
	
	document.getElementById('stop').addEventListener('click', function(){ startCount = true; console.log(startCount)});
	document.getElementById('start').addEventListener('click', function(){ startCount = false; console.log(startCount)});

	var mouse = new THREE.Vector2(), INTERSECTED;
  	raycaster = new THREE.Raycaster();
   	document.addEventListener('click',Mouseclick);

}

function Mouseclick(event){
	event.preventDefault();
	var intersects;
	PIEraycaster.setFromCamera(PIEmouseP, PIEcamera);
	intersects = PIEraycaster.intersectObjects(PIEscene.children);

	if ( intersects.length > 0 ){
           
   		 if(intersects[0].object==rem&&(obflag==1||obflag==2)){
             	rem.position.set(xpos,2.2,10); 
             	xpos-=0.35;
             	lens2Xpos = xpos+0.35;
             	cnt--;

            PIEupdateTableCell(num, 0, num);
			PIEupdateTableCell(num, 1, "");
			PIEupdateTableCell(num, 2, "");
			num--;

			if(cCount != 0){
				cCount--;
				stack.pop();
			}
			else if(vCount != 0){
				vCount--;
				stack.pop();
			}

			if(cCount+vCount == 2){
				if(stack.peek() == 'c'){
					cCount--;
					stack.pop();
				}
				else if(stack.peek() == 'v'){
					vCount--;
					stack.pop();
				}
			}

			


             	if(deleteIdentifier == 1){
             		
                		PIEscene.remove(tctextpow[tc-1]);
             		
             	}
             	else if(deleteIdentifier == 2){
             		
             		PIEscene.remove(tvtextpow[tv-1]);
             	
             	}	 
             		  else if(deleteIdentifier == 3){
             		  	
             		  	PIEscene.remove(tpvtextpow[tpv-1]);
             		  
             		  }
             		  		else if(deleteIdentifier == 4){
             		  			
             		  			PIEscene.remove(tpctextpow[tpv-1]);
             		  		
             		  		}
             	       	
             	
             		if(obflag==1){
             			sum-=val;
             			PIEscene.remove(myobj['obj'+(j-1)]);
             			j--;
             		}
             		else if(obflag==2){
             			sum-=val;
             			PIEscene.remove(myobj['obj'+(j-1)]);
             			PIEscene.remove(myobj['obj'+(j-2)]);
             			j-=2;
             		}
             		obflag=0;
             }

             if(intersects[0].object==reset){
             	
             	
             	resetExperiment();
             }
             
	}
	PIErender();

}


function resetExperiment()
{	
	

	ccpow = -1;
	vvpow = 1;
	
	startCount = true;
	console.log(startCount);
	//document.getElementById("start").innerHTML = 'stop';
	//document.getElementById("stop").innerHTML = 'start';
    /* initialise Other Variables */
    initialiseOtherVariables();

    for(var i=0; i<tc; i++){
    	PIEscene.remove(tctextpow[i]);
    }

    for(var i=0; i<tv; i++){
    	PIEscene.remove(tvtextpow[i]);
    }

	tc = 0;
	tv = 0;
	
	if(resetCount != 0){
		PIEscene.remove(light1,light2);
		PIEscene.remove(incidentRay1, arrowHelper1);
		PIEscene.remove(incidentRay2, arrowHelper2);
		PIEscene.remove(realRay1, virtualRay1, image1);
		PIEscene.remove(realRay2, realReflectedRay2, virtualRay2, image2);
		PIEscene.remove(finalIncidentRay1, finalArrowHelper1);
		PIEscene.remove(finalIncidentRay2, finalArrowHelper2);
		PIEscene.remove(finalRealRay, finalVirtualRay, finalImage);
		PIEscene.remove(vvFinalIncidentRay2);
		PIEscene.remove(convex1Focus, convex2Focus);
		PIEscene.remove(vvRealRay1, vvImage1, vvVirtualRay1);
		PIEscene.remove(vvVirtualRay2, vvImage2);
		PIEscene.remove(finalConvexFocus);
		PIEscene.remove(vvFinalRealRay, vvFinalImage);
		PIEscene.remove(cvRealRay2, cvRealReflectedRay2, cvRealReflectedRay3, cvImage);
		PIEscene.remove(vcRealRay1, vcRealRay2);
		PIEscene.remove(planeLens, planeFinalRay);

	}
	
	
	if (tableCreated == true) {
		PIEcreateTable(tableTitle, 4, 3, true);
		PIEupdateTableRow(0, headerRow);
		tableCreated = false;
	}
	
	num = 0;
    type = "";
    power = "";
	
		for(var i = 1; i<4; i++){
			PIEupdateTableCell(i, 0, i);
			PIEupdateTableCell(i, 1, "");
			PIEupdateTableCell(i, 2, "");
		}
		PIEupdateTableCell(3, 0, "--");
		PIEupdateTableCell(3, 1, "Result");
		PIEupdateTableCell(3, 2, "");

		PIEupdateTable();

    try{
    vlens.scale.set(0.3,2.5,1);
    lenh1.scale.set(0.5,5,1);
    lenh2.scale.set(0.5,5,1);
    rem.position.set(1.5,3.0,2);	
    }
    catch(err){

    }
    /* Back */
   // myBack.position.set(myCenterX, myCenterY, backB - (wallThickness / 2));
    sum=0;cnt=0,xpos=1.5,j=0;
	 ccpow=-1.0,vvpow=+1;
	 
	 cpow= ccpow.toString()+'.0 D';
	 pcpow= pccpow.toString()+'.0 D';
	
   var loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(cpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(ctextpow);
		ctextpow= new THREE.Mesh(text,material);
		ctextpow.position.set(-0.9,2.5,-3);
		PIEaddElement(ctextpow);
		PIErender();
	});

	loader= new THREE.FontLoader();
	 var font = loader.load('fonts/helvetiker_bold.typeface.json',
	 	function ( font ) {
		var text = new THREE.TextGeometry(vpow, {size: 0.15,height: 0.05,curveSegments : 2,	font : font,weight: 'normal',style: 'normal',});
		var material = new THREE.MeshBasicMaterial( { color: 0x000000 } );
		PIEscene.remove(vtextpow);
		vtextpow= new THREE.Mesh(text,material);
		vtextpow.position.set(3.1,2.5,-3);
		PIEaddElement(vtextpow);
		PIErender();

	});

	
	


	 PIEscene.remove(final);
	 PIEscene.remove(final1);
	 PIEscene.remove(final2);
	 PIEscene.remove(tot);
	 mflag=0;
	
	 for(var i=0;i<10;i++){
	 	PIEscene.remove(myobj['obj'+i]);
	 	PIErender();
	 }

	 /*--------------------------------------Concave-Concave Combination ----------------*/
	var lampBottomGeom1 = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 12);
    lampBottom1 = new THREE.Mesh(lampBottomGeom1, new THREE.MeshPhongMaterial({color: "grey", shininess: 0}));
    lampBottom1.position.set(-2,1.5,-3);
    PIEaddElement(lampBottom1);

    var lampBulbGeom1 = new THREE.SphereGeometry(0.2, 10, 24);
    lampBulbGeom1.translate(0, 0.2, 0);
    lampBulb1 = new THREE.Mesh(lampBulbGeom1, new THREE.MeshPhongMaterial({color: "white", shininess: 5000}));
    lampBottom1.add(lampBulb1);

    var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	light1 = new THREE.Mesh( geometry, material );
	light1.position.set(-2,1.9,-3);
	PIEaddElement( light1 );
	light1.visible = false;

    var lampBottomGeom2 = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 12);
   	lampBottom2 = new THREE.Mesh(lampBottomGeom2, new THREE.MeshPhongMaterial({color: "grey", shininess: 0}));
    lampBottom2.position.set(-2,0,-3);
    PIEaddElement(lampBottom2);

    var lampBulbGeom2 = new THREE.SphereGeometry(0.2, 10, 24);
    lampBulbGeom2.translate(0, 0.2, 0);
    lampBulb2 = new THREE.Mesh(lampBulbGeom2, new THREE.MeshPhongMaterial({color: "white", shininess: 5000}));
    lampBottom2.add(lampBulb2);

    var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
	var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
	light2 = new THREE.Mesh( geometry, material );
	light2.position.set(-2,0.4,-3);
	PIEaddElement( light2 );
	light2.visible = false;

    

/*-------------Incident Rays -------------------*/
    var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-2,1.9,-3));
	geometry.vertices.push(new THREE.Vector3(xpos+0.04,1.9,-3));
	geometry.computeLineDistances();
	var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.05, linecap: 'round', linejoin:  'round'  });
	incidentRay1 = new THREE.Line(geometry, material);
	PIEaddElement(incidentRay1);
	incidentRay1.visible = false;


	var from = new THREE.Vector3( -1,1.9,-3);
	var to = new THREE.Vector3( 0,1.9,-3 );
	var direction = to.clone().sub(from);
	var length = direction.length();
	arrowHelper1 = new THREE.ArrowHelper(direction.normalize(), from, length, 0xffffff );
	PIEaddElement( arrowHelper1 );
	arrowHelper1.visible = false;
	

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-2,1.9,-3));
	geometry.vertices.push(new THREE.Vector3(4.8,1.12,-3));
	geometry.computeLineDistances();
	var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 0.05, linecap: 'round', linejoin:  'round'  });
	incidentRay2 = new THREE.Line(geometry, material);
	PIEaddElement(incidentRay2);
	incidentRay2.visible = false;


 
	var from = new THREE.Vector3( -2,1.9,-3);
	var to = new THREE.Vector3( xpos-2,1.72,-3);
	var direction = to.clone().sub(from);
	var length = direction.length();
	arrowHelper2 = new THREE.ArrowHelper(direction.normalize(), from, length, 0xffffff );
	PIEaddElement( arrowHelper2 );
	arrowHelper2.visible = false;

	
	/* ------- Text Backgrounds ------*/
	var backgr1= new THREE.Mesh(geometry = new THREE.BoxGeometry( 1,0.3,0.01),material = new THREE.MeshLambertMaterial( { color:0xffffff}  ));
	PIEaddElement(backgr1);
	backgr1.position.set(-0.2,3.35,-3);
	
	var backgr2= new THREE.Mesh(geometry = new THREE.BoxGeometry( 1,0.3,0.01),material = new THREE.MeshLambertMaterial( { color:0xffffff}  ));
	PIEaddElement(backgr2);
	backgr2.position.set(4,3.35,-3);

	



				

/*----------------Concave-Concave--------------------------*/
             	var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos+0.05,1.9,-3));
				geometry.vertices.push(new THREE.Vector3(xpos+0.4,2.12,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				realRay1 = new THREE.Line(geometry, material);
				PIEaddElement(realRay1);
				realRay1.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos+0.05,1.9,-3));
				geometry.vertices.push(new THREE.Vector3(xpos-0.72,1.5,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineDashedMaterial({color: 0xffffff, dashSize: 0.08, gapSize: 0.05, linewidth: 0.05  });
				virtualRay1 = new THREE.Line(geometry, material);
				PIEaddElement(virtualRay1);
				virtualRay1.visible = false;

				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
				image1 = new THREE.Mesh( geometry, material );
				image1.position.set(xpos-0.57,1.57,-3);
				PIEaddElement( image1 );
				image1.visible = false;

				
				
             	lens2Xpos = xpos+0.3;

             	


             	var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos-0.57,1.57,-3));
				geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.08,1.57,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				realRay2 = new THREE.Line(geometry, material);
				PIEaddElement(realRay2);
				realRay2.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.08,1.57,-3));
				geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.6,1.63,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				realReflectedRay2 = new THREE.Line(geometry, material);
				PIEaddElement(realReflectedRay2);
				realReflectedRay2.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.08,1.57,-3));
				geometry.vertices.push(new THREE.Vector3(xpos-0.6,1.5,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineDashedMaterial({color: 0xffffff, dashSize: 0.08, gapSize: 0.05, linewidth: 0.05  });
				virtualRay2 = new THREE.Line(geometry, material);
				PIEaddElement(virtualRay2);
				virtualRay2.visible = false;



				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				image2 = new THREE.Mesh( geometry, material );
				image2.position.set(xpos-0.28,1.53,-3);
				PIEaddElement( image2 );
				image2.visible = false;


				



	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-2,0.4,-3));
	geometry.vertices.push(new THREE.Vector3(xpos+0.05,0.4,-3));
	geometry.computeLineDistances();
	var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
	finalIncidentRay1 = new THREE.Line(geometry, material);
	PIEaddElement(finalIncidentRay1);
	finalIncidentRay1.visible = false;

	var from = new THREE.Vector3( -1,0.4,-3);
	var to = new THREE.Vector3( 0,0.4,-3 );
	var direction = to.clone().sub(from);
	var length = direction.length();
	finalArrowHelper1 = new THREE.ArrowHelper(direction.normalize(), from, length, 0xffffff );
	PIEaddElement( finalArrowHelper1 );
	finalArrowHelper1.visible = false;
	

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-2,0.4,-3));
	geometry.vertices.push(new THREE.Vector3(xpos+0.4,-0.03,-3));
	geometry.computeLineDistances();
	var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
	finalIncidentRay2 = new THREE.Line(geometry, material);
	PIEaddElement(finalIncidentRay2);
	finalIncidentRay2.visible = false;

	var geometry = new THREE.Geometry();
	geometry.vertices.push(new THREE.Vector3(-2,0.4,-3));
	geometry.vertices.push(new THREE.Vector3(4.4,-0.35,-3));
	geometry.computeLineDistances();
	var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
	vvFinalIncidentRay2 = new THREE.Line(geometry, material);
	PIEaddElement(vvFinalIncidentRay2);
	vvFinalIncidentRay2.visible = false;
 
	var from = new THREE.Vector3( -2,0.4,-3);
	var to = new THREE.Vector3( xpos-2,0.23,-3);
	var direction = to.clone().sub(from);
	var length = direction.length();
	finalArrowHelper2 = new THREE.ArrowHelper(direction.normalize(), from, length, 0xffffff );
	PIEaddElement( finalArrowHelper2 );
	finalArrowHelper2.visible = false;



				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos+0.2,0.4,-3));
				geometry.vertices.push(new THREE.Vector3(xpos+0.7,0.7,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				finalRealRay = new THREE.Line(geometry, material);
				PIEaddElement(finalRealRay);
				finalRealRay.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos+0.2,0.4,-3));
				geometry.vertices.push(new THREE.Vector3(xpos-0.35,0,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineDashedMaterial({color: 0xffffff, dashSize: 0.08, gapSize: 0.05, linewidth: 0.05  });
				finalVirtualRay = new THREE.Line(geometry, material);
				PIEaddElement(finalVirtualRay);
				finalVirtualRay.visible = false;


				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
				finalImage = new THREE.Mesh( geometry, material );
				finalImage.position.set(xpos-0.3,0.05,-3);
				PIEaddElement( finalImage );
				finalImage.visible = false;


/*------------------ Convex-Convex Combination ------------*/

             	incidentRay1.visible = true;
             	incidentRay2.visible = true;
            	

				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0x3ED715 } );
				convex1Focus = new THREE.Mesh( geometry, material );
				convex1Focus.position.set(3.2,1.5,-3);
				PIEaddElement( convex1Focus );
				convex1Focus.visible = false;

				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xFE2020 } );
				convex2Focus = new THREE.Mesh( geometry, material );
				convex2Focus.position.set(3.6,1.5,-3);
				PIEaddElement( convex2Focus );
				convex2Focus.visible = false; 

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(1.45,1.9,-3));
				geometry.vertices.push(new THREE.Vector3(5,1.07,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				vvRealRay1 = new THREE.Line(geometry, material);
				PIEaddElement(vvRealRay1);
				vvRealRay1.visible = false;

				var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
				vvImage1 = new THREE.Mesh( geometry, material );
				vvImage1.position.set(4.8,1.12,-3);
				PIEaddElement( vvImage1 );
				vvImage1.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(1.9,1.8,-3));
				geometry.vertices.push(new THREE.Vector3(3.6,1.3,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineDashedMaterial({color: 0xffffff, dashSize: 0.08, gapSize: 0.05, linewidth: 0.05  });
				vvVirtualRay1 = new THREE.Line(geometry, material);
				PIEaddElement(vvVirtualRay1);
				vvVirtualRay1.visible = false;

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(1.9,1.45,-3));
				geometry.vertices.push(new THREE.Vector3(3.5,1.48,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineDashedMaterial({color: 0xffffff, dashSize: 0.08, gapSize: 0.05, linewidth: 0.05  });
				vvVirtualRay2 = new THREE.Line(geometry, material);
				PIEaddElement(vvVirtualRay2);
				vvVirtualRay2.visible = false;

				var geometry = new THREE.CircleBufferGeometry( 0.05, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xFFA600 } );
				vvImage2 = new THREE.Mesh( geometry, material );
				vvImage2.position.set(3,1.465,-3);
				PIEaddElement( vvImage2 );
				vvImage2.visible = false;

				
             	var geometry = new THREE.CircleBufferGeometry( 0.03, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0x3ED715 } );
				finalConvexFocus = new THREE.Mesh( geometry, material );
				finalConvexFocus.position.set(3,0,-3);
				PIEaddElement( finalConvexFocus );
				finalConvexFocus.visible = false;

				

				var geometry = new THREE.Geometry();
				geometry.vertices.push(new THREE.Vector3(xpos+0.05,0.4,-3));
				geometry.vertices.push(new THREE.Vector3(5,-0.58,-3));
				geometry.computeLineDistances();
				var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
				vvFinalRealRay = new THREE.Line(geometry, material);
				PIEaddElement(vvFinalRealRay);
				vvFinalRealRay.visible = false;

				var geometry = new THREE.CircleBufferGeometry( 0.05, 32 );
				var material = new THREE.MeshBasicMaterial( { color: 0xFFA600 } );
				vvFinalImage = new THREE.Mesh( geometry, material );
				vvFinalImage.position.set(4.05,-0.3,-3);
				PIEaddElement( vvFinalImage );
				vvFinalImage.visible = false;

/*-------------------Concave-Convex--------------------------*/
 		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(xpos-0.57,1.57,-3));
		geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.08,1.57,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		cvRealRay2 = new THREE.Line(geometry, material);
		PIEaddElement(cvRealRay2);
		cvRealRay2.visible = false;

		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.1,1.57,-3));
		geometry.vertices.push(new THREE.Vector3(3.6,1.5,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		cvRealReflectedRay2 = new THREE.Line(geometry, material);
		PIEaddElement(cvRealReflectedRay2);
		cvRealReflectedRay2.visible = false;

		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(lens2Xpos+0.1,1.45,-3));
		geometry.vertices.push(new THREE.Vector3(3.7,1.7,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		cvRealReflectedRay3 = new THREE.Line(geometry, material);
		PIEaddElement(cvRealReflectedRay3);
		cvRealReflectedRay3.visible = false;

		var geometry = new THREE.CircleBufferGeometry( 0.04, 32 );
		var material = new THREE.MeshBasicMaterial( { color: 0xFFFF00} );
		cvImage = new THREE.Mesh( geometry, material );
		cvImage.position.set(2.55,1.55,-3);
		PIEaddElement( cvImage );
		cvImage.visible = false;



/*--------------Convex-Concave--------------------*/
		

        var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(1.9,1.8,-3));
		geometry.vertices.push(new THREE.Vector3(3.9,1.8,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		vcRealRay1 = new THREE.Line(geometry, material);
		PIEaddElement(vcRealRay1);
		vcRealRay1.visible = false;

		var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(1.9,1.45,-3));
		geometry.vertices.push(new THREE.Vector3(3.9,1.45,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		vcRealRay2 = new THREE.Line(geometry, material);
		PIEaddElement(vcRealRay2);
		vcRealRay2.visible = false;
		


/*-------------------Plane----------------------------*/
		var	material = new THREE.MeshLambertMaterial( { color:0xffffff}  );
		var geometry = new THREE.BoxGeometry( 0.25,1,0.02 );
    	planeLens = new THREE.Mesh( geometry, material );
    	PIEaddElement(planeLens); 
    	planeLens.position.set(1.5,0,-3.0);
    	planeLens.visible = false;

    	var geometry = new THREE.Geometry();
		geometry.vertices.push(new THREE.Vector3(-2,0.4,-3));
		geometry.vertices.push(new THREE.Vector3(5,0.4,-3));
		geometry.computeLineDistances();
		var material = new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 1, linecap: 'round', linejoin:  'round'  });
		planeFinalRay = new THREE.Line(geometry, material);
		PIEaddElement(planeFinalRay);
		planeFinalRay.visible = false;

        

		for(var i = 0; i< cCount+vCount; i++){
			stack.pop();
		}
	cCount=0;
	vCount=0;

	ccCount = 0;
	vvCount = 0;
	cvCount = 0;
	vcCount = 0;
	combineCount = false;
	
	light1.visible = false;
	light2.visible = false;
	incidentRay2.visible = false;
	arrowHelper2.visible = false;
	incidentRay1.visible = false;
	arrowHelper1.visible = false;
	realRay1.visible = false;
	virtualRay1.visible = false;
	image1.visible = false;
	realRay2.visible = false;
	realReflectedRay2.visible = false;
	virtualRay2.visible = false;
	image2.visible = false;
	

	
	finalIncidentRay2.visible = false;
	finalArrowHelper2.visible = false;
	finalIncidentRay1.visible = false;
	finalArrowHelper1.visible = false;
	finalRealRay.visible = false;
	finalVirtualRay.visible = false;
	finalImage.visible = false;

	
	

   resetCount++;
   cct = 0, ccc = 0;
   vvt = 0, vvc = 0;
   cvt = 0, cvc = 0;
   vct = 0, vcc = 0;
   pc = 0;
}

var cct = 0, ccc = 0;
var vvt = 0, vvc = 0;
var cvt = 0, cvc = 0;
var vct = 0, vcc = 0;
var pc = 0;
function updateExperimentElements(t, dt)
{
	//Concave-Concave
	if(cCount == 2){
		cct++;
		if( cct ==5 ){
		light1.visible = true;
		}
		if( cct == 25 ){
		
		incidentRay2.visible = true;
		arrowHelper2.visible = true;
		}
		if( cct == 45 ){
		incidentRay1.visible = true;
		arrowHelper1.visible = true;
	}
		if( cct == 65 ){
		realRay1.visible = true;
	}
		if( cct == 85){
		virtualRay1.visible = true;
	}
		if( cct == 105 ){
		image1.visible = true;
	}
		if( cct == 125){
		realRay2.visible = true;
	}
		if( cct == 145){
		realReflectedRay2.visible = true;
	}
		if( cct == 165){
		virtualRay2.visible = true;
	}
		if( cct == 185){
		image2.visible = true;
		cct =0;
	}
	}

	//Convex-Convex
	if( vCount == 2){
		vvt++;
		if( vvt ==5 ){
		light1.visible = true;

		}
		if( vvt == 25 ){
		convex1Focus.visible = true;
		convex2Focus.visible = true;
		incidentRay2.visible = true;
		arrowHelper2.visible = true;
		}
		if( vvt == 45 ){
		incidentRay1.visible = true;
		arrowHelper1.visible = true;
	}
		if( vvt == 65 ){
		vvRealRay1.visible = true;
	}
		if( vvt == 85){
		vvImage1.visible = true;
	}
		if( vvt == 105 ){
		vvVirtualRay1.visible = true;
	}
		if( vvt == 125 ){
		vvVirtualRay2.visible = true;
	}
		if( vvt == 145){
		vvImage2.visible = true;
		vvt =0;
	}
	
	}
	
	//Concave-Convex
	if( cCount == 1 && vCount == 1 && stack.peek() == 'v'){
		cvt++;
		if( cvt == 5 ){
		light1.visible = true;

		}
		if( cvt == 25 ){
		
		convex2Focus.visible = true;
		incidentRay2.visible = true;
		arrowHelper2.visible = true;
		}
		if( cvt == 45 ){
		incidentRay1.visible = true;
		arrowHelper1.visible = true;
	}
		if( cvt == 65 ){
		realRay1.visible = true;
	}
		if( cvt == 85){
		virtualRay1.visible = true;
	}
		if( cvt == 105 ){
		image1.visible = true;
	}
		if( cvt == 125 ){
		cvRealRay2.visible = true;
	}
		if( cvt == 145){
		cvRealReflectedRay2.visible = true;
	}
		if( cvt == 165){
		cvRealReflectedRay3.visible = true;
	}	
		if( cvt == 185){
		cvImage.visible = true;
		cvt = 0;
	}
	
	}

	//Convex-Concave
	if( cCount == 1 && vCount == 1 && stack.peek() == 'c'){
		vct++;
		if( vct == 5 ){
		light1.visible = true;

		}
		if( vct == 25 ){
		
		convex1Focus.visible = true;
		incidentRay2.visible = true;
		arrowHelper2.visible = true;
		}
		if( vct == 45 ){
		incidentRay1.visible = true;
		arrowHelper1.visible = true;
	}
		if( vct == 65 ){
		vvRealRay1.visible = true;
	}
		if( vct == 85){
		vvImage1.visible = true;
	}
		if( vct == 105 ){
		vcRealRay1.visible = true;
	}
		if( vct == 125 ){
		vcRealRay2.visible = true;
		vct = 0;
	}
		
	
	}

	if(combineCount){
		//Concave-Concave Combined
		if ( sum<0 ) {
			
			ccc++;
			if(ccc==195){
			light2.visible = true;
			finalIncidentRay2.visible = true;
			finalArrowHelper2.visible = true;

		}
			if(ccc==215){
			finalIncidentRay1.visible = true;
			finalArrowHelper1.visible = true;	
		}
			if(ccc==235){
			finalRealRay.visible = true;
		}
			if(ccc==255){
			finalVirtualRay.visible = true;
		}
			if(ccc==265){
			finalImage.visible = true;
			ccc=0;
		}
		

		}
		//Convex-Convex
		if( sum >0 ){
			
			vvc++;
			if(vvc==195){
			light2.visible = true;
			vvFinalIncidentRay2.visible = true;
			finalArrowHelper2.visible = true;
			finalConvexFocus.visible = true;

		}
			if(vvc==215){
			finalIncidentRay1.visible = true;
			finalArrowHelper1.visible = true;	
		}
			if(vvc==235){
			vvFinalRealRay.visible = true;
		}
			if(vvc==255){
			vvFinalImage.visible = true;
			vvc=0;
		}
			
		
	}
		//plane
		if(sum == 0){
			
			pc++;
			if( pc==195 ){
			light2.visible = true;

		}
			if( pc==215 ){
			planeFinalRay.visible = true;
			finalArrowHelper1.visible = true;
			pc=0;	
		}

		}
		

		
	}
	
}

var infoContent;
function initialiseInfo()
{
    infoContent =  "";
    infoContent = infoContent + "<h2>Multiple lenses together</h2>";
    infoContent = infoContent + "<h3>About the experiment</h3>";
    infoContent = infoContent + "<p>The experiment shows two types of lenses namely <b>Concave</b>, <b>Convex</b> which can be added to form a combination according to our choice of power.</p>";
    infoContent = infoContent + "<h3>Optical Power</h3>";
    infoContent = infoContent + "<p>Optical power (also referred to as dioptric power, refractive power, focusing power, or convergence power) is the degree to which a lens, mirror, or other optical system converges or diverges light.</p>";
    infoContent = infoContent + "<p>It is equal to the reciprocal of the focal length of the device: P = 1/f.High optical power corresponds to short focal length. The SI unit for optical power is the inverse metre (m^−1), which is commonly called the Dioptre(D).</p>";
    infoContent = infoContent + "<h3>Combination of lenses</h3>";
    infoContent = infoContent + "<p> For two thin lenses close together, the optical power of the combined lenses is approximately equal to the sum of the optical powers of each lens: P = P1 + P2</p>";
    infoContent = infoContent + "<p>Similarly, the optical power of a single lens is roughly equal to the sum of the powers of each surface. These approximations are commonly used in optometry.</p>";
    PIEupdateInfo(infoContent);
}

var helpContent;
function initialiseHelp()
{
    helpContent="";
    helpContent = helpContent + "<h2>Multiple lenses together help</h2>";
    helpContent = helpContent + "<h3>About the experiment</h3>";
    helpContent = helpContent + "<p>The experiment shows two types of lenses namely <b>Concave</b>, <b>Convex</b> which can be added to form a combination according to our choice of power.</p>";
    helpContent = helpContent + "<h3>Experiment control</h3>";
    helpContent = helpContent + "<p>There are two choices to select from<br> 1. Concave Lens <br>2. Convex lens </p>";
    helpContent = helpContent + "<h3>The setup stage</h3>";
    helpContent = helpContent + "<p>The initial state is setup stage. In this stage, you can see two types of lenses to add to the screen.</p>";
    helpContent = helpContent + "<ul><li>Select the combination of lenses as per choice before starting the experiment</li>";
    helpContent = helpContent + "<li>Click on the combine button to get the equivalent combination of lenses</li></ul>";
    helpContent = helpContent + "<h3>The animation stage</h3>";
    helpContent = helpContent + "<ol><li>Click on the Start button to start the Animation</li><li>Observe the ray diagram of the combination during the animation.</li></ol>";
 
    helpContent = helpContent + "<p>In addition you can reset the setup by pressing the reset button at the top of the start, pause and reset button panel.</p>";
    helpContent = helpContent + "<h3>Animation Controls</h3>";
    helpContent = helpContent + "<ul><li>Increase/decrease the power of respective lenses with the help of slider in the control panel.</li><li>Click on the Select buttons in the control panel to add the lenses to the timeline for combination</li><li>Click on the Combine button to get the result after combining lenses.</li></ul>";
    helpContent = helpContent + "<h3>Note: </h3><ul><li>You can add upto 2 lenses into the timeline for combination.</li><li>Yellow <span style = 'color:Yellow'><b>.(Dot)</b></span> in the ray diagram is the final image</li><li>Green <span style = 'color:Green'><b>.(Dot)</b></span> in the ray diagram is the focal point of lens 1</li><li>Orange <span style = 'color:Orange'><b>.(Dot)</b></span> in the ray diagram is the focal point of lens 2</li></ul>";
    helpContent = helpContent + "<h3>Learning: </h3><p> For two thin lenses close together, the optical power of the combined lenses is approximately equal to the sum of the optical powers of each lens: P = P1 + P2 </p>";
    helpContent = helpContent + "<h2>Happy Experimenting</h2>";
    PIEupdateHelp(helpContent);
}