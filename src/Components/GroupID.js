import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, FormGroup, Input, Container} from "reactstrap";


class GroupId extends Component {

    constructor(props) {
        super(props);
        this.state = { sharegroups: []};
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/share_group', {
            method: 'POST',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({ sharegroups: data }))
        ;
    }

    render() {
        return (

            <Container className="text-center mt-5 pt-4">
                <h2 className="p-4">Saississez le nom de votre groupe</h2>
            <Form className="m-0 m-auto">
                <FormGroup>
                        <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="text" name="groupeid" id="groupeid" placeholder="nom-du-groupe" />
                </FormGroup>
                <FormGroup className="text-center">
                        <Button className="m-2 px-4 btn-lg btn-info">Créer</Button>
                        <Button className="m-2 px-4 btn-lg btn-success">Ouvrir</Button>
                </FormGroup>
            </Form>
            </Container>
        );
    }
    }

export default GroupId;