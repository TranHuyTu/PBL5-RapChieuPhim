import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './HoaDon.module.scss';

import Btn from '~/components/Layout/Btn';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

// import Btn from '../../../../components/Layout/Btn';

import { useState, useLayoutEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function HoaDon({ chilren }) {
    const [SLTicket, setSLTicket] = useState([]);
    const [SLFood, setSLFood] = useState([]);
    const [Tickets, setTickets] = useState([]);
    const [Foods, setFoods] = useState([]);
    const [User, setUser] = useState([]);
    const [TypeThanhToan, setTypeThanhToan] = useState('');
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/login/check_token',
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setUser(response.data.data.data);
                        localStorage.setItem('IDKH', response.data.data.data.ID);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        setSLTicket(JSON.parse(localStorage.getItem('SLTicket')));
        setSLFood(JSON.parse(localStorage.getItem('SLFood')));
        setTickets(JSON.parse(localStorage.getItem('Tickets')));
        setFoods(JSON.parse(localStorage.getItem('Foods')));
    }, []);
    const STT = 0;
    const Tong = () => {
        let tong = 0;
        SLFood.map((value, index) => {
            if (value != 0) {
                tong += value * Foods[index].Price;
            }
        });
        SLTicket.map((value, index) => {
            if (value != 0) {
                tong += value * Tickets[index].Price;
            }
        });
        localStorage.setItem('monney', JSON.stringify(User.Money - tong));
        return tong;
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('title')}>
                    <div className={cx('derc')}>
                        <h1>Chi Tiết Hóa Đơn</h1>
                        <p className={cx('code-bill')}>Hóa Đơn Số : #{Math.floor(Math.random() * 1000000)}-2023</p>
                    </div>
                    <div className={cx('logo')}>
                        <img className={cx('img-logo')} src={process.env.PUBLIC_URL + '/images/Logo.png'} alt=""></img>
                    </div>
                </div>
                <div className={cx('table-container')}>
                    <Table className={cx('table-main')}>
                        <thead>
                            <tr>
                                <th>Tên sản phầm</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                                <th>Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SLTicket.map((value, index) => {
                                if (value != 0) {
                                    return (
                                        <tr key={index}>
                                            <td>{Tickets[index].TicketType}</td>
                                            <td>{value}</td>
                                            <td>{Tickets[index].Price}</td>
                                            <td>{value * Tickets[index].Price}</td>
                                        </tr>
                                    );
                                }
                            })}
                            {SLFood.map((value, index) => {
                                if (value != 0) {
                                    return (
                                        <tr key={index}>
                                            <td>{Foods[index].ItemName}</td>
                                            <td>{value}</td>
                                            <td>{Foods[index].Price}</td>
                                            <td>{value * Foods[index].Price}</td>
                                        </tr>
                                    );
                                }
                            })}
                            <tr>
                                <td>
                                    <h3>TỔNG</h3>
                                </td>
                                <td></td>
                                <td></td>
                                <td>{Tong()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <Container className={cx('User-Detail')}>
                    <div className={cx('img-Avatar')}>
                        <img src={User.Avatar} alt={User.Avatar} className={cx('Avatar')} />
                    </div>
                    <Row xl={10} className={cx('row-detail')}>
                        <Form.Select
                            size="lg"
                            className={cx('select-detail')}
                            onChange={(e) => {
                                setTypeThanhToan(e.target.value);
                                localStorage.setItem('TypeThanhToan', JSON.stringify(e.target.value));
                            }}
                        >
                            <option>HÌNH THỨC THANH TOÁN</option>
                            <option value="momo">MOMO</option>
                            <option value="zalopay">ZALO PAY</option>
                            <option value="bangking">TÀI KHOẢN NGÂN HÀNG</option>
                            <option value="paypal">PAYPAL</option>
                            <option value="account">TÀI KHOẢN RẠP</option>
                        </Form.Select>
                    </Row>
                    <Row xl={10} className={cx('row-detail')}>
                        <Col>Họ Tên :</Col>
                        <Col>
                            <p>{User.Name}</p>
                        </Col>
                    </Row>
                    <Row xl={10} className={cx('row-detail')}>
                        <Col>Email : </Col>
                        <Col>
                            <p>{User.Email}</p>
                        </Col>
                    </Row>
                    <Row xl={10} className={cx('row-detail')}>
                        <Col>Tài Khoản</Col>
                        <Col>
                            <p>{User.Money}</p>
                        </Col>
                    </Row>
                    <Row xl={10} className={cx('row-detail')}>
                        <Form.Select size="lg" className={cx('select-detail')}>
                            <option>CHỌN KHUYẾN MÃI</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </Form.Select>
                    </Row>
                    <Btn TypeDetail={3} TypeThanhToan={TypeThanhToan} Money={Tong()} />
                </Container>
            </div>
        </div>
    );
}

export default HoaDon;
