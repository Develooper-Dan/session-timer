
const TimerControls = props => {
	return(
		<>
			<button id="start_stop" onClick={ () => props.handleStartPause() }> {props.isRunning ? "Pause" : "Start"}</button>
			<button id="reset" onClick={ () => props.resetTimer() }> Reset </button>
		</>
	)
}

export default TimerControls;
