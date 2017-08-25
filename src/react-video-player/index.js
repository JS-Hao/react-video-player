/**
 * created by zhuzhihao on 2017/08/05
 * this is react component which can build a customized and lightweight html5 player.
 * the usage and more detail can go to 'https://github.com/JS-Hao/very.Player'
 */

import React, { Component } from 'react';

// import BigPlayButton from './BigPlayButton';
import ControlBar from './ControlBar';
import PlayToggle from './PlayToggle';
import ProgressControl from './ProgressControl';
import CurrentTimeDisplay from './CurrentTimeDisplay';
import DurationDisplay from './DurationDisplay';
import FullScreenToggle from './FullScreenToggle';
import VolumePanel from './VolumePanel';
import './player.default.css';

const PlayerComponents = {
	'PlayToggle': (key, restProps) => {
		return <PlayToggle { ...restProps } key={ key } />
	},
	'ProgressControl': (key, restProps) => {
		return <ProgressControl { ...restProps } key={ key } />
	},
	'CurrentTimeDisplay': (key, restProps) => {
		return <CurrentTimeDisplay { ...restProps } key={ key } />
	},
	'DurationDisplay': (key, restProps) => {
		return <DurationDisplay { ...restProps } key={ key } />
	},
	'VolumePanel': (key, restProps) => {
		return <VolumePanel { ...restProps } key={ key } />
	},
	'FullScreenToggle': (key, restProps) => {
		return <FullScreenToggle { ...restProps } key={ key } />
	},
	'ControlBar': function(children, key, restProps) {
		return (
			<ControlBar 
				{ ...restProps } 
				{ ... Object.assign({}, { ...this.state }, { ...this.props }) }
				key={ key }>
				{ children.map((child) => {
					return child;
				}) }
			</ControlBar>
		)
	}
};

export default class Player extends Component {
	constructor(props) {
		super(props);
		let controlBarNum = 0;
		const icon = props.icon;

		props.children.map((child) => {
			if (typeof child === 'object' && child.name === 'ControlBar') {
				controlBarNum = child.children.length - 1;
				return;
			}
		});

		const progressControlWidth = icon ? 
					props.width - (controlBarNum * icon) - (2 / 3 * icon) : 100,
					volumeControlWidth = icon ? (3 * icon) : 0;

		this.state = {
			player: null,
			per: 0,
			vol: 1,
			currentTime: 0,
			duration: 0,
			buffered: {},
			controlBarNum: controlBarNum,
			progressControlWidth: progressControlWidth,
			volumeControlWidth: volumeControlWidth
		},
		this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
		this.handleLoadedData = this.handleLoadedData.bind(this);
		this.updateState = this.updateState.bind(this);
		this.updateBuffered = this.updateBuffered.bind(this);
	}

	handleLoadedData() {
		// init the player and its buffered
		const player = this.player,
				  buffered = {
						start: player.buffered.start(0) / player.duration,
						end: player.buffered.end(0) / player.duration
					};

		this.setState({
			player: player,
			buffered: buffered
		});
	}

	componentWillReceiveProps(nextProps) {
		const width = nextProps.width, icon = nextProps.icon, controlBarNum = this.state.controlBarNum;
		const progressControlWidth = icon ? 
					width - (controlBarNum * icon) - (2 / 3 * icon) : 100;
		this.setState({ progressControlWidth: progressControlWidth });
	}

	updateState(state) {
		this.setState({ state });
	}

	componentDidMount() {
		document && document.addEventListener('webkitfullscreenchange', () => {
			// update progressBar's width and volunmControlBar's width
		}, false);
	}

	handleTimeUpdate() {
		const player = this.state.player;
		
		// update the per's state
		if (player && player.duration) {
			const per = (player.currentTime / player.duration).toFixed(3);
			this.setState({
				per: per,
				currentTime: player.currentTime
			});

			// update the buffer's state
			this.updateBuffered();
		} else {
			this.setState({
				per: 0
			});
		}
	}

	updateBuffered() {
		const buffered = this.state.player.buffered,
					currentTime = this.state.player.currentTime,
					duration = this.state.player.duration,
					oldBuffered = this.state.buffered,
					newBuffered = {},
					arrEnd = [],
					arrStart = [];

		if (buffered.length === 1 && buffered.end(0) === oldBuffered.end) {
			// buffered dont change
			return;

		} else if (buffered.length === 1) {
			// didnt create new buffered
			newBuffered.start = buffered.start(0) / duration;
			newBuffered.end =  buffered.end(0) / duration;

		} else {
			// create new buffered so should find the closest buffered area
			for (let i = 0, length = buffered.length; i < length; i++) {
				if (currentTime < buffered.end(i)) {
					arrEnd.push(buffered.end(i) / duration);
				}
				if (currentTime > buffered.start(i)) {
					arrStart.push(buffered.start(i) / duration);
				}
			}

			newBuffered.end = newBuffered.length !== 0 ?
				arrEnd.reduce((total, num) => {
					return Math.min(total, num);
				}) : oldBuffered.end;
			
			newBuffered.start = newBuffered.length !== 0 ? 
				arrStart.reduce((total, num) => {
					return Math.max(total, num);
				}) : oldBuffered.start;
		}

		this.setState({
			buffered: newBuffered
		});
	}
	
	initialComponent(children, restProps) {
		return children.map((function(child, i) {
			if (typeof child === 'string') {
				return PlayerComponents[child] ? PlayerComponents[child](i, restProps) : '';
			} else if (typeof child === 'object') {
				return PlayerComponents[child.name] ?
					PlayerComponents[child.name].call(this, this.initialComponent(child.children), i, restProps) : '';
			}
		}).bind(this));
	}

	getNodeFunc(name) {
		return (node) => {
			this[name] = node;
		}
	}

	render() {
		const { type, children, sources, icon, ...restProps } = this.props;

		const childComponents = this.initialComponent(children, {
			updateState: this.updateState,
			updateBuffered: this.updateBuffered
		});
		const sourceBox = sources.map((source, i) => {
			return (
				<source src={ source.src } type={ source.type } key={i} />
			)	
		});
		const style = {
			width: this.props.width,
			height: this.props.height
		}

		return (
			<div 
				className={ 'vp-player ' + (type === 'audio' ? 'vp-audio' : 'vp-video') } 
				style={ style }>
				{ type === 'audio' ?   
					(
						<audio
							{ ...restProps }
							className='vp-screen'
							width='0'
							height='0'
							ref={ this.getNodeFunc('player') }
							onTimeUpdate={ this.handleTimeUpdate }
							onLoadedData={ this.handleLoadedData }>
							Your browser dose not support the <code>audio/video</code> element.
							{ sourceBox }
						</audio>
					) : 
					(
						<video 
							{ ...restProps } 
							className='vp-screen'
							width={ this.props.width }
							height={ this.props.height }
							ref={ this.getNodeFunc('player') }
							onTimeUpdate={ this.handleTimeUpdate }
							onLoadedData={ this.handleLoadedData }>
							Your browser dose not support the <code>audio/video</code> element.
							{ sourceBox }
						</video>
					)
				}
				<div 
					className='vp-control'
					style={ { padding: '0 ' + icon / 3 + 'px' } }>
					{ childComponents }
				</div>

			</div>
		)
	}	
}