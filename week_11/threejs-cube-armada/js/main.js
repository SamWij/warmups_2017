
var app = app || {};

app.step = 0;

app.numCubes = 2000;
app.cubeDistribution = 300;

app.numParticles = 100;
app.particleDistribution = 300;

app.lastMouseTime = Date.now();

app.cameraPositionIndex = 0;

app.controller = {
  rotationSpeed: 0.02,
  bouncingSpeed: 0.02
};


app.randRange = function( min, max ){

  var range = max - min;
  return min + Math.random() * range;

};

app.init = function () {
  console.log('hello (my) w0rld');

  app.scene = new THREE.Scene();

  app.width = window.innerWidth;
  app.height = window.innerHeight;

  var randomPoints = [];
  for (var i = 0; i < 10; i++) {
    randomPoints.push(new THREE.Vector3(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250
    ));  }

    app.spline = new THREE.CatmullRomCurve3( randomPoints );


  // Define what the browser is looking at; 4 parameters
  // field of view
  // screen ratio
  // how close to render things
  // how far to render things
  app.camera = new THREE.PerspectiveCamera(60, app.width/app.height, 0.1, 5000 );

  app.camera.position.x = -3.5;
  app.camera.position.y = -110;
  app.camera.position.z = -640;

  // Where is the camera looking?
  app.camera.lookAt( app.scene.position );

  app.renderer = new THREE.WebGLRenderer();

  // if you don't have WebGL
  // app.renderer = new THREE.SoftwareRenderer();

  app.renderer.setSize( app.width, app.height );
  app.renderer.setClearColor( 0x000000 ); //background
  // app.renderer.shadowMap.enabled = true; // disabled by default
  // app.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  //
  // app.axes = new THREE.AxisHelper( 40 );
  // app.scene.add( app.axes );

  //
  // var planeGeometry = new THREE.PlaneGeometry( 120, 20 ); // width, length
  // var planeMaterial = new THREE.MeshLambertMaterial({
  //   color: 0xCFD8DC  // a kind of boring gray
  // });
  //
  // app.plane = new THREE.Mesh( planeGeometry, planeMaterial );
  //
  // app.plane.rotation.x = -0.5 * Math.PI;  // don't ask, just obey
  //
  // app.plane.position.x = 15;
  // app.plane.position.y = 0;
  // app.plane.position.z = 0;
  //
  // // if you have WebGL
  // // app.plane.receiveShadow = true;
  //
  // app.scene.add( app.plane );



//
//
//
// var smaterial = new THREE.LineBasicMaterial({
//     color: 0xff00f0,
// });
//
// var sgeometry = new THREE.Geometry();
// var splinePoints = app.spline.getPoints(10000);
//
// for(var i = 0; i < splinePoints.length; i++){
//     sgeometry.vertices.push(splinePoints[i]);
// }
//
// app.line = new THREE.Line(sgeometry, smaterial);
// app.scene.add(app.line);
//
//
//


  var cubeGeometry = new THREE.BoxGeometry( 4, 4, 4 ); // width, height, breadth/depth
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xFF8F00,
    wireframe: false
  });

  app.cube = new THREE.Mesh( cubeGeometry, cubeMaterial);

  app.cube.position.set( -10, 0, 0 ); //set x,y,z position in one line
  // app.cube.castShadow = true; // only for WebGL aristocracy

  app.scene.add( app.cube );


  var sphereGeometry = new THREE.SphereGeometry( 8, 30, 30 );

  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    wireframe: false,
    map: THREE.ImageUtils.loadTexture("img/earth.jpg"),
    // side: THREE.BackSide
  });

  app.sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );

  app.sphere.position.set( 0, 0, 0 );
  // app.sphere.castShadow = true; //webGL only

  app.scene.add( app.sphere );


  var cloudGeometry = new THREE.SphereGeometry( 8.1, 32, 32);
  var cloudMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: false,
    map: THREE.ImageUtils.loadTexture("img/cloudmap.jpg"),
    opacity: 0.3,
    transparent: true,
    depthWrite: false
  });

  app.clouds = new THREE.Mesh( cloudGeometry, cloudMaterial );
  app.clouds.position.set(0, 0, 0);
  app.scene.add( app.clouds );


  app.particleSystem = app.createParticleSystem();
  app.scene.add( app.particleSystem );

  app.cubeFleet = app.createCubes( app.numCubes, app.cubeDistribution );

  // console.log('cube array', app.cubeFleet);

  app.cubeFleet.forEach(function ( cube ) {
    app.scene.add( cube );
  })


  app.light = new THREE.AmbientLight(); //soft white light from everywhere
  app.light.color.set( 0x999999 );
  app.scene.add( app.light );


  app.spotlight = new THREE.SpotLight( 0xFFFFFF );
  app.spotlight.position.set( -10, 60, 10 );
  // app.spotlight.castShadow = true;
  // app.spotlight.shadow.mapSize.width = 2048;
  // app.spotlight.shadow.mapSize.height = 2048;

  app.scene.add( app.spotlight );


  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );


  app.gui = new dat.GUI();
  app.gui.add( app.controller, 'rotationSpeed', 0, 0.2 );
  app.gui.add( app.controller, 'bouncingSpeed', 0, 0.2 );

  app.renderer.domElement.addEventListener('mousemove', function () {
    app.lastMouseTime = Date.now();
  });


  // Put the three.js canvas element into our page DOM
  document.getElementById("output").appendChild( app.renderer.domElement );

  // actually render something
  // app.renderer.render( app.scene, app.camera  );

  app.stats = app.addStats();

  app.animate();

}; // init


