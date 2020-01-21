'use strict';

import React, { PureComponent } from 'react';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import AddProblemComponent from 'components/problems/addProblem';

/* Services */
import supportService from 'services/supportService';

/* Utils */
import Cache from 'utils/cache';

class AddProblem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            title: '',
            description: ''
        };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleBack = () => {
        Actions.pop();
    }

    handleChange = (key, e) => {
        this.setState({
            [key]: e
        });
    }

    handleSubmit = () => {
        const { userId, title, description } = this.state;

        if(title == '') {
            Alert.alert('Titulo', 'Ingrese un titulo');
            return
        }else if(description == '') {
            Alert.alert('Descripción', 'Ingrese una descripcion');
            return
        }

        var data = {
            userId: userId,
            title: title,
            description: description,
            status: 0
        }
        
        this.setState({ loading: true });

        supportService.createRequestProblem(data, (err, res) => {
			if (err == null) {
                setTimeout(() => {
                    if (this.props.update)
                        this.props.update()
                    Actions.pop();
                }, 200);
			} else {
				Alert.alert('Error', 'Hemos tenido un problema');
            }
            this.setState({ loading: false });
        });
    }

    render() {
        const { loading, title, description } = this.state;
        return(
            <AddProblemComponent 
                handleBack={this.handleBack}
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                title={title}
                loading={loading}
                description={description}
            />
        )
    }
}

export default AddProblem;