import accurateInterval from 'accurate-interval';
import React, { Component } from 'react';
import Timer from './Timer';
import LengthControls from './LengthControls';

class App extends Component {
  constructor() {
    super();
    this.initialState = {
      sessionLength: 5,
      breakLength: 1,
      sessionOrBreak: "Session",
      isRunning: false,
      currTime: {
        minutes: "05",
        seconds: "00" } };

    this.state = this.initialState;
    this.resetTimer = this.resetTimer.bind(this);
    this.updateLengthAndTimer = this.updateLengthAndTimer.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleSessionBreakChange = this.handleSessionBreakChange.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  updateLengthAndTimer(sessionOrBreakLength, newLengthValue) {
    if (!this.state.isRunning) {
      if (newLengthValue <= 60 && newLengthValue >= 1) {
        //update corresponding length value on state
        this.setState({ [sessionOrBreakLength]: newLengthValue });
        //if the updated length also corresponds to the curent mode (session/break), also update the timer
        if ((this.state.sessionOrBreak === "Session" && sessionOrBreakLength === "sessionLength")
            || (this.state.sessionOrBreak === "Break" && sessionOrBreakLength === "breakLength")) {
          this.setState({
            currTime: {
              minutes: this.convertToFormattedTimeString(newLengthValue),
              seconds: "00"
            }
          })
        }
      }
    }
  }
  // takes a number and converts it to a string in the form of mm/ss
  convertToFormattedTimeString(time) {
    let timeString = time.toString();
    if (time < 10) {
      timeString = "0" + timeString;
    }
    return timeString;
  }
  //handles the ticking of the timer by updating the currTime-state each call
  countdown() {
      let currMinutes = parseInt(this.state.currTime.minutes);
      let currSeconds = parseInt(this.state.currTime.seconds);
      let timer = new Date(new Date().setMinutes(currMinutes, currSeconds - 1));
      let updatedMinutes = this.convertToFormattedTimeString(timer.getMinutes());
      let updatedSeconds = this.convertToFormattedTimeString(timer.getSeconds());

      this.setState({
        currTime: {
          minutes: updatedMinutes,
          seconds: updatedSeconds } });
  }

  handleSessionBreakChange() {
    this.timerID.clear();
    let alarm = document.getElementById("beep");
    alarm.play();
    // waits until the alarm sound has ended before it continues to run the timer in the other mode(session/break)
    setTimeout(() => {
      if (this.state.sessionOrBreak === "Session") {
        this.setState(prevState => ({
          ...prevState,
          sessionOrBreak: "Break",
          currTime: { minutes: this.convertToFormattedTimeString(prevState.breakLength), seconds: "00" } }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          sessionOrBreak: "Session",
          currTime: { minutes: this.convertToFormattedTimeString(prevState.sessionLength), seconds: "00" } }));
      }

      this.timerID = accurateInterval(this.countdown, 1000);
    }, alarm.duration * 1000)

  }

  handleStartPause() {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timerID = accurateInterval(this.countdown, 1000);
    } else {
      this.setState({ isRunning: false });
      this.timerID.clear();
    }
  }

  resetTimer() {
    if (this.timerID) {
      this.timerID.clear();
    }
    document.getElementById("beep").load();
    this.setState(this.initialState);
  }

  render(){
    return(
			<div id="container">
				<Timer
					currTime={this.state.currTime}
					sessionOrBreak = {this.state.sessionOrBreak}
					isRunning = {this.state.isRunning}
					handleStartPause = {this.handleStartPause}
          handleSessionBreakChange = {this.handleSessionBreakChange}
					resetTimer={this.resetTimer}
				/>
				<LengthControls
  				breakLength = {this.state.breakLength}
  				sessionLength = {this.state.sessionLength}
  				updateSessionOrBreakLength = {this.updateSessionOrBreakLength}
  				updateLengthAndTimer = {this.updateLengthAndTimer}
				/>
			</div>
		)
	}
}

export default App;
