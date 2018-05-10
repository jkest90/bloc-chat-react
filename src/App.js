import React, { Component } from 'react';
import './App.css';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
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
   constructor(props) {
      super(props);
      this.state = {
         activeRoom: '',
         username: 'Guest'
      };
   }

   setUser(user) {
      this.setState({ username: user });
   }

   handleSignOut() {
      firebase.auth().signOut();
      this.setState({ username: 'Guest'});
   }

   updateActiveRoom(room) {
      this.setState({ activeRoom : room});
      console.log('Active Room Changed', this.state.activeRoom);
   };

   render() {
      return (
         <div className="App">
            <h1> Bloc Chat </h1>
            <User
               firebase={ firebase }
               setUser={ (user) => this.setUser(user) }
               user={ this.state.username }
               handleSignOut={ () => this.handleSignOut() }
            />
            <RoomList
               firebase={ firebase }
               handleActiveRoom={ (room) => this.updateActiveRoom(room) }
               activeRoom={ this.state.activeRoom }
            />
            <MessageList
               firebase={ firebase }
               handleActiveRoom={ (room) => this.updateActiveRoom(room) }
               activeRoom={ this.state.activeRoom }
               user={ this.state.username }
            />
         </div>
      );
  }
}

export default App;
