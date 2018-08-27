import React, { Component } from 'react';
export class Image extends Component {
	render() {
		
		if (this.props.imageTtitle === 'clear-day') {
			
			return (
				<img src={"./assets/images/clearDay1.jpg"} className= "imageClass" />
			)
		}

		else if (this.props.imageTtitle === 'clear-night') {
			
			return (
				<img src={"./assets/images/clearNight1.jpg"}  />
			)
		}

		else if (this.props.imageTtitle === 'rain') {
			
			return (
				<img src={"./assets/images/rain.jpg"} 
				style={{ height: '45vh', width: '87vw' }} />
			)
		}

		else if (this.props.imageTtitle === 'snow') {
			
			return (
				<img src={"./assets/images/snow.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}


		else if (this.props.imageTtitle === 'sleet') {
			
			return (
				<img src={"./assets/images/sleet.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}


		else if (this.props.imageTtitle === 'wind') {
			
			return (
				<img src={"./assets/images/sleet.jpg/wind.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}

		else if (this.props.imageTtitle === 'fog') {
			
			return (
				<img src={"fog.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}

		else if (this.props.imageTtitle === 'cloudy') {
			
			return (
				<img src={"./assets/images/cloudy.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}


		else if (this.props.imageTtitle === 'partly-cloudy-day') {
			
			return (
				<img src={"./assets/images/partlyDay1.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}

		else if (this.props.imageTtitle === 'partly-cloudy-night') {
			
			return (
				<img src={"./assets/images/partlyNight1.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}

		else if (this.props.imageTtitle === 'thunderstrom') {
			
			return (
				<img src={"./assets/images/thunderStrome.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}


		else if (this.props.imageTtitle === 'tornado') {
			
			return (
				<img src={"./assets/images/tornado.jpg"} style={{ height: '45vh', width: '87vw' }} />
			)
		}
		else {
			return '';
		}

	}
} 