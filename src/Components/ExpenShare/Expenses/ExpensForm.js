import React, {Component} from 'react';
import {Form, Button, FormGroup, Input, Container, InputGroup} from "reactstrap";


class ExpensForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "", amount: "",
            categories: [], category: null,
            persons: [], person: null };
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/category', {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
        .then(response => response.json())
        .then(data => this.setState({ categories: data }))
    ;
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({persons: data}))
        ;
    }

    handleChangeT(event) {
        event.preventDefault();
        this.setState({ title: event.target.value});
    }

    handleChangeA(event) {
        event.preventDefault();
        this.setState({ amount: event.target.value});
    }


    handleCreate(event) {
        console.log(this.state);
        event.preventDefault();
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/expense/', {
            method: 'POST',
            body: JSON.stringify({ slug: this.props.slug, title: this.state.title, amount: this.state.amount, category: this.state.category, person:this.state.person })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.props.newExpense(data);
                alert('Nouvelle dépense crée avec succès !');
            })
            .catch(err => alert('Erreur lors de la création de la dépense'))
        ;
    }
    render() {

        const categories = this.state.categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>);
        const persons = this.state.persons.map(person => <option key={person.id} value={person.id}>{person.firstname} {person.lastname}</option>);

        return (
            <div>
                <Container className="text-center">
                    <h3 className="p-3">Ajouter une dépense {this.state.slug}</h3>
                    <Form className="m-0 m-auto">
                        <FormGroup>
                            <InputGroup className="my-2">
                                <Input className="form-control col-md-4 m-0 m-auto text-center"
                                       type="text" onChange={e => this.handleChangeT(e)} placeholder="Titre" />
                            </InputGroup>
                            <InputGroup className="my-2">
                                <Input className="form-control col-md-4 m-0 m-auto text-center"
                                       type="text"  onChange={e => this.handleChangeA(e)} placeholder="Montant" />
                            </InputGroup>
                            <InputGroup className="my-2">
                                <Input className="form-control col-md-4 m-0 m-auto text-center"
                                       type="select"  name="category" onChange={e => this.setState({ category: e.target.value })}>
                                    <option value="0">Veuillez selectionner une catégorie</option>
                                    {categories}
                                </Input>
                            </InputGroup>
                            <InputGroup className="my-2">
                                <Input className="form-control col-md-4 m-0 m-auto text-center"
                                       type="select"  name="person" onChange={e => this.setState({ person: e.target.value })}>
                                    <option value="0">Veuillez selectionner une personne</option>
                                    {persons}
                                </Input>
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

export default ExpensForm;