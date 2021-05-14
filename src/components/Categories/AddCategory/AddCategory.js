import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actionTypes from '../../../store/actions';
import Toolbar from "../Toolbar/Toolbar";

const AddCategory = ({
                         categories = [],
                         onAddCategory = null,
                         match = null,
                         history = null
                     }) => {

    const id = match.params.id;
    const category = categories.find(cat => cat.id === id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onAddCategory(data, `add new category ${data.name}`);
        history.push('/categories');
    }

    return (
        <>
            <Toolbar category={category} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Add New Category</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <label>Name</label>
                        <input className={'bg-gray-100 w-full p-2'} {...register('name',{ required: true })} />
                        {errors.name && <p className={'text-red-600'}>Last name is required</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer'} type="submit" value={'Add Category'} />
                    </div>
                </form>
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (category, alert) => dispatch({type: actionTypes.ADD_CATEGORY, category: category, alert: alert})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCategory);