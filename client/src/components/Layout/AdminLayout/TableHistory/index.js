import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableHistory.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import axiosClient from '~/api/axiosClient';

import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function TableHistory(props) {
    const [ListTicket, setListTicket] = useState('');
    const [ListFood, setListFood] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                axiosClient
                    .post(
                        '/history/ticket/' + props.IDUser,
                        { x: 1 },
                        {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                authorization: _token,
                            },
                        },
                    )
                    .then((response) => {
                        setListTicket(response.result);
                    });
                axiosClient
                    .post(
                        '/history/food/' + props.IDUser,
                        { x: 1 },
                        {
                            headers: {
                                'content-type': 'application/x-www-form-urlencoded',
                                authorization: _token,
                            },
                        },
                    )
                    .then((response) => {
                        setListFood(response.result);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time = DT[1].split(':');
            datetime.push(time[0], time[1], moment(DATETIME).format('DD-MM-YYYY'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    }
    // const SEX = (value) => {
    //     if (value == 1) {
    //         return 'Nam';
    //     } else if (value == 2) {
    //         return 'Nữ';
    //     } else return 'Khác';
    // };
    const LoadList = function (ListTicket, ListFood) {
        let listID = [];
        let ListBill = [];
        ListTicket.map((value) => {
            if (!listID.includes(value.ID)) {
                listID.push(value.ID);
            }
            return 0;
        });
        listID.map((value, index) => {
            let BillDetail = {
                IDBill: { value },
                Tickets: [],
                Foods: [],
            };
            ListTicket.map((val, ind) => {
                if (val.ID === value) {
                    BillDetail.Tickets.push(val);
                }
                return 0;
            });
            ListFood.map((val, ind) => {
                if (val.ID === value) {
                    BillDetail.Foods.push(val);
                }
                return 0;
            });
            ListBill.push(BillDetail);
            return 0;
        });
        return ListBill;
    };
    if (ListTicket && ListFood) {
        return (
            <Container fluid="xxl" className={cx('wrapper')}>
                <h1 className={cx('title')}>Lịch Sử Mua Hàng</h1>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>IDBILL</th>
                            <th>BILLTIME</th>
                            <th>SLTicket</th>
                            <th>SLFood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {LoadList(ListTicket, ListFood).map((value, index) => (
                            <tr key={index} className={cx('table-row')}>
                                <td
                                    onClick={() => {
                                        document.querySelector('#bill-detail' + index).style.display = 'block';
                                    }}
                                >
                                    {value.IDBill.value}
                                </td>
                                <td
                                    onClick={() => {
                                        document.querySelector('#bill-detail' + index).style.display = 'block';
                                    }}
                                >
                                    {ConverTime(value.Tickets[0].BillTime)[0]}:
                                    {ConverTime(value.Tickets[0].BillTime)[1]}{' '}
                                    {ConverTime(value.Tickets[0].BillTime)[2]}
                                </td>
                                <td
                                    onClick={() => {
                                        document.querySelector('#bill-detail' + index).style.display = 'block';
                                    }}
                                >
                                    {value.Tickets.length}
                                </td>
                                <td
                                    onClick={() => {
                                        document.querySelector('#bill-detail' + index).style.display = 'block';
                                    }}
                                >
                                    {value.Foods.length}
                                </td>
                                <div id={'bill-detail' + index} className={cx('bill-detail')}>
                                    <h2 className={cx('bill_title')}>IDBILL: {value.IDBill.value}</h2>
                                    <p className={cx('bill_date')}>
                                        {'---   '}
                                        {ConverTime(value.Tickets[0].BillTime)[0]}:
                                        {ConverTime(value.Tickets[0].BillTime)[1]}
                                        {'   '}
                                        {ConverTime(value.Tickets[0].BillTime)[2]}
                                        {'   ---'}
                                    </p>
                                    {value.Tickets.map((value, index) => (
                                        <div className={cx('ticket_detail')} key={index}>
                                            <div className={cx('ticket_value')}>
                                                <p>{value.SeatNumber}</p>
                                            </div>
                                            <div className={cx('ticket_value')}>
                                                <p>{value.TicketType}</p>
                                            </div>
                                            <div className={cx('ticket_value')}>
                                                <p>{value.DayOfWeek}</p>
                                            </div>
                                            <div className={cx('ticket_value')}>
                                                <p>{value.Price} Đ</p>
                                            </div>
                                        </div>
                                    ))}
                                    {value.Foods.map((value, index) => (
                                        <div className={cx('food_detail')} key={index}>
                                            <div className={cx('food_value')}>
                                                <p>{value.ItemName}</p>
                                            </div>
                                            <div className={cx('food_value')}>
                                                <p>{value.Price}</p>
                                            </div>
                                            <div className={cx('food_value')}>
                                                <p>{value.sl}</p>
                                            </div>
                                            <img
                                                className={cx('food_img')}
                                                src={value.AvatarLink}
                                                alt={value.AvatarLink}
                                            />
                                        </div>
                                    ))}
                                    <a
                                        className={cx('cancel')}
                                        onClick={() => {
                                            document.querySelector('#bill-detail' + index).style.display = 'none';
                                        }}
                                    ></a>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }
}

export default TableHistory;
