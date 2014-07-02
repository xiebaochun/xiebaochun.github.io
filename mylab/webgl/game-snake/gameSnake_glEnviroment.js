// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”中负责产生运行webgl环境的部分，包括全局对象gl、模型视图矩阵和着色器程序，该文件必须运行在支持webgl的环境下

// 全局对象gl
var gl;

// 从canvas获取上下文
function initGL(canvas) {
    try {
        gl = canvas.getContext("experimental-webgl");
        gl.viewportWidth = canvas.width;
        gl.viewportHeight = canvas.height;
    } catch (e) { }
    if (!gl) { alert("Unable initialize WebGL!"); }
}

// 从html DOM中指定id的script标签获取着色器
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) { return null; }
    // 读取标签中的代码文本
    var scriptString = "";
    var scriptChild = shaderScript.firstChild;
    while (scriptChild) {
        if (scriptChild.nodeType == 3) {
            scriptString += scriptChild.textContent;
        }
        scriptChild = scriptChild.nextSibling;
    }
    var shader;
    if (shaderScript.type == "x-shader/x-fragment") { shader = gl.createShader(gl.FRAGMENT_SHADER); }
    else if (shaderScript.type == "x-shader/x-vertex") { shader = gl.createShader(gl.VERTEX_SHADER); }
    else { return null; }
    gl.shaderSource(shader, scriptString);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

// 全局对象着色器程序
var shaderProgram;
// 初始化着色器程序
function initShaders() {
    // 创建着色器
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    shaderProgram = gl.createProgram();
    // 连接着色器
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) { alert("Unable initialize shaders!"); }
    gl.useProgram(shaderProgram);
    // 指定着色器中attribute变量和uniform变量的位置
    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);
    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);
    shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);
    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    shaderProgram.textureUniform = gl.getUniformLocation(shaderProgram, "uSampler");
    shaderProgram.usePureColorUniform = gl.getUniformLocation(shaderProgram, "usePureColor");
}

// 模型视图矩阵、投影矩阵、模型视图矩阵栈及其操作
mvMatrix = mat4.create();
pMatrix = mat4.create();
mvMatrixStack = [];

function mvPushMatrix() {
    var copy = mat4.create();
    mat4.set(mvMatrix, copy);
    mvMatrixStack.push(copy);
}

function mvPopMatrix() {
    if (mvMatrixStack.length == 0) { throw "Invalid popMatrix!"; }
    mvMatrix = mvMatrixStack.pop();
}

// 指定着色器使用当前模型视图矩阵和投影矩阵
function setMatrixUniforms() {
    gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
    gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
}
// 指定着色器当前使用颜色
function useColor() {
    gl.uniform1i(shaderProgram.usePureColorUniform, true);
}
// 指定着色器当前使用纹理
function useTexture() {
    gl.uniform1i(shaderProgram.usePureColorUniform, false);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, surfaceTexture);
    gl.uniform1i(shaderProgram.textureUniform, 0);
}