import React from 'react';
import ByCategory from "./ByCategory/ByCategory";

const Filters = () => {
    return (
        <>
            <div className={'text-gray-500 font-bold py-2'}>
                <span>filters</span>
            </div>
            <ByCategory />
        </>
    )
};

export default Filters;