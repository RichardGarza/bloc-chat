import React, { Component } from 'react';

import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList.js';

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
  render() {
    return (
      <div className="App">

        <RoomList
         firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
