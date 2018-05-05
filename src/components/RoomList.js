import React, { Component } from 'react'

class RoomList extends Component {
   constructor(props) {
      super(props);
      this.state = {
         rooms: [],
         newChatRoom: ''
      };
      this.roomsRef = this.props.firebase.database().ref('rooms');
      // this.activeRef = this.props.activeRoom;
   }

   componentDidMount() {
      this.roomsRef.on('child_added', snapshot => {
         const room = snapshot.val();
         room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat(room) });
         console.log('child added!', room);
      });
   }

   handleChange(e) {
      this.setState({ newChatRoom: e.target.value });
   }

   createRoom(e) {
      e.preventDefault();
      // if (!this.state.newChatRoom) { return }
      // const newRoom = { roomName: this.state.newChatRoom }
      this.roomsRef.push({
         name: this.state.newChatRoom
      });
      console.log('New Room Added!');
      this.setState({ newChatRoom: '' });
   }

   render() {
      return (
         <div>
            <form onSubmit={ (e) => this.createRoom(e) }>
               <label> Create A Chat Room </label>
               <input type="text"
                     value={ this.state.newChatRoom }
                     onChange={ (e) => this.handleChange(e) }
                     placeholder="Choose a Room Name" />
               <input type="submit" />
            </form>
            {
               this.state.rooms.map( (room, index) =>
                  <div key={room.key} onClick={ () => this.props.handleActiveRoom(room) }>
                     {room.name}
                  </div>
               )
            }
         </div>
      )
   }
}

export default RoomList;


// Checkpoint 4.4 - Create a Chat Room
// Render a form with a text input and a submit input.
// Whenever there is a change to the input, call, handleChange via onChange. handleChange(e) allows to set the value of this.state.newChatRoom to whatever our input is.
// When we click submit, we call createRoom(e) onSubmit. This pushes the value of this.state.newChatRoom into our database reference, which ultimately is added to our state's
// rooms array, mapped over, and displayed on our page.
