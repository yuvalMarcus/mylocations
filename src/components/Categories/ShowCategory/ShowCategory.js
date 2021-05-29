import React, {useMemo} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";;

const ShowCategory = ({
                          categories,
                          categoryId,
                      }) => {

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    if(!category) {
        return <Redirect to={'/'} />;
    }

    return (
        <>
            <Toolbar title={'Show Category'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Show Category</span>
            </div>
            <div className={'bg-white border rounded shadow p-2'}>
                {category && `Name: ${category.name}`}
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
        categoryId: state.categories.itemId,
        categories: state.categories.items,
    };
};

export default connect(mapStateToProps, null)(ShowCategory);