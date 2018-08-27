import React, { Component } from 'react';
import { Group } from '@vx/group';
import { scaleTime, scaleLinear } from '@vx/scale';
import { AxisLeft, AxisBottom } from '@vx/axis';
import { Navbar } from '../components/navbar';
import { Image } from '../components/whImages';
import { extent, max } from 'd3-array';
import { AreaClosed } from '@vx/shape';
import { Friday } from '../components/daydetails';
import { BrowserRouter as Router, Route, Link, Switch, PropsRoute } from "react-router-dom";
const key = "6d420b0a1377ece84b8693d8de33a1d3";
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

var baseUrl = "http://api.openweathermap.org/data/2.5/";
var request = require('request');
export class MainComponent extends Component {
  constructor() {
    super();

    this.state = {
      wdata: [],
      showHourly: false,
      showDaily: true,
    }
    this.searchWheatherByCityName = this._searchWheatherByCityName.bind(this);
  }
  _show_weather_details(e) {

    var value = document.getElementById("weatherDetails").value;
    if (value === 'Hourly') {
      this.setState({
        showHourly: true,
        showDaily: false
      })
    }
    else if (value === 'Daily') {
      {
        this.setState({
          showHourly: false,
          showDaily: true
        })
      }
    }

  }

  _connect(longi, latti) {
    var options = {
      "url": "https://api.darksky.net/forecast/27d80d6e07f2d53695e3a54ba756af3c/" + longi + "," + latti,
    };
    return options;
  }

  _searchWheatherByCityName(longi, latti) {
    var data = [];
    var options = this._connect(longi, latti);
    request(options, function (err, res, body) {

      data = JSON.parse(body);
      this.setState({
        wdata: data || []
      })

    }.bind(this));
  }

  _display_chart(data, tempValue) {
    // 	const data =[
    // 		{time:2001,close:100},
    // 		{time:2002,close:200},
    // 		{time:2003,close:300},
    // 		{time:2004,close:400},
    // 		{time:2005,close:500},
    // 		{time:2006,close:600},
    // 		{time:2007,close:700},
    // 		{time:2008,close:800},
    // 		{time:2009,close:900},
    // 		{time:2010,close:1000},
    // 		{time:2011,close:1100},
    //  ] ;

    const width = 900;
    const height = 400;

    const margin = {
      top: 60,
      bottom: 60,
      left: 80,
      right: 80,
    };
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;

    var x, y;
    if (tempValue == 2) {
      x = d => new Date(parseInt((d.time + "000")));
      y = d => (d.temperature - 32) / 1.8;
    }

    else if (tempValue == 1) {
      x = d => new Date(parseInt((d.time + "000")));
      y = d => (d.apparentTemperatureHigh - 32) / 1.8;
    }


    
    const xScale = scaleTime({
      range: [0, xMax],
      domain: extent(data, x)
    });

    const yScale = scaleLinear({
      range: [yMax, 0],
      domain: [0, max(data, y)],
    });

    
    const chart = (
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left} className="shadow-none p-3 mb-5 bg-light rounded">

          <AxisLeft
            scale={yScale}
            top={0}
            left={0}
            label={'Temprature'}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
          />
          <AxisBottom
            scale={xScale}
            top={yMax}
            label={'Time'}
            stroke={'#1b1a1e'}
            tickTextFill={'#1b1a1e'}
          />
          <AreaClosed
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={x}
            y={y}
            fill={"#5BBC9E"}
            className="text-info"
          />
        </Group>
      </svg>
    )
    return chart;
  }
  render() {
    if (this.state.wdata.length == 0) {
      return <Navbar searchByCity={this.searchWheatherByCityName} />;
    }
    var ferTemp = parseInt(this.state.wdata.currently.temperature);
    var celTemp = parseInt((ferTemp - 32) / 1.8);
    return (
      <div className="container">
        <Navbar searchByCity={this.searchWheatherByCityName} />
        <div className="row"> </div>
        <div className="row" style={{ marginTop: 50 }}>

          <div class="col-sm-2"></div>
          <div className="col-sm-2">
            <b>Humidity</b> {this.state.wdata.currently.humidity}%
						</div>

          <div className="col-sm-2">
            <b> Dew Pt</b> {this.state.wdata.currently.dewPoint}
          </div>

          <div className="col-sm-2">
            <b> Visibility</b> {this.state.wdata.currently.visibility}mi
						</div>

          <div className="col-sm-2">
            <b> Pressure </b> {this.state.wdata.currently.pressure}mh
						</div>

          <div class="col-sm-2">
            <select className="form-control" onChange={this._show_weather_details.bind(this)} id="weatherDetails">
              <option>Show Details</option>
              <option>Hourly</option>
              <option>Daily</option>
            </select>
          </div>

          <BottamPartHourly wdata={this.state.wdata}
            celTemp={celTemp}
            show={this.state.showHourly}
            displayChart={this._display_chart}
            imageTtitle={this.state.wdata.currently.icon}
          />

          <BottamPartDaily wdata={this.state.wdata}
            celTemp={celTemp}
            show={this.state.showDaily}
            displayChart={this._display_chart}
            imageTtitle={this.state.wdata.currently.icon}
          />

        </div>


      </div>

    )

  }
}

export class DisplayComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageTtitle: this.props.wdata.currently.icon,
      celTemp: this.props.celTemp,
      summary: this.props.wdata.currently.summary,

      maxTemp: '',
      minTemp: '',
      sunRise: '',
      sunSet: ''
    }
  }

  componentWillMount() {
    
    if (this.props.dayName !== undefined) {
      this.props.wdata.daily.data.map((item) => {
        var s = item.time + "000";
        var no = parseInt(s);
        var d = new Date(no);
        var dayName = days[d.getDay()];

        if (dayName === this.props.dayName) {

          var ferTempMax = parseInt(item.apparentTemperatureHigh);
          var ferTempMin = parseInt(item.apparentTemperatureLow);
          var celTempMin = parseInt((ferTempMin - 32) / 1.8);
          var celTempMax = parseInt((ferTempMax - 32) / 1.8);

          var sunriseTime1 = item.sunriseTime + "000";
          var no = parseInt(sunriseTime1);
          var d1 = new Date(no);
          var sunriseT = d1.getHours()+":"+d1.getMinutes()+":"+d1.getSeconds();

          var sunsetTime1 = item.sunsetTime + "000";
          var no2 = parseInt(sunsetTime1);
          var d2 = new Date(no2);
          var sunsetT = d2.getHours()+":"+d2.getMinutes()+":"+d2.getSeconds();


          this.setState({
            imageTtitle: item.icon,
            summary: item.summary,
            maxTemp: celTempMax,
            minTemp:  celTempMin,
            sunRise:  sunriseT,
            sunSet:  sunsetT
          })
          
        }

      })
    }
    
  }
  render() {
    

    return (
      <div>
        <div className="row text-secondary">
          <div
            className="col-lg-12 card shadow-none p-3 mb-5 bg-light rounded align-center"
            style={{ height: '50vh', width: '90vw' }}>

            <Image
              className="card-img"
              imageTtitle={this.state.imageTtitle} />

            <div class="card-img-overlay">
              
              <center>
                <div
                  style={{
                    height: 'auto',
                    width: 500,
                    backgroundColor: 'white',
                    opacity: 0.5, marginTop: 20,
                    padding: 22, borderRadius: 10
                  }}>

                  <img
                    src="https://image.flaticon.com/icons/png/128/578/578113.png" height={50} width={50} />
                  {console.log(this.state)}
                  <h1> {this.state.summary}</h1>
                  <h1> {this.state.imageTitle}</h1>
                  <h1>
                    <b>{this.state.maxTemp}&#176;C</b>
                  </h1>
                  <b>
                  <img
                    src="https://image.flaticon.com/icons/svg/136/136741.svg" height={50} width={50} />
                    <span style ={{float:'left'}} className= "text-info">Sunrise Time:{this.state.sunRise}</span>
                  </b>  
                  <b>
                    <span style ={{float:'right'}} className= "text-info">Sunset Time:{this.state.sunSet}</span>
                  </b>                
                  
                </div>
               
              </center>
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}


export class BottamPartHourly extends Component {
  render() {
    if (this.props.show === true) {
      return (
        <div>
          <div className="row text-secondary">

            <div
              className="col-lg-12 card shadow-none p-3 mb-5 bg-light rounded align-center"
              style={{ height: '50vh', width: '90vw' }}>

              <Image
                className="card-img"
                imageTtitle={this.props.imageTtitle} />

              <div class="card-img-overlay">
                <center>
                  <div
                    style={{
                      height: 'auto',
                      width: 500,
                      backgroundColor: 'white',
                      opacity: 0.7, marginTop: 30,
                      padding: 22, borderRadius: 10
                    }}>

                    <img
                      src="https://image.flaticon.com/icons/png/128/578/578113.png" height={50} width={50} />
                    <h1> {this.props.wdata.currently.summary}</h1>
                    <h1>
                      <b>{this.props.celTemp}&#176;C</b>
                    </h1>

                  </div>
                </center>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-lg-1 shadow-lg p-3 mb-5 bg-white rounded" style={{ height: 100 }}>
              <img
                src="https://image.flaticon.com/icons/png/128/578/578113.png" height={35} width={35} />
              <b className="text-dan">Now</b>
              <br></br>
              <b>{this.props.celTemp}&#176;C</b>
            </div>
            {
              this.props.wdata.hourly.data.map((item) => {
                var s = item.time + "000";
                var no = parseInt(s);
                var d = new Date(no);
                var ferTemp = parseInt(item.temperature);
                var celTemp = parseInt((ferTemp - 32) / 1.8);

                return (
                  <div className="col-lg-1 shadow-lg p-3 mb-5 bg-white rounded" style={{ height: 100 }}>
                    <b className="text-info">{d.getHours()}:00</b>
                    <br></br><b>{celTemp}&#176;C</b>
                  </div>)
              })
            }
          </div>
          <div className="row">
            <div className="col-sm-12 shadow-lg p-3 mb-5 bg-white rounded align-center">
              <h2 className="text-secondary">Daily Weather Details</h2>
              {this.props.displayChart(this.props.wdata.hourly.data, 2)}
            </div>
          </div>
        </div>

      )
    }
    return '';
  }
}

export class BottamPartDaily extends Component {
  render() {
    if (this.props.show === true) {
      return (
        <Router>
          <div>
            <Route exact path="/+Fri" component={() => <DisplayComponent
              dayName={"Fri"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>

            <Route exact path="/+Thu" component={() => <DisplayComponent
              dayName={"Thu"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>

            <Route exact path="/+Mon" component={() => <DisplayComponent
              dayName={"Mon"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>

            <Route exact path="/+Tue" component={() => <DisplayComponent
              dayName={"Tue"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>

            <Route exact path="/+Wed" component={() => <DisplayComponent
              dayName={"Wed"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>

            <Route exact path="/+Sat" component={() => <DisplayComponent
              dayName={"Sat"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>
            <Route exact path="/+Sun" component={() => <DisplayComponent
              dayName={"Sun"}
              wdata={this.props.wdata}
              celTemp={this.props.celTemp}
            />}>
            </Route>
            <div className="row">
              <div className="col-sm-12"></div>
            </div>

            <div>
              <div className="row">
                <div className="col-lg-2 shadow-lg p-3 mb-5 bg-white rounded" style={{ height: 100 }}>
                  <img
                    src="https://image.flaticon.com/icons/png/128/578/578113.png" height={35} width={35} /><br></br>
                  <b className="text-danger">Now</b><br></br>
                  <b className="text-secondary">{this.props.celTemp}&#176;C</b>
                </div>
                {
                  this.props.wdata.daily.data.map((item) => {
                    var s = item.time + "000";
                    var no = parseInt(s);
                    var d = new Date(no);
                    var dayName = days[d.getDay()];

                    var ferTempH = parseInt(item.apparentTemperatureHigh);
                    var celTempH = parseInt((ferTempH - 32) / 1.8);
                    var ferTempL = parseInt(item.apparentTemperatureLow);
                    var celTempL = parseInt((ferTempL - 32) / 1.8);

                    return (
                      <div className="col-lg-2 shadow-lg p-3 mb-5 bg-white rounded"
                        style={{ height: 100 }}>
                        <Link to={`/+${dayName}`} style={{ textDecoration: 'none' }}>
                          <b className="text-info">{dayName}</b>
                          <br></br>

                          <b className="text-secondary">
                            Max. &nbsp;
                            <small>{celTempH}&#176;C</small>
                          </b>

                          <br></br>
                          <b className="text-secondary">
                            Low. &nbsp;
                          <small>&nbsp;{celTempL}&#176;C</small>
                          </b>
                        </Link>
                      </div>

                    )
                  })
                }
              </div>

              <div className="row">
                <div className="col-sm-12 shadow-lg p-3 mb-5 bg-white rounded align-center">
                  <h2 className="text-secondary">Hourly Weather Details</h2>
                  {this.props.displayChart(this.props.wdata.daily.data, 1)}
                </div>
              </div>
            </div>
          </div>
        </Router>
      )
    }
    return '';
  }
} 
