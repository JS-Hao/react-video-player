import React, { Component } from 'react';

export default class VolumePanel extends Component {
	constructor(props) {
		super(props);
		this.handleButtonClick = this.handleButtonClick.bind(this);
		this.handleControlClick = this.handleControlClick.bind(this);
		this.getNodeFunc = this.getNodeFunc.bind(this);
	}

	handleButtonClick() {
		const player = this.props.player;
		if (player.muted) {
			player.muted = false;
			this.volumeButton.classList.remove('vp-volumeButton-mute');
			this.volumeButton.classList.add('vp-volumeButton-notMute');
			this.volumeControlInner.style.width = '100%';
		} else {
			player.muted = true;
			this.volumeButton.classList.remove('vp-volumeButton-notMute');
			this.volumeButton.classList.add('vp-volumeButton-mute');
			this.volumeControlInner.style.width = '0';
		}
	}

	handleControlClick(e) {
		const volumeControlBar = this.volumeControlBar,
					nativeEvent = e.nativeEvent,
					player = this.props.player,
				  volumeControlInner = this.volumeControlInner,
			    w = volumeControlBar.offsetWidth, 
				  x = nativeEvent.offsetX || nativeEvent.layerX;

    volumeControlInner.style.width = x + 'px';
    player.volume = (x / w).toFixed(1);
		this.props.updateState({
			vol: (x / w).toFixed(1)
		});

	}

	getNodeFunc(name) {
		return (node) => {
			this[name] = node;
		}
	}

	render() {
		const controlStyle = {
			width: this.props.volumeControlWidth + 'px'
		};
		const innerStyle = {
			width: this.props.vol * 100 + '%'
		};
		const panelStyle = {
			width: this.props.icon,
			height: this.props.icon
		}

		return (
			<div 
				className='vp-volumePanel'
				style={ panelStyle }>
				<button 
					className='vp-volumeButton vp-volumeButton-notMute'
					onClick={ this.handleButtonClick }
					ref={ this.getNodeFunc('volumeButton') }>
				</button>
				<div 
					className='vp-volumeControl'
					style={ controlStyle }
					ref={ this.getNodeFunc('volumeControl') }>
					<div 
						className='vp-volumeControl-bar'
						style={ { width: '100%' } }
						ref={ this.getNodeFunc('volumeControlBar') }
						onClick={ this.handleControlClick }>
						<div 
							className='vp-volumeControl-inner'
							style={ innerStyle }
							ref={ this.getNodeFunc('volumeControlInner') }>
						</div>
					</div>		
				</div>
			</div>
		)
	}
} 