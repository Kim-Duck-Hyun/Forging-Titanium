var Twisti = {};
Twisti.baseAzimuth = 0;

(function() {
	var camera, scene, renderer, geometry, material, mesh;
	
	var init = function() {
		var frontMaterial = [new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture( 'front.jpg' )})];
		var backMaterial  = [new THREE.MeshBasicMaterial({map:THREE.ImageUtils.loadTexture( 'back.jpg' )})];
		var sideMaterial  = [new THREE.MeshBasicMaterial({color:0xdddddd})];
		
	    camera = new THREE.PerspectiveCamera( 35, 1, 1, 10000);
	    camera.position.z = 1000;
	
	    scene = new THREE.Scene();
	    var materials = [];
		for ( var i = 0; i < 6; i ++ ) {
			switch(i) {
				case 4:
					materials.push(frontMaterial);
					break;
				case 5:
					materials.push(backMaterial);
					break;
				default:
					materials.push(sideMaterial);
					break;
			}
		}
	    
	    geometry = new THREE.CubeGeometry( 231, 450, 18, 1, 1, 1, materials );
	    mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial() );
	    mesh.overdraw = true;
	    scene.add( mesh );
	
	    renderer = new THREE.CanvasRenderer();
	    renderer.setSize( window.innerWidth, window.innerHeight );
		//renderer.setSize( 320, 320 );
	    document.body.appendChild( renderer.domElement );
	    
	    Ti.App.addEventListener('app:updateRotation', function(e) {
	    	if (e.calibrate) {
	    		Twisti.baseAzimuth = -1 * e.azimuth;
	    	}
	    	mesh.rotation.x = -1 * e.pitch;
	    	mesh.rotation.y = -1 * (Twisti.baseAzimuth + e.azimuth);
	    	mesh.rotation.z = -1 * e.roll;
	    });
	};
	
	var animate = function() {
	    requestAnimationFrame( animate );
	    renderer.render( scene, camera );
	};
	
	Twisti.createScene = function() {
		init();
		animate();
	};
})();

