## Web Audio Visualization
## Applied to Speech 🗣
<img class="margin" src="/spectrum.jpg" width="600" />

---

### What is Audio Visualization?
Music visualization, a feature found in electronic music visualizers and media player software, generates animated imagery based on a piece of music. The imagery is usually generated and rendered in real time and in a way synchronized with the music as it is played.
<cite>Wikipedia</cite>

* 80s: [Hifi system frequency spectrum or Equalizer](https://youtu.be/UCezP4mfeLE?t=72)
* 90s: [Old school winamp player](https://webamp.org/)
* Would it work with spoken words?

---

### What do we need?  
* Audio Analysis: Need to access an audio stream first, then extract relevant data at regular intervals
* Visualisation: Need to draw things with enough creative freedom and flexibility
* Preferably a simple, high level API so we can focus on the fun parts

---

### Choice for today's talk: p5.js
p5.js is a JavaScript library that starts with the original goal of **Processing**, to make coding accessible for artists, designers, educators, and beginners, and reinterprets this for today's web.

p5.js has addon libraries that make it easy to interact with other HTML5 objects, including text, input, video, webcam, and **sound**

<cite>p5.js website</cite>

---

### Analyzing Audio: The Fast Fourier Transform

`A fast Fourier transform (FFT) is an algorithm that samples a signal over a period of time (or space) and divides it into its frequency components`
<cite>Wikipedia</cite>


---

### Range of frequencies used by speech
Frequency is measured in hertz (Hz). A person who has hearing within the normal range can hear sounds that have frequencies between 20 and 20,000 Hz. The most important sounds we hear every day are in the 250 to 6,000 Hz range.
<cite>https://www.cdc.gov/ncbddd/hearingloss/sound.html</cite>

![](https://www.cdc.gov/ncbddd/hearingloss/images/hearingloss-chart_hz.jpg)

---

### Exploring p5 sound apis
`let val = fft.getEnergy(frequency1, frequency2)`
Returns the average amplitude between frequency1 and frequency2

---

### p5 Example 
Inspired from https://jagracar.com/sketches/flaringStar.php <br />
Let's map each frequency component to a star, with variable radius

---

### SVG Example 

<object id="planets" data="/background.svg" type="image/svg+xml" height="500"></object>
<p>source: vecteezy.com</p>

---

## Thank You for Watching

##### Stay in touch
fabs@audiodive.app <br />
http://twitter.com/audiodive

##### Codepen
http://codepen.io/audiodive

##### Inspiration
Visualising Sound : The FFT -- Elisa SJ <br />
https://www.unicornsfartpixels.com/audiofft/ <br /><br />
P5.js Sketches -- Dr. Javier Graciá Carpio <br />
https://jagracar.com/p5jsSketches.php

##### Thanks to 
Dan Hutchins, Jillian Vasquez for feedback <br />
JS.LA/Earny for hosting

##### Creative Developers to follow
@iamelizasj, @manoloidee, @mattdesl, @marpi_, @shiffman, @sarah_edo


