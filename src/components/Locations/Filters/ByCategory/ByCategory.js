import React, {useState} from 'react';
import {connect} from "react-redux";
import {ReactComponent as MinusIcon} from "../../../../asset/img/minus-sm.svg";
import {ReactComponent as PlusIcon} from "../../../../asset/img/plus-sm.svg";
import * as actionTypes from "../../../../store/actions";

const ByCategory = ({
                        groupBy,
                        category,
                        onViewGroupByCategory,
                        onFilterByCategory
                    }) => {

    const [open, setOpen] = useState(true);

    return (
        <div className={'bg-white border-b-4 border-gray-600 rounded shadow-xl mb-6'}>
            <div className={'flex justify-between bg-gray-100 border-t-2 border-b-2 border-gray-200 p-2'}>
                <span>By Categories</span>
                <span className={'bg-gray-500 text-white p-0.5 cursor-pointer'} onClick={() => setOpen(!open)}>
                        {open && <MinusIcon />}
                    {!open && <PlusIcon />}
                    </span>
            </div>
            <div className={[
                'flex flex-col md:flex-row overflow-hidden max-h-0 transition-height ease-in-out duration-500',
                open && 'max-h-screen'
            ].filter(Boolean). join(' ')}>
                <div className={'space-x-2 p-2'}>
                    <label>
                        By Category
                    </label>
                    <input type={'text'} className={'bg-gray-100 p-1'} onChange={e => onFilterByCategory(e.target.value)} value={category} placeholder={'category name'}/>
                </div>
                <div className={'flex items-end p-2 md:ml-auto'}>
                    <button className={'bg-gray-500 text-white rounded p-1 px-2 hover:bg-gray-600'} onClick={() => onViewGroupByCategory(!groupBy)}>
                        {!groupBy && 'Active '}
                        {groupBy && 'Deactivate '}
                        Group By Categories</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        category: state.locations.filter.category,
        groupBy: state.locations.view.groupBy,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFilterByCategory: (category) => dispatch({type: actionTypes.LOCATIONS_FILTER_BY_CATEGORY, category: category}),
        onViewGroupByCategory: (groupBy) => dispatch({type: actionTypes.LOCATIONS_VIEW_GROUP_BY, groupBy: groupBy}),
    }
};

ByCategory.defaultProps = {
    groupBy: null,
    category: '',
    onViewGroupByCategory: null,
    onFilterByCategory: null
};


export default connect(mapStateToProps, mapDispatchToProps)(ByCategory);