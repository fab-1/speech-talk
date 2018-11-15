export default function( sketch ) {

    const p5 = window.p5

    let mic, fft, sampleRate

    let min = 250
    let max = 6000
    let numberOfVisibleBars = 24
    let chunkSize = Math.round((max - min) / numberOfVisibleBars)

    let doc = document.getElementById('planets')

    sketch.setup = function() {
        mic = new p5.AudioIn()
        mic.start()

        fft = new p5.FFT(0.8, 512)
        fft.setInput(mic)

        sampleRate = sketch.getAudioContext().sampleRate
    }

    sketch.draw = function() {


        let spectrum = fft.analyze()

        for (let i = 0; i < numberOfVisibleBars; i++) {

            let freq1 = i * chunkSize
            let freq2 = (i+1) * chunkSize

            let val = fft.getEnergy(freq1 + min, freq2 + min)
            let h = sketch.map(val, 0, 255, 1, 1.2)

            let y = 380 - h
            let x = sketch.map(freq1, min, max, 0, 800)

            let planet = doc.contentDocument.getElementById('planet_' + i)
            planet.style.transform = `scale(${h})`
            planet.style.transformOrigin = `center`
        }
    }
}