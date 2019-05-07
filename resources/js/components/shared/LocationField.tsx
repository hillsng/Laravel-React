
import  React from "react";
import Geosuggest, { Suggest } from 'react-geosuggest';
import { FieldProps } from 'formik';
import { withGoogleMap,GoogleMap, Marker,
} from "react-google-maps";


interface DefaultCenter {
  lat: number;
  lng: number;
};

//lat: -34.397, lng: 150.644
const MapWithAMarker = withGoogleMap<{
  defaultCenter: DefaultCenter;
  lat: number;
  lng: number;
    onClick: (e: google.maps.KmlMouseEvent | google.maps.MouseEvent ) => void;

  }>(props => (
   <GoogleMap defaultZoom={8} defaultCenter={props.defaultCenter} onClick={props.onClick}>
    <Marker position={{ lat: props.lat, lng: props.lng }}/>
  </GoogleMap>
  ));

interface State {
  defaultCenter: DefaultCenter | null;
}

export class LocationField extends React.PureComponent<FieldProps<any> & {}, State> {
 state: State = {
     defaultCenter: null
   }

  onSuggestSelect = (place: Suggest) => {
    const { location: { lat, lng } } = place
    console.log(place);
    const { form: { setValues, values } } = this.props;
    setValues({
      ...values,
      latitude: lat,
      longitude: lng
    });
    
    this.setState({
      defaultCenter: {
        lat: parseFloat(lat),
        lng: parseFloat(lng)
      }
    });

  };
  render() {
     const {
       form: { values, setValues }
     } = this.props;

     return (
       <div>
         <Geosuggest
          placeholder="Add Location"
          onSuggestSelect={this.onSuggestSelect}
          location={new google.maps.LatLng(53.558572, 9.9278215)}
          radius={20}
         />
         <div>{values.longitude}</div>
         <div>{values.latitude}</div>
         
         {this.state.defaultCenter && (
           <MapWithAMarker
           containerElement={<div style={{ height: `400px` }} />}
           mapElement={<div style={{ height: `100%` }} />}
             defaultCenter={this.state.defaultCenter}
             lat={values.latitude}
             lng={values.longitude}
             onClick={x => {
                const lat = x.latLng.lat();
                const lng = x.latLng.lat();
                 setValues({
               ...values,
               latitude: lat,
              longitude: lng
              });
             }}
          />
         )}
      </div>
    );
  }
}


