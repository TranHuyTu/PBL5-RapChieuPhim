import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Controller.module.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Chart from '../Chart';
import ChartLine from '../ChartLine';
import ChartPie from '../ChartPie';
import TableDetail from '../TableDetail';
import TableShowTime from '../TableShowTime';
import TableCinema from '../TableCinema';
import TableDirector from '../TableDirector';
import TableNSX from '../TableNSX';
import TableFood from '../TableFood';
import TableTicket from '../TableTicket';
import TablePromotion from '../TablePromotion';
import TableBlog from '../TableBlog';
import TableClient from '../TableClient';

import { useState, useEffect } from 'react';
import axios from 'axios';
const cx = classNames.bind(styles);

function Controller() {
    return (
        <Container fluid="xxl">
            <div className={cx('wrapper')}>
                <Tab.Container id="left-tabs-example" defaultActiveKey="trangchu">
                    <Row>
                        <Col sm={2}>
                            <Nav variant="pills" className="flex-column">
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="trangchu">
                                        Trang Chủ
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="phim">
                                        Phim
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="lichchieu">
                                        Lịch Chiếu
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="rap">
                                        Rạp
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        className={cx('Controller-Title')}
                                        eventKey="daodien"
                                        onClick={() => {
                                            if (localStorage.getItem('Actor')) {
                                                localStorage.removeItem('Actor');
                                            }
                                        }}
                                    >
                                        Đạo Diễn
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link
                                        className={cx('Controller-Title')}
                                        eventKey="dienvien"
                                        onClick={() => {
                                            localStorage.setItem('Actor', '0');
                                        }}
                                    >
                                        Diễn Viên
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="NSX">
                                        Nhà Sản Xuất
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="Food">
                                        Đồ ăn
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="Ticket">
                                        Giá vé
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="khuyenmai">
                                        Khuyến Mãi
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="blog">
                                        Blog
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="ClientDetail">
                                        Thông tin khách hàng
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="TKDT">
                                        Thống kê doanh thu
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link className={cx('Controller-Title')} eventKey="TKND">
                                        Thông Tin Người Dùng
                                    </Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="trangchu">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <Col>
                                                <ChartLine />
                                            </Col>
                                            <Col>
                                                <Chart />
                                            </Col>
                                        </Row>
                                        <Row>
                                            <TableDetail typeTable={'TrangChu'} />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="phim">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableDetail typeTable={'Phim'} />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="lichchieu">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableShowTime />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="rap">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableCinema />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="daodien">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableDirector TypeActor={'Director'} />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="dienvien">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableDirector TypeActor={'Actor'} />
                                            {() => {
                                                localStorage.setItem('Actor', '0');
                                            }}
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="NSX">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableNSX />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Food">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableFood />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="Ticket">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TableTicket />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="khuyenmai">
                                    <Container className={cx('container')}>
                                        <Row>
                                            <TablePromotion />
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="blog">
                                    <TableBlog />
                                </Tab.Pane>
                                <Tab.Pane eventKey="ClientDetail">
                                    <TableClient />
                                </Tab.Pane>
                                <Tab.Pane eventKey="TKDT">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="TKND">Second tab content</Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </div>
        </Container>
    );
}

export default Controller;
