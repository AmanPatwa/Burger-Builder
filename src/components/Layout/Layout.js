import React from 'react';
import Aux from '../../hoc/Hux';
import classes from './Layout.module.css';
import Navbar from '../../components/UI/Navbar/Navbar';

const layout = (props) => (
    <Aux>
        <Navbar/>
        <main className={classes.Content}>
            
            {props.children}
        </main>
    </Aux>
);

export default layout