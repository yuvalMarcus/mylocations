import React, {useState} from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './CategoriesList.css';
import Category from "../../components/CategoriesList/Category/Category";

const CategoriesList = ({
                            categories = []
                        }) => {

    const [category, setCategory] = useState(null);

    return (
        <div className={'Categories'}>
            <header>
                <span> Categories </span>
                <Link to={'/categories/add'}>add</Link>
                {category && <Link to={`/categories/edit/${category.id}`}>edit</Link>}
                {category && <button>view details</button>}
                {category && <button>delete</button>}
            </header>
            <section>
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