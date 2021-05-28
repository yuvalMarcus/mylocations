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
    categories = useMemo(() => categories.filter(cat => cat.name.toLowerCase().includes(category)),
        [categories, category]);

    /* filter by category */
    locations = useMemo(() => locations.
        filter(loc => loc.category.find(catId => {
            const cat = categories.find(cat => cat.id === catId);
            if(!cat) {
                return false;
            }
            return cat.name.toLowerCase().includes(category);
        })),
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
                if(data[cat]) {
                    data[cat].push(item);
                }
            });
        });
        return data;
    }, [locations, categories]);

    return (
        <>
            <Toolbar title={'Locations'} action={'select'} />
            <Sort />
            <Filters />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Locations List</span>
            </div>
            <div className={''}>
                {groupBy && !categories.length && <div className={'text-gray-400'}>Empty Categories</div>}
                {groupBy && categories && categories
                    .map(cat => <Group
                        key={cat.id}
                        group={cat}f
                        location={location}
                        locations={locationsByCategory[cat.id]}
                        choose={(id) => onSetLocation(!location || id !== location.id ? id : null)} />)}
                {!groupBy && !locations.length && <div className={'text-gray-400'}>Empty Locations</div>}
                {!groupBy && locations.length > 0 && <div className={'bg-white border shadow'}>
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