import Header from '~/components/Layout/DefaultLayout/Header';
import Controller from '~/components/Layout/DefaultLayout/Controller';
import Footer from '~/components/Layout/DefaultLayout/Footer';
import ContentSEO from '~/components/Layout/DefaultLayout/ContentSEO';
import Main from '~/components/Layout/DefaultLayout/Main';
// import DSPhim from './DSPhim';
import * as React from 'react';
// import classNames from 'classnames/bind';
// import styles from './DSPhimLayout.module.scss';

// const cx = classNames.bind(styles);

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
    // <DSPhim />,
    <Main movies={movies} w={'100%'} h={'1200px'} />,
    <ContentSEO />,
    <Footer />,
];

function DSPhimLayout({ chilren }) {
    return (
        <div>
            <div className="container">
                <div className="content">{modules.map((value) => value)}</div>
            </div>
        </div>
    );
}

export default DSPhimLayout;
