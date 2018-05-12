
function renderSky(gl,aPosition,program){
  var square_position = [   // Coordinates
   // sidewalk
   -9.5,2.0,-9.5, 9.0,   9.5,2.0,-9.5, 9.0,   9.5,2.0, 9.5, 9.0,    -9.5,2.0, 9.5, 9.0,

  ];
  var square_position_buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, square_position_buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(square_position), gl.STATIC_DRAW);
  gl.vertexAttribPointer(aPosition,4,gl.FLOAT,false,0,0);
  gl.enableVertexAttribArray(aPosition);
  
  
  /**[1] CREATE UV-MAPPING**/
  var square_uv = [ //UV-mapping  

  ];

  square_uv.push(1.0, 1.0,       
                 0.0, 1.0,       
                 0.0, 0.0,       
                 1.0, 0.0)
  
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
  images.push(new Image())
  /**END PROJECTION MATRIX SPECIFICATION**/
  
  /**[3] SET ONLOAD FUNCTION**/
  images[0].onload = function() {
    drawSky();
  }

  /**[4] SET IMAGE TEXTURE**/
  images[0].src = "images/sky.jpg";

  

  function drawSky(){


    gl.bindTexture(gl.TEXTURE_2D, textures[0]);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); 
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, images[0]);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.uniform1i(uSampler, 0);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);  

  }

}
