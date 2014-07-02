// 该文件属于www.cnblogs.com/yiyezhai，如有转载请保留这行注释

// 该文件是webgl游戏“贪吃蛇”中负责贪吃蛇对象的产生、运动、状态改变和绘制部分，该文件必须运行在支持webgl的环境下

// snake初始化，传入当前节点坐标(任意长度数组，每个数组元素为三维数组)和当前方向(三维数组)
function snake(positions, theDirection) {
    // 初始化时先给出前方节点坐标
    this.nodeList = [];
    this.direction = theDirection;
    this.head = positions[0];
    for (var i in positions) {
        this.nodeList.push(positions[i]);
    }
}

// 按键后设置新的前进方向
snake.prototype.setDirection = function(theDirection) {
    if (this.direction.toString() == [0, 1, 0].toString()) {
        if (theDirection == 1) { this.direction = [-1, 0, 0] }
        else if (theDirection == 3) { this.direction = [1, 0, 0] }
    }
    else if (this.direction.toString() == [0, -1, 0].toString()) {
        if (theDirection == 1) { this.direction = [1, 0, 0] }
        else if (theDirection == 3) { this.direction = [-1, 0, 0] }
    }
    else if (this.direction.toString() == [1, 0, 0].toString()) {
        if (theDirection == 1) { this.direction = [0, 1, 0] }
        else if (theDirection == 3) { this.direction = [0, -1, 0] }
    }
    else if (this.direction.toString() == [-1, 0, 0].toString()) {
        if (theDirection == 1) { this.direction = [0, -1, 0] }
        else if (theDirection == 3) { this.direction = [0, 1, 0] }
    }
};

// 绘制贪吃蛇
snake.prototype.draw = function() {
    // 从工厂对象获得立方体的缓冲区、颜色缓冲区、纹理坐标缓冲区、顶点索引缓冲区并绑定到着色器对应属性上
    var positionBuffer = theBufferFactory.createCubeBuffer(0.4);
    var colorBuffer = theBufferFactory.createCubeColorBuffer(0.1, 0.5, 0.7);
    var cubeTextureCoordColorBuffer = theBufferFactory.createCubeTextureCoordBuffer();
    var cubeIndexBuffer = theBufferFactory.createCubeIndexBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, positionBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, colorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, cubeTextureCoordColorBuffer);
    gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, cubeTextureCoordColorBuffer.itemSize, gl.FLOAT, false, 0, 0);
    // 依次绘制每个立方体
    for (var i in this.nodeList) {
        var node = this.nodeList[i];
        mvPushMatrix();
        mat4.translate(mvMatrix, [node[0], node[1], node[2]]);
        useTexture();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cubeIndexBuffer);
        setMatrixUniforms();
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);
        mvPopMatrix();
    }
};

// 贪吃蛇前进一步
snake.prototype.step = function() {
    var x = this.head[0] + this.direction[0];
    var y = this.head[1] + this.direction[1];
    var z = this.head[2] + this.direction[2];
    var newHead = [x, y, z];
    this.head = newHead;
    // 如果犯规
    if (theSnake.isNodePosition(x, y, z)) { gscale = 1.0; mistakeNum += 1; mistakeNumP.firstChild.nodeValue = mistakeNum.toString(); }
    if (theFrame.isFramePosition(x, y, z)) { gscale = 1.0; mistakeNum += 1; mistakeNumP.firstChild.nodeValue = mistakeNum.toString(); }
    this.nodeList.unshift(newHead);
    // 如果前进一步吃了一个糖果
    if (theCandies.isCandyPosition(x, y, z)) {
        theCandies.eaten(x, y, z);
    }
    // 如果没吃到糖果
    else { this.nodeList.pop(); }
}

// 根据给出的坐标判断该坐标是否是贪吃蛇的节点(用来判断是否犯规)
snake.prototype.isNodePosition = function(x, y, z) {
    for (var i in this.nodeList) {
        if (this.nodeList[i][0] == x && this.nodeList[i][1] == y) { return true; }
    }
    return false;
}