import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import { useState, useLayoutEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
// import ToggleButton from 'react-bootstrap/ToggleButton';
// import { hasFormSubmit } from '@testing-library/user-event/dist/utils';

const cx = classNames.bind(styles);

function Main() {
    const [key, setKey] = useState('home');
    const [movies, setMovies] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    useLayoutEffect(() => {
        const fetchData = async () => {
            try {
                // const token = localStorage.getItem('token-login');
                // const _token = token.substring(1, token.length - 1);
                await axios.postForm('http://localhost:8080/TrangChu').then((response) => {
                    setMovies(response.data.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
        localStorage.setItem('TongTickets', 0);
    }, []);

    const Cinema = (showtime) => {
        let cinema = [];
        if (showtime) {
            showtime.map((value) => {
                if (!cinema.some((cinema) => cinema.CinemaName === value.CinemaName)) {
                    cinema.push({ CinemaID: value.CinemaID, CinemaName: value.CinemaName });
                }
            });
        }
        return cinema;
    };

    const HandlerMovie = () => {
        const IDmovie = JSON.parse(localStorage.getItem('movie')).ID;
        try {
            axios.post('http://localhost:8080/showtime/Movie/' + IDmovie).then((response) => {
                localStorage.setItem('Cinema', JSON.stringify(Cinema(response.data.result)));
                setCinemas(Cinema(response.data.result));
            });
        } catch (error) {
            console.error(error);
        }
    };
    const HandlerCinema = (CinemaID) => {
        const IDmovie = JSON.parse(localStorage.getItem('movie')).ID;
        const data = {
            MovieID: IDmovie,
            CinemaID: CinemaID,
        };
        try {
            axios.post('http://localhost:8080/showtime/Time', data).then((response) => {
                localStorage.setItem('ListShowtime', JSON.stringify(response.data.result));
                setShowtimes(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    if (movies) {
        const elementCinema = document.querySelectorAll('tbody')[1];
        if (elementCinema) {
            if (JSON.parse(localStorage.getItem('Cinema'))) {
                elementCinema.innerHTML = '';
                JSON.parse(localStorage.getItem('Cinema')).map((value, index) => {
                    elementCinema.insertAdjacentHTML(
                        'afterbegin',
                        '<tr key=' + index + ' id="Cinema" ><td>' + value.CinemaName + '</td></tr>',
                    );
                });
                // localStorage.removeItem('Cinema');
                elementCinema.childNodes.forEach(function (item) {
                    // Thực hiện thao tác mong muốn trên từng phần tử
                    item.onclick = function () {
                        JSON.parse(localStorage.getItem('Cinema')).map((value, index) => {
                            if (value.CinemaName == item.textContent) {
                                HandlerCinema(value.CinemaID);
                            }
                        });
                    };
                    // console.log(item.textContent);
                });
            }
        }
        const elementTime = document.querySelectorAll('tbody')[2];
        if (elementTime) {
            if (JSON.parse(localStorage.getItem('ListShowtime'))) {
                elementTime.innerHTML = '';
                JSON.parse(localStorage.getItem('ListShowtime')).map((value, index) => {
                    elementTime.insertAdjacentHTML(
                        'afterbegin',
                        '<tr key=' +
                            index +
                            ' id="Time" ><td>' +
                            '<p>' +
                            ConverTime(value.ShowtimeDateTime)[2] +
                            '</p>' +
                            '<a href="./DatDoAn" style="' +
                            'display: block;' +
                            'color: black;' +
                            'width: 100px;' +
                            'height: 40px;' +
                            'text-decoration: none;' +
                            'border: 2px solid #333;' +
                            'text-align: center;' +
                            'line-height: 38px;' +
                            '">' +
                            // value.ShowtimeDateTime +
                            ConverTime(value.ShowtimeDateTime)[0] +
                            ' : ' +
                            ConverTime(value.ShowtimeDateTime)[1] +
                            '</a></td></tr>',
                    );
                    if (elementTime.querySelector('tr:first-child>td>a')) {
                        elementTime.querySelector('tr:first-child>td>a').onclick = function () {
                            localStorage.setItem('showtime', JSON.stringify(value));
                            localStorage.removeItem('Cinema');
                            localStorage.removeItem('ListShowtime');
                            // console.log(value);
                        };
                        // console.log(elementTime.querySelector('tr:first-child>td>a'));
                    }
                });
            }
        }
        return (
            <div className={cx('wrapper')}>
                <Container fluid="1200px">
                    <Row>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Chọn Phim</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {movies.map((value, index) => {
                                        return (
                                            <tr
                                                key={index}
                                                onClick={() => {
                                                    localStorage.setItem('movie', JSON.stringify(value));
                                                    HandlerMovie();
                                                }}
                                            >
                                                <td className={cx('movie')}>
                                                    <div className={cx('img-movie')}>
                                                        <img className={cx('img')} src={value.AvatarMovie} alt="" />
                                                    </div>
                                                    <div className={cx('img-desc')}>
                                                        <p className={cx('name-movie')}>{value.MovieName}</p>
                                                        <p className={cx('title-movie')}>{value.GioiThieu}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Chọn Rạp</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <></>
                                </tbody>
                            </Table>
                        </Col>
                        <Col>
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Chọn Suất</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <></>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Main;
