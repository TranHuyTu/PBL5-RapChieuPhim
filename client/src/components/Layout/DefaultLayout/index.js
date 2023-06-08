import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from './Header';
import Controller from './Controller';
import Main from './Main';
import MainCarouser from './MainCarouser';
import BlogContent from './BlogContent';
import Promotion from './Promotion';
import ContentSEO from './ContentSEO';
import Footer from './Footer';
import { useState, useEffect } from 'react';
import axiosClient from '~/api/axiosClient';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function DefaultLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState([]);
    const [promotions, setPromotions] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosClient.post('/TrangChu').then((response) => {
                    setMovies(response.result);
                });
                await axiosClient.post('/TrangChu/Search').then((response) => {
                    setSearch(response.result);
                });
                await axiosClient.post('/promotion').then((response) => {
                    setPromotions(response.result);
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
        <MainCarouser TimKiem={search} />,
        <Main movies={movies} w={'100%'} numberMovie={9} />,
        <BlogContent numberRow={4} />,
        <Promotion promotions={promotions} />,
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

export default DefaultLayout;
