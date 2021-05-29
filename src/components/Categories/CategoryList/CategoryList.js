import React, {useMemo} from "react";
import {connect} from 'react-redux';
import Category from "./Category/Category";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from "../../../store/actions";

const CategoryList = ({
                          categories,
                          categoryId,
                          onSetCategory
                        }) => {

    const currentCategory = useMemo(() => categories.find(category => category.id === categoryId),
        [categories, categoryId]);

    return (
        <>
            <Toolbar title={'Categories'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Categories List</span>
            </div>
            <div className={'bg-white border shadow'}>
                {!categories.length && <div className={'text-gray-400 p-2'}>Empty Categories</div>}
                {categories.map(category => <Category
                    key={category.id}
                    name={category.name}
                    active={!!currentCategory && category.id === currentCategory.id}
                    choose={() => onSetCategory(!currentCategory || category.id !== currentCategory.id ? category.id : null)} />)}
            </div>
        </>
    )
}

CategoryList.defaultProps = {
    categories: [],
    categoryId: null,
    onSetCategory: null
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        categoryId: state.categories.itemId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetCategory: (id) => dispatch({type: actionTypes.SET_CATEGORY, id: id}),
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);