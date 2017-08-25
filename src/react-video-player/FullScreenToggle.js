import React, { Component } from 'react';

export default class FullScreenToggle extends Component {
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		if (document.webkitCancelFullScreen) {
			// Webkit (work in Safari and Chrome)
			if (document.webkitIsFullScreen) {
				document.webkitCancelFullScreen();
				this.shouldFullScreen(false);
			} else {
				this.props.player.webkitRequestFullScreen(); 
				this.shouldFullScreen(true);
			}

		} else if (document.mozCancelFullScreen) {
			// Firefox (works in nightly)
			if (document.mozFullScreen) {
				document.mozCancelFullScreen();
				this.shouldFullScreen(false);
			} else {
				this.props.player.mozRequestFullScreen();
				this.shouldFullScreen(true);
			}

		} else if (document.exitFullscreen) {
			// W3C
			if (document.fullscreen) {
				document.exitFullscreen();
				this.shouldFullScreen(false);
			} else {
				this.props.player.requestFullscreen();
				this.shouldFullScreen(true);
			}

		} else if (document.cancelFullScreen) {
			// mozilla draft
			if (document.fullScreen) {
				document.cancelFullScreen();
				this.shouldFullScreen(false);
			} else {
				this.props.player.requestFullScreen();
				this.shouldFullScreen(true);
			}
		}
	}

	shouldFullScreen(boolean) {
		if (boolean) {
			this.fullScreenToggleBtn.classList.add('vp-icon-fullScreen');
			this.fullScreenToggleBtn.classList.remove('vp-icon-not-fullScreen');
		} else {
			this.fullScreenToggleBtn.classList.add('vp-icon-not-fullScreen');
			this.fullScreenToggleBtn.classList.remove('vp-icon-fullScreen');
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
		}
		return (
			<div 
				className='vp-fullScreenToggle'
				style={ style }>
				<button 
					className='vp-fullScreenToggle-btn'
					onClick={ this.handleClick }
					ref={ this.getNodeFunc('fullScreenToggleBtn') }>
				</button>
			</div>
		)
	}
}