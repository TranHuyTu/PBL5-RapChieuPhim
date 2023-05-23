import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ImageCinema.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

const listImage = [
    'https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-camau-01_1557128016683.jpg',
    'https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-camau-02_1557128259980.jpg',
    'https://cdn.galaxycine.vn/media/2019/5/6/rapgiave-hinhrap-camau-03_1557128024900.jpg',
];
function ImageCinema({ chilren }) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <div className={cx('wrapper')}>
            <Container fluid="xxl">
                <div className={cx('list-image')}>
                    <Carousel activeIndex={index} onSelect={handleSelect}>
                        {listImage.map((value, index) => (
                            <Carousel.Item key={index}>
                                <img className={cx('image')} src={value} alt={value} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
            </Container>
        </div>
    );
}

export default ImageCinema;
