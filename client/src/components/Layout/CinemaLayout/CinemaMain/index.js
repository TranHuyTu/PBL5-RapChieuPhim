import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './CinemaMain.module.scss';
import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';
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
    const [Price, setPrice] = useState([]);
    useEffect(() => {
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            axios.post('/TrangChu/Search').then((response) => {
                setSearch(response.result);
            });
            axios
                .post(
                    '/price/all',
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setPrice(response.result);
                });
        } catch (error) {
            console.error(error);
        }
    }, []);
    if (search && Price) {
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
                                                src="https://res.cloudinary.com/dbaul3mwo/image/upload/v1686202031/CinemaReal_vb9wsi.png"
                                            />
                                        </th>
                                        <th className={cx('th')}>Thứ 2</th>
                                        <th className={cx('th')}>Thứ 3</th>
                                        <th className={cx('th')}>Thứ 4</th>
                                        <th className={cx('th')}>Thứ 5</th>
                                        <th className={cx('th')}>Thứ 6</th>
                                        <th className={cx('th')}>Thứ 7</th>
                                        <th className={cx('th')}>Chủ Nhật</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Trẻ em</td>
                                        {Price.map((value, index) => {
                                            if (value.TicketType == 'Vé trẻ em') {
                                                return <td>{value.Price}</td>;
                                            }
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Trẻ người lớn</td>
                                        {Price.map((value, index) => {
                                            if (value.TicketType == 'Vé người lớn') {
                                                return <td>{value.Price}</td>;
                                            }
                                        })}
                                    </tr>
                                    <tr>
                                        <td>Vé đôi</td>
                                        {Price.map((value, index) => {
                                            if (value.TicketType == 'GHE DOI HAPPY DAY') {
                                                return <td>{value.Price}</td>;
                                            }
                                        })}
                                    </tr>
                                    <tr>
                                        <td>NGÀY TRI ÂN</td>
                                        <td>20%</td>
                                        <td>20%</td>
                                        <td>20%</td>
                                        <td>20%</td>
                                        <td>20%</td>
                                        <td>30%</td>
                                        <td>30%</td>
                                    </tr>
                                    <tr>
                                        <td>NGÀY TRI ÂN</td>
                                        <td>30%</td>
                                        <td>30%</td>
                                        <td>30%</td>
                                        <td>30%</td>
                                        <td>30%</td>
                                        <td>50%</td>
                                        <td>50%</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default CinemaMain;
