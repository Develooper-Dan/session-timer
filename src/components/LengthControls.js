

const LengthControls = props => {
  return(
		<div id="lengthControls">
			<div id="breakControls">
				<h3 id="break-label">
					Break Length
				</h3>
				<button id="break-decrement" onClick={(e)=>{props.changeTargetLength(e.target)}}>
					-
				</button>
				<span id="break-length">
					{props.breakLength}
				</span>
				<button id="break-increment" onClick={(e)=>{props.changeTargetLength(e.target)}}>
					+
				</button>
			</div>
			<div id="sessionControls">
				<h3 id="session-label">
					Session Length
				</h3>
				<button id="session-decrement" onClick={(e)=>{props.changeTargetLength(e.target)}}>
					-
				</button>
				<span id="session-length">
					{props.sessionLength}
				</span>
				<button id="session-increment" onClick={(e)=>{props.changeTargetLength(e.target)}}>
					+
				</button>
			</div>
		</div>
	)
}

export default LengthControls;
