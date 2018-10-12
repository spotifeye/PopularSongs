import React from 'react';
import axios from 'axios';
import Song from './Song.jsx';
import styles from '../styles/App.css';
import CSSModules from 'react-css-modules';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artistID: null,
      albumID: null,
      songID: null,
      popularSongs: [],
      albumCovers: [],
      showMore: false,
      artistObj: null
    };
  }

  componentDidMount() {
    var randNum = Math.floor(Math.random() * 300000) + 10000000;
    // this.setState({ artistID: randNum });

    //axios.get(`http://localhost:3003/artist/id`,{params: {id: randNum}})
    axios
      .get(`/api/v1/artists/${randNum}/popular-songs`)
      .then(response => {
        let data = response.data;
        this.setState({
          popularSongs: data
        });
      })

      .catch(error => {
        console.log('error is here', error);
      });
  }

  createListOfSongs() {
    return this.state.popularSongs.map((e, i) => (
      <Song
        key={e.sng_id}
        counter={i + 1}
        albumURL={e.img.slice(0, -1)}
        library={e.library}
        songName={e.sng_name}
        streams={e.streams}
      />
    ));
  }

  fiveBestSongs() {
    return this.createListOfSongs().slice(0, 5);
  }

  render() {
    return (
      //<div className={"container-fluid popular-songs"}>
      <div className={'container-fluid'} styleName={'popular-songs'}>
        <div className={'row'}>
          <div className={'col col-lg-1'}>
            <h3 styleName={'popular-title'}>Popular</h3>
          </div>
        </div>

        {this.state.showMore ? this.createListOfSongs() : this.fiveBestSongs()}

        <div className={'row'}>
          <div className={'col col-lg-1'} />
          <div className={'col'}>
            <button
              styleName={'spfy-btn'}
              className={'mt-5'}
              type={'button'}
              onClick={() => {
                this.setState({ showMore: !this.state.showMore });
              }}
            >
              {this.state.showMore ? 'SHOW ONLY 5 SONGS' : 'SHOW 5 MORE'}
            </button>
          </div>
          <div className={'col col-lg-1'} />
        </div>
      </div>
    );
  }
}

//export default App;
export default CSSModules(App, styles);
