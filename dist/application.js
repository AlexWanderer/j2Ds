var scene = j2Ds.getSceneManager();
var v2f = j2Ds.getMathManager().v2f;
var fps = j2Ds.getFPSManager();
var io = j2Ds.getIO();
var lr = j2Ds.getLayerManager();
var gm = j2Ds.getGameStateManager();
var err = j2Ds.getErrorManager();

scene.init(500, 300);
scene.setAutoClear(true);

lr.add('back', -1).fill('black');

var b = scene.addTextNode(v2f(5, 270), '', 30, 'white', '', 1, 'black');
var f = scene.addTextNode(v2f(300, 270), '', 30, 'white', '', 1, 'black');
var r1 = scene.addRectNode(v2f(40, 40), v2f(40, 40), 'red');
var r2 = scene.addRectNode(v2f(60, 60), v2f(40, 40), 'green');
var r3 = scene.addRectNode(v2f(160, 160), v2f(40, 40), 'yellow');

r1.setRotation(45);
r2.setRotation(45);
r3.setRotation(30);

r1.box = r2.box = r3.box = {
    offset: {
        x: -5,
        y: -5
    },
    size: {
        x: 10,
        y: 10
    }
};

gm.add('myGame', function () {
    try {
        if (io.isKeyDown('W')) r1.move(v2f(0, -1));
        if (io.isKeyDown('S')) r1.move(v2f(0, 1));
        if (io.isKeyDown('A')) r1.move(v2f(-1, 0));
        if (io.isKeyDown('D')) r1.move(v2f(1, 0));


        b.drawSimpleText(r1.isIntersect([r2, r3]) ? 'TRUE' : 'FALSE');
        f.drawSimpleText('FPS: ' + fps.getFPS());

        r1.draw();
        r2.draw();
        r3.draw();

        r1.drawBox();
        r2.drawBox();
        r3.drawBox();
    } catch (e) {
        console.error(e.message);
        console.error(e.stack);
    }
}, function () {
    err.show('Уровень начался');
});

scene.start('myGame', 60);