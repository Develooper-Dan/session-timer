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
    this.updateSessionOrBreakLength = this.updateSessionOrBreakLength.bind(this);
    this.handleStartPause = this.handleStartPause.bind(this);
    this.handleSessionBreakChange = this.handleSessionBreakChange.bind(this);
    this.returnUpdatedOrCurrentTimer = this.returnUpdatedOrCurrentTimer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  updateSessionOrBreakLength(clickedControl) {
    if (!this.state.isRunning) {
      const clickedOperator = clickedControl.innerHTML;
      const idOfOperator = clickedControl.id;
      const sessionOrBreakLength = idOfOperator.slice(0, idOfOperator.indexOf("-")) + "Length";
      if (clickedOperator === "+" && this.state[sessionOrBreakLength] < 60) {
        this.setState(prevState => {
          let newLengthValue = prevState[sessionOrBreakLength] + 1;
          return ({
          ...prevState,
          currTime: this.returnUpdatedOrCurrentTimer(sessionOrBreakLength, newLengthValue, prevState.currTime),
          [sessionOrBreakLength]: newLengthValue});
        })
      }
      if (clickedOperator === "-" && this.state[sessionOrBreakLength] > 1) {
        this.setState(prevState => {
          let newLengthValue = prevState[sessionOrBreakLength] - 1;
          return({
          ...prevState,
          currTime: this.returnUpdatedOrCurrentTimer(sessionOrBreakLength, newLengthValue, prevState.currTime),
          [sessionOrBreakLength]: newLengthValue});
        })
      }
    }
  }

  returnUpdatedOrCurrentTimer(sessionOrBreakLength, lengthValue, currTime) {
    if ((this.state.sessionOrBreak === "Session" && sessionOrBreakLength === "sessionLength")
        || (this.state.sessionOrBreak === "Break" && sessionOrBreakLength === "breakLength"))
    {
      return {
        minutes: this.convertToFormattedTimeString(lengthValue),
        seconds: "00" };

    } else {
      return currTime;
    }
  }

  convertToFormattedTimeString(time) {
    let timeString = time.toString();
    if (time < 10) {
      timeString = "0" + timeString;
    }
    return timeString;
  }

  countdown() {
    if (this.state.currTime.minutes === "00" && this.state.currTime.seconds === "00") {
      this.handleSessionBreakChange();
    } else {
      let currMinutes = parseInt(this.state.currTime.minutes);
      let currSeconds = parseInt(this.state.currTime.seconds) - 1;
      let timer = new Date(new Date().setMinutes(currMinutes, currSeconds));
      let updatedMinutes = this.convertToFormattedTimeString(timer.getMinutes());
      let updatedSeconds = this.convertToFormattedTimeString(timer.getSeconds());

      this.setState({
        currTime: {
          minutes: updatedMinutes,
          seconds: updatedSeconds } });

      if (updatedMinutes === "00" && updatedSeconds === "00") {
        let alarm = document.getElementById("beep");
        alarm.play();
      }
    }
  }

  handleSessionBreakChange() {
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
  }

  handleStartPause() {
    if (!this.state.isRunning) {
      this.setState({ isRunning: true });
      this.timer = accurateInterval(this.countdown, 1000);
    } else {
      this.setState({ isRunning: false });
      this.timer.clear();
    }
  }

  resetTimer() {
    if (this.timer) {
      this.timer.clear();
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
					resetTimer={this.resetTimer}
				/>
				<LengthControls
  				breakLength = {this.state.breakLength}
  				sessionLength = {this.state.sessionLength}
  				updateSessionOrBreakLength = {this.updateSessionOrBreakLength}
  				updateTimerOnLengthChange = {this.updateTimerOnLengthChange}
				/>
			</div>
		)
	}
}

export default App;