app.animate = function () {

  app.stats.update();

  if( (Date.now() - app.lastMouseTime) > 15000 ){

    app.cameraPositionIndex++;
    if( app.cameraPositionIndex > 10000 ){
      app.cameraPositionIndex = 0;
    }

    var cpos = app.spline.getPoint( app.cameraPositionIndex / 3000 );
    var crot = app.spline.getTangent( app.cameraPositionIndex / 3000 );
    app.camera.position.set( cpos.x, cpos.y, cpos.z );
    app.camera.rotation.set( crot.x, crot.y, crot.z );

    //app.camera.lookAt( app.spline.getPoint( (app.cameraPositionIndex + 1)/30000 ));
    app.camera.lookAt( app.scene.position );

  }

  app.sphere.rotation.y += app.controller.rotationSpeed;
  app.clouds.rotation.y += app.controller.rotationSpeed * 1.5;


  app.step += app.controller.bouncingSpeed; //increment

  // app.sphere.position.x = 20 + (10 * Math.cos( app.step ));
  // app.sphere.position.y = 5 + (10 * ( Math.sin( app.step )) );


  app.cube.rotation.x += app.controller.rotationSpeed;
  app.cube.rotation.y += app.controller.rotationSpeed;
  app.cube.rotation.z += app.controller.rotationSpeed;

  app.animateParticles();

  app.animateCubes();


  app.renderer.render( app.scene, app.camera );

  requestAnimationFrame( app.animate );

};

app.addStats = function () {
  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.left = '0px';
  stats.domElement.style.top = '0px';

  document.getElementById("stats").appendChild( stats.domElement );

  return stats;
};


app.onResize = function () {
  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);
};

window.addEventListener("resize", app.onResize, false);


app.createParticleSystem = function () {

  // We will treat particles as individual vertices (points) in a generic Geometry
  var particles = new THREE.Geometry();

  for (var p = 0; p < app.numParticles; p++) {

    var x = app.randRange(-app.particleDistribution, app.particleDistribution);
    var y = app.randRange(-app.particleDistribution, app.particleDistribution);
    var z = 120; //app.randRange(-app.particleDistribution, app.particleDistribution);

    var particle = new THREE.Vector3(x, y, z);

    particle.vx = 0; //app.randRange(-0.2, 0.2);
    particle.vy = 0; //app.randRange(-0.2, 0.2);
    particle.vz = 0; //app.randRange(-0.2, 0.2);


    particles.vertices.push( particle );

  } //for

  var particleMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 12,
    map: THREE.ImageUtils.loadTexture("img/snowflake.png"),
    blending: THREE.AdditiveBlending,
    transparent: true,
    alphaTest: 0.5
  });

  var particleSystem = new THREE.Points( particles, particleMaterial );

  return particleSystem;
};


app.animateParticles = function () {

  var vertices = app.particleSystem.geometry.vertices;

  for (var i = 0; i < vertices.length; i++) {
    var vert = vertices[i];

    var dist = Math.sqrt( (vert.x * vert.x) + (vert.y * vert.y) + (vert.z * vert.z) );

    // if( dist < 4.0 ) continue; // black hole earth effect

    var force = -0.05 * (5.0 / (dist * dist) );

    vert.vx += force * vert.x;
    vert.vy += force * vert.y;
    vert.vz += force * vert.z;

    vert.x += vert.vx;
    vert.y += vert.vy;
    vert.z += vert.vz;


    // if( vert.y < -app.particleDistribution ){
    //   vert.y = app.particleDistribution;
    // }
    //
    // vert.y -= 0.8;

  }

  app.particleSystem.geometry.verticesNeedUpdate = true;

};

app.createCubes = function( cubeCount, placementRange ){

  var cubes = new Array( cubeCount );

  for (var i = 0; i < cubes.length; i++) {
    var cube = cubes[i];

    // console.log('cube create', i);

    var cubeSize = app.randRange(2, 20);

    var cubeGeometry = new THREE.BoxGeometry( cubeSize, cubeSize, cubeSize ); // width, height, breadth/depth
    var cubeMaterial = new THREE.MeshLambertMaterial({
      wireframe: false
    });

    cubes[i] = new THREE.Mesh( cubeGeometry, cubeMaterial);

    cubes[i].position.set(
      app.randRange( - placementRange, placementRange ),
      app.randRange( - placementRange, placementRange ),
      30 //app.randRange( - placementRange, placementRange )
    );

    cubes[i].material.color.setRGB( Math.random(), Math.random(), Math.random()  );
    cubes[i].rotate_step = app.randRange( -0.1, 0.1 );

  }
  return cubes;

};


app.animateCubes = function () {
  for (var i = 0; i < app.cubeFleet.length; i++) {
    var cube = app.cubeFleet[i];

    // Hue-based colour-cycling
    var hsl = cube.material.color.getHSL();
    cube.material.color.setHSL( (hsl.h + 0.003)%1.0, 1.0, 0.5 );

    cube.rotation.x += cube.rotate_step;
    cube.rotation.y += cube.rotate_step;
    cube.rotation.z += cube.rotate_step;

    // uncomment BOTH of the following lines to get a shifting sine wave made of cubes
    // comment out BOTH of the following lines to get a 2D wall of cubes
    // comment out JUST the SECOND line to get a stretching-shrinking walls of cubes
    cube.position.x = Math.sin( app.step ) * cube.rotate_step * 10000;
    cube.position.y = Math.cos( app.step + cube.rotate_step*200 ) * cube.rotate_step * 10000;



  }
};


window.onload = app.init; // no jquery, booo
