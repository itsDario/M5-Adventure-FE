import React from 'react'
import playerup_1 from '../images/player/movement/up1.png';
import playerup_2 from '../images/player/movement/up2.png';
import playerup_3 from '../images/player/movement/up3.png';
import playerup_4 from '../images/player/movement/up4.png';
import playerdown_1 from '../images/player/movement/down1.png';
import playerdown_2 from '../images/player/movement/down2.png';
import playerdown_3 from '../images/player/movement/down3.png';
import playerdown_4 from '../images/player/movement/down4.png';
import playerleft_1 from '../images/player/movement/left1.png';
import playerleft_2 from '../images/player/movement/left2.png';
import playerleft_3 from '../images/player/movement/left3.png';
import playerleft_4 from '../images/player/movement/left4.png';
import playerright_1 from '../images/player/movement/right1.png';
import playerright_2 from '../images/player/movement/right2.png';
import playerright_3 from '../images/player/movement/right3.png';
import playerright_4 from '../images/player/movement/right4.png';

import attackup_1 from '../images/player/attacking/attackup1.png';
import attackup_2 from '../images/player/attacking/attackup2.png';
import attackup_3 from '../images/player/attacking/attackup3.png';
import attackup_4 from '../images/player/attacking/attackup4.png';
import attackdown_1 from '../images/player/attacking/attackdown1.png';
import attackdown_2 from '../images/player/attacking/attackdown2.png';
import attackdown_3 from '../images/player/attacking/attackdown3.png';
import attackdown_4 from '../images/player/attacking/attackdown4.png';
import attackleft_1 from '../images/player/attacking/attackleft1.png';
import attackleft_2 from '../images/player/attacking/attackleft2.png';
import attackleft_3 from '../images/player/attacking/attackleft3.png';
import attackleft_4 from '../images/player/attacking/attackleft4.png';
import attackright_1 from '../images/player/attacking/attackright1.png';
import attackright_2 from '../images/player/attacking/attackright2.png';
import attackright_3 from '../images/player/attacking/attackright3.png';
import attackright_4 from '../images/player/attacking/attackright4.png';

// import slashes1 from '../images/player/slashes/Alternative_2_12.png';
import slashes1 from '../images/player/slashes/Alternative_2_11.png';
import slashes2 from '../images/player/slashes/Alternative_2_10.png';
import slashes3 from '../images/player/slashes/Alternative_2_09.png';
import slashes4 from '../images/player/slashes/Alternative_2_08.png';
// import slashes5 from '../images/player/slashes/Alternative_2_07.png';

import "../Player.css";

export default class Player extends React.PureComponent {

