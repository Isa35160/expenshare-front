import React, {Component} from 'react';
import {Form, Button, FormGroup, Input, Container, InputGroup} from "reactstrap";


class PersonForm extends Component {

    constructor(props) {
        super(props);
        this.state = { firstname: "", lastmane: "", person: null };
    }

    handleChangeF(event) {
        event.preventDefault();
        this.setState({ firstname: event.target.value});
    }

    handleChangeL(event) {
        event.preventDefault();
        this.setState({ lastname: event.target.value});
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/person/', {
            method: 'POST',
            body: JSON.stringify({ slug: this.props.slug, firstname: this.state.firstname, lastname: this.state.lastname })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.newPerson(data);
                alert('Nouvelle personne crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la personne'))
        ;
    }
    render() {
        return (
            <div>
                <Container className="text-center">
                    <h4 className="p-3">Ajouter une personne au groupe {this.state.slug}</h4>
                    <Form className="m-0 m-auto">
                        <FormGroup>
                            <InputGroup className="my-2">
                            <Input className="form-control col-md-4 my-2 m-auto text-center" type="text" value={this.state.firstname} onChange={e => this.handleChangeF(e)} placeholder="Prénom" />
                            </InputGroup>
                            <InputGroup>
                                <Input className="form-control col-md-4 my-2 m-auto text-center" type="text" value={this.state.lastname} onChange={e => this.handleChangeL(e)} placeholder="Nom" />
                            </InputGroup>
                                </FormGroup>
                        <FormGroup className="text-center">
                            <Button onClick={e => this.handleCreate(e)} className="m-2 px-4 btn-success">Valider</Button>
                        </FormGroup>
                    </Form>
                </Container>

            </div>
        );
    }
}

export default PersonForm;