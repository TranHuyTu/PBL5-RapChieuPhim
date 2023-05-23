import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ListSeatLayout.module.scss';

import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';

import Container from 'react-bootstrap/Container';

import ListSeat from './ListSeat';
import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ListSeatLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    const [listSeat, setListSeat] = useState([]);
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
        if (localStorage.getItem('listSeat')) {
            setListSeat(JSON.parse(localStorage.getItem('list')));
        }
    }, []);
    const modules = [<Header />, <Controller movies={movies} />, <ListSeat />, <Footer />];
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

export default ListSeatLayout;
