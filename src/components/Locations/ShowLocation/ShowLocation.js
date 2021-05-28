import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import GoogleMap from '../../GoogleMap/GoogleMap';
import * as actionTypes from "../../../store/actions";

const ShowLocation = ({
                          locations,
                          locationId
                      }) => {

    const location = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    if(!location) {
        return <Redirect to={'/'} />;
    }

    return (
        <>
            <Toolbar title={'Show Location'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Show Location</span>
            </div>
            <div className={'bg-white border rounded shadow p-2 space-y-4'}>
                <p>
                    {location && `Name: ${location.name}`}
                </p>
                <p>
                    {location && `Address: ${location.address}`}
                </p>
                <GoogleMap
                    onClick={null}
                    lng={location.lng}
                    lat={location.lat}
                    zoom={8}
                    markers={[{
                        lng: location.lng,
                        lat: location.lat,
                        title: ''
                    }]} />
            </div>
        </>
    )
}

ShowLocation.defaultProps = {
    locations: [],
    locationId: null
};

const mapStateToProps = state => {
    return {
        locationId: state.locations.itemId,
        locations: state.locations.items
    };
};

export default connect(mapStateToProps, null)(ShowLocation);