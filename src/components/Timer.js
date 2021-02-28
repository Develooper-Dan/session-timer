import TimerControls from './TimerControls';

const Timer = props => {
  return(
	<div id="timer">
		<h2 id="timer-label">
			{props.sessionOrBreak}
		</h2>
		<span id="time-left">
			{`${props.currTime.minutes}:${props.currTime.seconds}`}
		</span>
		<TimerControls
			resetTimer={props.resetTimer}
			handleStartPause= {props.handleStartPause}
			isRunning = {props.isRunning}
			/>
		<audio id ="beep" src="https://sampleswap.org/samples-ghost/SOUND%20EFFECTS%20and%20NOISES/Electro%20and%20Synthetic/218[kb]analog_alarm_siren.aif.mp3">
		</audio>
	</div>
		)
}

export default Timer;
