import React, {useMemo} from "react";
import {connect} from 'react-redux';
import Category from "./Category/Category";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from "../../../store/actions";

const CategoriesList = ({
                            categoryId,
                            categories,
                            onSetCategory,
                        }) => {

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    return (
        <>
            <Toolbar title={'Categories'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Categories List</span>
            </div>
            <div className={'bg-white border shadow'}>
                {!categories.length && <div className={'text-gray-400 p-2'}>Empty Categories</div>}
                {categories.map(cat => <Category
                    key={cat.id}
                    name={cat.name}
                    active={category && cat.id === category.id}
                    choose={() => onSetCategory(!category || cat.id !== category.id ? cat.id : null)} />)}
            </div>
        </>
    )
}

CategoriesList.defaultProps = {
    categoryId: null,
    categories: [],
    onSetCategory: null
};

const mapStateToProps = state => {
    return {
        categoryId: state.categories.itemId,
        categories: state.categories.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCategory: (id) => dispatch({type: actionTypes.SET_CATEGORY, id: id}),
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);