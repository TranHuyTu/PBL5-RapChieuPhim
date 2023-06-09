import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './EndowLayout.module.scss';

import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import BoxBuyTicket from '~/components/Layout/DefaultLayout/BoxBuyTicket';
import Promotion from '~/components/Layout/DefaultLayout/Promotion';
import MoviePlaying from '~/components/Layout/DatVeLayout/MoviePlaying';
import { useState, useEffect } from 'react';
import axiosClient from '~/api/axiosClient';
import Container from 'react-bootstrap/Container';

const cx = classNames.bind(styles);

function EndowLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosClient.post('/TrangChu').then((response) => {
                    setMovies(response.result);
                });
                axiosClient.post('/TrangChu/Search').then((response) => {
                    setSearch(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const modules = [
        <Header />,
        <Controller movies={movies} />,
        <div className={cx('content')}>
            <div className={cx('content-left')}>
                <Promotion />
            </div>
            <div className={cx('content-right')}>
                <BoxBuyTicket TimKiem={search} />,
                <MoviePlaying movies={movies} />
            </div>
        </div>,
        <Footer />,
    ];
    return (
        <div>
            <Container fluid="xxl">
                <div className="content">
                    {modules.map((value, index) => (
                        <div className={cx('wrapper')} key={index}>
                            {value}
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default EndowLayout;
