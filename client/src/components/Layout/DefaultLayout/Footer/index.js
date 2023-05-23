import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const cx = classNames.bind(styles);

const Footer = () => {
    return (
        <div className={cx('wrapper')}>
            <Container fluid="xxl">
                <Row className={cx('row')} xs={2} md={2} lg={2} xl={4} xxl={2}>
                    <Col>
                        <a className={cx('title', 'header')}>GIỚI THIỆU</a>
                    </Col>
                    <Col>
                        <a className={cx('title', 'header')}>GÓC ĐIỆN ẢNH</a>
                    </Col>
                    <Col>
                        <a className={cx('title', 'header')}>HỖ TRỢ</a>
                    </Col>
                    <Col>
                        <a className={cx('title', 'header')}>KẾT NỐI VỚI CHÚNG TÔI</a>
                    </Col>
                </Row>
                <Row className={cx('row')} xs={2} md={2} lg={2} xl={4} xxl={2}>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            VỀ CHÚNG TÔI
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            THỂ LOẠI PHIM
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            GÓP Ý
                        </a>
                    </Col>
                    <Col>
                        <div className={cx('nimargin')}>
                            <a href="">
                                <img
                                    className={cx('icon-img')}
                                    src="https://theme.hstatic.net/1000347097/1000729695/14/ckv-facebook.png?v=866"
                                ></img>
                            </a>
                            <a href="">
                                <img
                                    className={cx('icon-img')}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/YouTube_icon_%282011-2013%29.svg/2048px-YouTube_icon_%282011-2013%29.svg.png"
                                ></img>
                            </a>
                            <a href="">
                                <img
                                    className={cx('icon-img')}
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/1025px-Instagram-Icon.png"
                                ></img>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className={cx('row')} xs={2} md={2} lg={2} xl={4} xxl={2}>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            THỎA THUẬN SỬ DỤNG
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            BÌNH LUẬN PHIM
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            SALE & SERVICES
                        </a>
                    </Col>
                    <Col>
                        <a className={cx('title', 'header')}>DOWNLOAD APP</a>
                    </Col>
                </Row>
                <Row className={cx('row')} xs={2} md={2} lg={2} xl={4} xxl={2}>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            QUY CHẾ HOẠT ĐỘNG
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            BLOG ĐIỆN ẢNH
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            RẠP / GIÁ VÉ
                        </a>
                    </Col>
                    <Col>
                        <div className={cx('nimargin')}>
                            <a href="">
                                <img
                                    className={cx('icon-img')}
                                    src="https://cdn-icons-png.flaticon.com/512/6124/6124997.png"
                                ></img>
                            </a>
                            <a href="">
                                <img
                                    className={cx('icon-img')}
                                    src="https://www.pngall.com/wp-content/uploads/11/Apple-Logo-PNG-Clipart.png"
                                ></img>
                            </a>
                        </div>
                    </Col>
                </Row>
                <Row className={cx('row')} xs={2} md={2} lg={2} xl={4} xxl={2}>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            CHÍNH SÁCH BẢO MẬT
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            PHIM HAY THÁNG
                        </a>
                    </Col>
                    <Col>
                        <a href="" className={cx('title', 'desc')}>
                            TUYỂN DỤNG
                        </a>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    );
};
export default Footer;
