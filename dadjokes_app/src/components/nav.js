import React from 'react';
import {NavLink} from 'react-router-dom';

export const Nav = props =>{
    return(
        <div>
            <NavLink to='/login'>login</NavLink>
        </div>
    )
}