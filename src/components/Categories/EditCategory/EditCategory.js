import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';

const EditCategory = ({
                          categories,
                          categoryId,
                          onEditCategory,
                          history
                     }) => {

    const currentCategory = useMemo(() => categories.find(category => category.id === categoryId),
        [categories, categoryId]);

    const notify = useCallback(() => toast.success("Category successfully edited"),
        []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: !!currentCategory && currentCategory.name
        }
    });

    if(!currentCategory) {
        return <Redirect to={'/'} />;
    }

    const onSubmit = (data) => {
        onEditCategory(data, currentCategory.id);
        notify();
        history.push('/categories');
    }

    return (
        <>
            <Toolbar title={'Edit Category'} action={'select'} />
            <div className={'text-gray-500 font-bold py-2'}>
                <span>Edit Category</span>
            </div>
            <div className={'bg-white border rounded shadow'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={'p-2'}>
                        <label>Name</label>
                        <input className={'bg-gray-100 w-full p-2'} autoFocus {...register('name',{ required: true })} />
                        {errors.name && <p className={'text-red-600'}>Name is required</p>}
                    </div>
                    <div className={'p-2'}>
                        <input className={'rounded p-3 bg-pink-600 text-white cursor-pointer hover:bg-pink-700'} type="submit" value={'Edit Category'} />
                    </div>
                </form>
            </div>
        </>
    );
};

EditCategory.defaultProps = {
    categories: [],
    categoryId: null,
    onEditCategory: null,
    history: null
};

const mapStateToProps = state => {
    return {
        categories: state.categories.items,
        categoryId: state.categories.itemId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditCategory: (category, id) => dispatch({type: actionTypes.EDIT_CATEGORY, payload: category, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);