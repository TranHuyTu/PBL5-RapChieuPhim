import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableTicket.module.scss';
import Container from 'react-bootstrap/Container';
import EditTicketComponent from '../EditTicket';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableTicketDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Ticket, setTicket] = useState([]);
    const [EditTicket, setEditTicket] = useState([]);
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axios
                .post(
                    API,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setData(response.data.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('http://localhost:8080/price/all');
        setLabel(['ID', 'Loại vé', 'Ngày trong tuần', 'Giá vé']);
        setKey(['PriceID', 'TicketType', 'DayOfWeek', 'Price']);
    }, []);
    const HandlerShow = async function (value) {
        localStorage.setItem('Ticket', JSON.stringify(value));
        setTicket(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Ticket', JSON.stringify(value));
        localStorage.setItem('EditTicket', '0');
        setTicket(value);
        setEditTicket('0');
    };
    if (localStorage.getItem('Ticket') && localStorage.getItem('EditTicket')) {
        return (
            <div className={cx('')}>
                <EditTicketComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Ticket');
                        localStorage.removeItem('EditTicket');
                        setTicket([]);
                        setEditTicket('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Ticket')) {
        let Ticket = JSON.parse(localStorage.getItem('Ticket'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>Loại Vé : {Ticket.TicketType}</h1>
                <h3>Giá vé : {Ticket.Price}</h3>
                <h3>Ngày trong tuần : {Ticket.DayOfWeek}</h3>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Ticket');
                        setTicket([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else {
        if (data && Label && Key) {
            return (
                <div className={cx('wrapper')}>
                    <Container className={cx('container')}>
                        <Table striped bordered hover>
                            <thead className={cx('thead')}>
                                <tr>
                                    {Label.map((value, index) => (
                                        <th key={index}>{value}</th>
                                    ))}

                                    <th>
                                        <p className={cx('btn')}>Xem</p>
                                    </th>
                                    <th>
                                        <p className={cx('btn')}>Sửa</p>
                                    </th>
                                    <th>
                                        <p className={cx('btn')}>Xóa</p>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value[Key[0]]}</td>
                                        <td>{value[Key[1]]}</td>
                                        <td>{value[Key[2]]}</td>
                                        <td>{value[Key[3]]} Đ</td>
                                        <td>
                                            <a className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                                Xem
                                            </a>
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'edit')} onClick={() => HandlerEdit(value)}>
                                                Sửa
                                            </a>
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'delete')}>Xóa</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <a className={cx('AddNew')}></a>
                    </Container>
                </div>
            );
        }
    }
}
function TableTicket(props) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableTicketDetail />
                <a className={cx('AddNew')}></a>
            </Container>
        </div>
    );
}

export default TableTicket;
