import React, {useEffect, useState} from "react";
import { connect } from 'react-redux';
import Alerts from '../../Alerts/Alerts';
import Category from "./Category/Category";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from "../../../store/actions";

const CategoriesList = ({
                            categories = [],
                            onRemoveCategory = null,
                            match = null
                        }) => {

    const [category, setCategory] = useState(null);

    const removeCategory = id => {
        onRemoveCategory(id)
        setCategory(null);
    }

    const id = match.params.id;

    useEffect(() =>{
        setCategory(categories.find(cat => cat.id === id));
    }, [id]);

    return (
        <>
            <Toolbar action={'select'} category={category} removeCategory={removeCategory} />
            <Alerts />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Categories List</span>
            </div>
            <section className={'bg-white border rounded shadow'}>
                {!categories.length && <div className={'text-gray-400 p-2'}>Empty Categories</div>}
                {categories.map(cat => <Category
                    key={cat.id}
                    name={cat.name}
                    active={category && cat.id === category.id}
                    choose={() => setCategory(cat)} />)}
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);