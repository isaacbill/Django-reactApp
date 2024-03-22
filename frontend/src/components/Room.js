import React, { Component } from "react";

export default class Room extends Component {
  constructor(props) {
    super(props);
    this.state = {
      votesToSkip: 2,
      guestCanPause: false,
      isHost: false,
    };
    this.roomCode = this.props.match.params.roomCode;
    this.getRoomDetails();
  }

  getRoomDetails() {
    fetch("/api/get-room" + "?code=" + this.roomCode)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          votesToSkip: data.votes_to_skip,
          guestCanPause: data.guest_can_pause,
          isHost: data.is_host,
        });
      });
  }

  render() {
    const { votesToSkip, guestCanPause, isHost } = this.state;
  
    // Check if guestCanPause and isHost are defined before calling toString()
    const guestCanPauseString = guestCanPause !== undefined ? guestCanPause.toString() : '';
    const isHostString = isHost !== undefined ? isHost.toString() : '';
  
    return (
      <div>
        <h3>{this.roomCode}</h3>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPauseString}</p>
        <p>Host: {isHostString}</p>
      </div>
    );
  }
}  
