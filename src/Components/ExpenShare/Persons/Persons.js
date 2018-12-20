import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {Route} from "react-router-dom";
import {Container} from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonForm from "./PersonForm";


class Persons extends Component {

    constructor(props) {
        super(props);
        this.state = {persons :[]};
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({persons: data}))
            ;
    }

    handleNewPerson(person) {
        let persons = this.state.persons;
        persons.push(person);
        this.setState({ persons: persons });
    }

    handleDelete(person) {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/person/' + person.id,{
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                let persons = this.state.persons;
                persons = persons.filter(pers => pers.id !== person.id);
                this.setState({ persons: persons });
            });
    }

    render() {

        const person = this.state.persons.map(person =>
            (
                    <tr key={person.id}>
                        <td> {person.firstname}</td>
                        <td> { person.expense ? person.expense.length : 0} dépense(s)</td>
                        <td className="text-center"> { person.expense ? person.expense.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0) : 0 } €</td>
                        <td> <button onClick={e => this.handleDelete(person)} className="btn btn-danger my-2 btn-sm">Supprimer</button> </td>
                    </tr>


           ));

        return (
            <React.Fragment>
                <Container>
                <h2>Persons</h2>
                <NavLink className="btn btn-info my-2" to={this.props.match.url + '/add'}>+ Ajouter une personne</NavLink>
                <Route path={this.props.match.url + '/add'} render={props => <PersonForm {...props} slug={this.props.slug} newPerson={person => this.handleNewPerson(person)}/>}/>
                   <br/>
                    <table className="table text-dark">
                       <tbody className="table-light">
                        <tr>
                            <th>Nom</th>
                            <th>Nbre de dépenses</th>
                            <th>Montant total</th>
                            <th>Supprimer</th>
                        </tr>
                    {person}
                       </tbody>
                    </table>

                </Container>
            </React.Fragment>

        );
    }
}

export default Persons;