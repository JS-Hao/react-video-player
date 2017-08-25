import React, { Component } from 'react';

export default class CurrentTimeDisplay extends Component {
	updateCurrentTime(time) {
		const minutes = Math.floor((time / 60) % 60),
				seconds = Math.floor((time % 60));
		return minutes + ':' + (seconds < 10 ? '0' + seconds : seconds);
	}

	shouldComponentUpdate(nextProps) {
		const oldTime = this.updateCurrentTime(this.props.currentTime);
		const newTime = this.updateCurrentTime(nextProps.currentTime);
		return oldTime === newTime ? false : true;
	}

	render() {
		const style = {
			width: this.props.icon,
			height: this.props.icon
		}
		return (
			<div 
				className='vp-currentTimeDisplay'
				style={ style }>
				<span>{ this.updateCurrentTime(this.props.currentTime) }</span>
			</div>
		)
	}
}