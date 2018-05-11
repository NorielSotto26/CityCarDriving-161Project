
function main() {

  // ########################### START OF WEBGL INITIALIZATIONS ###########################

  //Retrieve <canvas> element
  var canvas = document.getElementById("c");
  if(!canvas) {
    console.log("Failed to retrieve the <canvas> element");
  }

  //Get the rendering context (WebGL)
  var gl = initializeWebGL(canvas,true);
  //initialize shaders program
  var vertexShader = initializeShader(gl,"vshader");
  var fragmentShader = initializeShader(gl, "fshader");
  var program = initializeProgram(gl,vertexShader,fragmentShader);
  gl.useProgram(program);

  var aPosition = gl.getAttribLocation(program,"aPosition");
  gl.enableVertexAttribArray(aPosition);

  var uModel = gl.getUniformLocation(program,"uModel");
  var uView = gl.getUniformLocation(program,"uView");
  var uProjection = gl.getUniformLocation(program,"uProjection");

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);


  //ENABLE DEPTH TESTING
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.DEPTH_BUFFER_BIT);

  var modelMatrix;
  var viewMatrix;
  var projectionMatrix;

  /**START PROJECTION MATRIX SPECIFICATION**/
  var fieldOfViewYAxis = glMatrix.toRadian(40);
  var aspectRatio      = canvas.width/canvas.height;
  var nearPlane        = 1;
  var farPlane         = 100;

  projectionMatrix = mat4.create();
  mat4.perspective(projectionMatrix,fieldOfViewYAxis,aspectRatio,nearPlane,farPlane);
  gl.uniformMatrix4fv(uProjection,false,new Float32Array(projectionMatrix));
  /**END PROJECTION MATRIX SPECIFICATION**/

  /**START VIEW MATRIX SPECIFICATION**/
  var lookAtPoint = [0.0,0.0,-10.0];              //where the camera is looking
  var cameraPosition    = [0.0,0.5,5.0];              //where the camera is placed
  var upVector    = [0.0,1.0,0.0];              //orientation of the camera

  viewMatrix = mat4.create();
  mat4.lookAt(viewMatrix,cameraPosition,lookAtPoint,upVector);
  gl.uniformMatrix4fv(uView,false,new Float32Array(viewMatrix));
  /**END VIEW MATRIX SPECIFICATION**/

  //MODEL MATRIX
  modelMatrix = mat4.create();
  //mat4.rotateY(modelMatrix,modelMatrix,glMatrix.toRadian(45));
  gl.uniformMatrix4fv(uModel,false,new Float32Array(modelMatrix));

  // ########################### END OF WEBGL INITIALIZATIONS ###########################




  // ########################### START OF OBJECTS RENDEERING ###########################

  renderRoad(gl,aPosition,program)
  // renderSky(gl,aPosition,program)

  // ########################### END OF OBJECTS RENDERING ###########################




  // ###################### FUNCTION FOR MOVING FORWARD ANIMATION ########################

  function moveForward() {
    var lookAtPointNew = lookAtPoint;
    // will contain the index with the highest value
    idx = 0;   
    // contains the sign of the index 
    if(lookAtPointNew[0]<0) sign = -1;
    else sign = 1;
    for (var i = 1,j=0; i < lookAtPointNew.length; i++) {
        if(Math.abs(lookAtPointNew[idx])<Math.abs(lookAtPointNew[i])){
          idx = i;
          if(lookAtPointNew[i]<0) sign = -1;
          else sign = 1;
        }
    }
    lookAtPointNew[idx] = lookAtPointNew[idx] + (0.1*sign);
    var cameraPositionNew    = cameraPosition;
    cameraPositionNew[idx] = cameraPositionNew[idx] + (0.1*sign);
    var upVector    = [0.0,1.0,0.0];              //orientation of the camera

    console.log("lookAtpoint: " + lookAtPointNew)
    console.log("cameraPosition: " + cameraPositionNew)

    viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,cameraPosition,lookAtPoint,upVector);
    gl.uniformMatrix4fv(uView,false,new Float32Array(viewMatrix));

    renderRoad(gl,aPosition,program)

  }

  // ###################### FUNCTION FOR MOVING BACKWARD ANIMATION ########################

  function moveBackward() {
    var lookAtPointNew = lookAtPoint;
    // will contain the index with the highest value
    idx = 0;   
    // contains the sign of the index 
    if(lookAtPointNew[0]<0) sign = 1;
    else sign = -1;
    for (var i = 1,j=0; i < lookAtPointNew.length; i++) {
        if(Math.abs(lookAtPointNew[idx])<Math.abs(lookAtPointNew[i])){
          idx = i;
          if(lookAtPointNew[i]<0) sign = 1;
          else sign = -1;
        }
    }
    lookAtPointNew[idx] = lookAtPointNew[idx] + (0.1*sign);
    var cameraPositionNew    = cameraPosition;
    cameraPositionNew[idx] = cameraPositionNew[idx] + (0.1*sign);
    var upVector    = [0.0,1.0,0.0];              //orientation of the camera

    console.log("lookAtpoint: " + lookAtPointNew)
    console.log("cameraPosition: " + cameraPositionNew)

    viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,cameraPosition,lookAtPoint,upVector);
    gl.uniformMatrix4fv(uView,false,new Float32Array(viewMatrix));

    renderRoad(gl,aPosition,program)
  }

  // ###################### FUNCTION FOR MOVING LEFT ANIMATION ########################

  function moveLeft() {
    var lookAtPointNew = lookAtPoint;
    // will contain the index with the highest value
    idx = 0;   
    // contains the sign of the index 
    if(lookAtPointNew[0]<0) sign = 1;
    else sign = -1;
    for (var i = 1,j=0; i < lookAtPointNew.length; i++) {
        if(Math.abs(lookAtPointNew[idx])<Math.abs(lookAtPointNew[i])){
          idx = i;
          if(lookAtPointNew[i]<0) sign = 1;
          else sign = -1;
        }
    }
    lookAtPointNew[0] = lookAtPointNew[0] - (1*sign);
    lookAtPointNew[2] = lookAtPointNew[2] + (1*sign);
    var cameraPositionNew    = cameraPosition;

    console.log("lookAtpoint: " + lookAtPointNew)
    console.log("cameraPosition: " + cameraPositionNew)

    viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,cameraPosition,lookAtPoint,upVector);
    gl.uniformMatrix4fv(uView,false,new Float32Array(viewMatrix));

    renderRoad(gl,aPosition,program)
  }

  // ###################### FUNCTION FOR MOVING RIGHT ANIMATION ########################

  function moveRight() {
    var lookAtPointNew = lookAtPoint;
    // will contain the index with the highest value
    idx = 0;   
    // contains the sign of the index 
    if(lookAtPointNew[0]<0) sign = 1;
    else sign = -1;
    for (var i = 1,j=0; i < lookAtPointNew.length; i++) {
        if(Math.abs(lookAtPointNew[idx])<Math.abs(lookAtPointNew[i])){
          idx = i;
          if(lookAtPointNew[i]<0) sign = 1;
          else sign = -1;
        }
    }
    lookAtPointNew[0] = lookAtPointNew[0] + (1*sign);
    lookAtPointNew[2] = lookAtPointNew[2] - (1*sign);
    var cameraPositionNew    = cameraPosition;

    console.log("lookAtpoint: " + lookAtPointNew)
    console.log("cameraPosition: " + cameraPositionNew)

    viewMatrix = mat4.create();
    mat4.lookAt(viewMatrix,cameraPosition,lookAtPoint,upVector);
    gl.uniformMatrix4fv(uView,false,new Float32Array(viewMatrix));

    renderRoad(gl,aPosition,program)
  }

  // ############################# KEY LISTENERS ###############################

  document.addEventListener("keydown", function(event) {
    var UP = 87
    var DOWN = 83
    var LEFT = 65
    var RIGHT = 68
    if(event.which==UP){
      moveForward()
    }else if(event.which==DOWN){
      moveBackward()
    }else if(event.which==LEFT){
      moveLeft()
    }else if(event.which==RIGHT){
      moveRight()
    }
  });
  
}

