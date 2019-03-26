import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms:[]
    };

this.roomsRef = this.props.firebase.database().ref('Rooms');
}




        componentDidMount() {

             this.roomsRef.on('child_added', snapshot => {
               const room = snapshot.val();
               room.key = snapshot.key;
               this.setState({ rooms: this.state.rooms.concat( room ) })
             });
           }


           createRoom(event){
             event.preventDefault();

             const newRoomName = this.refs.newChatName.value;
             this.roomsRef.push({
               name: newRoomName
             });
             var form = document.getElementById("new-chat-room");
             form.reset();
           }


  render() {
    return (
    <section>
      <span>
        {this.state.rooms.map((e) =>
          <span key={e.key}>
            <div> {e.name} </div>
          </span>
        )}
      </span>
      <form id="new-chat-room" onSubmit={this.createRoom.bind(this)}>
          New ChatRoom Name: <br/>
          <input id="chat-room-name" type="text" ref="newChatName"/> <br/>

          <button type="submit"> Add ChatRoom </button>
     </form>
    </section>

    );
  }

}
export default RoomList;
