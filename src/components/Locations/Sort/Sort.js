import React from 'react';
import Select from "react-select";
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";

const Sort = ({
                  onSort,
                  sort,
              }) => {
    return (
        <div className={'bg-white border-b-4 border-gray-600 rounded shadow-xl mb-6 p-2'}>
            <label className={'mb-4'}>
                Sort Locations By
            </label>
            <Select options={[
                { value: '', label: 'none' },
                { value: 'alphabetically', label: 'alphabetically' },
            ]} value={sort} onChange={value => onSort(value)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sort: state.locations.sort
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSort: (sort) => dispatch({type: actionTypes.LOCATIONS_SORT, sort: sort})
    }
};

Sort.defaultProps = {
    onSort: null,
    sort: ''
};


export default connect(mapStateToProps, mapDispatchToProps)(Sort);