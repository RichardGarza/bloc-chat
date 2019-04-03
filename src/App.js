import React, { Component } from 'react';

import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';

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
                console.log(this.state.currentRoom.id + "APP");

              }

              setUser(event){
                event.preventDefault();
                const newUserName = this.refs.userName.value;
                this.setState({currentUser: newUserName })
                console.log(newUserName);
                var form = document.getElementById("set-username");
                form.reset();
              }

  render() {
    return (
      <div className="App">
      <span> You are currently logged in as {this.state.currentUser}.</span>
      <br/>
        <form id="set-username" onSubmit={this.setUser.bind(this)}>
          Change UserName: <br/>
            <input id="UserName" type="text" ref="userName"/> <br/>

            <button type="submit"> Set UserName </button>
          </form>
        <RoomList
         currentRoom={this.state.currentRoom}
         firebase={firebase}
         setCurrentRoom={(newName, newId) => this.setCurrentRoom(newName, newId)}
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
