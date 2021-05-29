import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import GoogleMap from '../../GoogleMap/GoogleMap';

const ShowLocation = ({
                          categories,
                          locations,
                          locationId
                      }) => {

    const currentLocation = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    if(!currentLocation) {
        return <Redirect to={'/locations'} />;
    }

    return (
        <>
            <Toolbar title={'Show Location'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Show Location</span>
            </div>
            <div className={'bg-white border rounded shadow p-2 space-y-4'}>
                <p>
                    {!!currentLocation && `Name: ${currentLocation.name}`}
                </p>
                <p>
                    {!!currentLocation && `Categories:`}
                    {!!currentLocation && currentLocation.categories.map(categoryId => {
                        const category = categories.find(category => category.id === categoryId);
                        return <span key={category.id} className={'ml-2'}>{category.name}</span>;
                    })}
                </p>
                <p>
                    {!!currentLocation && `Address: ${currentLocation.address}`}
                </p>
                <GoogleMap
                    onClick={null}
                    lng={currentLocation.lng}
                    lat={currentLocation.lat}
                    zoom={8}
                    markers={[{
                        lng: currentLocation.lng,
                        lat: currentLocation.lat,
                        title: ''
                    }]} />
            </div>
        </>
    )
}

ShowLocation.defaultProps = {
    categories: [],
    locations: [],
    locationId: null
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        locations: state.locations.items,
        locationId: state.locations.itemId,
    };
};

export default connect(mapStateToProps, null)(ShowLocation);