import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actionTypes from '../../../store/actions';
import Toolbar from "../Toolbar/Toolbar";

const AddCategory = ({
                         onAddCategory = null,
                         history = null
                     }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onAddCategory(data);
        history.push('/');
    }

    return (
        <>
            <Toolbar />
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

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (category) => dispatch({type: actionTypes.ADD_CATEGORY, category: category})
    }
};

export default connect(null, mapDispatchToProps)(AddCategory);