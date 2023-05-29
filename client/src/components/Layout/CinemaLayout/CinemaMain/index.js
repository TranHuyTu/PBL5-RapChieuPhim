import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './CinemaMain.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ImageCinema from '../ImageCinema';
import BoxBuyTicket from '~/components/Layout/DefaultLayout/BoxBuyTicket';
import ContentSEO from '~/components/Layout/DefaultLayout/ContentSEO';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function CinemaMain({ chilren }) {
    const [search, setSearch] = useState([]);
    useEffect(() => {
        try {
            axios.post('http://localhost:8080/TrangChu/Search').then((response) => {
                setSearch(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Container fluid="xxl">
                <Row>
                    <Col xs={8}>
                        <ImageCinema />
                    </Col>
                    <Col>
                        <BoxBuyTicket TimKiem={search} />
                    </Col>
                </Row>
                <Row className={cx('derc')}>
                    <Col xs={6}>
                        <ContentSEO />
                    </Col>
                    <Col>
                        <h1>Giá Vé</h1>
                        <Table className={cx('table')} striped bordered hover>
                            <thead>
                                <tr>
                                    <th className={cx('th')}>
                                        <img
                                            className={cx('logo')}
                                            src="https://res.cloudinary.com/dbaul3mwo/image/upload/v1685384959/learn_nodejs/Gold_Luxury_Initial_Circle_Logo_hzdioa.png"
                                        />
                                    </th>
                                    <th className={cx('th')}>SUẤT CHIẾU</th>
                                    <th className={cx('th')}>NGƯỜI LỚN</th>
                                    <th className={cx('th')}>TRẺ EM</th>
                                    <th className={cx('th')}>GHẾ ĐÔI</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td>THỨ 2,3,4,5,6</td>
                                    <td>50000</td>
                                    <td>20000</td>
                                    <td>80000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>THỨ 7,Chủ Nhật</td>
                                    <td>70000</td>
                                    <td>50000</td>
                                    <td>100000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>NGÀY LỄ</td>
                                    <td>60000</td>
                                    <td>30000</td>
                                    <td>120000</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>NGÀY TRI ÂN</td>
                                    <td>50000</td>
                                    <td>50000</td>
                                    <td>50000</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default CinemaMain;
