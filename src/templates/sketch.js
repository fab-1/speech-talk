export default function (p) {
    let onReady = () => {};
    let props = {};

    p.setOnReady = function(cb) {
        onReady = cb;
    };

    p.pushProps = function (_props) {
        props = _props;
    }

    p.setup = function() {
        p.createCanvas(900, 300);
        console.log("::: displayDensity:", p.displayDensity());
        console.log("::: pixelDensity:", p.pixelDensity());
        onReady();
    }

    p.draw = function() {
        p.background(127, 0, 50);
        p.noStroke();
        p.fill(127, 255, 205);
    }
}