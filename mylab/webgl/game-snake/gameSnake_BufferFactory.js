// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”中负责产生缓冲区的部分，该文件必须运行在支持webgl的环境下

// bufferFactory是一个产生游戏中用到的各类缓冲区的工厂函数对象
function bufferFactory() { }

// 产生立方体的顶点位置数组缓冲区
bufferFactory.prototype.createCubeBuffer = function(r) {
    var cubeVerticsBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeVerticsBuffer);
    var vertics = [
        -r, -r, r,
        r, -r, r,
        r, r, r,
        -r, r, r,

        -r, -r, -r,
        -r, r, -r,
        r, r, -r,
        r, -r, -r,

        -r, r, -r,
        -r, r, r,
        r, r, r,
        r, r, -r,

        -r, -r, -r,
        r, -r, -r,
        r, -r, r,
        -r, -r, r,

        r, -r, -r,
        r, r, -r,
        r, r, r,
        r, -r, r,

        -r, -r, -r,
        -r, -r, r,
        -r, r, r,
        -r, r, -r
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertics), gl.STATIC_DRAW);
    cubeVerticsBuffer.itemSize = 3;
    cubeVerticsBuffer.numItems = 24;

    return cubeVerticsBuffer;
};

// 产生用于绘制立方体的顶点索引数组缓冲区
bufferFactory.prototype.createCubeIndexBuffer = function() {
    var cubeIndexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
    var vertics = [
        0, 1, 2, 0, 2, 3,
        4, 5, 6, 4, 6, 7,
        8, 9, 10, 8, 10, 11,
        12, 13, 14, 12, 14, 15,
        16, 17, 18, 16, 18, 19,
        20, 21, 22, 20, 22, 23
    ];
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertics), gl.STATIC_DRAW);
    cubeIndexBuffer.itemSize = 1;
    cubeIndexBuffer.numItems = 36;

    return cubeIndexBuffer;
};

// 产生立方体的顶点纹理坐标数组缓冲区
bufferFactory.prototype.createCubeTextureCoordBuffer = function() {
    var cubeTextureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureCoordBuffer);
    var coords = [
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
    ];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(coords), gl.STATIC_DRAW);
    cubeTextureCoordBuffer.itemSize = 2;
    cubeTextureCoordBuffer.numItems = 24;

    return cubeTextureCoordBuffer;
}

// 产生指定颜色的立方体的颜色缓冲区，r、g、b值是[0,1]之间的浮点数
bufferFactory.prototype.createCubeColorBuffer = function(r, g, b) {
    var cubeColorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeColorBuffer);
    var colors = [];
    for (var i = 0; i < 24; i++) { colors = colors.concat([r, g, b, 1]); }
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);
    cubeColorBuffer.itemSize = 4;
    cubeColorBuffer.numItems = 24;
    return cubeColorBuffer;
}


