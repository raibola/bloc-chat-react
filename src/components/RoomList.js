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

    render(){
            return(
            <div className="room-list">
                  <h2>Chat Room List</h2>
                <table className="chatroom-table" align="center">
                    <tbody className="list">
                          {this.state.rooms.map( (rooms) =>
                         <tr key={rooms.key}>
                          <td onClick={() => this.props.highlightedRoom(rooms)}>{rooms.name}</td>
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