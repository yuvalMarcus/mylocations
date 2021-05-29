import React, {useMemo} from "react";
import {connect} from 'react-redux';
import Group from "./Group/Group";
import Location from "./Location/Location";
import Toolbar from "../Toolbar/Toolbar";
import Sort from '../Sort/Sort';
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
    const categoriesByFilter = useMemo(() => categories.filter(currentCategory => currentCategory.name.toLowerCase().includes(category.toLowerCase())),
        [categories, category]);

    /* filter by category */
    const locationsByFilter = useMemo(() => locations.
        filter(loc => loc.category.some(categoryId => {
            const currentCategory = categories.find(currentCategory => currentCategory.id === categoryId);
            if(!currentCategory) {
                return false;
            }
            return currentCategory.name.toLowerCase().includes(category.toLowerCase());
        })),
        [locations, category]);;

    /* sort */
    const locationsSort = useMemo(() => {
        if(sort.value === 'alphabetically') {
            return [...locationsByFilter].sort((a, b) => a.name.localeCompare(b.name));
        }
        return locationsByFilter;
    }, [locationsByFilter, sort.value]);

    const currentLocation = useMemo(() => locations.find(currentLocation => currentLocation.id === locationId),
        [locations, locationId]);

    const locationsByCategory = useMemo(() => {
        const data = {};
        categoriesByFilter.forEach((currentCategory) => {
            data[currentCategory.id] = [];
        });
        locationsSort.forEach((currentLocation) => {
            currentLocation.category.forEach(categoryId => {
                if(data[categoryId]) {
                    data[categoryId].push(currentLocation);
                }
            });
        });
        return data;
    }, [locationsSort, categoriesByFilter]);

    return (
        <>
            <Toolbar title={'Locations'} action={'select'} />
            <Sort />
            <Filters />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Locations List</span>
            </div>
            <div className={''}>
                {groupBy && !locationsSort.length && <div className={'text-gray-400'}>Empty Categories</div>}
                {groupBy && locationsSort.length && locationsSort
                    .map(cat => <Group
                        key={cat.id}
                        group={cat}
                        location={currentLocation}
                        locations={locationsByCategory[cat.id]}
                        choose={(id) => onSetLocation(!currentLocation || id !== currentLocation.id ? id : null)} />)}
                {!groupBy && !locationsSort.length && <div className={'text-gray-400'}>Empty Locations</div>}
                {!groupBy && locationsSort.length > 0 && <div className={'bg-white border shadow'}>
                    {locationsSort.map(loc => <Location
                        key={loc.id}
                        name={loc.name}
                        active={currentLocation && loc.id === currentLocation.id}
                        choose={() => onSetLocation(!currentLocation || loc.id !== currentLocation.id ? loc.id : null)} />)}
                </div>}
            </div>
        </>
    )
}

LocationsList.defaultProps = {
    locationId: null,
    locations: [],
    onSetLocation: null,
    onRemoveLocation: null,
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
        onSetLocation: (id) => dispatch({type: actionTypes.SET_LOCATION, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationsList);