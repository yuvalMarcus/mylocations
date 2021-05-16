import React from "react";

const Category = ({
                      name,
                      active,
                      choose
                  }) => {

    return (
        <div className={[
            'flex items-center justify-between p-2 border-b-2 border-gray-100 cursor-pointer',
            active && 'bg-pink-400 text-white'
        ].filter(Boolean).join(' ')} onClick={choose}>
            <span>
                {name}
            </span>
            <span className={[
                'bg-gray-100 rounded-full',
                !active && 'text-gray-400',
                active && 'bg-pink-600 text-white'
            ].filter(Boolean).join(' ')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
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