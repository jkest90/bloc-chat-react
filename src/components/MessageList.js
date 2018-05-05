import React, { Component } from 'react'

class MessageList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         content: '',
         sentAt: '',
         roomId: null,
         messages: [],
      };
      this.messagesRef = this.props.firebase.database().ref('messages');
   }

   // set the state of messages equal to values
   handleChange(e) {
      e.preventDefault();
      this.setState({
         username: '',
         content: e.target.value,
         sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
         roomId: this.props.activeRoom
      });
   }

   // sending messages TO firebase
   createMessage(e) {
      e.preventDefault();
      if (!this.state.roomId) {
         alert('Please choose a room first!');
         this.setState({ content: '' })
      } else {
         this.messagesRef.push({
            username: this.state.username,
            content: this.state.content,
            sentAt: this.state.sentAt,
            roomId: this.state.roomId
         });
         console.log('New message added');
         this.setState({ username: '', content: '', sentAt: '', roomId: '' });
      };
   }

   // messages returned FROM firebase
   componentDidMount() {
      this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         console.log('Message', message)
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat(message) });
      });
   }

   render() {
      return (
         <div className="chatMessage">
            <form onSubmit={ (e) => this.createMessage(e) }>
               <label>Write a message!</label>
               <input type="text" value = { this.state.content } onChange= { (e) => this.handleChange(e) }/>
               <input type="submit" />
            </form>
            {
               this.state.messages.map( (message, index) => {
                  <div key={message.key}>
                     <p> {message.content}</p>
                  </div>
               })
            }
         </div>
      )
   }

}

export default MessageList;


// createa an active user object in state.
// add an event handler onto each chat room  sets the active chat room  and pushes it into state .
