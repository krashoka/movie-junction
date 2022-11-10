import React from 'react';
import "../App.css";

const Header = (props) => {
    return(
        <h2 className='app-title'>{props.text}</h2>
    );
}

export default Header;