import React, {useCallback, useEffect, useMemo, useState} from "react";
import {connect} from 'react-redux';
import Group from "./Group/Group";
import Location from "./Location/Location";
import Toolbar from "../Toolbar/Toolbar";
import Filters from '../Filters/Filters';
import * as actionTypes from "../../../store/actions";

const LocationsList = ({
                           locationId,
                           locations,
                           onSetLocation,
                           categories,
                           sort,
                           category,
                           groupBy
                        }) => {

    /* filter by category */
    locations = useMemo(() => [...locations].filter(loc => loc.category.find(cat => cat.label.toLowerCase().includes(category))),
        [locations, category]);;

    /* sort */
    locations = useMemo(() => {
        if(sort.value === 'alphabetically') {
            return [...locations].sort((a, b) => a.name.localeCompare(b.name));
        }
        return locations;
    }, [locations, sort.value]);

    const location = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    const locationsByCategory = useMemo(() => {
        const data = {};
        categories.forEach((cat) => {
            data[cat.id] = [];
        });
        locations.forEach((item) => {
            item.category.forEach((cat) => {
                data[cat.value].push(item);
            });
        });
        return data;
    }, [locations, categories]);

    categories = useMemo(() => categories.filter(cat => cat.name.toLowerCase().includes(category)),
        [categories, category]);

    return (
        <>
            <Toolbar title={'Locations'} action={'select'} />
            <Filters />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Locations List</span>
            </div>
            <div className={''}>
                {!locations.length && <div className={'text-gray-400 p-2'}>Empty Locations</div>}
                {groupBy && categories && categories
                    .map(cat => <Group key={cat.id} group={cat} locations={locationsByCategory[cat.id]} />)}
                {!groupBy && locations && <div className={'bg-white border shadow'}>
                    {locations.map(loc => <Location
                        key={loc.id}
                        name={loc.name}
                        active={location && loc.id === location.id}
                        choose={() => onSetLocation(!location || loc.id !== location.id ? loc.id : null)} />)}
                </div>}
            </div>
        </>
    )
}

LocationsList.defaultProps = {
    locationId: null,
    locations: [],
    onSetLocation: null,
    categories: [],
    sort: '',
    category: '',
    groupBy: false
};

const mapStateToProps = state => {
    return {
        locationId: state.locations.itemId,
        locations: state.locations.items,
        categories: state.categories.items,
        sort: state.locations.sort,
        category: state.locations.filter.category,
        groupBy: state.locations.view.groupBy,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetLocation: (id) => dispatch({type: actionTypes.SET_LOCATION, id: id}),
        onRemoveLocation: (id) => dispatch({type: actionTypes.REMOVE_LOCATION, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);