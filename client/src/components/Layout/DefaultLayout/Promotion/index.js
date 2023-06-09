import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Promotion.module.scss';
import { useState, useEffect } from 'react';
import axiosClient from '~/api/axiosClient';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

function Promotion(props) {
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosClient.post('/promotion').then((response) => {
                    setPromotions(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if (props.promotions) {
        return (
            <div className={cx('wrapper')}>
                <a className={cx('wrapper_title')}>TIN KHUYẾN MÃI</a>
                <Row className={cx('row')}>
                    {props.promotions.map((value, index) => {
                        if (index < 9) {
                            return (
                                <Col
                                    xs={10}
                                    sm={6}
                                    md={5}
                                    lg={4}
                                    xl={3}
                                    className={cx('col_img_promption')}
                                    key={index}
                                >
                                    <div className={cx('img_promption')}>
                                        <img src={value.AvatarLink} alt="" />
                                    </div>
                                    <div className={cx('img_hover')}>
                                        <div className={cx('info')}>
                                            <div className={cx('title')}>
                                                <a href="">
                                                    <h2>{value.Title}</h2>
                                                </a>
                                            </div>
                                            <div className={cx('title')}>
                                                <p>{value.Content}</p>
                                            </div>
                                            <a
                                                className={cx('btn_detail')}
                                                href="/PromotionDetail"
                                                onClick={() => {
                                                    localStorage.setItem('promotion', JSON.stringify(value));
                                                }}
                                            >
                                                CHI TIẾT
                                            </a>
                                        </div>
                                    </div>
                                </Col>
                            );
                        }
                    })}
                    ;
                </Row>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <a className={cx('wrapper_title')}>TIN KHUYẾN MÃI</a>
                <Row className={cx('row')}>
                    {promotions.map((value, index) => {
                        return (
                            <Col xs={10} sm={6} md={5} lg={4} xl={4} className={cx('col_img_promption')} key={index}>
                                <div className={cx('image-promption')}>
                                    <img src={value.AvatarLink} alt="" className={cx('image')} />
                                </div>
                                <div className={cx('img_hover_promotion')}>
                                    <div className={cx('info')}>
                                        <div className={cx('title')}>
                                            <a href="/PromotionDetail">
                                                <h2>{value.Title}</h2>
                                            </a>
                                        </div>
                                        <div className={cx('title')}>
                                            <p>{value.Content}</p>
                                        </div>
                                        <a
                                            className={cx('btn_detail', 'btn_promotion')}
                                            href="/PromotionDetail"
                                            onClick={() => {
                                                localStorage.setItem('promotion', JSON.stringify(value));
                                            }}
                                        >
                                            CHI TIẾT
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </div>
        );
    }
}
export default Promotion;
