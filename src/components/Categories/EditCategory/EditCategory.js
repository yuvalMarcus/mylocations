import React, { useState} from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import * as actionTypes from '../../../store/actions';
import {Redirect} from "react-router-dom";
import Toolbar from "../Toolbar/Toolbar";

const EditCategory = ({
                          categories = [],
                          onEditCategory = null,
                          onRemoveCategory = null,
                          match = null,
                          history = null
                     }) => {
    const id = match.params.id;
    const category = categories.find(cat => cat.id === id);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: category && category.name
        }
    });

    const onSubmit = (data) => {
        onEditCategory(data, category.id, `edit category ${data.name}`);
        history.push('/categories');
    }

    return (
        <>
            {!category && <Redirect to={'/'} />}
            <Toolbar action={'select'} category={category} removeCategory={onRemoveCategory} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Edit Category</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <label>Name</label>
                        <input className={'bg-gray-100 w-full p-2'} {...register('name',{ required: true })} />
                        {errors.name && <p className={'text-red-600'}>Last name is required</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer'} type="submit" value={'Edit Category'} />
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
        onEditCategory: (category, id, alert) => dispatch({type: actionTypes.EDIT_CATEGORY, payload: category, id: id, alert: alert}),
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);