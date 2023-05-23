import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './PlayingLayout.module.scss';
import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Main from '~/components/Layout/DefaultLayout/Main';
import ContentSEO from '~/components/Layout/DefaultLayout/ContentSEO';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function PlayingLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState([]);
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post('http://localhost:8080/TrangChu').then((response) => {
                    setMovies(response.data.result);
                });
                await axios.post('http://localhost:8080/TrangChu/Search').then((response) => {
                    setSearch(response.data.result);
                });
                await axios.post('http://localhost:8080/promotion').then((response) => {
                    setPromotions(response.data.result);
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
        <Main movies={movies} w={'100%'} />,
        <ContentSEO />,
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

export default PlayingLayout;
