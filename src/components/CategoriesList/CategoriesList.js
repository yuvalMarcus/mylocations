import React, {useState} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Toolbar from '../Toolbar/Toolbar';
import Category from "../../components/CategoriesList/Category/Category";

const CategoriesList = ({
                            categories = []
                        }) => {

    const [category, setCategory] = useState(null);

    return (
        <div className={''}>
            <Toolbar action={'list'} category={category} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Categories List</span>
            </div>
            <section className={'bg-white border rounded shadow'}>
                {categories.map(cat => <Category
                    key={cat.id}
                    name={cat.name}
                    active={category && cat.id === category.id}
                    choose={() => setCategory(cat)} />)}
            </section>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};

export default connect(mapStateToProps, null)(CategoriesList);