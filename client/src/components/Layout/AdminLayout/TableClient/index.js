import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableClient.module.scss';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import TableHistory from '../TableHistory';
import EditProfileClient from '../EditProfileClient';

import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import axiosClient from '~/api/axiosClient';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function TableClientDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Client, setClient] = useState([]);
    const [EditClient, setEditClient] = useState([]);
    const [ListTicket, setListTicket] = useState([]);
    const [ListFood, setListFood] = useState([]);
    const [IDUser, setIDUser] = useState('');
    const navigate = useNavigate();
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        const token = localStorage.getItem('token-login');
        const _token = token.substring(1, token.length - 1);
        try {
            await axiosClient
                .post(
                    API,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    setData(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('/account');
        setLabel(['ID', 'Tài khoản', 'Tên đẩy đủ', 'Email', 'Tài khoản shop', 'SDT']);
        setKey(['ID', 'Username', 'Name', 'Email', 'Money', 'SDT']);
    }, []);
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
    const HandlerShow = async function (value) {
        localStorage.setItem('Client', JSON.stringify(value));
        setClient(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Client', JSON.stringify(value));
        localStorage.setItem('EditClient', '0');
        setClient(value);
        setEditClient('0');
    };
    const HandlerRemove = async function (values) {
        console.log('Remove', values);
        try {
            if (values.Avatar != '') {
                let Url = values.Avatar.split('learn_nodejs/')[1];
                const UrlDelete = { imageUrl: 'learn_nodejs/' + Url.split('.')[0] };
                await axiosClient
                    .post('/pathImg', UrlDelete, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            const ID = values.ID;
            await axiosClient
                .delete('/actors/remove/' + ID, {
                    headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                })
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.error(error);
        }
        navigate('/');
    };
    const ConverTime = function (DATETIME) {
        let datetime = [];
        if (DATETIME) {
            let DT = DATETIME.split('T');
            let time = DT[1].split(':');
            datetime.push(time[0], time[1], moment(DATETIME).format('DD-MM-YYYY'));
        } else {
            datetime = ['01', '90', '20-11-2023'];
        }
        return datetime;
    };
    if (localStorage.getItem('Client') && localStorage.getItem('EditClient')) {
        return (
            <div className={cx('')}>
                <EditProfileClient />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Client');
                        localStorage.removeItem('EditClient');
                        setClient([]);
                        setEditClient('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Client')) {
        return (
            <div className={cx('wrapper_detail')}>
                <div className={cx('main')}>
                    <Form className={cx('form_profile')}>
                        <Form.Group>
                            <img className={cx('Avatar')} src={Client.Avatar} />
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>User Name :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.Username}</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>Name :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.Name}</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>Email address :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.Email}</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row', 'password')}>
                            <Form.Label className={cx('label-title')}>Password :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.Password}</Form.Label>
                        </Form.Group>

                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>Money :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.Money} Đ</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>SDT :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.SDT}</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>SEX :</Form.Label>
                            <Form.Label className={cx('label-title', 'value')}>{Client.SEX}</Form.Label>
                        </Form.Group>
                        <Form.Group className={cx('row')}>
                            <Form.Label className={cx('label-title')}>Date Of Birth :</Form.Label>
                            <Form.Label className={cx('label-title')}>{ConverTime(Client.DateOfBirth)[2]}</Form.Label>
                        </Form.Group>
                    </Form>
                    <TableHistory IDUser={JSON.parse(localStorage.getItem('Client')).ID} />
                </div>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('IDUser');
                        localStorage.removeItem('Client');
                        setClient([]);
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
                                        {Key.map((key, index) => (
                                            <td key={index}>{value[key]}</td>
                                        ))}
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
                                            <a className={cx('btn', 'delete')} onClick={() => HandlerRemove(value)}>
                                                Xóa
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            );
        }
    }
}
function TableClient(props) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableClientDetail />
            </Container>
        </div>
    );
}

export default TableClient;
