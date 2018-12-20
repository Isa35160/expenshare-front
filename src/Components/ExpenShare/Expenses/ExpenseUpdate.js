import React, {Component} from 'react';


class ExpenseUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[], category: this.props.category,
            persons: [],
            title:this.props.title,
            amount:this.props.amount,
            person:this.props.person};
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
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/person/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({persons: data}))
        ;
    }

    handleUpdate(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/react-symfony/expenshare-back/public/expense/' + this.props.id, {
            method: 'POST',
            body: JSON.stringify(
                {
                    title: this.state.title, amount: this.state.amount, category: this.state.category, person:this.state.person })
        })
            .then(response => response.json())
            .then(data => {
                alert('Nouvelle dépense à jour succès !');
            })
            .catch(err => alert('Erreur lors de la création de la dépense'))
        ;
    }
    render() {
        const categories = this.state.categories.map(category => <option key={category.id} value={category.id}>{category.label}</option>);
        const persons = this.state.persons.map(person => <option key={person.id} value={person.id}>{person.firstname} {person.lastname}</option>);
        return (
            <div className="container text-center mt-5 pt-4">

                        <h3 className="p-3 text-dark">Modifier une dépense {this.state.slug}</h3>
                        <form className="m-0 m-auto">
                            <div className="form-group">
                                <div className="my-2">
                                    <input className="form-control form-control-lg col-md-6 m-0 m-auto text-center"
                                           type="text" onChange={e => this.handleChangeT(e)}  defaultValue={this.props.title} />
                                </div>
                                <div className="my-2">
                                    <input className="form-control form-control-lg col-md-6 m-0 m-auto text-center"
                                           type="text"  onChange={e => this.handleChangeA(e)} defaultValue={this.props.amount} />
                                </div>
                                <div className="my-2">
                                    <input className="form-control form-control-lg col-md-6 m-0 m-auto text-center"
                                           type="select"  defaultValue={this.props.category} name="category" onChange={e => this.setState({ category: e.target.value })}>
                                        <option value="0">Veuillez selectionner une catégorie</option>
                                        {categories}
                                    </input>
                                </div >
                                <div className="my-2">
                                    <input className="form-control form-control-lg col-md-6 m-0 m-auto text-center"
                                           type="select"  defaultValue={this.props.person} name="person" onChange={e => this.setState({ person: e.target.value })}>
                                        <option value="0">Veuillez selectionner une personne</option>
                                        {persons}
                                    </input>
                                </div>

                            </div>
                            <div className="form-group">
                                <button onClick={e => this.handleUpdate(e)} className="m-2 px-4 btn-lg btn-info">Modifier</button>
                            </div>
                        </form>


            </div>
        );
    }
}

export default ExpenseUpdate;