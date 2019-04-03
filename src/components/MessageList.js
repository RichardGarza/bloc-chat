import React, { Component } from 'react';


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentRoomMessages:[],
      currentRoom: {roomName: "", id: ""}
    };

this.messagesRef = this.props.firebase.database().ref('Messages');
this.timeStamp =   this.props.firebase.database.ServerValue.TIMESTAMP;
this.currentRoom = this.props.currentRoom;
  }

      componentDidMount() {
        this.messagesRef.on('child_added', snapshot => {
          const message = snapshot.val();
          message.key = snapshot.key;
          this.setState({ messages: this.state.messages.concat( message ) })
          } );
          this.setState({currentRoom: this.props.currentRoom})
      }

      componentWillReceiveProps(nextProps){
         this.setState({currentRoom: {roomName: nextProps.currentRoom.roomName, id: nextProps.currentRoom.id} });
         this.setState({currentUser: nextProps.currentUser});

         const activeRoom = nextProps.currentRoom.id;
         const messages = this.state.messages;
         const result = messages.filter( e => e.roomId === activeRoom)
          console.log(nextProps.currentRoom.id);
        this.setState({currentRoomMessages: result})

      }

      sendMessage(event){
        event.preventDefault();
        const timeStamp = this.timeStamp;
        const newMessage = this.refs.newMessage.value;
        this.messagesRef.push({

            username: this.state.currentUser,
            content: newMessage,
            sentAt: timeStamp,
            roomId: this.state.currentRoom.id

        });
        console.log(this.state.messages);
        var form = document.getElementById("new-message");
        form.reset();
      }

      convert(timestamp){
            var myDate = new Date( timestamp);
          const convdataTime =  myDate.toLocaleString();
             return <span> {convdataTime} </span>;
      }

  render() {
    return (
      <section>
        <span>
          {this.state.currentRoomMessages.map((e) =>
            <span key={e.key}>
              <div> {e.username}: {e.content} {this.convert(e.sentAt)}</div>
            </span>
          )}
        </span>
        <form id="new-message" onSubmit={this.sendMessage.bind(this)}>
            Message: <br/>
            <input id="message" type="text" ref="newMessage"/> <br/>

            <button type="submit"> Send Message </button>
       </form>
       <span> {this.state.currentRoom.name} </span>
      </section>
    )
  }
}

export default MessageList;
