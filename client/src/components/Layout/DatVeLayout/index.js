import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import Link from './Link';
import Movie from './Movie';
import LichChieu from './LichChieu';
import TheaterDetails from './TheaterDetails';
import MoviePlaying from './MoviePlaying';

import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './DatVeLayout.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';

const cx = classNames.bind(styles);

function DatVeLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    const [director, setDirector] = useState([]);
    const [actor, setActor] = useState([]);
    useEffect(() => {
        try {
            axios.post('http://localhost:8080/TrangChu').then((response) => {
                setMovies(response.data.result);
            });
            const IDmovie = JSON.parse(localStorage.getItem('movie')).ID;
            axios.post('http://localhost:8080/directors/Movie/' + IDmovie).then((response) => {
                setDirector(response.data.result);
            });
            axios.post('http://localhost:8080/actors/Movie/' + IDmovie).then((response) => {
                setActor(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);
    localStorage.removeItem('showtime');
    localStorage.removeItem('SLFood');
    localStorage.removeItem('Foods');
    localStorage.removeItem('SLTicket');
    localStorage.removeItem('Tickets');
    const modules = [
        <Header />,
        <Controller movies={movies} />,
        <Link />,
        <div className={cx('layout_main')}>
            <div className={cx('layout_left')}>
                <Movie director={director} actor={actor} />
                {/* <LichChieu /> */}
                <TheaterDetails />
            </div>
            <div className={cx('layout_right')}>
                <MoviePlaying movies={movies} />
            </div>
        </div>,
        <Footer />,
    ];
    return (
        <div>
            <Container fluid="xxl">
                <div className="content">
                    {modules.map((value, key) => (
                        <div key={key}>{value}</div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default DatVeLayout;
