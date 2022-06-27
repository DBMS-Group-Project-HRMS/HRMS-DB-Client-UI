import React from 'react';
import {Navbar, Container, Nav} from 'react-bootstrap';

function Header() {

    return(
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container>
                <Navbar.Brand href="/">
                    <img
                    alt=""
                    src="favicon.ico"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                    />{' '}
                Jupyter
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="#features">About</Nav.Link>
                    <Nav.Link href="#pricing">Logout</Nav.Link>
                    </Nav>
                    <Nav>
                    <Nav.Link href="#deets">Contact Us</Nav.Link>
                    <Nav.Link eventKey={2} href="#memes">
                        Dank memes
                    </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;