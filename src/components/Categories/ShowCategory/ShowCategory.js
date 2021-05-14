import React from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from "../../../store/actions";

const ShowCategory = ({
                          categories = [],
                          onRemoveCategory = null,
                          match = null,
                      }) => {

    const id = match.params.id;
    const category = categories.find(cat => cat.id === id);
    return (
        <>
            {!category && <Redirect to={'/'} />}
            <Toolbar category={category} removeCategory={onRemoveCategory} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Show Category</span>
            </div>
            <div className={'bg-white border rounded shadow p-2'}>
                {category && `Name: ${category.name}`}
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowCategory);