import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Controller.module.scss';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Chart from '../Chart';
import TableDetail from '../TableDetail';
import TableShowTime from '../TableShowTime';

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
                                    <Nav.Link eventKey="trangchu">Trang Chủ</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="phim">Phim</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="lichchieu">Lịch Chiếu</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="rap">Rạp</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="daodien">Đạo Diễn</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="dienvien">Diễn Viên</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="NSX">Nhà Sản Xuất</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="khuyenmai">Khuyến Mãi</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="blog">Blog</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="TKDT">Thống kê doanh thu</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="TKND">Thông Tin Người Dùng</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={10}>
                            <Tab.Content>
                                <Tab.Pane eventKey="trangchu">
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
                                <Tab.Pane eventKey="rap">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="daodien">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="dienvien">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="NSX">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="khuyenmai">Second tab content</Tab.Pane>
                                <Tab.Pane eventKey="blog">Second tab content</Tab.Pane>
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
