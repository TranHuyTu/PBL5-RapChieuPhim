import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TheaterDetails.module.scss';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import axios from 'axios';

const cx = classNames.bind(styles);

function TheaterDetails({ chilren }) {
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const IDmovie = JSON.parse(localStorage.getItem('movie')).ID;
            try {
                await axios.post('http://localhost:8080/showtime/Movie/' + IDmovie).then((response) => {
                    setShowtime(response.data.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    let Cinema = [];
    showtime.map((value) => {
        if (!Cinema.includes(value.CinemaName)) {
            Cinema.push(value.CinemaName);
        }
    });
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    if (Cinema) {
        return (
            <div>
                {Cinema.map((value, index) => (
                    <div className={cx('wrapper')} key={index}>
                        <h3 className={cx('content')}>{value}</h3>
                        <div className={cx('item-movie')}>
                            {showtime.map((value1, index) => {
                                if (value == value1.CinemaName) {
                                    return (
                                        <a
                                            className={cx('time-theater')}
                                            onClick={async () => {
                                                if (localStorage.getItem('token-login')) {
                                                    const token = localStorage.getItem('token-login');
                                                    const _token = token.substring(1, token.length - 1);
                                                    try {
                                                        await axios
                                                            .postForm(
                                                                'http://localhost:8080/login/check_token',
                                                                { x: 1 },
                                                                {
                                                                    headers: {
                                                                        'content-type':
                                                                            'application/x-www-form-urlencoded',
                                                                        authorization: _token,
                                                                    },
                                                                },
                                                            )
                                                            .then((response) => {
                                                                if (response.data.data.data) {
                                                                    localStorage.setItem(
                                                                        'showtime',
                                                                        JSON.stringify(value1),
                                                                    );
                                                                    navigate('../DatDoAn');
                                                                } else {
                                                                    Swal.fire({
                                                                        title: 'Error!',
                                                                        text: 'Do you want to continue',
                                                                        icon: 'error',
                                                                        confirmButtonText: 'Cool',
                                                                    });
                                                                    navigate('../login');
                                                                }
                                                            });
                                                    } catch (error) {
                                                        console.error(error);
                                                    }
                                                } else {
                                                    Swal.fire({
                                                        title: 'Error!',
                                                        text: 'Vui lòng đăng nhập để thực hiện bước tiếp theo',
                                                        icon: 'error',
                                                        confirmButtonText: 'OK',
                                                    });
                                                    navigate('../login');
                                                }
                                            }}
                                            key={index}
                                        >
                                            {ConverTime(value1.ShowtimeDateTime)[0]} :
                                            {ConverTime(value1.ShowtimeDateTime)[1]}
                                        </a>
                                    );
                                }
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                <h3>Lỗi truy xuất dữ liệu</h3>
            </div>
        );
    }
}

export default TheaterDetails;
