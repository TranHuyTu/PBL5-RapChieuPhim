import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableShowTime.module.scss';
import Container from 'react-bootstrap/Container';
import EditShowtimeComponent from '../EditShowtime';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import { Navigate, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function TableShowTimeDetail() {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Showtime, setShowtime] = useState([]);
    const [EditShowtime, setEditShowtime] = useState('');
    const [Seats, setSeats] = useState([]);
    const navigate = useNavigate();
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('http://localhost:8080/TrangChu/Search');
        setLabel(['ID', 'Tên Phim', 'Phòng', 'Loại Phòng', 'Thời Gian']);
        setKey(['ShowtimeID', 'MovieName', 'HallNumber', 'Class', 'ShowtimeDateTime']);
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
    const HandlerShow = async function (value) {
        localStorage.setItem('showtime', JSON.stringify(value));
        setShowtime(value);
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .post(
                        'http://localhost:8080/halls/showtime/' + JSON.parse(localStorage.getItem('showtime')).HallID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setSeats(response.data.result);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('showtime', JSON.stringify(value));
        localStorage.setItem('EditShowtime', '0');
        setShowtime(value);
        setEditShowtime('0');
    };
    if (localStorage.getItem('showtime') && localStorage.getItem('EditShowtime')) {
        return (
            <div className={cx('')}>
                <EditShowtimeComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('showtime');
                        localStorage.removeItem('EditShowtime');
                        setShowtime([]);
                        setEditShowtime('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('showtime')) {
        let showtime = JSON.parse(localStorage.getItem('showtime'));
        return (
            <div className={cx('wrapper_detail')}>
                <h2>Tên phim : {showtime.MovieName}</h2>
                <h3>Phòng Chiếu : {showtime.HallNumber}</h3>
                <h3>Loại Phòng : {showtime.Class}</h3>
                <h3>
                    Thời gian : {ConverTime(showtime.ShowtimeDateTime)[0]}:{ConverTime(showtime.ShowtimeDateTime)[1]} --{' '}
                    {ConverTime(showtime.ShowtimeDateTime)[2]}
                </h3>
                <h3>Số lượng ghế : {showtime.NumSeats}</h3>
                <h3>Tên Rạp : {showtime.CinemaName}</h3>
                <h3>Số lượng ghế : {showtime.Address}</h3>
                <div className={cx('ListSeats')}>
                    {Seats.map((value, index) => {
                        if (value.CheckSeat) {
                            return (
                                <a className={cx('seats', 'Check')} key={index}>
                                    {value.ID}
                                </a>
                            );
                        } else {
                            return (
                                <a className={cx('seats')} key={index}>
                                    {value.ID}
                                </a>
                            );
                        }
                    })}
                </div>
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('showtime');
                        setShowtime([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else {
        if (data && Label && Key) {
            return (
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
                                    {ConverTime(value[Key[4]])[0]} : {ConverTime(value[Key[4]])[1]} --{' '}
                                    {ConverTime(value[Key[4]])[2]}
                                </td>
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
            );
        }
    }
}
function TableShowTime(props) {
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableShowTimeDetail />
                <a className={cx('AddNew')}></a>
            </Container>
        </div>
    );
}

export default TableShowTime;
