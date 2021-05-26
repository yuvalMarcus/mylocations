import React from 'react';
import GoogleMapReact from "google-map-react";
import Marker from "./Marker/Marker";

const GoogleMap = ({
                       onClick,
                       lat,
                       lng,
                       zoom,
                       markers
                   }) => {
    return (
        <div style={{ height: '100vh', width: '100%' }}>
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
    )
};

export default GoogleMap;