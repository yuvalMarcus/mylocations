import React, {useState} from "react";

const Category = ({
                      id = 0,
                      name = '',
                      active = false,
                      choose = null
                  }) => {

    return (
        <div className={[
            'flex items-center justify-between p-2 border-b-2',
            active && 'bg-blue-500 text-white'
        ].filter(Boolean).join(' ')} onClick={choose}>
            <span>
                {name}
            </span>
            <span className={'bg-gery-100'}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
  <path fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"/>
</svg>
            </span>
        </div>
    )
}

export default Category;