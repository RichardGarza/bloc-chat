import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: "Guest"
    };
  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged(user => {
      user === null
        ? this.props.setCurrentUser("Guest")
        : this.props.setCurrentUser(user.displayName);
      this.setState({ user: user.displayName });
    });
  }

  googleSignIn() {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup(provider);
  }

  googleSignOut() {
    this.props.firebase.auth().signOut();
    this.setState({ user: "Guest" });
  }
  render() {
    return (
      <span>
        {this.state.user === "Guest" ? (
          <button onClick={this.googleSignIn.bind(this)}>
            Sign in with Google{" "}
          </button>
        ) : (
          <button onClick={this.googleSignOut.bind(this)}>Sign Out </button>
        )}
      </span>
    );
  }
}

export default User;
