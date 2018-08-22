import React, { Component } from 'react';
    
class RoomList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
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

    render(){
            return(
                <table>
                    <tbody>
                          {this.state.rooms.map( (rooms, index) =>
                         <tr key={index}>
                          <td>{rooms.name}</td>
                         </tr>
                        )}
                    </tbody>
                </table>
            )
    }

    }

    export default RoomList;