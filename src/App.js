import React, { Component } from 'react';

import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

var config = {
  apiKey: "AIzaSyBhVT4DvrKN5KMEh1Dn6zeUtOH4DGj6Jl0",
  authDomain: "bloc-chat-8e4cb.firebaseapp.com",
  databaseURL: "https://bloc-chat-8e4cb.firebaseio.com",
  projectId: "bloc-chat-8e4cb",
  storageBucket: "bloc-chat-8e4cb.appspot.com",
  messagingSenderId: "175372944399"
};
firebase.initializeApp(config);

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentRoom: {roomName: "", id: ""},
      currentUser: "Guest",
      rooms: []
    };

this.roomsRef = firebase.database().ref('Rooms');
this.userRef = firebase.database().ref('CurrentUser');
}

              componentDidMount() {

                   this.roomsRef.on('child_added', snapshot => {
                     const room = snapshot.val();
                     room.key = snapshot.key;
                     this.setState({ rooms: this.state.rooms.concat( room ) })
                   });
                 }

              setCurrentRoom(newName, newId){
                this.setState({currentRoom: {roomName: newName, id: newId} });
                

              }



              setCurrentUser(user){
                this.setState({currentUser: user })
              }

  render() {
    return (
      <div className="App">

      <span> You are currently logged in as {this.state.currentUser}.</span>
      <br/>
        <RoomList
         currentRoom={this.state.currentRoom}
         firebase={firebase}
         setCurrentRoom={(newName, newId) => this.setCurrentRoom(newName, newId)}
        />
        <User
        firebase={firebase}
        setCurrentUser={this.setCurrentUser.bind(this)}
         />
        <MessageList
        currentRoom={this.state.currentRoom}
        currentUser={this.state.currentUser}
        firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
