import React, { Component } from 'react';

class MessageList extends Component {
    constructor (props) {
        super(props);

        this.state = {
            messages: [],
            newMessage: ''
        }
        this.MessagesRef = this.props.firebase.database().ref('Messages');
    }

    componentDidMount(){
        this.MessagesRef.on('child_added', snapshot => {
            const message = snapshot.val();
            message.key = snapshot.key;
            this.setState({ messages: this.state.messages.concat( message ) });
        });
        this.MessagesRef.on('child_removed', snapshot => {
            const message = snapshot.val();
            message.key = message.key;
            this.setState({ messages: this.state.messages.filter( function(value) {
              return value.key !== message.key;
            }) })
          });
    }

    createNewMessage(e) {
        let newMessage = this.state.newMessage;
        let activeUser = this.props.activeUser;
        let timeStamp = this.props.firebase.database.ServerValue.TIMESTAMP;
        let activeRoom = this.props.activeRoom;
        e.preventDefault();
        if (activeUser !== null) {
            this.MessagesRef.push({
                content: newMessage,
                roomId: activeRoom.key,
                sentAt: timeStamp,
                username: activeUser.displayName
              }) 
            } else {
                this.MessagesRef.push({
                    content: newMessage,
                    roomId: activeRoom.key,
                    sentAt: timeStamp,
                    username: 'Guest'
              })
        }
        this.setState({ newMessage: "" });
    }

    handleChange(e) {
        this.setState({ newMessage: e.target.value });
    }

    timeStampConverter(e) {
        var timeStamp = new Date(e);
        var month = timeStamp.getMonth()+1;
        var date = timeStamp.getDate();
        var year = timeStamp.getFullYear();
        var hours = timeStamp.getHours();
        let minutes = timeStamp.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : '12';
        minutes = minutes > 10 ? minutes : '0' + minutes;
        return (month+'/'+date+'/'+year + ' ' + hours + ':' + minutes + ampm);
    }

    deleteMessage(messageKey) {
        // console.log('trying to delete message', messageKey);
    const message = this.props.firebase.database().ref('messages' + messageKey);
    message.remove()
    const remainMessages = this.state.messages
      .filter(message => message.key !== messageKey);
      this.setState({ messages: remainMessages});
    }

render (){
    const roomMessages = this.state.messages.filter( message => message.roomId === this.props.activeRoom.key)
    return (
   <div>
    <table className="message-list" align="center">
        <tbody>
         {roomMessages.map( (message) =>  
         <tr key={message.key}>
         <td>{message.username}:</td>
         <td>{message.content}</td>
         <td>{this.timeStampConverter(message.sentAt)}</td>
         <td><button onClick={ () => this.deleteMessage(message.key) }>Delete Message</button></td>
         </tr>
         )}
        </tbody>
    </table>  
    <footer>
    <form className="new-message" onSubmit = { (e) => {this.createNewMessage(e)} }>
    <input className="message" 
     type="text"
     placeholder="Write your message here..."
     value={this.state.newMessage}
     onChange={ (e) => this.handleChange(e)}
     />
    <input className="submit-message" type="submit" value="Send" />
    </form>
    </footer>
    </div>
);

}
}

export default MessageList;