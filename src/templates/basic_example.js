export default function( sketch ) {

    const p5 = window.p5

    const width = window.innerWidth - 80
    const height = 340

    //Number of bars (frequency component) rendered
    const numberOfBins = 128

    let mic, fft, sampleRate

    sketch.setup = function() {

        sketch.createCanvas(width, height)
        sketch.noStroke()


        // Access Microphone Stream
        mic = new p5.AudioIn()
        mic.start()

        // Initialize the FFT analyzer
        fft = new p5.FFT(0.8, numberOfBins)

        // Assign mic stream to the FFT analyzer
        fft.setInput(mic)

        sampleRate = sketch.getAudioContext().sampleRate
    }

    sketch.draw = function() {

        sketch.background('#fff');

        // Get the frequency data for current time and store it into spectrum (array)
        let spectrum = fft.analyze()

        for (let i = 0; i < numberOfBins; i++) {

            // Access the amplitude for current frequency
            let amplitude = spectrum[i];

            // Get Position of the frequency component on the X axis
            let x = sketch.map(i, 0, numberOfBins, 0, width)

            // Map the amplitude on the y axis
            let h = sketch.map(amplitude, 0, 256, 0, height)

            // Draw a rectangle representing the amplitude
            sketch.fill('#008BBA')
            sketch.rect(x, 300 - h, 2, h)

            //Draw a Label for the scale every 32 bins
            let freq = i * sampleRate/numberOfBins
            if (i%32 === 0) {
                let label = `${Math.floor(freq)}Hz`
                sketch.text(label, x, 320)
            }
        }
    }

}