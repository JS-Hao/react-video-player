import React, { Component } from 'react';
export default class ControlBar extends Component {
	render() {
		let childrenWithProps = '';
		const style = {
			width: '100%'
		};

		if (this.props.player) {
			childrenWithProps = React.Children.map(this.props.children, 
				(child) => React.cloneElement(child, { ...this.props })
			);
		}
		
		return (
			<div className='vp-controlBar' style={ style }>
				{ childrenWithProps }
			</div>
		)
	}
}