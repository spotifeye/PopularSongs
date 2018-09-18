import React from 'react';
import { Popover, PopoverBody } from 'reactstrap';
import styles from '../styles/Song.css';
import CSSModules from 'react-css-modules';
   

class Song extends React.Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        
        this.state = {
            playing: false,
            moreOptions: false,
            hover: false,
            popoverOpen: false
        };
    }   
      
    displayNumber () {
        return (<div id={styles.number}>{this.props.counter}</div>);
    }

    displayPlay () {
        return (<ion-icon id={styles.play} name={"ios-play"}></ion-icon>);
    }

    toggle() {
        this.setState({popoverOpen: !this.state.popoverOpen});
    }
        
    render () {
         
        return (
           <div className={"row"} styleName={"song"} onMouseOver={() => {this.setState({hover: true})}} onMouseOut={() => this.setState({hover: false})}>
                <div className={"col col-lg-1"}></div>

                <div className={"col col-lg-1"}>
                    <img src={this.props.albumURL} alt={"artist album cover"} width={"50"}/>
                </div>

                <div className={"col col-lg-1"} styleName={"song-number-play"}>
                
                {this.state.hover ? this.displayPlay() : this.displayNumber()}
                    
                </div>

                <div className={"col col-lg-1"}>
                    <ion-icon styleName={"plus"} name={"ios-add"}></ion-icon>
                </div>

                <div className={"col col-lg-4"} styleName={"song-name"}>{this.props.songName}</div>

                <div className={"col col-lg-1"}>
                    <ion-icon id={"Popover1"} styleName={"more"} name={"ios-more"} onClick={this.toggle}></ion-icon>
                </div>

                <div className={"col col-lg-2"}styleName={"streams"}>{this.props.streams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>

                <div className={"col col-lg-1"}></div>


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
