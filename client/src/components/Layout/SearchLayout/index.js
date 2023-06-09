import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import ContentSEO from '~/components/Layout/DefaultLayout/ContentSEO';
import SearchMain from './SearchMain';
import { useState, useEffect } from 'react';
import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './SearchLayout.module.scss';
import axiosClient from '~/api/axiosClient';
import Container from 'react-bootstrap/Container';

const cx = classNames.bind(styles);

function SearchLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axiosClient.post('/TrangChu').then((response) => {
                    setMovies(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    const modules = [<Header />, <Controller movies={movies} />, <SearchMain />, <ContentSEO />, <Footer />];

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

export default SearchLayout;
