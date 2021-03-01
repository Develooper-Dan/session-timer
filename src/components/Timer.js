import TimerControls from './TimerControls';
import { useEffect } from 'react';

const Timer = props => {
  /*if the component (re-)renders and the time has run out,
  * the timer changes from session to break and vice versa
  */
  useEffect(() => {
    if(props.currTime.minutes === "00" && props.currTime.seconds === "00"){
      props.handleSessionBreakChange();
    }
  })

  let timeDisplay = `${props.currTime.minutes}:${props.currTime.seconds}`

  return(
	<div id="timer">
		<h1 id="timer-label">
			{props.sessionOrBreak}
		</h1>
    { (parseInt(props.currTime.seconds) <= 10 && props.currTime.minutes === "00")
      ? <span id="time-left" className = "critical"> {timeDisplay} </span>
  		: <span id="time-left"> {timeDisplay}	</span>
    }
		<TimerControls
			resetTimer={props.resetTimer}
			handleStartPause= {props.handleStartPause}
			isRunning = {props.isRunning}
			/>
		<audio id ="beep" src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/222[kb]analog_alarm_siren.wav.mp3">
		</audio>
	</div>
		)
}

export default Timer;
