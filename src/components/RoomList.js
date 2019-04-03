import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms:[],
      currentRoom: {roomName: "", id: ""}
    };

this.roomsRef = this.props.firebase.database().ref('Rooms');
this.currentRoomRef = this.props.firebase.database().ref('CurrentRoom');

}




        componentDidMount() {

             this.roomsRef.on('child_added', snapshot => {
               const room = snapshot.val();
               room.key = snapshot.key;
               this.setState({ rooms: this.state.rooms.concat( room ) });
               this.setState({currentRoom: this.props.currentRoom})
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
             console.log(this.state.currentRoom);
           }

           setCurrentRoom(newName,newId){
             this.props.setCurrentRoom(newName,newId);
             this.setState({currentRoom: {roomName: newName, id: newId} });
           }



  render() {
    return (
    <section>
      <span>
        {this.state.rooms.map((e) =>
          <span key={e.key} onClick={() => this.setCurrentRoom(e.name,e.key)}>
           <div>{e.name} </div>
          </span>
        )}
      </span>
      <span>{this.state.currentRoom.roomName === ""  ?
      <span> Select Chat Room To View Messages </span> 
      :
      <span> {this.state.currentRoom.roomName} is the current room. </span>}
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
