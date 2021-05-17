import React, {useCallback, useMemo} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import * as actionTypes from "../../../store/actions";
import { ReactComponent as PaperClipIcon } from '../../../asset/img/paper-clip.svg';

const Toolbar = ({
                     categoryId,
                     categories,
                     action,
                     title,
                     onRemoveCategory
                 }) => {

    const notify = useCallback(() => toast.success("Category successfully deleted"),
        []);

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    const renderNavbar = useCallback(() => (
        <>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories`}>categories</Link>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/add`}>add</Link>
            {
                category && action === 'select' && (
                    <>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/edit`}>edit</Link>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/show`}>view details</Link>
                        <button className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} onClick={() => {
                            onRemoveCategory(category.id)
                            notify();
                        }}>delete</button>
                    </>
                )
            }

        </>
    ), [category, action]);

    return (
        <div className={'flex flex-wrap items-center space-x-4 bg-blue-200 border-b-4 border-blue-600 rounded shadow-xl p-2 mb-6'}>
            <PaperClipIcon />
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