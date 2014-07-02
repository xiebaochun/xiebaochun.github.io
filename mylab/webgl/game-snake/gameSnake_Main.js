// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”的主程序，脚本开始于gameStart()函数，该文件必须运行在支持webgl的环境下

// 控制游戏区域的半边长
var halfx = 15;
var halfy = 10;

// 控制糖果的缩放因子(糖果在被吃掉之前，遵循膨胀-缩小的循环)
var gscale = 1.0;

// 记录犯规次数，前者为数值，后者为html DOM中显示犯规次数的<p>节点
var mistakeNum = 0;
var mistakeNumP = null;

// 开始游戏:点击“开始游戏”按钮，代码从这里开始运行
function gameStart() {
    var canvas = document.getElementById("theCanvas");
    mistakeNumP = document.getElementById("mistakeNumber");
    // gameSnake_glEnviroment.js
    initGL(canvas);
    initShaders();
    // 初始化一些其他的全局变量
    initParas();
    // 开启深度检测
    gl.enable(gl.DEPTH_TEST);
    // 产生贪吃蛇、边框和糖果
    theSnake = new snake([[0, 0, 0], [0, 1, 0], [0, 2, 0]], [0, -1, 0]);
    theFrame = new frame(halfx, halfy);
    theCandies = new candies();
    // 设置键盘事件处理程序
    document.onkeydown = handleKeyDown;
    // 记录游戏开始时间
    startTime = new Date().getTime();
    // 主循环
    tick();
}

function initParas() {
    theBufferFactory = new bufferFactory();
    initTextures();
}

// 主循环
function tick() {
    // 设置下一次循环
    requestAnimFrame(tick);
    // 绘图
    drawScene();
    // 改变全局变量参数，下一帧和这一帧不同
    animate();
}

// 开始时间和已经持续的时间
var startTime = 0;
var lastTime = 0;
// 游戏区域框架旋转
var yRot = 0;
var zRot = 0;
// 改变全局变量参数，下一帧和这一帧不同
function animate() {
    var timeNow = new Date().getTime();
    yRot = Math.sin((timeNow - startTime) * 1.0 / 2000) * 1.0 / 3;
    zRot = (timeNow - startTime) * 1.0 / 2000;
    theCandies.tick(startTime, timeNow);
    if (gscale > 0.7) {gscale -= 0.01; }
    else { gscale = 0.7; }
    
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        if (elapsed >= 300) {
            theSnake.step();
            lastTime = timeNow;
        }
    } else { lastTime = timeNow; }
}

// 绘出这一帧
function drawScene() {
    gl.clearColor(gscale, gscale, gscale, 1.0);
    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // 投影矩阵
    mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
    // 模型视图矩阵
    mat4.identity(mvMatrix);
    mat4.translate(mvMatrix, [0, 0, -50]);
    mat4.rotate(mvMatrix, zRot, [0, 0, 1]);
    mat4.rotate(mvMatrix, yRot, [0, 1, 0])
    // 依次绘制边框、贪吃蛇和糖果
    theFrame.draw();
    theSnake.draw();
    theCandies.draw();
}

// 初始化纹理
function initTextures() {
    // 全局变量surfaceTexture
    surfaceTexture = gl.createTexture();
    surfaceTexture.image = new Image();
    surfaceTexture.image.onload = function() {
        handleLoadedTexture(surfaceTexture);
    };
    surfaceTexture.image.src = "gameSnake_CubeTexture.gif";
}
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

// 表示前进的方向，1表示向左，3表示向右
var direction = 1;

function handleKeyDown(event) {
    if (event.keyCode == 37) { direction = 1; }
    else if (event.keyCode == 39) { direction = 3; }
    // 改变贪吃蛇前进的方向
    theSnake.setDirection(direction);
}

