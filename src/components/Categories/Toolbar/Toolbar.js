import React, {useCallback, useMemo, useState} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {toast} from "react-toastify";
import * as actionTypes from "../../../store/actions";
import { ReactComponent as PaperClipIcon } from '../../../asset/img/paper-clip.svg';
import { ReactComponent as MenuIcon } from '../../../asset/img/menu.svg';

const Toolbar = ({
                     categoryId,
                     categories,
                     locations,
                     action,
                     title,
                     onRemoveCategory
                 }) => {

    const [menu, setMenu] = useState(false);

    const successNotify = useCallback(() => toast.success("Category successfully deleted"),
        []);

    const errorNotify = useCallback(() => toast.error("Category contains locations, cannot be deleted"),
        []);

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    const removeCategory = useCallback(() => {
        if(!category) {
            return;
        }
        if(locations.filter(loc => loc.category.find(cat => cat === category.id)).length) {
            errorNotify();
            return;
        }
        onRemoveCategory(category.id)
        setMenu(false);
        successNotify();
    }, [category]);

    const renderNavbar = useCallback(() => (
        <>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 mt-2 md:mt-0 hover:bg-blue-500'} to={`/categories`}>list</Link>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/add`}>add</Link>
            {
                category && action === 'select' && (
                    <>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/edit`}>edit</Link>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/show`}>view details</Link>
                        <button className={'bg-blue-400 text-white rounded p-1 px-2 text-left hover:bg-blue-500'} onClick={removeCategory}>delete</button>
                    </>
                )
            }

        </>
    ), [category, action]);

    return (
        <div className={'md:flex bg-blue-200 border-b-4 border-blue-600 rounded shadow-xl p-2 mb-6'}>
            <div className={'flex flex-wrap items-center'}>
                <PaperClipIcon />
                <span className={'font-bold ml-2'}>{title}</span>
                <span className={'bg-blue-400 text-white rounded p-1 px-2 ml-auto hover:bg-blue-500 md:hidden'} onClick={() => setMenu(!menu)}><MenuIcon /></span>
            </div>
            <div className={[
                'flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 md:px-2 cursor-pointer overflow-hidden max-h-0 md:max-h-screen transition-height ease-in-out duration-500',
                menu && 'max-h-screen'
            ].filter(Boolean). join(' ')}>
                {renderNavbar()}
            </div>
        </div>
    )
}

Toolbar.defaultProps = {
    categoryId: null,
    categories: [],
    locations: [],
    action: 'no-select',
    title: '',
    onRemoveCategory: null
};

const mapStateToProps = state => {
    return {
        categoryId: state.categories.itemId,
        categories: state.categories.items,
        locations: state.locations.items
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);