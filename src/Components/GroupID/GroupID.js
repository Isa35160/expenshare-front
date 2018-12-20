import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, FormGroup, Input, Container} from "reactstrap";
import {Redirect} from "react-router-dom";
import ExpenShare from "../ExpenShare/Expenshare";


class GroupId extends Component {

        constructor(props) {
                super(props);
                this.state = { slug: "", sharegroup: null };
        }

        handleChange(event) {
            event.preventDefault();
            this.setState({ slug: event.target.value });
        }

        handleCreate(event) {
            event.preventDefault();
            fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/sharegroup/', {
                method: 'POST',
                body: JSON.stringify({ slug: this.state.slug })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert('Nouveau groupe créé avec succès !');
                })
                .catch(err => alert('Erreur lors de la création du groupe'))
            ;
        }

        handleOpen(event) {
            event.preventDefault();
            fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/sharegroup/' + this.state.slug)
                .then(response => response.json())
                .then(data => {
                    this.setState({ sharegroup: data });
                })
                .catch(err => alert('Ce groupe n\'existe pas !'))
            ;
        }

        render() {

            if (this.state.sharegroup) {
                return <Redirect to={'/group/' + this.state.sharegroup.slug} exact component={ExpenShare}/>
            }

            return (

                <Container className="text-center mt-5 pt-4">
                    <h1 className="p-3">ExpenShare</h1>
                    <h2 className="p-3">Saississez le nom de votre groupe</h2>
                    <h3 className="p-3 text-dark">parce que les bons comptes, font les bons amis</h3>
                    <Form className="m-0 m-auto">
                        <FormGroup>
                            <Input className="form-control form-control-lg col-md-6 m-0 m-auto text-center" type="text" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="nom-du-groupe" />
                        </FormGroup>
                        <FormGroup className="text-center">
                            <Button onClick={e => this.handleCreate(e)} className="m-2 px-4 btn-lg btn-info">Créer</Button>
                            <Button onClick={e => this.handleOpen(e)} className="m-2 px-4 btn-lg btn-success" >Ouvrir</Button>
                        </FormGroup>
                    </Form>
                </Container>
            );
        }
    }

export default GroupId;
