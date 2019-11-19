import React, { Component } from "react";

import "./App.css";

import RoomList from "./components/RoomList.js";
import MessageList from "./components/MessageList.js";
import User from "./components/User.js";

import * as firebase from "firebase";
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
      currentRoom: { roomName: "", id: "" },
      currentUser: "Guest",
      rooms: []
    };

    this.roomsRef = firebase.database().ref("Rooms");
    this.userRef = firebase.database().ref("CurrentUser");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  setCurrentRoom(newName, newId) {
    this.setState({ currentRoom: { roomName: newName, id: newId } });
  }

  setCurrentUser(user) {
    this.setState({ currentUser: user });
  }

  render() {
    return (
      <div className="App">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossorigin="anonymous"
          />
          <title>Chat it Up</title>
        </head>

        <br />

        <div class="container">
          <div class="row">
            <div class="col-sm ">
              <RoomList
                currentRoom={this.state.currentRoom}
                firebase={firebase}
                setCurrentRoom={(newName, newId) =>
                  this.setCurrentRoom(newName, newId)
                }
              />
              <span>
                {" "}
                You are currently logged in as {this.state.currentUser}.
              </span>
            </div>
            <br />
            <div class="col-sm card border-primary mb-3">
              <MessageList
                currentRoom={this.state.currentRoom}
                currentUser={this.state.currentUser}
                firebase={firebase}
              />
              <User
                firebase={firebase}
                setCurrentUser={this.setCurrentUser.bind(this)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
