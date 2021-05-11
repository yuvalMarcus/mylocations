import React, {useState} from "react";
import './Category.css';

const Category = ({
                      id = 0,
                      name = '',
                      active = false,
                      choose = null
                  }) => {

    return (
        <div className={[
            'category-item',
            active ? 'active' : ''
        ].join(' ')} onClick={choose}>
            {name}
        </div>
    )
}

export default Category;