import React, { Component } from 'react'
import { render } from 'react-dom'
import { Checkbox } from './components/checkbox'
import styled from 'styled-components'
import './components/css/styles.css'
import icon from '../../dist/assets/icon_256x256.png'
import menubar from '../../dist/assets/menubar.png'

const settings = require('electron-settings')
const { webFrame } = require('electron')
webFrame.setZoomLevelLimits(1, 1)

class Welcome extends Component {

  constructor() {
    super()

    var showWelcome = settings.has('show-welcome') ? settings.get('show-welcome') : true

    this.state = {
      active: 0,
      left: 0,
      showWelcome
    }
  }

  returnIndex(i) {
    this.setState({
      active: i,
      left: i * -410
    })
  }

  leftArrow() {
    this.setState({
      active: this.state.active - 1,
      left: this.state.left + 410
    })
  }

  rightArrow() {
    this.setState({
      active: this.state.active + 1,
      left: this.state.left - 410
    })
  }

  setShowWelcomeGuide() {
    let check = !this.state.showWelcome
    this.setState({ showWelcome: check })
    settings.set('show-welcome', check)
  }

  render() {
    return (
      <Win>
        <Frame
          style={{ display: `${window.navigator.platform === 'MacIntel' ? 'block' : 'none'}`}}
        >
          Welcome Guide
        </Frame>

        <Arrow
          onClick={() => this.leftArrow()}
          style={{
            left: 40,
            transform: 'rotate(180deg)',
            display: this.state.active === 0 ? 'none' : 'block'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 461.31 461.31"
          >
            <path d="M421.85,67C294.47,67,191.2,170.25,191.2,297.64S294.47,528.29,421.85,528.29,652.51,425,652.51,297.64,549.24,67,421.85,67Zm92.38,247.82L398.82,430.21a24.36,24.36,0,1,1-32.71-35.81l96.66-96.66-98.28-98.28a24.36,24.36,0,1,1,35.81-32.71L511.67,278.14a24.35,24.35,0,0,1,2.55,36.66h0Z" transform="translate(-191.2 -66.99)"/>
          </svg>
        </Arrow>

        <Arrow
          onClick={() => this.rightArrow()}
          style={{
            right: 40,
            display: this.state.active === 2 ? 'none' : 'block'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 461.31 461.31"
          >
            <path d="M421.85,67C294.47,67,191.2,170.25,191.2,297.64S294.47,528.29,421.85,528.29,652.51,425,652.51,297.64,549.24,67,421.85,67Zm92.38,247.82L398.82,430.21a24.36,24.36,0,1,1-32.71-35.81l96.66-96.66-98.28-98.28a24.36,24.36,0,1,1,35.81-32.71L511.67,278.14a24.35,24.35,0,0,1,2.55,36.66h0Z" transform="translate(-191.2 -66.99)"/>
          </svg>
        </Arrow>

        <Header>
          <img src={icon} height="80px"/>
          <div>
            <Title>Transee</Title>
            <Details>Simple and usefull tool for quick translation</Details>
          </div>
        </Header>

        <Cards
          style={{
            marginLeft: this.state.left
          }}
        >
          <Card>
            <h2>Start</h2><br />
            Press <Short>Ctrl+T</Short><br />
            and starts translating<br />
            press <Short>Esc</Short> to hide the search bar<br />
            that's it!
          </Card>

          <Card>
            <h2>Menu bar</h2><br />
            <img src={menubar} style={{marginBottom: 20}} />
            <br />
            Transee lives in your menu bar<br />
            and it starts automatically,<br />
            so you can forget about it.
          </Card>

          <Card>
            <h2>Shortcuts</h2><br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <Row><Short>Alt+Shift</Short></Row>
                <Row><Short>Ctrl+P</Short></Row>
                <Row><Short>Ctrl+O</Short></Row>
              </div>
              <div style={{ textAlign: 'left' }}>
                <Row>Invert languages</Row>
                <Row>Listen voice</Row>
                <Row>Listen translated voice</Row>
              </div>
            </div>
          </Card>

        </Cards>

        <Option>
          <Checkbox
            value={this.state.showWelcome}
            onClick={() => this.setShowWelcomeGuide()}
          />
          <Label>Show Welcome Guide when opening Transee</Label>
        </Option>
        <Navigator
          items={3}
          active={this.state.active}
          onClick={(i) => this.returnIndex(i)}
        />
      </Win>
    )
  }
}

const frameColor = 'rgba(26, 26, 26, 1)'

const Win = styled.div`
  color: #fff;
  user-select: none;
  cursor: default;
`
const Frame = styled.div`
  color: #aaa;
  background: ${frameColor};
  padding-top: 5px;
  height: 18px;
  font-size: 12px;
  text-align: center;
  -webkit-app-region: drag;
  -webkit-user-select: none
`
const Header = styled.div`
  margin: 0 18px;
  display: flex;
  justify-content: space-between;
  padding: 3px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`
const Title = styled.div`
  text-align: right;
  margin-top: 10px;
  font-size: 26px;
`
const Details = styled.div`
  color: #999;
  font-size: 16px;
`
const Row = styled.div`
  margin: 9px 3px;
`
const Short = styled.div`
  display: inline;
  padding: 1px 9px;
  background: #2182BD;
  border-radius: 3px;
  font-size: 14px;
`
const Option = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 9px 18px;
  color: #aaa;
  border-top: 1px solid rgba(85, 85, 85, 0.3);
`
const Label = styled.div`
  margin-left: 9px;
  padding: 12px 0;
  font-size: 12px;
`
const Arrow = styled.div`
  top: 215px;
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  opacity: 0.3;
  z-index: 3;
  svg {
    fill: gray;
  }
  &:hover svg {
    fill: white
  }
`
const Cards = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  transition: 0.3s ease;
  padding-left: 55px;
`
const Card = styled.div`
  box-sizing: border-box;
  text-align: center;
  font-size: 18px;
  background: none;
  width: 350px;
  border-radius: 5px;
  margin: 0 30px;
  padding: 18px;
  flex-shrink: 0
`

const Navigator = (props) => {
  var dots = []

  const Dot = styled.div`
    box-sizing: border-box;
    background: gray;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin: 4px;
    display: inline-block;
  `
  const Dots = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: default;
    margin: 9px 0;
  `

  function returnIndex(e, i) {
    props.onClick(i)
  }

  for (let i = 0; i < props.items; i++) {
    var dot = (
      <Dot
        key={i}
        style={{background: i === props.active ? 'white' : 'gray'}}
        onClick={(e) => returnIndex(e, i)}
      ></Dot>
    )

    dots.push(dot)
  }

  return <Dots>{ dots }</Dots>
}

render(<Welcome />, document.getElementById('root'))
