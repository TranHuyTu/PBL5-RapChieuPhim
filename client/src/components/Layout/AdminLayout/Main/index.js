import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Chart from '../Chart';
import TableDetail from '../TableDetail';

import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function Main() {
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
    const Lable = ['ID', 'Tên Phim', 'Thời lượng', 'Ngày khởi chiếu', 'LinkReview'];
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <Row>
                    <Col>
                        <Chart />
                    </Col>
                    <Col>
                        <Chart />
                    </Col>
                </Row>
                <Row>
                    <TableDetail Label={Lable} data={movies} />
                </Row>
            </Container>
        </div>
    );
}

export default Main;
