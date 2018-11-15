import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types'
import BasicSketch from './basic_example'
import EnergySketch from './energy_example'
import StarsExample from './stars_example'
import SvgExample from './svg_example'

class Slide extends React.Component {

    constructor() {
        super()
        this.state = {
            enabled: false,
            liIndex: 0
        }
    }

    componentDidMount(){

        console.log('mounted')

        document.addEventListener('keydown', this.navigate)

        const ul = document.querySelector('ul')

        this.items = ul && ul.children

    }

    componentDidUpdate() {
        //console.log('updated')
    }

    navigate = ({keyCode}) => {

        if (keyCode === 38 && this.state.liIndex < this.items.length) {
            this.items[this.state.liIndex].className = 'show'

            this.setState({
                liIndex: this.state.liIndex + 1
            })
        }

    }

    startVoice() {
        navigator.getUserMedia({audio: true}, this.micSuccess, this.micFailure)
    }

    micSuccess(stream) {
        let worm = new window.VowelWorm.instance(stream)
        let vowel = document.getElementById('vowel')
        window.game = new window.VowelWorm.Game({element: vowel});
        window.game.addWorm(worm);
    }

    micFailure() {
    }

    startViz() {
        switch(this.props.data.slide.index) {
            case 5:
                this.p5Instance = new window.p5(BasicSketch, 'p5-container')
                break

            case 7:
                this.p5Instance = new window.p5(EnergySketch, 'p5-container')
                break

            case 8:
                this.p5Instance = new window.p5(StarsExample, 'p5-container')
                break

            case 9:
                this.p5Instance = new window.p5(SvgExample, 'p5-container')
                break


        }

        this.setState({enabled: true})
    }

    render() {

        const { data, transition } = this.props
        const { enabled } = this.state

        let showVis = false

        if ([5, 7, 8, 9].includes(data.slide.index)) {
            showVis = true
        }

        return (
            <div id="slide">

                {
                    showVis && !enabled &&
                    <a className='preview' onClick={this.startViz.bind(this)}>Show Sketch</a>
                }


                {/*<div id={'vowel'} />*/}

                {/*<a onClick={this.startVoice.bind(this)}>Start</a>*/}
                <div
                    className='slide-content'
                    style={transition && transition.style}
                    dangerouslySetInnerHTML={{ __html: data.slide.html }}
                />

                {
                    showVis &&
                    <div id={'p5-container'}></div>
                }

            </div>
        )
    }
}

Slide.propTypes = {}

export default Slide


export const query = graphql`
  query SlideQuery($index: Int!) {
    slide(index: { eq: $index }) {
      html
      index
    }
  }
`;
