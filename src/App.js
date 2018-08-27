import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';


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
  constructor(props) {
    super(props);

    this.state = {
      activeRoom: '',
      activeUser: ''
    }
  }

  highlightedRoom(room) {
    this.setState({ activeRoom: room })
  }

  setUser(user) {
    this.setState({ activeUser: user })
  }
  
  render() {
    return (
      <div className="App">
      <h1>Welcome to Bloc Chat!</h1>
        <User 
        firebase={firebase}
        activeUser={this.state.activeUser}
        setUser={(user) => this.setUser(user)}
        />

        <RoomList 
        activeRoom={this.state.activeRoom}
        firebase={firebase}
        highlightedRoom={(e) => this.highlightedRoom(e)}
        />

        <MessageList
        activeRoom={this.state.activeRoom}
        firebase={firebase}
        highlightedRoom={(e) => this.highlightedRoom(e)}
        />
      </div>
    );
  }
} 

export default App;
