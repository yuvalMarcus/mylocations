import React, {useState} from "react";
import './ShowCategory.css';

const ShowCategory = ({
                      id = 0,
                      title = '',
                      setData = null
                  }) => {

    return (
        <div className={'Category'}>
            {title}
        </div>
    )
}

export default ShowCategory;