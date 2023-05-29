import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import Main from './Main';

import Container from 'react-bootstrap/Container';

import { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';

function LichChieuLayout({ chilren }) {
    const [movies, setMovies] = useState([]);
    useLayoutEffect(() => {
        let token = '';
        if (localStorage.getItem('token-login')) {
            // token = JSON.parse(localStorage.getItem('token-login'));
            // localStorage.clear();
            // localStorage.setItem('token-login', JSON.stringify(token));
        } else {
            localStorage.clear();
        }
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
    const modules = [<Header />, <Controller movies={movies} />, <Main />, <Footer />];
    return (
        <div>
            <Container fluid="xxl">
                <div className="content">{modules.map((value) => value)}</div>
            </Container>
        </div>
    );
}

export default LichChieuLayout;
