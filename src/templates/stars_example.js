const sketch = function (P5) {

    const p5 = window.p5

    let mic, fft

    let min = 250
    let max = 6250
    let numberOfStars = 24
    let chunkSize = (max - min) / numberOfStars

    const width = 600
    const height = 400

    let stars = new Array(numberOfStars)

    // Initial setup
    P5.setup = function () {

        P5.createCanvas(width, height)

        P5.noStroke()

        mic = new p5.AudioIn()
        mic.start()

        fft = new p5.FFT(0.8, 512)
        fft.setInput(mic)


        var fadingFactor = 0.6;
        var flaresActivity = 0.3;

        for (let i = 0; i < numberOfStars; i++) {

            let x = P5.floor(P5.random(20, width - 20))
            let y = P5.floor(P5.random(300, 20))
            let position = P5.createVector(x, y)

            let radius = P5.map(i, 0, numberOfStars, 4, 2)
            stars[i] = new Star(position, radius, fadingFactor, flaresActivity, 60)
        }
    }

    // Execute the P5
    P5.draw = function () {

        // Clean the canvas
        setGradient()

        let spectrum = fft.analyze()

        for (let i = 0; i < numberOfStars; i++) {

            let freq1 = i * chunkSize
            let freq2 = (i+1) * chunkSize

            let val = fft.getEnergy(freq1 + min, freq2 + min)

            let radiusVariation = P5.map(val, 0, 200, 0, 12)

            stars[i].setVariation(radiusVariation)
            stars[i].update()
            stars[i].paint()
        }

        moutains()
    }

    function setGradient(){
        P5.noFill();
        for (var i = 0; i <= height; i++) {
            var inter = P5.map(i, 0, height, 0, 1);
            var c = P5.lerpColor(P5.color('#06040a'), P5.color('#15173c'), inter);
            P5.stroke(c);
            P5.line(0, i, width, i);
        }
    }

    function moutains() {
        P5.fill('#000');
        P5.triangle(152, 400, 285, 335, 452, 400);
        P5.fill('#000');
        P5.triangle(352, 400, 285, 335, 452, 400);

    }

    /*
     * The Star class
     */
    function Star(position, radius, fadingFactor, flaresActivity, imageWidth) {
        this.position = position;
        this.radius = radius;
        this.radiusVariation = 0;
        this.fadingFactor = fadingFactor;
        this.flaresActivity = flaresActivity;
        this.imageWidth = imageWidth;
        this.body = P5.createImage(this.imageWidth, this.imageWidth);
        this.flares = P5.createImage(this.imageWidth, this.imageWidth);
        this.timeCounter = 0;

        // Initialize the star's body image
        var x, y, pixel, distanceSq;
        var radiusSq = P5.sq(this.radius + this.radiusVariation);
        var center = this.imageWidth / 2;

        this.body.loadPixels();

        for (x = 0; x < this.imageWidth; x++) {
            for (y = 0; y < this.imageWidth; y++) {
                pixel = 4 * (x + y * this.imageWidth);
                distanceSq = P5.sq(x - center) + P5.sq(y - center);
                this.body.pixels[pixel] = 255;
                this.body.pixels[pixel + 1] = 255;
                this.body.pixels[pixel + 2] = 255;
                this.body.pixels[pixel + 3] = 255 * (0.95 - distanceSq / radiusSq);
            }
        }

        this.body.updatePixels();
    }

    //
    // The update method
    //
    Star.prototype.update = function () {
        var x, y, deltaX, deltaY, pixel, distanceSq, relativeAngle;
        var dx, dy, sumColor, counter, pixelColor;
        var radiusSq = P5.sq(this.radius + this.radiusVariation);
        var center = this.imageWidth / 2;
        var nPixels = P5.sq(this.imageWidth);

        // Create the flares in the star's body (save the result in the red channel)
        this.flares.loadPixels();

        for (x = 0; x < this.imageWidth; x++) {
            for (y = 0; y < this.imageWidth; y++) {
                deltaX = x - center;
                deltaY = y - center;
                distanceSq = P5.sq(deltaX) + P5.sq(deltaY);

                if (distanceSq < radiusSq) {
                    relativeAngle = P5.atan2(deltaY, deltaX) / P5.TWO_PI;

                    if (relativeAngle < 0) {
                        relativeAngle++;
                    }

                    pixel = 4 * (x + y * this.imageWidth);
                    this.flares.pixels[pixel] = 255 * P5.noise(0.1 * (Math.sqrt(distanceSq) - this.timeCounter), 10 * relativeAngle);
                }
            }
        }

        // Smooth the flares (save the result in the blue and alpha channels)
        for (x = 2; x < this.imageWidth - 2; x++) {
            for (y = 2; y < this.imageWidth - 2; y++) {
                pixel = 4 * (x + y * this.imageWidth);
                deltaX = x - center;
                deltaY = y - center;
                distanceSq = P5.sq(deltaX) + P5.sq(deltaY);
                sumColor = 0;
                counter = 0;

                // Loop over nearby pixels
                for (dx = -2; dx <= 2; dx++) {
                    for (dy = -2; dy <= 2; dy++) {
                        if (P5.sq(deltaX + dx) + P5.sq(deltaY + dy) < distanceSq) {
                            sumColor += this.flares.pixels[pixel + 4 * (dx + dy * this.imageWidth)];
                            counter++;
                        }
                    }
                }

                if (counter > 0) {
                    this.flares.pixels[pixel + 2] = sumColor / counter;
                    this.flares.pixels[pixel + 3] = 255 * (1 - this.fadingFactor) * radiusSq / distanceSq;
                } else {
                    this.flares.pixels[pixel + 2] = 0;
                    this.flares.pixels[pixel + 3] = 0;
                }
            }
        }

        // Update the flares image (i.e. the red and green channels)
        for (let i = 0; i < nPixels; i++) {
            pixel = 4 * i;
            pixelColor = this.flares.pixels[pixel + 2];
            this.flares.pixels[pixel] = pixelColor;
            this.flares.pixels[pixel + 1] = pixelColor;
        }

        this.flares.updatePixels();

        // Increase the time counter
        this.timeCounter += this.flaresActivity;
    };

    //
    // The paint method
    //
    Star.prototype.paint = function () {
        P5.push();
        P5.translate(this.position.x - this.imageWidth / 2, this.position.y - this.imageWidth / 2);
        P5.image(this.flares, 0, 0);
        P5.image(this.body, 0, 0);
        P5.pop();
    };

    //
    // Update the fading factor parameter
    //
    Star.prototype.setFadingFactor = function (fadingFactor) {
        this.fadingFactor = fadingFactor;
    };

    //
    // Update the flares activity parameter
    //
    Star.prototype.setFlaresActivity = function (flaresActivity) {
        this.flaresActivity = flaresActivity;
    };

    //
    // Update the flares activity parameter
    //
    Star.prototype.setVariation = function (variation) {
        this.radiusVariation = variation;
    };
};


export default sketch