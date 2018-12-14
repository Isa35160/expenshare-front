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
            <Container>
            <Form>
                <FormGroup>
                        <Input type="text" name="groupeid" id="groupeid" placeholder="Groupe ID" />
                </FormGroup>
                <FormGroup>
                        <Button>Créer</Button>
                        <Button>Ouvrir</Button>
                </FormGroup>
            </Form>
            </Container>
        );
    }
    }

export default GroupId;