
import React, { Component } from 'react';

export default class ProgressControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			canMove: 0
		}

		this.handleClick = this.handleClick.bind(this);
		//this.handleMouseDownPs = this.handleMouseDownPs.bind(this);
		//this.handleMouseDownSl = this.handleMouseDownSl.bind(this);
		//this.handleMouseMove = this.handleMouseMove.bind(this);
		//this.handleMouseUpSl = this.handleMouseUpSl.bind(this);
		//this.handleMouseOutSl = this.handleMouseOutSl.bind(this);
		//this.handleMouseOutPs = this.handleMouseOutPs.bind(this);
	}

	handleClick(e) {
		const player = this.props.player,
					nativeEvent = e.nativeEvent,
					progressSlider = this.progressSlider,
					w = progressSlider.offsetWidth,
					x = nativeEvent.offsetX || nativeEvent.layerX,
					duration = player.duration,
			    per = (x / w).toFixed(3);

		player.currentTime = (duration * per).toFixed(3);
		this.props.updateState(per);
	}

	// handleMouseDownPs(e) {
		
	// }

	// handleMouseDownSl(e) {
	// 	// console.log(1);
	// 	// this.setState({ canMove: 1 });
	// }

	// handleMouseUpSl(e) {
	// 	// console.log(0);
	// 	// this.setState({ canMove: 0 });
	// }

	// handleMouseOutPs(e) {
	// 	//console.log('hoho');
	// 	// this.distance = e.nativeEvent.offsetX;
	// 	// this.slider.style.left = this.distance + 'px';
	// }

	// handleMouseOutSl(e) {
	// 	// console.log(0);
	// 	// this.setState({ canMove: 0 });
	// }

	// handleMouseMove(e) {
	// 	// this.distance = e.nativeEvent.offsetX;
	// 	// this.slider.style.left = this.distance + 'px';
	// 	//console.log(this.distance)
	// }

	// ProgressControl是否会更新取决于进度条长度是否有变化，或自身长度是否有变化
	shouldComponentUpdate(nextProps) {
		const oldHBWidth = (this.hiddenBar.offsetWidth * this.props.per).toFixed(0),
					newHBWidth = (this.hiddenBar.offsetWidth * nextProps.per).toFixed(0),
					oldPCWidth = this.props.progressControlWidth,
					newPCWidth = nextProps.progressControlWidth;
		return (oldHBWidth === newHBWidth && oldPCWidth === newPCWidth) ? false : true;
	}

	getNodeFunc(name) {
		return (node) => {
			this[name] = node;
		}
	}

	render() {
		const controlStyle = { 
			width: this.props.progressControlWidth + 'px'
		};
		const innerStyle = {
			width: this.props.per * 100 + '%'
		}
		const hiddenStyle = {
			width: '100%',
			overflow: 'hidden'
		}
		const progressSliderStyle = {
			position: 'relative',
			width: '100%'
		}
		const bufferedStyle = {
			width: this.props.buffered.end * 100 + '%'
		}
		const sliderStyle = {
			position: 'absolute',
			left: 0,
			transform: 'translate(-50%, -50%)'
		}

		return (
			<div 
				className='vp-progressControl'
				style={ controlStyle }
				ref={ this.getNodeFunc('progressControl') }>
			  <div 
			  	className='vp-progressSlider'
			  	style={ progressSliderStyle }
			  	onClick={ this.handleClick }
			  	//onMouseDown={ this.handleMouseDownPs }
			  	//onMouseMove={ this.handleMouseMove }
			  	//onMouseOut={ this.handleMouseOutPs }
			  	ref={ this.getNodeFunc('progressSlider') }>
				  <div 
				  	className='vp-slider'
				  	//onMouseDown={ this.handleMouseDownSl }
				  	//onMouseUp={ this.handleMouseUpSl }
				  	//onMouseOut={ this.handleMouseOutSl }
				  	style={ sliderStyle }
				  	ref={ this.getNodeFunc('slider') }>
				  </div>

			  	<div 
			  		className='vp-hiddenBar'
			  		ref={ this.getNodeFunc('hiddenBar') }
			  		style={ hiddenStyle }>
			  		<div 
			  			className='vp-bufferedBar'
			  			style={ bufferedStyle }>
			  		</div>
			  		<div 
			  		  className='vp-innerBar'
			  		  style={ innerStyle }
			  		  ref={ this.getNodeFunc('innerBar') }>
			  		</div>	
			  	</div>

			  </div>		  
			</div>
		)
	}
}