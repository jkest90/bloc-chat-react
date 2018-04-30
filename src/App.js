import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList'
import * as firebase from 'firebase';
var config = {
   apiKey: "AIzaSyBdHad_1G2cpQXCyX0R8rBa2ZgAvWvHmrs",
   authDomain: "bloc-chat-2f235.firebaseapp.com",
   databaseURL: "https://bloc-chat-2f235.firebaseio.com",
   projectId: "bloc-chat-2f235",
   storageBucket: "bloc-chat-2f235.appspot.com",
   messagingSenderId: "898285849009"
};
firebase.initializeApp(config);

class App extends Component {
   render() {
      return (
         <div className="App">
            <h1> Bloc Chat </h1>
            <RoomList firebase={firebase}/>
         </div>
      );
  }
}

export default App;
