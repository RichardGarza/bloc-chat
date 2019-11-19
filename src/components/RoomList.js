import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      currentRoom: { roomName: "", id: "" }
    };

    this.roomsRef = this.props.firebase.database().ref("Rooms");
    this.currentRoomRef = this.props.firebase.database().ref("CurrentRoom");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
      this.setState({ currentRoom: this.props.currentRoom });
    });
  }

  createRoom(event) {
    event.preventDefault();
    const newRoomName = this.refs.newChatName.value;

    this.roomsRef.push({
      name: newRoomName
    });

    console.log(this.state.currentRoom);
    var form = document.getElementById("new-chat-room");
    form.reset();
  }

  setCurrentRoom(newName, newId) {
    this.props.setCurrentRoom(newName, newId);
    this.setState({ currentRoom: { roomName: newName, id: newId } });
  }

  render() {
    return (
      <section>
        <span class="btn-toolbar">
          <div class="btn-group mr-2" role="group" aria-label="First group">
            {this.state.rooms.map(e => (
              <span
                key={e.key}
                onClick={() => this.setCurrentRoom(e.name, e.key)}
              >
                {this.state.currentRoom.id === e.key ? (
                  <div class="text-center  my-1 nav-link btn btn-primary">
                    {e.name}{" "}
                  </div>
                ) : (
                  <div class="text-center  my-1 nav-link btn btn-seconday">
                    {e.name}{" "}
                  </div>
                )}
              </span>
            ))}
          </div>
        </span>

        <span>
          {this.state.currentRoom.roomName === "" ? (
            <h6> Select Chat Room To View Messages </h6>
          ) : (
            <span> </span>
          )}
        </span>
        <form id="new-chat-room" onSubmit={this.createRoom.bind(this)}>
          New ChatRoom Name: <br />
          <input id="chat-room-name" type="text" ref="newChatName" /> <br />
          <button type="submit"> Add ChatRoom </button>
        </form>
      </section>
    );
  }
}
export default RoomList;
