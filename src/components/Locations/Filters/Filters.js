import React, {useCallback} from 'react';
import {connect} from "react-redux";
import Select from 'react-select';
import * as actionTypes from "../../../store/actions";

const Filters = ({
                     onSort,
                     sort,
                     groupBy,
                     onViewGroupByCategory,
                     onFilterByCategory,
                     category
                 }) => {

    return (
        <>
            <div className={'bg-white border-b-4 border-gray-600 rounded shadow-xl mb-6 p-2'}>
                <label className={'mb-4'}>
                    Sort Locations By
                </label>
                <Select options={[
                    { value: '', label: 'none' },
                    { value: 'alphabetically', label: 'alphabetically' },
                ]} value={sort} onChange={value => onSort(value)} />
            </div>
            <div className={'text-gray-500 font-bold py-2'}>
                <span>filters</span>
            </div>
            <div className={'bg-white border-b-4 border-gray-600 rounded shadow-xl mb-6'}>
                <div className={'bg-gray-100 border-t-2 border-b-2 border-gray-200 p-2'}>
                    By Categories
                </div>
                <div className={'flex p-2'}>
                    <div className={'space-x-2'}>
                        <label>
                            By Categories
                        </label>
                        <input type={'text'} className={'bg-gray-100 p-1'} onChange={e => onFilterByCategory(e.target.value)} value={category}/>
                    </div>
                    <div className={'flex items-end ml-auto'}>
                        <button className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} onClick={() => onViewGroupByCategory(!groupBy)}>Group By Categories</button>
                    </div>
                </div>
            </div>
        </>
    )
};

const mapStateToProps = state => {
    return {
        sort: state.locations.sort,
        category: state.locations.filter.category,
        groupBy: state.locations.view.groupBy,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSort: (sort) => dispatch({type: actionTypes.LOCATIONS_SORT, sort: sort}),
        onFilterByCategory: (category) => dispatch({type: actionTypes.LOCATIONS_FILTER_BY_CATEGORY, category: category}),
        onViewGroupByCategory: (groupBy) => dispatch({type: actionTypes.LOCATIONS_VIEW_GROUP_BY, groupBy: groupBy}),
    }
};

Filters.defaultProps = {
    onSort: null,
    sort: '',
    onViewGroupByCategory: null,
    groupBy: null,
    onFilterByCategory: null,
    category: '',
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);