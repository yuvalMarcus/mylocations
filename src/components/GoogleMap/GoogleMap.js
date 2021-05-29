import React from 'react';
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/Marker";

const GoogleMap = ({
                       onClick,
                       lat,
                       lng,
                       zoom,
                       markers
                   }) => (
    <div className={'h-screen w-full-screen'}>
        <GoogleMapReact
            onClick={onClick}
            bootstrapURLKeys={{ key: '' }}
            defaultCenter={{
                lat: lat,
                lng: lng
            }}
            defaultZoom={zoom}
        >
            {markers && markers.map(mar => <Marker key={`id-${mar.title}-${mar.lat}`} lat={mar.lat} lng={mar.lng} title={mar.title} />)}
        </GoogleMapReact>
    </div>
);

GoogleMap.defaultProps = {
    onClick: null,
    lat: '',
    lng: '',
    zoom: 8,
    markers: []
}

export default GoogleMap;