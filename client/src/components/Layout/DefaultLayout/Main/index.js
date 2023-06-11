import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Main.module.scss';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';
import moment from 'moment';

const cx = classNames.bind(styles);

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Main(props) {
    const [value, setValue] = useState(0);
    const [almDC, setatmDC] = useState('activeimg');
    const [almSC, setatmSC] = useState('');

    const width = props.w;
    const height = props.h;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        if (almDC) {
            setatmDC('');
            setatmSC('activeimg');
        } else {
            setatmDC('activeimg');
            setatmSC('');
        }
    };
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('MM/DD/YYYY'));
        return datetime;
    }
    const currentDate = new Date();
    const numberPlaying = [];
    const numberComing = [];
    useEffect(() => {
        if (props.numberMovie) {
            document.querySelectorAll('.list-movie').forEach((node) => {
                if (node.childElementCount == 1) {
                    node.insertAdjacentHTML(
                        'beforeend',
                        '<div class="row ' +
                            cx('row-continue') +
                            '"><a href="./PhimDangChieu" class="' +
                            cx('btn-continue') +
                            '">XEM THÊM</a></div>',
                    );
                }
            });
        }
    });
    return (
        <Box sx={{ width: { width }, height: { height } }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '0 28px' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab
                        className={cx('active')}
                        label="Phim đang Chiếu"
                        sx={{ fontSize: '18px', fontWeight: '400', padding: '10px 0', margin: '0 20px' }}
                        {...a11yProps(0)}
                    />
                    <Tab
                        className={cx('active')}
                        label="Phim Sắp Chiếu"
                        sx={{ fontSize: '18px', fontWeight: '400', padding: '10px 0', margin: '0 20px' }}
                        {...a11yProps(1)}
                    />
                </Tabs>
            </Box>
            <div className={cx('sub-item-wrapper', almDC)}>
                <div className={cx('submenu-row')}>
                    <div className={cx('sub-movies')}>
                        <div className={cx('movies-item')}>
                            <Container fluid="xxl" className={cx('list-movie')}>
                                <Row>
                                    {props.movies.map((item, index) => {
                                        const dateString = ConverTime(item.ReleaseYear)[2];
                                        const parts = dateString.split('/');
                                        const day = parseInt(parts[1], 10);
                                        const month = parseInt(parts[0], 10) - 1; // do tháng trong đối tượng Date bắt đầu từ 0
                                        const year = parseInt(parts[2], 10);
                                        const dateObject = new Date(year, month, day);
                                        if (currentDate > dateObject) {
                                            if (props.numberMovie) {
                                                numberPlaying.push(index);
                                                if (numberPlaying.length < props.numberMovie) {
                                                    return (
                                                        <Col xl={3} lg={4} md={6} sm={12} key={index}>
                                                            <Card style={{ width: '25rem', margin: '0 0 10px 0' }}>
                                                                <Card.Img
                                                                    className={cx('image-top')}
                                                                    variant="top"
                                                                    src={`${item.AvatarMovie}`}
                                                                    alt={item.MovieName}
                                                                />
                                                                <Card.Body>
                                                                    <Card.Title className={cx('name-movie')}>
                                                                        {item.MovieName}
                                                                    </Card.Title>
                                                                    <Card.Text className={cx('sub-name')}>
                                                                        {item.GioiThieu}
                                                                    </Card.Text>
                                                                    <a
                                                                        href="./DatVe"
                                                                        onClick={() => {
                                                                            localStorage.setItem(
                                                                                'movie',
                                                                                JSON.stringify(item),
                                                                            );
                                                                        }}
                                                                        className={cx('btn-MuaVe')}
                                                                    >
                                                                        Mua Vé
                                                                    </a>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <Col xl={3} lg={4} md={6} sm={12} key={index}>
                                                        <Card style={{ width: '25rem', margin: '0 0 10px 0' }}>
                                                            <Card.Img
                                                                className={cx('image-top')}
                                                                variant="top"
                                                                src={`${item.AvatarMovie}`}
                                                                alt={item.MovieName}
                                                            />
                                                            <Card.Body>
                                                                <Card.Title className={cx('name-movie')}>
                                                                    {item.MovieName}
                                                                </Card.Title>
                                                                <Card.Text className={cx('sub-name')}>
                                                                    {item.GioiThieu}
                                                                </Card.Text>
                                                                <a
                                                                    href="./DatVe"
                                                                    onClick={() => {
                                                                        localStorage.setItem(
                                                                            'movie',
                                                                            JSON.stringify(item),
                                                                        );
                                                                    }}
                                                                    className={cx('btn-MuaVe')}
                                                                >
                                                                    Mua Vé
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            }
                                        }
                                    })}
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('sub-item-wrapper', almSC)}>
                <div className={cx('submenu-row')}>
                    <div className={cx('sub-movies')}>
                        <div className={cx('movies-item')}>
                            <Container fluid="xxl" className={cx('list-movie')}>
                                <Row>
                                    {props.movies.map((item, index) => {
                                        const dateString = ConverTime(item.ReleaseYear)[2];
                                        const parts = dateString.split('/');
                                        const day = parseInt(parts[1], 10);
                                        const month = parseInt(parts[0], 10) - 1; // do tháng trong đối tượng Date bắt đầu từ 0
                                        const year = parseInt(parts[2], 10);
                                        const dateObject = new Date(year, month, day);
                                        if (currentDate < dateObject) {
                                            if (props.numberMovie) {
                                                numberComing.push(index);
                                                if (numberComing.length < props.numberMovie) {
                                                    return (
                                                        <Col xl={3} lg={4} md={6} sm={12} key={index}>
                                                            <Card style={{ width: '25rem', margin: '0 0 10px 0' }}>
                                                                <Card.Img
                                                                    className={cx('image-top')}
                                                                    variant="top"
                                                                    src={`${item.AvatarMovie}`}
                                                                    alt={item.MovieName}
                                                                />
                                                                <Card.Body>
                                                                    <Card.Title className={cx('name-movie')}>
                                                                        {item.MovieName}
                                                                    </Card.Title>
                                                                    <Card.Text className={cx('sub-name')}>
                                                                        {item.GioiThieu}
                                                                    </Card.Text>
                                                                    <a
                                                                        href="./DatVe"
                                                                        onClick={() => {
                                                                            localStorage.setItem(
                                                                                'movie',
                                                                                JSON.stringify(item),
                                                                            );
                                                                        }}
                                                                        className={cx('btn-MuaVe')}
                                                                    >
                                                                        Mua Vé
                                                                    </a>
                                                                </Card.Body>
                                                            </Card>
                                                        </Col>
                                                    );
                                                }
                                            } else {
                                                return (
                                                    <Col xl={3} lg={4} md={6} sm={12} key={index}>
                                                        <Card style={{ width: '25rem', margin: '0 0 10px 0' }}>
                                                            <Card.Img
                                                                className={cx('image-top')}
                                                                variant="top"
                                                                src={`${item.AvatarMovie}`}
                                                                alt={item.MovieName}
                                                            />
                                                            <Card.Body>
                                                                <Card.Title className={cx('name-movie')}>
                                                                    {item.MovieName}
                                                                </Card.Title>
                                                                <Card.Text className={cx('sub-name')}>
                                                                    {item.GioiThieu}
                                                                </Card.Text>
                                                                <a
                                                                    href="./DatVe"
                                                                    onClick={() => {
                                                                        localStorage.setItem(
                                                                            'movie',
                                                                            JSON.stringify(item),
                                                                        );
                                                                    }}
                                                                    className={cx('btn-MuaVe')}
                                                                >
                                                                    Mua Vé
                                                                </a>
                                                            </Card.Body>
                                                        </Card>
                                                    </Col>
                                                );
                                            }
                                        }
                                    })}
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}

export default Main;
