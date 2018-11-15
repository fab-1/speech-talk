import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link, navigate, StaticQuery, graphql, withPrefix} from 'gatsby'
import Helmet from 'react-helmet'
import Swipeable from 'react-swipeable'
import Transition from '../components/transition'


import './index.css'

const Header = ({name, title, date}) => (
    <header>
        <Link to="/1">
            {title}
        </Link>
        <span><img height='40' src={"/logo.svg"} /></span>
    </header>
)

class TemplateWrapper extends Component {
    NEXT = [13, 32, 39]
    PREV = 37

    swipeLeft = () => {
        this.navigate({keyCode: this.NEXT})
    }

    swipeRight = () => {
        this.navigate({keyCode: this.PREV})
    }

    navigate = ({keyCode}) => {
        const now = this.props.data.slide.index
        const slidesLength = this.props.slidesLength

        if (now) {
            if (keyCode === this.PREV && now === 1) {
                return false
            } else if (this.NEXT.indexOf(keyCode) !== -1 && now === slidesLength) {
                return false
            } else if (this.NEXT.indexOf(keyCode) !== -1) {
                navigate(`/${now + 1}`)
            } else if (keyCode === this.PREV) {
                navigate(`/${now - 1}`)
            }
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.navigate)
    }

    componentDidUpdate() {

    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.navigate)
    }

    render() {
        const {location, children, site} = this.props

        return (
            <div>
                <Helmet
                    title={`${site.siteMetadata.title} — ${site.siteMetadata.name}`}
                />
                <Header
                    name={site.siteMetadata.name}
                    title={site.siteMetadata.title}
                />
                <Swipeable
                    onSwipingLeft={this.swipeLeft}
                    onSwipingRight={this.swipeRight}
                >
                    <Transition location={location}>
                        {children}
                    </Transition>
                </Swipeable>
            </div>
        )
    }
}

TemplateWrapper.propTypes = {
    children: PropTypes.node,
    data: PropTypes.object,
}

export default props => (
    <StaticQuery
        query={graphql`
      query IndexQuery {
        site {
          siteMetadata {
            name
            title
            date
          }
        }
        allSlide {
          edges {
            node {
              id
            }
          }
        }
      }
    `}
        render={data => (
            <TemplateWrapper
                site={data.site}
                slidesLength={data.allSlide.edges.length}
                {...props}
            />
        )}
    />
);
