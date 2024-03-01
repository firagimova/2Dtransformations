
var gl;
var points;
var program;

let tx = 0, ty = 0;
let sx =1, sy = 1;
let angle = 0;

var coR = 0.6;
var coG = 0;
var coB = 1;

var colorr;

window.onload = function init()
{
    var canvas = document.getElementById( "gl-canvas" );

    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    
    var vertices = new Float32Array([
        //for F
        -0.3, -0.25, 
        -0.3, 0.25, 
        -0.25, -0.25, 
        -0.25, 0.25, 
         
                                    
        -0.25, 0.25,  
         0, 0.25,  
        -0.25, 0.2,  
         0, 0.2,  
        

        -0.25, 0.05,
        -0.1, 0.05,
        -0.25, 0,
        -0.1, 0,

        //For R
        0, -0.25,
        0, 0.25,
        0.05, -0.25,
        0.05, 0.25,

        0.05, 0.25,
        0.3, 0.25,
        0.05, 0.2,
        0.3, 0.2,

        0.25, 0.2,
        0.3, 0.2,
        0.25, 0.05,
        0.3, 0.05,
        0.25, 0,

        0.05, 0.05,
        0.25, 0.05,
        0.05, 0,
        0.25, 0,

        0.05, 0,
        0.05, -0.025,
        0.1, 0,
        0.235, -0.25,
        0.3, -0.25
                                    ]);
    

    //  Configure WebGL

    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
    
    //  Load shaders and initialize attribute buffers
    
    program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
    
    // Load the data into the GPU
    
    var bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    gl.bufferData( gl.ARRAY_BUFFER,vertices, gl.STATIC_DRAW );

    // Associate out shader variables with our data buffer
    
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );

    //translation
    document.getElementById('posX').addEventListener('input', function(event) {
        tx = parseFloat(event.target.value);
        render();
    });

    document.getElementById('posY').addEventListener('input', function(event) {
        ty = parseFloat(event.target.value);
        render();
    });


    //scale

    document.getElementById('scX').addEventListener('input', function(event) {
        sx = parseFloat(event.target.value);
        render();
    });

    document.getElementById('scY').addEventListener('input', function(event) {
        sy = parseFloat(event.target.value);
        render();
    });


    //rotation
    document.getElementById('rot').addEventListener('input', function(event) {
        angle = parseFloat(event.target.value);
        render();
    });


    //colors
    document.getElementById('cR').addEventListener('input', function(event) {
        coR = parseFloat(event.target.value);
        render();
    });
    document.getElementById('cG').addEventListener('input', function(event) {
        coG = parseFloat(event.target.value);
        render();
    });
    document.getElementById('cB').addEventListener('input', function(event) {
        coB = parseFloat(event.target.value);
        render();
    });
    


    render();
};

function updateTransformation() {
    let modelMatrix = mat4();
    modelMatrix = mult(modelMatrix, translate(tx, ty, 0));
    modelMatrix = mult(modelMatrix, rotateZ(angle));
    modelMatrix = mult(modelMatrix, scalem(sx, sy, 1));

    let modelMatrixLocation = gl.getUniformLocation(program, "uModelMatrix");
    gl.uniformMatrix4fv(modelMatrixLocation, false, flatten(modelMatrix));

    colorr = gl.getUniformLocation(program, "Mcolor");
    gl.uniform4fv(colorr, vec4(coR, coG, coB, 1.0));
}


function render() {
    gl.clear( gl.COLOR_BUFFER_BIT );

    updateTransformation();

    //F
    gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 4, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 8, 4);
    //R
    gl.drawArrays( gl.TRIANGLE_STRIP, 12, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 16, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 20, 5);
    gl.drawArrays( gl.TRIANGLE_STRIP, 25, 4);
    gl.drawArrays( gl.TRIANGLE_STRIP, 29, 5);
    
}
