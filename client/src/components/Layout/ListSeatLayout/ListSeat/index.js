import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ListSeat.module.scss';

import { useState, useLayoutEffect, useRef } from 'react';
import axios from 'axios';

import ChiTietHoaDon from '~/components/Layout/DatDoAnLayout/ChiTietHoaDon';

const cx = classNames.bind(styles);

function ListSeat(props) {
    const [ListSeat, setListSeat] = useState([]);
    const [SeatFocused, setSeatFocused] = useState([]);
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token-login');
                const _token = token.substring(1, token.length - 1);
                await axios
                    .postForm(
                        'http://localhost:8080/halls/showtime/' + JSON.parse(localStorage.getItem('showtime')).HallID,
                        { x: 1 },
                        {
                            headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                        },
                    )
                    .then((response) => {
                        setListSeat(response.data.result);
                    });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    function handleClick(event) {
        const sum = JSON.parse(localStorage.getItem('SLTicket')).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
        });

        if (SeatFocused.length <= sum) {
            const element = event.target;
            if (SeatFocused.includes(JSON.parse(element.innerHTML)) || SeatFocused.length == sum) {
                element.style = 'background-color: #dbdee1';
                const filteredNumbers = SeatFocused.filter(
                    (SeatFocused) => SeatFocused !== JSON.parse(element.innerHTML),
                );
                setSeatFocused(filteredNumbers);
                localStorage.setItem('listSeat', JSON.stringify(filteredNumbers));
            } else {
                setSeatFocused([...SeatFocused, JSON.parse(element.innerHTML)]);
                element.style = 'background-color: rgb(17, 98, 219)';
                localStorage.setItem('listSeat', JSON.stringify([JSON.parse(element.innerHTML), ...SeatFocused]));
            }
        }
    }
    function FoodDetail() {
        let ListFoods = [];
        let SL = JSON.parse(localStorage.getItem('SLFood'));
        let Foods = JSON.parse(localStorage.getItem('Foods'));
        if (SL) {
            SL.map((value, index) => {
                if (value != 0) {
                    ListFoods.push(Foods[index].ItemName);
                }
            });
        }

        return ListFoods;
    }
    function SumAll() {
        let Sum = 0;
        const foods = JSON.parse(localStorage.getItem('Foods'));
        JSON.parse(localStorage.getItem('SLFood')).map((value, index) => {
            Sum += value * foods[index].Price;
        });
        const tickets = JSON.parse(localStorage.getItem('Tickets'));
        JSON.parse(localStorage.getItem('SLTicket')).map((value, index) => {
            Sum += value * tickets[index].Price;
        });
        return Sum;
    }
    if (ListSeat) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <h3 className={cx('cinema-title')}>
                            Rạp : {JSON.parse(localStorage.getItem('showtime')).CinemaName}
                        </h3>
                        <h3 className={cx('hall-title')}>
                            Phòng Số : {JSON.parse(localStorage.getItem('showtime')).HallID}
                        </h3>
                    </div>
                    <h2 className={cx('title-main')}>Danh sách ghế ngồi</h2>
                    <div className={cx('list-seats')}>
                        <div className={cx('screen')}>
                            <p className={cx('derc')}>Màn hình</p>
                        </div>
                        <div className={cx('list-seats-detail')}>
                            {ListSeat.map((value, index) => {
                                if (value.CheckSeat != 0) {
                                    return (
                                        <a className={cx('seat', 'red')} key={index}>
                                            {value.ID}
                                        </a>
                                    );
                                } else {
                                    return (
                                        <a className={cx('seat')} key={index} onClick={handleClick}>
                                            {value.ID}
                                        </a>
                                    );
                                }
                            })}
                        </div>
                        <div className={cx('derc')}>
                            <div className={cx('sub-derc')}>
                                <p>Đã được đặt</p>
                                <a className={cx('seat', 'red')}></a>
                            </div>
                            <div className={cx('sub-derc')}>
                                <p>Chưa được đặt</p>
                                <a className={cx('seat')}></a>
                            </div>
                            <div className={cx('sub-derc')}>
                                <p>Đang chọn</p>
                                <a className={cx('seat', 'blue')}></a>
                            </div>
                        </div>
                    </div>
                </div>
                <ChiTietHoaDon
                    Tong={SumAll()}
                    ListFoods={FoodDetail()}
                    TypeDetail={2}
                    listSeat={JSON.parse(localStorage.getItem('listSeat'))}
                />
            </div>
        );
    }
}
export default ListSeat;
