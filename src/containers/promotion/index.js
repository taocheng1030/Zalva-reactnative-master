'use strict';

import React, { PureComponent } from 'react';

/* Libraries */
import { Actions } from 'react-native-router-flux';

/* Components  */
import PromotionComponent from 'components/promotion';

/* Services */
import promotionService from 'services/promotionService';

/* Utils */
import Cache from 'utils/cache';

import UtilService from 'utils/util';

class Promotion extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            userId: Cache.currentUser.user.id,
            code: ''
        };

        this.mounted = false;
    }

    async componentDidMount() {
        this.mounted = true;
        const { userId } = this.state;
        let promotion = await promotionService.getPromotionsByUser(userId);
        console.log('Get promotion ', promotion);
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    handleBack = () => {
        Actions.pop();
    }

    changePromotionCode = code => {
        this.setState({ code });
    }

    handleApplyPromotion = () => {
        const { code, userId } = this.state;
        let pickup = UtilService.getCurrentDate();

        if(code == '') {
            alert('Por favor ingrese el código promocional');
            return;
        }

        var data = {
            code,
            userId,
            pickup
        }
        console.log('ready to send ===> ', data);
    }

    render() {
        const { code, loading } = this.state;
        return(
            <PromotionComponent
                handleBack={this.handleBack}
                loading={loading} 
                changePromotionCode={this.changePromotionCode}
                handleApplyPromotion={this.handleApplyPromotion}
                code={code}
            />
        )
    }
}

export default Promotion;