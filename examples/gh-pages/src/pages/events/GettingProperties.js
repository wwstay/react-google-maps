import { default as React, Component } from "react";

import { GoogleMapLoader, GoogleMap, InfoWindow } from "react-google-maps";

/*
 * https://developers.google.com/maps/documentation/javascript/examples/event-properties
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
export default class GettingProperties extends Component {

  state = {
    zoomLevel: 4,
    content: `Change the zoom level`,
  }

  handleZoomChanged() {
    const zoomLevel = this._map.getZoom();
    if (zoomLevel !== this.state.zoomLevel) {
      // Notice: Check zoomLevel equality here,
      // or it will fire zoom_changed event infinitely
      this.setState({
        zoomLevel,
        content: `Zoom: ${zoomLevel}`,
      });
    }
  }

  render() {
    const myLatLng = new google.maps.LatLng(-25.363882, 131.044922);
    const { zoomLevel, content } = this.state;

    return (
      <GoogleMapLoader
        containerElement={
          <div
            {...this.props}
            style={{
              height: `100%`,
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={map => { this._map = map; }}
            defaultCenter={myLatLng}
            zoom={zoomLevel}
            onZoomChanged={::this.handleZoomChanged}
          >
            <InfoWindow
              defaultPosition={myLatLng}
              content={content}
            />
          </GoogleMap>
        }
      />
    );
  }
}
