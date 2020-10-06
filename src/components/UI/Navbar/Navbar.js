import React from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import Logo from '../../Logo/Logo';
import classes from './Navbar.module.css'

const navbar = (props) => (

    <Navbar collapseOnSelect expand="lg" className={classes.Navbar1}  variant="dark">
        <Logo />{' '}
        <Navbar.Brand href="#home" className="ml-2">Burger</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="ml-auto"style={{color:"white"}}>
            <Nav.Item>
                <Nav.Link href="#features">Burger Builder</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#pricing">Checkout</Nav.Link>
                </Nav.Item>
            {/* </Nav>
            <Nav> */}
                {/* <Nav.Link href="#deets">More deets</Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                    Dank memes
      </Nav.Link> */}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default navbar