    componentDidMount() {
        this.swordOffsetX = 0
        this.swordOffsetY = 0
        this.direction = 'up'
        this.left = false
        this.right = false
        this.up = false
        this.down = false
        this.attack = false
        this.stepFrame = 1//true/false for now
        this.playerSheet = new Image()
        this.playerSheet = "../images/cloakandleather.png"
        document.addEventListener("keydown", this.handleKeyDown);
        document.addEventListener("keyup", this.handleKeyUp);
        this.intervalID = setInterval(this.updatePlayer, 20);
        this.intervalIDSprite = setInterval(this.updatePlayerSprite, 200);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleInputs)
        document.removeEventListener("keyup", this.handleKeyUp);
        clearInterval(this.intervalID);
        clearInterval(this.intervalIDSprite);
    }

    attackStart = () => {
        setTimeout(this.props.attack, 0);
        setTimeout(this.props.attack, 100);
        setTimeout(this.props.attack, 200);
        setTimeout(this.props.attack, 300);
        setTimeout(this.props.attack, 400);

        this.stepFrame = 1
        this.attack = true
        this.blink = false
    }

    handleKeyDown = (e) => {
        e.preventDefault()

        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.left = true
        }
        if (e.key === 'd' || e.key === 'ArrowRight') {
            this.right = true
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            this.up = true
        }
        if (e.key === 's' || e.key === 'ArrowDown') {
            this.down = true
        }
        if (e.key === ' ' && !(this.attack)) {
            this.attackStart()
            // setTimeout(this.attackStart, 3000);
        }
        if (e.key === 'e' || e.key === 'Shift') {
            this.props.useEgg()
        }
    }

    handleKeyUp = (e) => {

        if (e.key === 'a' || e.key === 'ArrowLeft') {
            this.left = false
        }
        if (e.key === 'd' || e.key === 'ArrowRight') {
            this.right = false
        }
        if (e.key === 'w' || e.key === 'ArrowUp') {
            this.up = false
        }
        if (e.key === 's' || e.key === 'ArrowDown') {
            this.down = false
        }
    }

    updatePlayerSprite = () => {
        if (this.props.playerInfo.lastHit + 1000 > Date.now()) {
            this.blink = !this.blink
        } else {
            this.blink = false
        }
        if (this.left || this.right || this.up || this.down || this.attack) {
            this.stepFrame += 1
            if (this.stepFrame > 4) {
                this.stepFrame = 1;
                this.attack = false
            }
        }
    }

    updatePlayer = () => {
        let x = 0
        let y = 0
        if (this.left) {
            // this.setState(prevState => ({
            //     x: prevState.x - 5
            // }))
            x -= 6
            this.direction = 'left'
            this.swordOffsetX = -this.props.playerInfo.swordSize
            this.swordOffsetY = -this.props.playerInfo.height / 2
        }
        if (this.right) {
            x += 6
            this.direction = 'right'
            this.swordOffsetX = this.props.playerInfo.swordSize - (this.props.playerInfo.width / 2)
            this.swordOffsetY = -this.props.playerInfo.height / 2
        }
        if (this.up) {
            y += 6
            this.direction = 'up'
            this.swordOffsetX = -this.props.playerInfo.width / 4
            this.swordOffsetY = -this.props.playerInfo.swordSize - (this.props.playerInfo.width / 2)
        }
        if (this.down) {
            y -= 6
            this.direction = 'down'
            this.swordOffsetX = -this.props.playerInfo.width / 4
            this.swordOffsetY = this.props.playerInfo.swordSize - (this.props.playerInfo.height / 1.5)
        }
        // if (this.attack) {
        //     this.props.attack()
        //     this.attack()
        //     // this.attack = false
        // }
        if (this.stepFrame > 4) {
            this.stepFrame = 1
            this.attack = false
        }
        let direction = this.direction
        this.props.returnInfo({ x, y, direction })
    }

    render() {
        const playerImages = {
            'up1': playerup_1,
            'up2': playerup_2,
            'up3': playerup_3,
            'up4': playerup_4,
            'down1': playerdown_1,
            'down2': playerdown_2,
            'down3': playerdown_3,
            'down4': playerdown_4,
            'right1': playerright_1,
            'right2': playerright_2,
            'right3': playerright_3,
            'right4': playerright_4,
            'left1': playerleft_1,
            'left2': playerleft_2,
            'left3': playerleft_3,
            'left4': playerleft_4,
        }

        const playerAttacks = {
            'up1': attackup_1,
            'up2': attackup_2,
            'up3': attackup_3,
            'up4': attackup_4,
            'down1': attackdown_1,
            'down2': attackdown_2,
            'down3': attackdown_3,
            'down4': attackdown_4,
            'right1': attackright_1,
            'right2': attackright_2,
            'right3': attackright_3,
            'right4': attackright_4,
            'left1': attackleft_1,
            'left2': attackleft_2,
            'left3': attackleft_3,
            'left4': attackleft_4,
        }
        // console.log(this.swordOffset);

        const slashes = {
            'frame1': slashes1,
            'frame2': slashes2,
            'frame3': slashes3,
            'frame4': slashes4,
        }
        return (
            <div style={{
                width: '128px',
                height: '128px',
                textAlign: 'center',
                position: 'absolute',
                zIndex: 5,
                top: `${this.props.playerInfo.y}px`,
                left: `${this.props.playerInfo.x}px`,
            }}>
                <img
                    alt='O'
                    style={{
                        marginTop: '-30px',
                        marginLeft: '-50px',
                    }}
                    // src={`player` + `${this.props.playerInfo.direction}_1`}
                    src={this.attack ? playerAttacks[`${this.props.playerInfo.direction}${this.stepFrame}`] : playerImages[`${this.props.playerInfo.direction}${this.stepFrame}`]}
                    className={`${this.blink ? 'whiteOut' : ''}`}
                />
                <img
                    alt='slash'
                    style={{
                        display: `${this.attack ? 'block' : 'none'}`,
                        position: 'absolute',
                        left: `${this.swordOffsetX}px`,
                        top: `${this.swordOffsetY}px`,
                    }}
                    src={slashes[`frame${this.stepFrame}`]}
                // src={this.attack ? playerAttacks[`${this.props.playerInfo.direction}${this.stepFrame}`] : playerImages[`${this.props.playerInfo.direction}${this.stepFrame}`]}
                // className={`${this.blink ? 'whiteOut' : ''}`}
                />
            </div >
        )
    }
}
// AppRegistry.registerComponent('DisplayAnImage', () => DisplayAnImage);