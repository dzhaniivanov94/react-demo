import { Component } from 'react';
import CategoryNavigation from './CategoryNavigation/CategoryNavigation';
import Pet from '../Pet/Pet'
import * as petService from '../../services/petService';





class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pets: [],
            currentCategory: 'all'
        }

    }

    componentDidMount() {
        petService.getAll()
            .then(res => this.setState({ pets: res }))



    }

    componentDidUpdate(prevProps) {
        const category = this.props.match.params.category
        if (prevProps.match.params.category == category) {
            return;
        }
        petService.getAll(category)
            .then(res => {
                this.setState({ pets: res, currentCategory: category })
            })

    }
    onPetButtonClickHandler(petId, likes) {
        petService.pet(petId, likes + 1)
            .then(() => {
                this.setState(state => ({ pets: state.pets.map(x => x.id == petId ? { ...x, likes: x.likes + 1 } : x) }))

            })

    }


    render() {
        return (
            <div className="dashboard" >
                <h1>Dashboard</h1>

                <CategoryNavigation />

                <ul className="other-pets-list">
                    {this.state.pets.map(x =>
                        <Pet
                            key={x.id}
                            {...x}
                            onPetButtonClickHandler={this.onPetButtonClickHandler.bind(this, x.id, x.likes)}
                        />
                    )}


                </ul>
            </div>
        )
    }
}


export default Categories