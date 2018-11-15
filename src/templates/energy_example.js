export default function( sketch ) {

    const p5 = window.p5

    let mic, fft, sampleRate

    let min = 250
    let max = 6000
    let numberOfVisibleBars = 50
    let chunkSize = Math.round((max - min) / numberOfVisibleBars)

    sketch.setup = function() {
        sketch.createCanvas(800, 400)
        sketch.noStroke()

        mic = new p5.AudioIn()
        mic.start()

        fft = new p5.FFT(0.8, 512)
        fft.setInput(mic)

        sampleRate = sketch.getAudioContext().sampleRate
    }

    sketch.draw = function() {

        sketch.background('#fff')

        let spectrum = fft.analyze()

        for (let i = 0; i < numberOfVisibleBars; i++) {

            let freq1 = i * chunkSize
            let freq2 = (i+1) * chunkSize

            let val = fft.getEnergy(freq1 + min, freq2 + min)
            let h = sketch.map(val, 0, 255, 0, 400)

            let y = 380 - h
            let x = sketch.map(freq1, min, max, 0, 800)

            sketch.fill('#008BBA')
            sketch.rect(x, y, 2, h)

            if (i === 0) {
                sketch.text(min + 'Hz', 0, 400)
            }

            if (i%5 === 0) {
                let label = `${Math.floor(freq2 + min)}Hz`
                sketch.text(label, x, 400)
            }
        }
    }
}