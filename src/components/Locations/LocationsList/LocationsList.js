import React, {useMemo} from "react";
import {connect} from 'react-redux';
import Group from "./Group/Group";
import Location from "./Location/Location";
import Toolbar from "../Toolbar/Toolbar";
import Sort from '../Sort/Sort';
import Filters from '../Filters/Filters';
import * as actionTypes from "../../../store/actions";

const LocationsList = ({
                           categories,
                           locations,
                           locationId,
                           sort,
                           category,
                           groupBy,
                           onSetLocation
                        }) => {

    const currentLocation = useMemo(() => locations.find(loc => loc.id === locationId),
        [locations, locationId]);

    /* filter by category */
    const categoriesByFilter = useMemo(() => categories.filter(currentCategory => currentCategory.name.toLowerCase().includes(category.toLowerCase())),
        [categories, category]);

    /* filter by category */
    const locationsByFilter = useMemo(() => locations.
        filter(loc => loc.categories.some(categoryId => {
            const currentCategory = categories.find(currentCategory => currentCategory.id === categoryId);
            if(!currentCategory) {
                return false;
            }
            return currentCategory.name.toLowerCase().includes(category.toLowerCase());
        })),
        [locations, category]);

    /* sort */
    const locationsSort = useMemo(() => {
        if(sort.value === 'alphabetically') {
            return [...locationsByFilter].sort((a, b) => a.name.localeCompare(b.name));
        }
        return locationsByFilter;
    }, [locationsByFilter, sort.value]);

    const locationsByCategory = useMemo(() => {
        const data = {};
        categoriesByFilter.forEach((currentCategory) => {
            data[currentCategory.id] = [];
        });
        locationsSort.forEach((currentLocation) => {
            currentLocation.categories.forEach(categoryId => {
                if(data[categoryId]) {
                    data[categoryId].push(currentLocation);
                }
            });
        });
        return data;
    }, [locationsSort, categories]);

    return (
        <>
            <Toolbar title={'Locations'} action={'select'} />
            <Sort />
            <Filters />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Locations List</span>
            </div>
            <div className={''}>
                {groupBy && !categoriesByFilter.length && <div className={'text-gray-400'}>Empty Categories</div>}
                {groupBy && !!categoriesByFilter.length && categoriesByFilter
                    .map(category => <Group
                        key={category.id}
                        group={category}
                        location={currentLocation}
                        locations={locationsByCategory[category.id]}
                        choose={(id) => onSetLocation(!currentLocation || id !== currentLocation.id ? id : null)} />)}
                {!groupBy && !locationsSort.length && <div className={'text-gray-400'}>Empty Locations</div>}
                {!groupBy && !!locationsSort.length && <div className={'bg-white border shadow'}>
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
    categories: [],
    locations: [],
    locationId: null,
    sort: '',
    category: '',
    groupBy: false,
    onSetLocation: null
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        locations: state.locations.items,
        locationId: state.locations.itemId,
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