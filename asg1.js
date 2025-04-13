// Sabrina Lee
// ID: 1958512
// saemlee@ucsc.edu
// asg1.js

// Vertex shader program
var VSHADER_SOURCE = `
  attribute vec4 a_Position;
  uniform float u_Size;
  void main() {
    gl_Position = a_Position;
    gl_PointSize = u_Size;
  }`

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  uniform vec4 u_FragColor;
  void main() {
    gl_FragColor = u_FragColor;
  }`

// global vars
let canvas;
let gl;
let a_Position;
let u_FragColor;
let u_Size;

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;
let g_selectedColor = [1.0, 1.0, 1.0, 1.0];
let g_selectedSize = 10.0;
let g_selectedShape = POINT;
let g_selectedSegmentCount = 10.0;
let growing_mode = false;
let size_increment = 2.0; // How much to increase size with each new shape

function setUpWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById('webgl');
  // Get the rendering context for WebGL
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true});

  if (!gl) {
    console.log('Failed to get the rendering context for WebGL');
    return;
  }
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('Failed to intialize shaders.');
    return;
  }

  // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
  if (!u_FragColor) {
    console.log('Failed to get the storage location of u_FragColor');
    return;
  }

  u_Size = gl.getUniformLocation(gl.program, 'u_Size');
  if(!u_Size) {
    console.log('Failed to get the storage location of u_Size');
    return;
  }
}

function addActionListeners() {
  // button events
  document.getElementById('clear-canvas').onclick = function() {g_shapesList = []; renderAllShapes();};
  document.getElementById('squares').onclick = function() {g_selectedShape = POINT;};
  document.getElementById('triangles').onclick = function() {g_selectedShape = TRIANGLE;};
  document.getElementById('circles').onclick = function() {g_selectedShape = CIRCLE;};
  document.getElementById('generate-picture').onclick = function() {generatePicture()};
  document.getElementById('growing').addEventListener('change', function() {
    if(this.checked) {
      growing_mode = true;
      // Reset size to initial value when enabling growing mode
      g_selectedSize = 10.0;
    } else {
      growing_mode = false;
    }
  });
  
  // slider events
  document.getElementById('red-slider').addEventListener('mouseup', function() {g_selectedColor[0] = this.value/255; });
  document.getElementById('green-slider').addEventListener('mouseup', function() {g_selectedColor[1] = this.value/255; });
  document.getElementById('blue-slider').addEventListener('mouseup', function() {g_selectedColor[2] = this.value/255; });

  document.getElementById('shape-size-slider').addEventListener('mouseup', function() {g_selectedSize = this.value; });

  document.getElementById('segment-count-slider').addEventListener('mouseup', function() {g_selectedSegmentCount = this.value; });
}

var g_shapesList = [];

function handleClicks(ev) {
  let [x, y] = convertMouseToEventCoords(ev);

  // create and store a point
  let point;
  if(g_selectedShape == POINT) {
    point = new Point();
  } else if (g_selectedShape == TRIANGLE) {
    point = new Triangle();
  } else if (g_selectedShape == CIRCLE) {
    point = new Circle();
    point.segments = g_selectedSegmentCount;
  }

  point.position = [x, y];
  point.color = g_selectedColor.slice();
  point.size = g_selectedSize;
  g_shapesList.push(point);

  // If growing mode is enabled, increase the size for the next shape
  if (growing_mode) {
    g_selectedSize += size_increment;
    // Update the slider to reflect the new size
    document.getElementById('shape-size-slider').value = g_selectedSize;
  }

  renderAllShapes();
}

function convertMouseToEventCoords(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
  y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);

  return([x, y]);
}

function renderAllShapes() {
  var start_time = performance.now();

  // Clear <canvas>
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_shapesList.length;
  for(var i = 0; i < len; i++) {
    g_shapesList[i].render();
  }

  var duration = performance.now() - start_time;
  sendTextToHTML("numdot: " + len + " ms: " + Math.floor(duration) + " fps: " + Math.floor(10000/duration), 'performance-display');
}

function sendTextToHTML(txt, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if(!htmlID) {
    console.log("Failed to get " + htmlID + " from HTML.");
    return;
  }
  htmlElm.innerHTML = txt;
}

function generatePicture() {
  // clear the canvas
  g_shapesList = []; 
  renderAllShapes();

  //sky
  drawTriangleColor([-1.0, 0.0, -1.0, 1.0, 1.0, 1.0], [128, 204, 200, 1.0]);
  drawTriangleColor([1.0, 1.0, 1.0, 0.0, -1.0, 0.0], [128, 204, 255, 1.0]);

  //water
  drawTriangleColor([-1.0, -1.0, -1.0, 0.0, 1.0, 0.0], [0, 51, 300, 1.0]);
  drawTriangleColor([1.0, 0.0, 1.0, -1.0, -1.0, -1.0], [0, 51, 204, 1.0]);

  //sun
  drawTriangleColor([0.6, 0.8, 0.8, 0.8, 0.6, 1.0], [255, 200, 0, 1.0]);
  drawTriangleColor([0.8, 0.8, 0.8, 1.0, 0.6, 1.0], [255, 255, 0, 1.0]);

  //cloud
  drawTriangleColor([-0.7, 0.8, -0.65, 0.85, -0.6, 0.8], [255, 255, 255, 1.0]);
  drawTriangleColor([-0.68, 0.82, -0.62, 0.85, -0.58, 0.82], [255, 255, 255, 1.0]);
  drawTriangleColor([-0.66, 0.79, -0.61, 0.83, -0.57, 0.79], [255, 255, 255, 1.0]);
  drawTriangleColor([0.4, 0.9, 0.45, 0.95, 0.5, 0.9], [255, 255, 255, 1.0]);
  drawTriangleColor([0.42, 0.92, 0.48, 0.95, 0.52, 0.92], [255, 255, 255, 1.0]);
  drawTriangleColor([0.44, 0.89, 0.49, 0.93, 0.53, 0.89], [255, 255, 255, 1.0]);
  drawTriangleColor([0.0, 0.75, 0.05, 0.8, 0.1, 0.75], [255, 255, 255, 1.0]);
  drawTriangleColor([0.02, 0.77, 0.08, 0.8, 0.12, 0.77], [255, 255, 255, 1.0]);
  drawTriangleColor([0.04, 0.74, 0.09, 0.78, 0.13, 0.74], [255, 255, 255, 1.0]);

  //boat
  drawTriangleColor([-0.4, -0.2, 0.4, -0.2, 0.0, -0.5], [153, 76, 25, 1.0]);
  drawTriangleColor([0.0, -0.2, 0.02, -0.2, 0.01, 0.2], [77, 51, 25, 1.0]);
  drawTriangleColor([0.01, 0.2, 0.01, -0.05, 0.25, -0.05], [255, 255, 255, 1.0]);
}

function main() {
  setUpWebGL();
  connectVariablesToGLSL();

  canvas.onmousedown = handleClicks;
  canvas.onmousemove = function(ev) {if(ev.buttons == 1) {handleClicks(ev);};};

  addActionListeners();

  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  gl.clear(gl.COLOR_BUFFER_BIT);
}
