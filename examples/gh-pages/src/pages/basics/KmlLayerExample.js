import { default as React } from "react";

import { GoogleMapLoader, GoogleMap, KmlLayer } from "react-google-maps";

/*
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 */
const KmlLayerExample = props => (
  <GoogleMapLoader
    containerElement={
      <div
        {...props}
        style={{
          height: `100%`,
        }}
      />
    }
    googleMapElement={
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: 41.876, lng: -87.624 }}
      >
        <KmlLayer
          url="http://googlemaps.github.io/js-v2-samples/ggeoxml/cta.kml"
        />
      </GoogleMap>
    }
  />
);

export default KmlLayerExample;
