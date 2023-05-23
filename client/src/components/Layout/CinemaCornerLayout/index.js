import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './CinemaCornerLayout.module.scss';

import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import BoxBuyTicket from '~/components/Layout/DefaultLayout/BoxBuyTicket';
import MoviePlaying from '~/components/Layout/DatVeLayout/MoviePlaying';
import ReviewSelect from './ReviewSelect';

const cx = classNames.bind(styles);

let movies = [
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/3/3/450x300_1677813532298.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/3/10/1800x1200_1678447504033.jpg',
        name_movie: 'ANT-MAN AND THE WASP: QUANTUMANIA',
        sub_name: 'NGUOI KIEN VA CHIEN BINH ONG: THE GIOI LUONG TU',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/3/1/450x300_1677654112500.jpg',
        name_movie: 'MISSING',
        sub_name: 'MAT TICH',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/3/6/450wx300h_1678092281718.jpg',
        name_movie: 'KHI TA HAI LAM',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/3/9/450x300_1678330897369.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/2/17/450x300-chuot_1676619353890.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/2/17/450x300-chuot_1676619353890.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/2/17/450x300-chuot_1676619353890.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
    {
        img_link: 'https://cdn.galaxycine.vn/media/2023/2/17/450x300-chuot_1676619353890.jpg',
        name_movie: 'SIÊU LỪA GẶP SIÊU LẦY',
        sub_name: '',
    },
];

const modules = [
    <Header />,
    <Controller movies={movies} />,
    <div className={cx('content')}>
        <div className={cx('content-left')}>
            <ReviewSelect />
        </div>
        <div className={cx('content-right')}>
            <BoxBuyTicket />,
            <MoviePlaying movies={movies} />,
        </div>
    </div>,
    <Footer />,
];

function CinemaCornerLayout({ chilren }) {
    return (
        <div>
            <div className="container">
                <div className="content">
                    {modules.map((value, key) => (
                        <div key={key}>{value}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default CinemaCornerLayout;
