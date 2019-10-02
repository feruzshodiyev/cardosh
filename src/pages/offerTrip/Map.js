/* global google */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
    state = {
        directions: null
    };

    componentDidMount() {
        const directionsService = new google.maps.DirectionsService();

if (this.props.renderDirection){
    directionsService.route(
        {
            origin: this.props.origin,
            destination: this.props.destination,
            travelMode: google.maps.TravelMode.DRIVING
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result
                });
                console.log(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

    }


    render() {
        const GoogleMapExample = withGoogleMap(() => (
            <GoogleMap
                defaultCenter={{ lat: 41.322658, lng: 69.242630 }}
                defaultZoom={10}
            >
                {this.props.renderDirection?  <DirectionsRenderer
                    directions={this.state.directions}
                /> : <Marker
                    position={{ lat: 41.322658, lng: 69.242630 }}
                />}

            </GoogleMap>
        ));
        return (
            <div>
                <GoogleMapExample
                    containerElement={<div className="map-container"/>}
                    mapElement={<div className="map-element"/>}
                />
            </div>
        );
    }
}

Map.propTypes = {
    renderDirection: PropTypes.bool,
};

export default Map;