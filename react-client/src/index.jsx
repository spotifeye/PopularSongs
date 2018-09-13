import React from 'react';
import ReactDOM from 'react-dom';
// import $ from 'jquery';
// import Balance from './components/Balance.jsx';
// import List from './components/List.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     
    };
}
  
  render () {
   
    return (
        <h1>Hello React</h1>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));