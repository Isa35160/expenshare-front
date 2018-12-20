import React, {Component} from 'react';
import {NavLink, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import ExpensForm from "./ExpensForm";
import Moment from 'react-moment';
import ExpenseUpdate from "./ExpenseUpdate";

class Expenses extends Component {

    constructor(props) {
        super(props);
        this.state = {expenses :[], persons: [], categories: []};
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/expense/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({expenses: data}))
        ;
    }

    handleNewExpense(expense) {
        let expenses = this.state.expenses;
        expenses.push(expense);
        this.setState({ expenses: expenses });
    }

    handleDelete(expense) {
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/expense/' + expense.id,{
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                let expenses = this.state.expenses;
                expenses = expenses.filter(exp => exp.id !== expense.id);
                this.setState({ expenses: expenses });
            });
    }



    render() {

        const expense = this.state.expenses.map(expense =>
            (
                <tr key={expense.id}>
                    <td> {expense.id} </td>
                    <td> {expense.title}</td>
                    <td> {expense.amount} €</td>
                    <td> {expense.person.firstname} {expense.person.lastname}</td>
                    <td> {expense.category.label} </td>
                    <td>  <Moment format="DD/MM/YYYY">{expense.createdAt}</Moment></td>
                    <td> <NavLink to={this.props.match.url + '/update'} className="btn btn-warning my-2 btn-sm">Modifier</NavLink>
                        <Route path={this.props.match.url + '/update'} render={props => <ExpenseUpdate {...props} slug={this.props.slug} title={expense.title}
                        amount={expense.amount} category={expense.category.id} person={expense.person.id} id={expense.id}/>}/></td>
                    <td> <button onClick={e => this.handleDelete(expense)} className="btn btn-danger my-2 btn-sm">Supprimer</button> </td>
                </tr>


            ));
        return (
            <div className="container">
                    <h2>Expenses</h2>
                    <NavLink className="btn btn-info my-2" to={this.props.match.url + '/add'}>+ Ajouter une dépense</NavLink>
                    <Route path={this.props.match.url + '/add'} render={props => <ExpensForm {...props} slug={this.props.slug}
                     newExpense={expense => this.handleNewExpense(expense)}/>}/>
                    <br/>
                    <br/>
                    <table className="table text-dark table-sm text-sm-center">
                        <tbody className="table-light">
                        <tr>
                            <th>ID</th>
                            <th>Titre de la dépense</th>
                            <th>Montant</th>
                            <th>Personne</th>
                            <th>Catégorie</th>
                            <th>Date</th>
                            <th>Modifier</th>
                            <th>Suprimer</th>
                        </tr>
                        {expense}
                        </tbody>
                    </table>


            </div>

        );
    }
}

export default Expenses;