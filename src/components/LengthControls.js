

const LengthControls = props => {
  return(
		<div id="lengthControls">
			<div id="breakControls">
				<h3 id="break-label">
					Break Length
				</h3>
				<button id="break-decrement" onClick={(e)=> props.updateLengthAndTimer("breakLength", props.breakLength - 1)}>
					-
				</button>
				<span id="break-length">
					{props.breakLength}
				</span>
        <button id="break-increment" onClick={(e)=>props.updateLengthAndTimer("breakLength", props.breakLength + 1)}>
					+
				</button>
			</div>
			<div id="sessionControls">
				<h3 id="session-label">
					Session Length
				</h3>
				<button id="session-decrement" onClick={(e)=>props.updateLengthAndTimer("sessionLength", props.sessionLength - 1)}>
					-
				</button>
				<span id="session-length">
					{props.sessionLength}
				</span>
				<button id="session-increment" onClick={(e)=>props.updateLengthAndTimer("sessionLength", props.sessionLength + 1)}>
					+
				</button>
			</div>
		</div>
	)
}

export default LengthControls;
