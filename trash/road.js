road_size = 45
sky = 5
sidewalk = 1
building = 36
total_size = road_size + sky +sidewalk + building

// for declaring building types to render per bldg
building_types = []
for (var i = 0; i < building; i++) {
  building_types.push(Math.floor((Math.random()*4)+4))
}


function renderObjects(gl,aPosition,program){
  var square_position = [   // Coordinates
   // sidewalk
   -10.0,0.0,-10.0, 9.0,   10.0,0.0,-10.0, 9.0,   10.0,0.0, 10.0, 9.0,    -10.0,0.0, 10.0, 9.0,
   // south to north
   1.0,0.1,-7.0, 1.0,   -1.0,0.1,-7.0, 1.0,   -1.0,0.1, -9.0, 1.0,  1.0,0.1, -9.0, 1.0, 
   1.0,0.1,-5.0, 1.0,   -1.0,0.1,-5.0, 1.0,   -1.0,0.1, -7.0, 1.0,  1.0,0.1, -7.0, 1.0, 
   1.0,0.1,-3.0, 1.0,   -1.0,0.1,-3.0, 1.0,   -1.0,0.1, -5.0, 1.0,  1.0,0.1, -5.0, 1.0, 
   1.0,0.1,-1.0, 1.0,   -1.0,0.1,-1.0, 1.0,   -1.0,0.1, -3.0, 1.0,  1.0,0.1, -3.0, 1.0, 
   1.0,0.1,-1.0, 1.0,   -1.0,0.1,-1.0, 1.0,   -1.0,0.1, 1.0, 1.0,   1.0,0.1, 1.0, 1.0, 
   1.0,0.1,1.0,1.0,     -1.0,0.1,1.0,1.0,     -1.0,0.1,3.0,1.0,     1.0,0.1,3.0,1.0, 
   -1.0,0.1,3.0,1.0,    1.0,0.1,3.0,1.0,      1.0,0.1,5.0,1.0,      -1.0,0.1,5.0,1.0,   
   1.0,0.1,5.0,1.0,     -1.0,0.1,5.0,1.0,     -1.0,0.1,7.0,1.0,     1.0,0.1,7.0,1.0, 
   1.0,0.1,7.0,1.0,     -1.0,0.1,7.0,1.0,     -1.0,0.1,9.0,1.0,     1.0,0.1,9.0,1.0, 
   // center to right
   1.0,0.1,-1.0,1.0,    1.0,0.1,1.0,1.0,      3.0,0.1,1.0,1.0,      3.0,0.1,-1.0,1.0, 
   3.0,0.1,-1.0,1.0,    3.0,0.1,1.0,1.0,      5.0,0.1,1.0,1.0,      5.0,0.1,-1.0,1.0, 
   5.0,0.1,-1.0,1.0,    5.0,0.1,1.0,1.0,      7.0,0.1,1.0,1.0,      7.0,0.1,-1.0,1.0, 
   7.0,0.1,-1.0,1.0,    7.0,0.1,1.0,1.0,      9.0,0.1,1.0,1.0,      9.0,0.1,-1.0,1.0, 
   // center to left
   -1.0,0.1,-1.0,1.0,   -1.0,0.1,1.0,1.0,     -3.0,0.1,1.0,1.0,     -3.0,0.1,-1.0,1.0, 
   -3.0,0.1,-1.0,1.0,   -3.0,0.1,1.0,1.0,     -5.0,0.1,1.0,1.0,     -5.0,0.1,-1.0,1.0, 
   -5.0,0.1,-1.0,1.0,   -5.0,0.1,1.0,1.0,     -7.0,0.1,1.0,1.0,     -7.0,0.1,-1.0,1.0, 
   -7.0,0.1,-1.0,1.0,   -7.0,0.1,1.0,1.0,     -9.0,0.1,1.0,1.0,     -9.0,0.1,-1.0,1.0,
   // top to left
   -1.0,0.1,-7.0, 1.0,   -1.0,0.1,-9.0, 1.0,   -3.0,0.1, -9.0, 1.0,  -3.0,0.1, -7.0, 1.0, 
   -3.0,0.1,-7.0, 1.0,   -3.0,0.1,-9.0, 1.0,   -5.0,0.1, -9.0, 1.0,  -5.0,0.1, -7.0, 1.0, 
   -5.0,0.1,-7.0, 1.0,   -5.0,0.1,-9.0, 1.0,   -7.0,0.1, -9.0, 1.0,  -7.0,0.1, -7.0, 1.0, 
   -7.0,0.1,-7.0, 1.0,   -7.0,0.1,-9.0, 1.0,   -9.0,0.1, -9.0, 1.0,  -9.0,0.1, -7.0, 1.0, 
   // upper left to center
   -7.0,0.1,-7.0, 1.0,   -9.0,0.1, -7.0, 1.0,  -9.0,0.1,-5.0, 1.0,   -7.0,0.1, -5.0, 1.0,  
   -7.0,0.1,-5.0, 1.0,   -9.0,0.1, -5.0, 1.0,  -9.0,0.1,-3.0, 1.0,   -7.0,0.1, -3.0, 1.0,  
   -7.0,0.1,-3.0, 1.0,   -9.0,0.1, -3.0, 1.0,  -9.0,0.1,-1.0, 1.0,   -7.0,0.1, -1.0, 1.0,  
   // top to right
   1.0,0.1,-7.0, 1.0,   1.0,0.1,-9.0, 1.0,   3.0,0.1, -9.0, 1.0,  3.0,0.1, -7.0, 1.0, 
   3.0,0.1,-7.0, 1.0,   3.0,0.1,-9.0, 1.0,   5.0,0.1, -9.0, 1.0,  5.0,0.1, -7.0, 1.0, 
   5.0,0.1,-7.0, 1.0,   5.0,0.1,-9.0, 1.0,   7.0,0.1, -9.0, 1.0,  7.0,0.1, -7.0, 1.0, 
   7.0,0.1,-7.0, 1.0,   7.0,0.1,-9.0, 1.0,   9.0,0.1, -9.0, 1.0,  9.0,0.1, -7.0, 1.0, 
   // upper right to center
   7.0,0.1,-7.0, 1.0,   9.0,0.1, -7.0, 1.0, 9.0,0.1,-5.0, 1.0,   7.0,0.1, -5.0, 1.0,  
   7.0,0.1,-5.0, 1.0,   9.0,0.1, -5.0, 1.0, 9.0,0.1,-3.0, 1.0,   7.0,0.1, -3.0, 1.0,  
   7.0,0.1,-3.0, 1.0,   9.0,0.1, -3.0, 1.0, 9.0,0.1,-1.0, 1.0,   7.0,0.1, -1.0, 1.0,   
   // center to lower right
   7.0,0.1,1.0, 1.0,   9.0,0.1, 1.0, 1.0, 9.0,0.1,3.0, 1.0,   7.0,0.1, 3.0, 1.0,  
   7.0,0.1,3.0, 1.0,   9.0,0.1, 3.0, 1.0, 9.0,0.1,5.0, 1.0,   7.0,0.1, 5.0, 1.0,  
   7.0,0.1,5.0, 1.0,   9.0,0.1, 5.0, 1.0, 9.0,0.1,7.0, 1.0,   7.0,0.1, 7.0, 1.0, 
   7.0,0.1,7.0, 1.0,   9.0,0.1, 7.0, 1.0, 9.0,0.1,9.0, 1.0,   7.0,0.1, 9.0, 1.0, 
   // bottom right
   1.0,0.1,7.0, 1.0,   1.0,0.1,9.0, 1.0,   3.0,0.1, 9.0, 1.0,  3.0,0.1, 7.0, 1.0, 
   3.0,0.1,7.0, 1.0,   3.0,0.1,9.0, 1.0,   5.0,0.1, 9.0, 1.0,  5.0,0.1, 7.0, 1.0, 
   5.0,0.1,7.0, 1.0,   5.0,0.1,9.0, 1.0,   7.0,0.1, 9.0, 1.0,  7.0,0.1, 7.0, 1.0,  
   // center to lower left
   -7.0,0.1,1.0, 1.0,   -9.0,0.1, 1.0, 1.0, -9.0,0.1,3.0, 1.0,   -7.0,0.1, 3.0, 1.0,  
   -7.0,0.1,3.0, 1.0,   -9.0,0.1, 3.0, 1.0, -9.0,0.1,5.0, 1.0,   -7.0,0.1, 5.0, 1.0,  
   -7.0,0.1,5.0, 1.0,   -9.0,0.1, 5.0, 1.0, -9.0,0.1,7.0, 1.0,   -7.0,0.1, 7.0, 1.0, 
   -7.0,0.1,7.0, 1.0,   -9.0,0.1, 7.0, 1.0, -9.0,0.1,9.0, 1.0,   -7.0,0.1, 9.0, 1.0, 
   // bottom ;eft
   -1.0,0.1,7.0, 1.0,   -1.0,0.1,9.0, 1.0,   -3.0,0.1, 9.0, 1.0,  -3.0,0.1, 7.0, 1.0, 
   -3.0,0.1,7.0, 1.0,   -3.0,0.1,9.0, 1.0,   -5.0,0.1, 9.0, 1.0,  -5.0,0.1, 7.0, 1.0, 
   -5.0,0.1,7.0, 1.0,   -5.0,0.1,9.0, 1.0,   -7.0,0.1, 9.0, 1.0,  -7.0,0.1, 7.0, 1.0, 


   // SKY
   -10.0,5.0,-10.0, 9.0,   10.0,5.0,-10.0, 9.0,   10.0,5.0, 10.0, 9.0,    -10.0,5.0, 10.0, 9.0,
   -10.0,5.0,-10.0, 9.0,   10.0,5.0,-10.0, 9.0,   10.0,0.0, -10.0, 9.0,    -10.0,0.0, -10.0, 9.0,
   -10.0,5.0,-10.0, 9.0,   -10.0,5.0,10.0, 9.0,   -10.0,0.0, 10.0, 9.0,    -10.0,0.0, -10.0, 9.0,
   10.0,5.0,-10.0, 9.0,   10.0,5.0,10.0, 9.0,   10.0,0.0, 10.0, 9.0,    10.0,0.0, -10.0, 9.0,
   -10.0,5.0,10.0, 9.0,   10.0,5.0,10.0, 9.0,   10.0,0.0, 10.0, 9.0,    -10.0,0.0, 10.0, 9.0,

   // BUILDING
    // SIDES
      // FRONT SIDE
        // center
       -1.0,3.0,-9.9, 9.0,   1.0,3.0,-9.9, 9.0,   1.0,0.0, -9.9, 9.0,    -1.0,0.0, -9.9, 9.0,
        // center to left
       -1.0,0.0, -9.9, 9.0,    -1.0,2.5, -9.9, 9.0, -3.0,2.5,-9.9, 9.0,   -3.0,0.0,-9.9, 9.0,
       -3.0,0.0, -9.9, 9.0,    -3.0,3.0, -9.9, 9.0, -5.0,3.0,-9.9, 9.0,   -5.0,0.0,-9.9, 9.0,
       -5.0,0.0, -9.9, 9.0,    -5.0,2.0, -9.9, 9.0, -7.0,2.0,-9.9, 9.0,   -7.0,0.0,-9.9, 9.0,
       -7.0,0.0, -9.9, 9.0,    -7.0,2.5, -9.9, 9.0, -10.0,2.5,-9.9, 9.0,   -10.0,0.0,-9.9, 9.0,
        // center to right
       1.0,0.0, -9.9, 9.0,    1.0,2.0, -9.9, 9.0, 3.0,2.0,-9.9, 9.0,   3.0,0.0,-9.9, 9.0,
       3.0,0.0, -9.9, 9.0,    3.0,3.0, -9.9, 9.0, 5.0,3.0,-9.9, 9.0,   5.0,0.0,-9.9, 9.0,
       5.0,0.0, -9.9, 9.0,    5.0,2.5, -9.9, 9.0, 7.0,2.5,-9.9, 9.0,   7.0,0.0,-9.9, 9.0,
       7.0,0.0, -9.9, 9.0,    7.0,2.0, -9.9, 9.0, 10.0,2.0,-9.9, 9.0,  10.0,0.0,-9.9, 9.0,

      // LEFT SIDE
        // center
       -9.9,3.0,-1.0, 9.0,   -9.9,3.0,1.0, 9.0,   -9.9,0.0, 1.0, 9.0,    -9.9,0.0, -1.0, 9.0,
        // center to left
       -9.9,0.0,1.0, 9.0,    -9.9,2.5,1.0, 9.0, -9.9,2.5,3.0, 9.0,   -9.9,0.0,3.0, 9.0,
       -9.9,0.0,3.0, 9.0,    -9.9,3.0,3.0, 9.0, -9.9,3.0,5.0, 9.0,   -9.9,0.0,5.0, 9.0,
       -9.9,0.0,5.0, 9.0,    -9.9,2.0,5.0, 9.0, -9.9,2.0,7.0, 9.0,   -9.9,0.0,7.0, 9.0,
       -9.9,0.0,7.0, 9.0,    -9.9,2.5,7.0, 9.0, -9.9,2.5,10.0, 9.0,   -9.9,0.0,10.0, 9.0,
        // center to right
       -9.9,0.0,-1.0, 9.0,    -9.9,2.5, -1.0, 9.0, -9.9,2.5,-3.0, 9.0,   -9.9,0.0,-3.0, 9.0,
       -9.9,0.0,-3.0, 9.0,    -9.9,3.0, -3.0, 9.0, -9.9,3.0,-5.0, 9.0,   -9.9,0.0,-5.0, 9.0,
       -9.9,0.0,-5.0, 9.0,    -9.9,2.0, -5.0, 9.0, -9.9,2.0,-7.0, 9.0,   -9.9,0.0,-7.0, 9.0,
       -9.9,0.0,-7.0, 9.0,    -9.9,2.8, -7.0, 9.0, -9.9,2.8,-10.0, 9.0,   -9.9,0.0,-10.0, 9.0,

      // RIGHT SIDE
       9.9,3.0,-1.0, 9.0,   9.9,3.0,1.0, 9.0,   9.9,0.0, 1.0, 9.0,    9.9,0.0, -1.0, 9.0,
        // center to left
       9.9,0.0,-1.0, 9.0,    9.9,2.5, -1.0, 9.0, 9.9,2.5,-3.0, 9.0,   9.9,0.0,-3.0, 9.0,
       9.9,0.0,-3.0, 9.0,    9.9,3.0, -3.0, 9.0, 9.9,3.0,-5.0, 9.0,   9.9,0.0,-5.0, 9.0,
       9.9,0.0,-5.0, 9.0,    9.9,2.0, -5.0, 9.0, 9.9,2.0,-7.0, 9.0,   9.9,0.0,-7.0, 9.0,
       9.9,0.0,-7.0, 9.0,    9.9,2.5, -7.0, 9.0, 9.9,2.5,-10.0, 9.0,   9.9,0.0,-10.0, 9.0,
        // center to right
       9.9,0.0,1.0, 9.0,    9.9,2.5, 1.0, 9.0, 9.9,2.5,3.0, 9.0,   9.9,0.0,3.0, 9.0,
       9.9,0.0,3.0, 9.0,    9.9,3.0, 3.0, 9.0, 9.9,3.0,5.0, 9.0,   9.9,0.0,5.0, 9.0,
       9.9,0.0,5.0, 9.0,    9.9,2.0, 5.0, 9.0, 9.9,2.0,7.0, 9.0,   9.9,0.0,7.0, 9.0,
       9.9,0.0,7.0, 9.0,    9.9,2.8, 7.0, 9.0, 9.9,2.8,10.0, 9.0,   9.9,0.0,10.0, 9.0,


      // BACK SIDE
       -1.0,3.0,9.9, 9.0,   1.0,3.0,9.9, 9.0,   1.0,0.0, 9.9, 9.0,    -1.0,0.0, 9.9, 9.0,
        // center to left
       1.0,0.0, 9.9, 9.0,    1.0,2.0, 9.9, 9.0, 3.0,2.0,9.9, 9.0,   3.0,0.0,9.9, 9.0,
       3.0,0.0, 9.9, 9.0,    3.0,3.0, 9.9, 9.0, 5.0,3.0,9.9, 9.0,   5.0,0.0,9.9, 9.0,
       5.0,0.0, 9.9, 9.0,    5.0,2.5, 9.9, 9.0, 7.0,2.5,9.9, 9.0,   7.0,0.0,9.9, 9.0,
       7.0,0.0, 9.9, 9.0,    7.0,2.0, 9.9, 9.0, 10.0,2.0,9.9, 9.0,  10.0,0.0,9.9, 9.0,
        // center to right
       -1.0,0.0, 9.9, 9.0,    -1.0,2.5, 9.9, 9.0, -3.0,2.5,9.9, 9.0,   -3.0,0.0,9.9, 9.0,
       -3.0,0.0, 9.9, 9.0,    -3.0,3.0, 9.9, 9.0, -5.0,3.0,9.9, 9.0,   -5.0,0.0,9.9, 9.0,
       -5.0,0.0, 9.9, 9.0,    -5.0,2.0, 9.9, 9.0, -7.0,2.0,9.9, 9.0,   -7.0,0.0,9.9, 9.0,
       -7.0,0.0, 9.9, 9.0,    -7.0,2.8, 9.9, 9.0, -10.0,2.8,9.9, 9.0,   -10.0,0.0,9.9, 9.0,




  ];

  var square_position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, square_position_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square_position), gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition,4,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(aPosition);
  
  
  /**[1] CREATE UV-MAPPING**/
  var square_uv = [ //UV-mapping  

  ];

  vertex_size = square_position.length/16
 

  for (var i = 0; i < total_size; i++) {
      square_uv.push(1.0, 1.0,       
                     0.0, 1.0,       
                     0.0, 0.0,       
                     1.0, 0.0)
  }
  
  //create pointer to attribute variable in the vertex shader for passing uv coords
  var aUVCoordinates = gl.getAttribLocation(program,"aUVCoordinates");
  
  //create buffer for UV Coordinates
  var square_uv_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, square_uv_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square_uv), gl.STATIC_DRAW);
  gl.vertexAttribPointer(aUVCoordinates,2,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(aUVCoordinates);
  
  /**[2] START CREATION OF TEXTURE OBJECT**/
  //create textures array to store all texture object
  var textures = []
  for (var i = 0; i < 50; i++) {
    textures.push(gl.createTexture())
  }
  
  //create a sampler object responsible for texture sampling
  var uSampler = gl.getUniformLocation(program, 'uSampler');
  if (!uSampler) {
    console.log('Failed to get the storage location of u_Sampler');
  }

  //create images array to store all image object
  var images = []
  for (var i = 0; i < 8; i++) {
    images.push(new Image())
  }
  /**END PROJECTION MATRIX SPECIFICATION**/
  
  /**[3] SET ONLOAD FUNCTION**/
  images[0].onload = function() {
    drawRoad();
  }

  /**[4] SET IMAGE TEXTURE**/
  images[0].src = "images/sidewalk.jpg";
  images[1].src = "images/road.jpg";
  images[2].src = "images/road_intersection.jpg";
  images[3].src = "images/sky.jpg";
  images[4].src = "images/building-1.jpg";
  images[5].src = "images/building-2.jpg";
  images[6].src = "images/building-3.jpg";
  images[7].src = "images/building-4.jpg";

  

  function drawSidewalk(index, img_num){

    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[img_num]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.activeTexture(gl.TEXTURE1);
    gl.uniform1i(uSampler, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, index, 4);  

  }

  // img_num 1 = road with line
  // img_num 2 = road without line
  function drawRoadObj(index, img_num){

    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[img_num]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uSampler, 1);
    gl.drawArrays(gl.TRIANGLE_FAN, index, 4); 

  }

  function drawSky(index){

    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[3]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uSampler, 1);
    gl.drawArrays(gl.TRIANGLE_FAN, index, 4); 

  }

  function drawBuilding(index,bldg_type){

    gl.bindTexture(gl.TEXTURE_2D, textures[1]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[bldg_type]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uSampler, 1);
    gl.drawArrays(gl.TRIANGLE_FAN, index, 4); 

  }

  function drawRoad() {
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT); 

    drawSidewalk(0,0)
    for (var i = 4,bldg=0; i <= (vertex_size-1)*4; i=i+4) {
      if( i==4 || i==20 || i==36 || i==52 || i==68 || i==84 || i==140 || i==112 || i==168)
          drawRoadObj(i,2);
      else if(i>183 && i<201){
          drawSky(i);
      }
      else if(i>=204){
          drawBuilding(i,building_types[bldg])
          bldg++
      }
      else
          drawRoadObj(i,1);
    }
  }
}
