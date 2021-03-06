import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';

const AddCategory = ({
                         onAddCategory,
                         history
                     }) => {

    const notify = useCallback(() => toast.success("added new category"),
        []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        onAddCategory(data);
        notify();
        history.push('/categories');
    }

    return (
        <>
            <Toolbar title={'Add Category'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Add New Category</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <label>Name</label>
                        <input className={'bg-gray-100 w-full p-2'} autoFocus {...register('name',{ required: true })} />
                        {errors.name && <p className={'text-red-600'}>Name is required</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer hover:bg-pink-700'} type="submit" value={'Add Category'} />
                    </div>
                </form>
            </div>
        </>
    );
};

AddCategory.defaultProps = {
    onAddCategory: null,
    history: null
};

const mapDispatchToProps = dispatch => {
    return {
        onAddCategory: (category) => dispatch({type: actionTypes.ADD_CATEGORY, category: category})
    }
};

export default connect(null, mapDispatchToProps)(AddCategory);