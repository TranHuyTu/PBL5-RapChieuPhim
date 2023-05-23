import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './LichChieu.module.scss';
import moment from 'moment';
import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function LichChieu({ chilren }) {
    const [selectedOption, setSelectedOption] = useState('option1');

    function handleChange(event) {
        setSelectedOption(event.target.value);
    }
    const [selectedOption1, setSelectedOption1] = useState('option1');

    function handleChange1(event) {
        setSelectedOption1(event.target.value);
    }
    const [selectedDate, setSelectedDate] = useState('');

    function handleDateChange(event) {
        setSelectedDate(event.target.value);
    }
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
            <div className={cx('wrapper')}>
                <h3 className={cx('content')}>Lịch Chiếu</h3>
                <div className={cx('wrapper-select')}>
                    <select className={cx('select-option', 'input')} value={selectedOption} onChange={handleChange}>
                        <option value="option1">Cả Nước</option>
                        {Cinema.map((value, index) => (
                            <option value={'option' + (index + 2)} key={index}>
                                {value}
                            </option>
                        ))}
                    </select>
                    <input
                        className={cx('input-date', 'input')}
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <select className={cx('select-option', 'input')} value={selectedOption1} onChange={handleChange1}>
                        <option value="option1">Tất cả rạp</option>
                        {Cinema.map((value, index) => (
                            <option value={'option' + (index + 2)} key={index}>
                                {value}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <h3 className={cx('content')}>Lịch Chiếu</h3>
                <div className={cx('wrapper-select')}>
                    <select className={cx('select-option', 'input')} value={selectedOption} onChange={handleChange}>
                        <option value="option1">Cả Nước</option>
                    </select>
                    <input
                        className={cx('input-date', 'input')}
                        type="date"
                        value={selectedDate}
                        onChange={handleDateChange}
                    />
                    <select className={cx('select-option', 'input')} value={selectedOption1} onChange={handleChange1}>
                        <option value="option1">Tất cả rạp</option>
                    </select>
                </div>
            </div>
        );
    }
}

export default LichChieu;
