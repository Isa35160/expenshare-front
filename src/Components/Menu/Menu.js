import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {
    Container,
    Navbar,
    NavbarBrand,
    NavLink,
} from 'reactstrap';


class Menu extends Component {
    render() {
        return (
            <div>

                    <Navbar className="navbar-dark" color="dark" expand="md">
                        <Container className="d-flex justify-content-start">
                        <NavbarBrand href="/">ExpenShare</NavbarBrand>
                                    <NavLink href={this.props.url}>Dashboard</NavLink>
                                    <NavLink href={this.props.url + '/expenses'} >Expenses</NavLink>
                                    <NavLink href={this.props.url + '/persons'} >Persons</NavLink>
                        </Container>
                    </Navbar>


            </div>
        );
    }
}

export default Menu;