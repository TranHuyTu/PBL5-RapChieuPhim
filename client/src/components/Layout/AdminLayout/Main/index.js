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

function Main(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const fetchData = async (API) => {
        try {
            await axios.post(API).then((response) => {
                setData(response.data.result);
                console.log(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (props.typeMain == 'TrangChu' || props.typeMain == 'Phim' || props.typeMain == '') {
            fetchData('http://localhost:8080/TrangChu');
            setLabel(['ID', 'Tên Phim', 'Thời lượng', 'Ngày khởi chiếu', 'LinkReview']);
            setKey(['ID', 'MovieName', 'TimeMovie', 'ReleaseYear']);
        }
    }, []);
    if (Label != [] && Key != [] && data != []) {
        if (props.typeMain == 'TrangChu' || props.typeMain == '') {
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
                            <TableDetail Label={Label} Key={Key} data={data} />
                        </Row>
                    </Container>
                </div>
            );
        } else if (props.typeMain == 'Phim') {
            return (
                <div className={cx('wrapper')}>
                    <Container className={cx('container')}>
                        <Row>
                            <TableDetail Label={Label} Key={Key} data={data} />
                        </Row>
                    </Container>
                </div>
            );
        }
    }
}

export default Main;
