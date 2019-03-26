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

  render() {
    return (
    <section> {this.state.rooms.map((e) =>
      <span key={e.key}>
        <div> {e.name} </div>
      </span>
    )}
    </section>

    );
  }

}
export default RoomList;
