import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableSeats.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
const cx = classNames.bind(styles);

function TableSeats(props) {
    const [Showtime, setShowtime] = useState('');
    const [Seats, setSeats] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .post(
                        'http://localhost:8080/showtime/' + props.data.IDShowtime,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setShowtime(response.data.result);
                        console.log(response.data.result);
                    });
                await axios
                    .post(
                        'http://localhost:8080/halls/showtime/' + props.data.HallID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setSeats(response.data.result);
                    });

                // await axios.post('http://localhost:8080/showtime/' + props.data.IDShowtime).then((response) => {
                //     setShowtime(response.data.result);
                //     console.log(response.data.result);
                // });
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
    if (Seats && Showtime) {
        return (
            <div className={cx('ListSeats')}>
                <h1>Tên Phim : {Showtime[0].MovieName}</h1>
                <h3>
                    Lịch chiếu : {ConverTime(Showtime[0].ShowtimeDateTime)[0]}:
                    {ConverTime(Showtime[0].ShowtimeDateTime)[1]} {ConverTime(Showtime[0].ShowtimeDateTime)[2]}
                </h3>
                <h3>Loại phòng : {Showtime[0].Class}</h3>
                <h3>Số lượng ghế : {Showtime[0].NumSeats}</h3>
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
        );
    }
}

export default TableSeats;
