import React from 'react';
import {Link} from "react-router-dom";

const Toolbar = ({
                     action = '',
                     category = null
                 }) => {
    return (
        <div className={'flex items-center space-x-4 bg-blue-200 border-b-4 border-blue-600 rounded shadow-xl p-2 mb-6'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
            </svg>
            <span className={'font-bold'}> Categories </span>
            <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={'/categories'}>
                categories
            </Link>
            <Link className={'space-x-1 bg-blue-400 text-white rounded p-1 px-2'} to={'/categories/add'}>
                new category
            </Link>
            {category && <Link className={'bg-blue-400 text-white rounded p-1 px-2'} to={`/categories/edit/${category.id}`}>edit</Link>}
            {category && <button>view details</button>}
            {category && <button>delete</button>}
        </div>
    )
}

export default Toolbar;