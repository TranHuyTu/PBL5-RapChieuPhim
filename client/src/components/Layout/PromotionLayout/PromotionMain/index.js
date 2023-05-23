import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './PromotionMain.module.scss';

import { useState, useEffect } from 'react';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function PromotionMain(props) {
    const [Promotion, setPromotion] = useState();
    useEffect(() => {
        setPromotion(JSON.parse(localStorage.getItem('promotion')));
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    if (Promotion) {
        return (
            <div className={cx('wrapper')}>
                <Container fluid="xxl">
                    <h1>{Promotion.Title}</h1>
                    <div>
                        <h3>
                            {ConverTime(Promotion.Start_time)[0]} : {ConverTime(Promotion.Start_time)[1]} *
                            {ConverTime(Promotion.Start_time)[2]} Đến {ConverTime(Promotion.End_time)[0]} :
                            {ConverTime(Promotion.End_time)[1]} *{ConverTime(Promotion.End_time)[2]}
                        </h3>
                    </div>
                    <img className={cx('img-movie')} src={Promotion.AvatarLink} alt={Promotion.AvatarLink} />
                    <p>{Promotion.Content}</p>
                </Container>
            </div>
        );
    }
}
export default PromotionMain;
