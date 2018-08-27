import React, { Component } from 'react';


class User extends Component {

componentDidMount (){
    this.props.firebase.auth().onAuthStateChanged( user => {
        this.props.setUser(user);
      });
}

signIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
}

signOut() {
    this.props.firebase.auth().signOut();
}

render() {
    const isLoggedIn = this.props.activeUser === null;
    console.log(this.props.activeUser);

    return(
        <div>
            {isLoggedIn ? 
            (<span className="true">
                <h3>Hello, guest!</h3>
                <button onClick={() => this.signIn()}>Sign In</button>
            </span>)     :
            (<span className="false">
            <h3>Hello, {this.props.activeUser.displayName}!</h3>
            <button onClick={() => this.signOut()}>Sign Out</button>
            </span>)
            }
        </div>
    );
}
}

export default User;