import React from 'react';
import burgerImg from '../../assets/images/burger-logo.png'
import classes from './Logo.module.css'

const logo = () => (
    <div className={classes.Logo}>
        <img src={burgerImg} alt="MyBurger"></img>
    </div>
);

export default logo