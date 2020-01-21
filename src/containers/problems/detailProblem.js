'use strict';

import React, { PureComponent } from 'react';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import DetailProblemComponent from 'components/problems/detailProblem';

/* Services */
import supportService from 'services/supportService';

/* Utils */
import Cache from 'utils/cache';

class DetailProblem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            problemId: props.problemId,
            problem: {}
        };
        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this.getProblem(this.state.problemId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getProblem = id => {
        supportService.getDetailProblem(id, (err, res) => {
            console.log('get problem ', res);
			if (err == null) {
                this.setState({ problem: res });
			} else {
				alert('Hemos tenido un error');
			}
		});
    }

    handleBack = () => {
        Actions.pop();
    }

    render() {
        const { loading, problem } = this.state;
        return(
            <DetailProblemComponent 
                handleBack={this.handleBack}
                problem={problem}
                loading={loading}
            />
        )
    }
}

export default DetailProblem;