import * as React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './SupportMain.module.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import BoxBuyTicket from '~/components/Layout/DefaultLayout/BoxBuyTicket';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function SupportMain({ chilren }) {
    const [search, setSearch] = useState([]);
    useEffect(() => {
        try {
            axios.post('http://localhost:8080/TrangChu/Search').then((response) => {
                setSearch(response.data.result);
            });
        } catch (error) {
            console.error(error);
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <Container fluid="xxl">
                <Row>
                    <Col xs={8}>
                        <Tabs defaultActiveKey="Request" id="uncontrolled-tab-example" className="mb-3">
                            <Tab className={cx('wrapper-tag')} eventKey="Request" title="Phản hổi">
                                <h1>Bạn muốn nhận được sự hỗ trợ từ chúng tôi</h1>
                                <Link className={cx('toEmail')} to="mailto:tranhuytu37@gamil.com">
                                    Email của chúng tôi
                                </Link>
                                <Link className={cx('toPhone')} to="mailto:032255364">
                                    032255364
                                </Link>
                                <div className={cx('Request')}>
                                    <Form>
                                        <Row className="mb-3">
                                            <Form.Group as={Col} md="4">
                                                <Form.Control
                                                    className={cx('input')}
                                                    size="lg"
                                                    required
                                                    type="text"
                                                    placeholder="Họ và Tên"
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4">
                                                <Form.Control
                                                    className={cx('input')}
                                                    size="lg"
                                                    required
                                                    type="text"
                                                    placeholder="SDT"
                                                />
                                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group as={Col} md="4">
                                                <InputGroup hasValidation>
                                                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                                    <Form.Control
                                                        className={cx('input')}
                                                        size="lg"
                                                        type="text"
                                                        placeholder="Email"
                                                        aria-describedby="inputGroupPrepend"
                                                        required
                                                    />
                                                    <Form.Control.Feedback type="invalid">
                                                        Please choose a username.
                                                    </Form.Control.Feedback>
                                                </InputGroup>
                                            </Form.Group>
                                        </Row>
                                        <Form.Group className="mb-3">
                                            <Form.Control className={cx('input')} size="lg" as="textarea" rows={5} />
                                        </Form.Group>
                                        <Button className={cx('btn-submit')} type="submit">
                                            Gửi yêu cầu
                                        </Button>
                                    </Form>
                                </div>
                            </Tab>
                            <Tab className={cx('wrapper-tag')} eventKey="Suggest" title="Câu hỏi thường gặp">
                                Tab content for Profile
                            </Tab>
                        </Tabs>
                    </Col>
                    <Col>
                        <BoxBuyTicket TimKiem={search} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SupportMain;
