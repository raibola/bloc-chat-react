import React, { Component } from 'react';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: []
        }
        this.MessagesRef = this.props.firebase.database().ref('Messages');
    }

    componentDidMount(){
        this.MessagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        })
    }

render (){
    const roomMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom.key)
    return (
    <table className="message-list" align="center">
        <tbody>
         {roomMessages.map( (message) =>  
         <tr key={message.key}>
         <td>Chat Room {message.roomId}</td>
         <td>{message.username}:</td>
         <td>{message.content}</td>
         <td>{message.sentAt}</td>
         </tr>
         )}
        </tbody>
    </table>
);

}
}

export default MessageList;