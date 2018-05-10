import React, { Component } from 'react'

class MessageList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         // username: '',
         content: '',
         sentAt: '',
         roomId: null,
         messages: []
      };
      this.messagesRef = this.props.firebase.database().ref('messages');
   }

   // set the state of messages equal to values onChange
   handleChange(e) {
      e.preventDefault();
      this.setState({
         username: this.props.user,
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
            username: this.props.user,
            content: this.state.content,
            sentAt: this.state.sentAt,
            roomId: this.state.roomId.key
         });
         console.log('New message added');
         this.setState({ username: '', content: '', sentAt: '', roomId: '' });
      };
   }

   // messages returned FROM firebase
   componentDidMount() {
      console.log(this.messagesRef.orderByChild("roomId").equalTo(this.state.roomId))
      this.messagesRef.orderByChild("roomId").equalTo(this.state.roomId);
      this.messagesRef.on('child_added', snapshot => {
         const message = snapshot.val();
         console.log('Message', message);
         message.key = snapshot.key;
         this.setState({ messages: this.state.messages.concat(message) });
      });
   }

   render() {
      const messageList = (
         this.state.messages.map((message) => {
            if (message.roomId === this.props.activeRoom.key) {
              return <li key={message.key}>{message.content}</li>
            }
            return null;
         })
      );
      return (
         <div className="chatMessage-form">
            <form onSubmit={ (e) => this.createMessage(e) }>
               <label>Write a message!</label>
               <input type="text" value = { this.state.content } onChange= { (e) => this.handleChange(e) }/>
               <input type="submit" />
            </form>
            <div>
               { messageList }
            </div>
         </div>
      )
   }

}

export default MessageList;


// createa an active user object in state.
// add an event handler onto each chat room  sets the active chat room  and pushes it into state .
