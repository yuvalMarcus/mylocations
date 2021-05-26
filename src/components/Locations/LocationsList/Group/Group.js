import React, {useMemo} from 'react';
import Location from "../Location/Location";
import * as actionTypes from "../../../../store/actions";
import {connect} from "react-redux";

const Group = ({
                   onSetLocation,
                   locations,
                   locationId,
                   group,
                    }) => {

    const location = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    return (
        <div className={'border-b-2 border-gray-100 cursor-pointer'}>
            <div className={'bg-gray-300 border border-gray-400 p-2'}>
                {group.name}
            </div>
            <div className={'bg-white border border-gary-100 ml-4'}>
                {locations && locations.map(loc => <Location
                    key={loc.id}
                    name={loc.name}
                    active={location && loc.id === location.id}
                    choose={() => onSetLocation(!location || loc.id !== location.id ? loc.id : null)} />)}
            </div>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        locationId: state.locations.itemId,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetLocation: (id) => dispatch({type: actionTypes.SET_LOCATION, id: id}),
        onRemoveLocation: (id) => dispatch({type: actionTypes.REMOVE_LOCATION, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Group);