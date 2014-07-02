// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”中负责区域边框的产生、运动、绘制部分，该文件必须运行在支持webgl的环境下

// 边框初始化，传入区域的半边长
function frame(hx, hy) {
    this.nodeList = [];
    for (var i = -hx; i <= hx; i++) {
        this.nodeList.push([i, -hy, 0]);
        this.nodeList.push([i, hy, 0]);
    }
    for (var j = -hy + 1; j <= hy - 1; j++) {
        this.nodeList.push([-hx, j, 0]);
        this.nodeList.push([hx, j, 0]);
    }
 }

// 绘制边框
frame.prototype.draw = function() {
    var positionBuffer = theBufferFactory.createCubeBuffer(0.15);
    var colorBuffer = theBufferFactory.createCubeColorBuffer(0.1, 0.5, 0.7);
    var cubeTextureCoordColorBuffer = theBufferFactory.createCubeTextureCoordBuffer();
    var cubeIndexBuffer = theBufferFactory.createCubeIndexBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureCoordColorBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeTextureCoordColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    for (var i in this.nodeList) {
        var node = this.nodeList[i];
        mvPushMatrix();
        mat4.translate(mvMatrix, [node[0], node[1], node[2]]);
        useColor();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }
}

// 根据给出的坐标判断该坐标是否是边框的节点(用来判断是否犯规)
frame.prototype.isFramePosition = function(x, y, z) {
    for (var i in this.nodeList) {
        if (this.nodeList[i][0] == x && this.nodeList[i][1] == y) { return true; }
    }
    return false;
}