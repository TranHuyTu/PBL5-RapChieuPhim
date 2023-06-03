import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ThanhToan.module.scss';

import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import ChiTietHoaDon from '~/components/Layout/DatDoAnLayout/ChiTietHoaDon';
import HoaDon from './HoaDon';

import Container from 'react-bootstrap/Container';

import { useState, useEffect } from 'react';
import axios from 'axios';

const cx = classNames.bind(styles);

function ThanhToanLayout({ chilren }) {
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
    function FoodDetail() {
        let ListFoods = [];
        let SL = JSON.parse(localStorage.getItem('SLFood'));
        let Foods = JSON.parse(localStorage.getItem('Foods'));
        if (SL) {
            SL.map((value, index) => {
                if (value !== 0) {
                    ListFoods.push(Foods[index].ItemName);
                }
                return ListFoods;
            });
        }

        return ListFoods;
    }
    function SumAll() {
        let Sum = 0;
        const foods = JSON.parse(localStorage.getItem('Foods'));
        JSON.parse(localStorage.getItem('SLFood')).map((value, index) => {
            Sum += value * foods[index].Price;
            return Sum;
        });
        const tickets = JSON.parse(localStorage.getItem('Tickets'));
        JSON.parse(localStorage.getItem('SLTicket')).map((value, index) => {
            Sum += value * tickets[index].Price;
            return Sum;
        });
        return Sum;
    }
    const modules = [
        <Header />,
        <Controller movies={movies} />,
        <div className={cx('main')}>
            <HoaDon />
            <ChiTietHoaDon
                Tong={SumAll()}
                ListFoods={FoodDetail()}
                TypeDetail={4}
                listSeat={JSON.parse(localStorage.getItem('listSeat'))}
            />
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

export default ThanhToanLayout;
