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
            popoverOpen: false,
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
                    <ion-icon id={"Popover1"} styleName={"more"} name={"ios-more"} onClick={this.toggle}></ion-icon>
                </div>

                <div className={"col col-lg-2"}styleName={"streams"}>{this.props.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>


                <div id={styles["more-options"]}>
                    <Popover placement={"bottom"} isOpen={this.state.popoverOpen} target={"Popover1"} toggle={this.toggle} styleName={"popover"}>
                        <PopoverBody styleName={"popover-body"}>
                            <table>
                                <tbody>
                                    <tr><td>Add to Queue</td></tr>
                                    <tr><td>Go to Song Radio</td></tr>
                                    <tr><td>Go to Artist</td></tr>
                                    <tr><td>Go to Album</td></tr>
                                    <tr><td>Show Credits</td></tr>
                                    <tr><td>Save to Your Library</td></tr>
                                    <tr><td>Add to Playlist</td></tr>
                                    <tr><td>Share</td></tr>
                                </tbody>
                            </table>
                        </PopoverBody>
                    </Popover>
                </div>
            </div>
            
        );
    }

}

export default CSSModules(Song, styles);
//export default Song;
