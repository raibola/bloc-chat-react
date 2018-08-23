import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyANquYmgtreJ3mWTN_3C_NUFRWoiL0djO8",
  authDomain: "bloc-chat-342a5.firebaseapp.com",
  databaseURL: "https://bloc-chat-342a5.firebaseio.com",
  projectId: "bloc-chat-342a5",
  storageBucket: "bloc-chat-342a5.appspot.com",
  messagingSenderId: "165100288262"
};
firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
      <h1>Welcome to Bloc Chat!</h1>
<<<<<<< HEAD
      <h2>Chat Room List</h2>
=======
      <h3>Chat Room List</h3>
>>>>>>> checkpoint-blocchatreact-listrooms
        <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
