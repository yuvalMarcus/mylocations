import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";;

const ShowCategory = ({
                          categories,
                          categoryId,
                      }) => {

    const currentCategory = useMemo(() => categories.find(category => category.id === categoryId),
        [categories, categoryId]);

    if(!currentCategory) {
        return <Redirect to={'/'} />;
    }

    return (
        <>
            <Toolbar title={'Show Category'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Show Category</span>
            </div>
            <div className={'bg-white border rounded shadow p-2'}>
                {!!currentCategory && `Name: ${currentCategory.name}`}
            </div>
        </>
    )
}

ShowCategory.defaultProps = {
    categories: [],
    categoryId: null,
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        categoryId: state.categories.itemId
    };
};

export default connect(mapStateToProps, null)(ShowCategory);