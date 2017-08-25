import React, { Component } from 'react';

export default class PlayToggle extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		const player = this.props.player;
		if (player.paused) {
			player.play();
			this.playToggle.classList.remove('vp-pause');
			this.playToggle.classList.add('vp-play');
		} else {
			player.pause();
			this.playToggle.classList.remove('vp-play');
			this.playToggle.classList.add('vp-pause');
		}
	}

	getNodeFunc(name) {
		return (node) => {
			this[name] = node;
		}
	}

	render() {
		const style = {
			width: this.props.icon,
			height: this.props.icon
		};
		return (
			<div 
				className='vp-playToggle'
				style={ style }>
				<button 
	        className='vp-pause'
	        ref={ this.getNodeFunc('playToggle') }
	        onClick={ this.handleClick }>
	      </button>
			</div>
		)
	}
}