'use strict';

import React, { PureComponent } from 'react';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import ProblemComponent from 'components/problems';

/* Services */
import supportService from 'services/supportService';

/* Utils */
import Cache from 'utils/cache';

class Problem extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            problems: {
                total: 0,
                items: []
            },
        };

        this.mounted = false;
    }

    componentDidMount() {
        this.mounted = true;
        this.getProblems(this.state.userId);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    getProblems(userId) {
        supportService.getProblems(userId, (err, res) => {
            if(err == null) {
                this.setState({ problems: res });
            }else {
                alert('Error');
            }
		})
    }

    handleBack = () => {
        Actions.pop();
    }

    handleAddProblem = () => {
        Actions.AddProblem({
            update: () => {
                this.getProblems(this.state.userId);
            }
        });
    }

    detailProblem = problem => {
        Actions.DetailProblem({
            problemId: problem.id
        });
    }

    render() {
        const { loading, problems } = this.state;
        return(
            <ProblemComponent 
                handleBack={this.handleBack}
                handleAddProblem={this.handleAddProblem}
                detailProblem={this.detailProblem}
                problems={problems}
                loading={loading}
            />
        )
    }
}

export default Problem;