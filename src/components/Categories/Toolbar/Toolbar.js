import React, {useCallback, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import * as actionTypes from "../../../store/actions";
import {connect} from "react-redux";
import {toast} from "react-toastify";

const Toolbar = ({
                     categoryId,
                     categories,
                     action,
                     title,
                     onRemoveCategory
                 }) => {

    const notify = useCallback(() => toast.error("Category successfully deleted"),
        []);

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    const renderNavbar = useCallback(() => (
        <>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={`/categories`}>categories</Link>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={`/categories/add`}>add</Link>
            {
                category && action === 'select' && (
                    <>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={`/categories/edit`}>edit</Link>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={`/categories/show`}>view details</Link>
                        <button className={'bg-blue-400 text-white rounded p-1 px-2'} onClick={() => {
                            onRemoveCategory(category.id)
                            notify();
                        }}>delete</button>
                    </>
                )
            }

        </>
    ), [category, action]);

    return (
        <div className={'flex items-center space-x-4 bg-blue-200 border-b-4 border-blue-600 rounded shadow-xl p-2 mb-6'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
            <span className={'font-bold'}>{title}</span>
            {renderNavbar()}
        </div>
    )
}

Toolbar.defaultProps = {
    categoryId: null,
    categories: [],
    action: 'no-select',
    title: '',
    onRemoveCategory: null
};

const mapStateToProps = state => {
    return {
        categoryId: state.categoryId,
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);