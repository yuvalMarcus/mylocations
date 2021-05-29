import React, {useCallback, useMemo, useState} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import { ReactComponent as PaperClipIcon } from '../../../asset/img/paper-clip.svg';
import { ReactComponent as MenuIcon } from '../../../asset/img/menu.svg';
import * as actionTypes from "../../../store/actions";

const Toolbar = ({
                     categories,
                     locations,
                     categoryId,
                     onRemoveCategory,
                     action,
                     title
                 }) => {

    const [menu, setMenu] = useState(false);

    const currentCategory = useMemo(() => categories.find(category => category.id === categoryId),
        [categories, categoryId]);

    const successNotify = useCallback(() => toast.success("Category successfully deleted"),
        []);

    const errorNotify = useCallback(() => toast.error("Category contains locations, cannot be deleted"),
        []);

    const removeCategory = useCallback(() => {
        if(!currentCategory) {
            return;
        }
        if(!!locations.filter(loc => loc.categories.some(category => category === currentCategory.id)).length) {
            errorNotify();
            return;
        }
        onRemoveCategory(currentCategory.id)
        setMenu(false);
        successNotify();
    }, [currentCategory]);

    const renderNavbar = useCallback(() => (
        <>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 mt-2 md:mt-0 hover:bg-blue-500'} to={`/categories`}>list</Link>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/add`}>add</Link>
            {
                !!currentCategory && action === 'select' && (
                    <>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/edit`}>edit</Link>
                        <Link className={'bg-blue-400 text-white rounded p-1 px-2 hover:bg-blue-500'} to={`/categories/show`}>view details</Link>
                        <button className={'bg-blue-400 text-white rounded p-1 px-2 text-left hover:bg-blue-500'} onClick={removeCategory}>delete</button>
                    </>
                )
            }

        </>
    ), [currentCategory, action]);

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
    categories: [],
    locations: [],
    categoryId: null,
    onRemoveCategory: null,
    action: 'no-select',
    title: ''
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        locations: state.locations.items,
        categoryId: state.categories.itemId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);