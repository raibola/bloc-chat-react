import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCU6FvrVVIqxV6SzRg2n13k3EAXHqIr684",
  authDomain: "bloc-chat-raibola.firebaseapp.com",
  databaseURL: "https://bloc-chat-raibola.firebaseio.com",
  projectId: "bloc-chat-raibola",
  storageBucket: "bloc-chat-raibola.appspot.com",
  messagingSenderId: "1078191580706"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <div className="App">
        <RoomList firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
