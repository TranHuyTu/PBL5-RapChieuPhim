import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableCinema.module.scss';
import Container from 'react-bootstrap/Container';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EditCinemaComponent from '../EditCinema';
import AddCinemaComponent from '../AddCinema';
import TableSeats from '../TableSeats';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '~/api/axiosClient';
import Table from 'react-bootstrap/Table';
const cx = classNames.bind(styles);

function TableCinemaDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Cinema, setCinema] = useState([]);
    const [EditCinema, setEditCinema] = useState('');
    const [Halls, setHalls] = useState([]);
    const navigate = useNavigate();
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('/cinema');
        setLabel(['ID', 'Tên Rạp', 'Địa chỉ', 'SDT']);
        setKey(['ID', 'CinemaName', 'Address', 'Phone']);
    }, []);
    const HandlerShow = async function (value) {
        localStorage.setItem('Cinema', JSON.stringify(value));
        setCinema(value);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .post(
                        '/halls/cinema/' + JSON.parse(localStorage.getItem('Cinema')).ID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setHalls(response.result);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Cinema', JSON.stringify(value));
        localStorage.setItem('EditCinema', '0');
        setCinema(value);
        setEditCinema('0');
    };
    const HandlerRemove = async function (value) {
        console.log('Remove', value);

        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);
            let IDHall = 0;
            await axios
                .post(
                    '/halls/cinema/' + value.ID,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response.result[0].HallID);
                    IDHall = response.result[0].HallID;
                });
            console.log(IDHall);
            await axios
                .delete(
                    '/Seat/remove/' + IDHall,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response);
                });
            await axios
                .delete(
                    '/halls/remove/' + IDHall,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response);
                });
            await axios
                .delete(
                    '/cinema/remove/' + value.ID,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.error(error);
        }
        // navigate('/');
    };
    if (Cinema && EditCinema) {
        return (
            <div className={cx('')}>
                <EditCinemaComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Cinema');
                        localStorage.removeItem('EditCinema');
                        setCinema([]);
                        setEditCinema('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Cinema') && Halls) {
        let Cinema = JSON.parse(localStorage.getItem('Cinema'));
        return (
            <div className={cx('wrapper_detail')}>
                <h2>{Cinema.CinemaName}</h2>
                <h3>Địa chỉ : {Cinema.Address}</h3>
                <h3>SDT : {Cinema.Phone}</h3>
                <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3">
                    {Halls.map((value, index) => (
                        <Tab eventKey={index} title={'Phòng số ' + value.HallNumber} key={index}>
                            <TableSeats data={value} />
                        </Tab>
                    ))}
                </Tabs>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Cinema');
                        setCinema([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (JSON.parse(localStorage.getItem('AddCinema')) === 0) {
        return (
            <div>
                <AddCinemaComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('AddCinema');
                        setCinema([]);
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
                                        <td>{value[Key[3]]}</td>
                                        <td>
                                            <button className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                                Xem
                                            </button>
                                        </td>
                                        <td>
                                            <button className={cx('btn', 'edit')} onClick={() => HandlerEdit(value)}>
                                                Sửa
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className={cx('btn', 'delete')}
                                                onClick={() => HandlerRemove(value)}
                                            >
                                                Xóa
                                            </button>
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
function TableCinema(props) {
    const [BtnAddCinema, setBtnAddCinema] = useState('');
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableCinemaDetail />
                <button
                    className={cx('AddNew')}
                    onClick={(e) => {
                        localStorage.setItem('AddCinema', '0');
                        setBtnAddCinema(0);
                        navigate('/Admin');
                    }}
                ></button>
            </Container>
        </div>
    );
}

export default TableCinema;
