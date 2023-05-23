import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogLayout.module.scss';
import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import MoviePlaying from '~/components/Layout/DatVeLayout/MoviePlaying';
import BlogMain from './BlogMain';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function BlogLayout({ chilren }) {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post('http://localhost:8080/TrangChu').then((response) => {
                    setMovies(response.data.result);
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
        <div className={cx('main')}>
            <BlogMain />
            <MoviePlaying movies={movies} />
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

export default BlogLayout;
