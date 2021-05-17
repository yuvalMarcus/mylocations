import React from "react";
import { ReactComponent as ChevronRightIcon } from '../../../../asset/img/chevron-right.svg';

const Category = ({
                      name,
                      active,
                      choose
                  }) => {

    return (
        <div className={[
            'flex items-center justify-between p-2 border-b-2 border-gray-100 cursor-pointer hover:bg-gray-50',
            active && 'bg-pink-400 text-white hover:bg-pink-500'
        ].filter(Boolean).join(' ')} onClick={choose}>
            <span>
                {name}
            </span>
            <span className={[
                'bg-gray-100 rounded-full',
                !active && 'text-gray-400',
                active && 'bg-pink-600 text-white'
            ].filter(Boolean).join(' ')}>
                <ChevronRightIcon />
            </span>
        </div>
    )
}

Category.defaultProps = {
    name: '',
    active: false,
    choose: null
};

export default Category;