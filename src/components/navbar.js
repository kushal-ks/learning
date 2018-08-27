import React, { Component } from 'react';
export class Navbar extends Component {

  _long_lati(e) {
    e.preventDefault()
    var longi = document.getElementById("longi").value;
    var latti = document.getElementById("latti").value;
    this.props.searchByCity(longi, latti);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand text-info" href="#">SeeWeather</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">

            <li className="nav-item active">
          <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>

          </ul>

          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" defaultValue="28.626640" type="text" placeholder="Longitude" aria-label="Search" id="longi"/>

            <input className="form-control mr-sm-2" defaultValue= "77.384804" type="text" placeholder="Lattitude" aria-label="Search" id="cityName" id="latti" />

            <button className="btn btn-outline-success my-2 my-sm-0"
              type="submit" onClick={this._long_lati.bind(this)}>Search
            </button>
          </form>
        </div>
      </nav>

    )
  }
}