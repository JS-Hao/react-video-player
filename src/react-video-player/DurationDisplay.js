import React, { Component } from 'react';

export default class DurationDisplay extends Component {
	displayDurationTime(time) {
		const minutes = Math.floor((time / 60) % 60),
			seconds = Math.floor((time % 60));

		return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}

	render() {
		const style = {
			width: this.props.icon,
			height: this.props.icon
		}
		return (
			<div 
				className='vp-durationDisplay' 
				style={ style }>
				<span>{ this.displayDurationTime(this.props.player.duration) }</span>
			</div>
		)
	}
}