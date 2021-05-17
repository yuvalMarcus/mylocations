import React, {useCallback, useMemo} from 'react';
import {connect} from 'react-redux';
import {useForm} from 'react-hook-form';
import {Redirect} from "react-router-dom";
import {toast} from "react-toastify";
import Toolbar from "../Toolbar/Toolbar";
import * as actionTypes from '../../../store/actions';

const EditCategory = ({
                          categoryId,
                          categories,
                          onEditCategory,
                          history
                     }) => {

    const category = useMemo(() => categories.find(cat => cat.id === categoryId),
        [categories, categoryId]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: category && category.name
        }
    });

    const notify = useCallback(() => toast.success("Category successfully edited"),
        []);

    if(!category) {
        return <Redirect to={'/'} />;
    }

    const onSubmit = (data) => {
        onEditCategory(data, category.id);
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
                        {errors.name && <p className={'text-red-600'}>Last name is required</p>}
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
    categoryId: null,
    categories: [],
    onEditCategory: null,
    history: null
};

const mapStateToProps = state => {
    return {
        categoryId: state.categoryId,
        categories: state.categories
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onEditCategory: (category, id) => dispatch({type: actionTypes.EDIT_CATEGORY, payload: category, id: id}),
        onRemoveCategory: (id) => dispatch({type: actionTypes.REMOVE_CATEGORY, id: id})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditCategory);