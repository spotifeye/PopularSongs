import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import styles from '../styles/Song.css';
import CSSModules from 'react-css-modules';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerEmpty, faThermometerQuarter, faThermometerHalf, faThermometerThreeQuarters, 
         faThermometerFull, faPlayCircle, faPauseCircle, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
   

class Song extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        
        this.state = {
            playing: false,
            moreOptions: false,
            hover: false,
            check: false
        };
    }   
      
    displayNumber () {
        return (<div id={styles.number}>{this.props.counter}</div>);
    }

    displayPlay () {
        //return (<ion-icon id={styles.play} name={"ios-play"}></ion-icon>);
        return(<FontAwesomeIcon id={styles.play} icon={faPlayCircle} size="lg"/>);
    }

    displayCheck () {
        return(<ion-icon name="checkmark"></ion-icon>);
    }

    displayPlus () {
        return(<ion-icon styleName={"plus"} name={"ios-add"}></ion-icon>);
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }

    more () {
        return (
            <div className={"dropdown"}>
                <ion-icon styleName={"more"} name={"ios-more"} data-toggle={"dropdown"} ></ion-icon>
                <div className={"dropdown-menu"} styleName={"more-options"} aria-labelledby={"dropdownMenuButton"}>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Add to Queue</a>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Go to Song Radio</a>
                    <div className="dropdown-divider" styleName={"line"}></div>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Go to Artist</a>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Go to Album</a>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Show Credits</a>
                    <div className="dropdown-divider" styleName={"line"}></div>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Save to Your Library</a>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Add to Playlist</a>
                    <div className="dropdown-divider" styleName={"line"}></div>
                    <a className={"dropdown-item"} styleName={"more-op"} href="#">Share</a>
                </div>
            </div>
        );
    }
        
    render () {
         
        return (
           <div className={"row"} styleName={"song"} onMouseOver={() => {this.setState({hover: true})}} onMouseOut={() => this.setState({hover: false})}>
                
                <div className={"col col-lg-1"}>
                    <img id={styles.cover} src={this.props.albumURL} alt={"artist album cover"} width={"50"}/>
                </div>

                <div className={"col col-lg-1"} styleName={"song-number-play"}>
                
                {this.state.hover ? this.displayPlay() : this.displayNumber()}
                    
                </div>

                <div className={"col col-lg-1"} onClick={() => {this.setState({check: !this.state.check})}}>
                    {this.state.check ? this.displayCheck() : this.displayPlus()}
                    {/* <FontAwesomeIcon styleName={"plus"} icon={faPlus} size="lg"/> */}
                </div>

                <div className={"col col-lg-6"} styleName={"song-name"}>{this.props.songName}</div>

                <div className={"col col-lg-1"}>
                    {this.more()}
                    {/* <ion-icon id={"Popover1"} styleName={"more"} name={"ios-more"} onClick={this.toggle}></ion-icon> */}
                </div>

                <div className={"col col-lg-2"}styleName={"streams"}>{this.props.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

            </div>
            
        );
    }

}

export default CSSModules(Song, styles);
//export default Song;
