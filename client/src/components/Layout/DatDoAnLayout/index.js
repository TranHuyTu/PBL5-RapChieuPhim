import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './DatDoAnLayout.module.scss';

import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';

import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

import MenuFood from './MenuFood';
import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function CinemaCornerLayout({ chilren }) {
    const navigate = useNavigate();
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
    const modules = [<Header />, <Controller movies={movies} />, <MenuFood />, <Footer />];
    if (localStorage.getItem('token-login')) {
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
    } else {
        navigate('/login');
    }
}

export default CinemaCornerLayout;
