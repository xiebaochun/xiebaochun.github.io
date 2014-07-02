// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”中负责随机糖果的产生、运动、绘制部分，该文件必须运行在支持webgl的环境下

// 随机产生3个糖果
function candies() {
    this.nodeList = [];
    this.candyNum = 3;
    this.scale = 0;
    for (var i = 0; i < this.candyNum; i++) {
        this.nodeList.push(randomCandy());
    }
}
randomCandy = function() {
    var randomX = parseInt(Math.random() * (2 * halfx - 2) - (halfx - 1));
    var randomY = parseInt(Math.random() * (2 * halfy - 2) - (halfy - 1));
    return [randomX, randomY, 0];
}

// 绘制糖果
candies.prototype.draw = function() {
    var positionBuffer = theBufferFactory.createCubeBuffer(0.4);
    var colorBuffer = theBufferFactory.createCubeColorBuffer(0.7, 0.2, 0.7);
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
        mat4.scale(mvMatrix, [this.scale, this.scale, this.scale]);
        useTexture();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }
};

// 控制糖果的尺寸(变大变小)
candies.prototype.tick = function(startTime, timeNow) {
    this.scale = 1 + 0.3 * Math.sin((timeNow - startTime)*1.0/300);
};

// 根据给出的坐标判断该坐标是否是贪吃蛇的节点(用来判断是否吃到糖果)
candies.prototype.isCandyPosition = function(x, y, z) {
    for (var i in this.nodeList) {
        if (this.nodeList[i][0] == x && this.nodeList[i][1] == y) { return true; }
    }
    return false;
};

// 贪吃蛇吃到糖果时的处理：删除该糖果并随机产生一个新糖果
candies.prototype.eaten = function(x, y, z) {
    for (var i in this.nodeList) {
        if (this.nodeList[i][0] == x && this.nodeList[i][1] == y) {
            this.nodeList[i] = randomCandy();
        }
    }
}