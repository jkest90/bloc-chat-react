import React, { Component } from 'react';

class User extends Component {

   componentDidMount() {
      this.props.firebase.auth().onAuthStateChanged( user => {
         this.props.setUser(user.displayName);
         console.log(user);
      });
   }

   render() {
      const provider = new this.props.firebase.auth.GoogleAuthProvider();
      return (
         <div className="user-auth">
            <button onClick={ () => this.props.firebase.auth().signInWithPopup( provider ) }>
               Sign In
            </button>
            <button onClick={ () => this.props.handleSignOut() }>
               Sign Out
            </button>
            <h1> { this.props.user } </h1>
         </div>
      )
   }
}

export default User;
