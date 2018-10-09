import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: [],
            newRoomName:""
          };
      
        this.roomsRef = this.props.firebase.database().ref('rooms');
    }

    componentDidMount() {
        this.roomsRef.on('child_added', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.concat( room ) });
        });
        this.roomsRef.on('child_removed', snapshot => {
            const room = snapshot.val();
            room.key = snapshot.key;
            this.setState({ rooms: this.state.rooms.filter( function(value) {
              return value.key !== room.key;
            }) })
          });
    }

    createRoom(e) {
        let newRoomName = this.state.newRoomName;
        e.preventDefault();
        this.roomsRef.push({
            name: newRoomName
          });
        this.setState({ newRoomName: "" });

    }

    handleChange(e) {
        this.setState({ newRoomName: e.target.value })
      }

      deleteRoom(roomKey) {
        // console.log('trying to delete room with room.key:',roomKey);
        const room = this.props.firebase.database().ref('rooms/' + roomKey);
        room.remove()
        const remainRoom= this.state.rooms
          .filter(room => room.key !== roomKey);
   
          this.setState({ rooms: remainRoom });
      }
   

    render(){
            return(
            <div className="room-list">
                  <h1>Bloc Chat</h1>
                  <h3>Chat Room List</h3>
                <table className="chatroom-table" align="center">
                    <tbody className="list">
                          {this.state.rooms.map( (rooms) =>
                         <tr className="rooms" key={rooms.key}>
                          <td onClick={() => this.props.highlightedRoom(rooms)}>{rooms.name}</td>
                          <td><button onClick={() => this.deleteRoom(rooms.key)}>x</button></td>
                         </tr>
                        )}
                    </tbody>
                </table>
                <form onSubmit = { (e) => {this.createRoom(e)} }>
                    <input
                        type="text"
                        value={this.state.newRoomName}
                        onChange={ (e) => {this.handleChange(e)} }
                    />
                    <input 
                    type="submit" 
                    value="make new room"
                    /> 
                </form>
            </div>    
            );
    }

    }

    export default RoomList;