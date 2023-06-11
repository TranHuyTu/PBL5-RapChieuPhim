import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './TableBlog.module.scss';
import Container from 'react-bootstrap/Container';
import EditBlogComponent from '../EditBlog';
import AddBlogComponent from '../AddBlog';

import { useState, useEffect } from 'react';
import axiosClient from '~/api/axiosClient';
import moment from 'moment';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function TableBlogDetail(props) {
    const [data, setData] = useState([]);
    const [Label, setLabel] = useState([]);
    const [Key, setKey] = useState([]);
    const [Blog, setBlog] = useState([]);
    const [EditBlog, setEditBlog] = useState([]);
    const navigate = useNavigate();
    const AvatarError = 'https://res.cloudinary.com/dbaul3mwo/image/upload/v1685175578/learn_nodejs/images_z012ea.png';
    const fetchData = async (API) => {
        try {
            await axiosClient
                .post(API)
                .then((response) => {
                    setData(response.result);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        fetchData('/Blog');
        setLabel(['ID', 'Tên', 'Nội dung', 'Hình ảnh']);
        setKey(['ID', 'Title', 'Content', 'Image']);
    }, []);
    function ConverTime(DATETIME) {
        let datetime = [];
        let DT = DATETIME.split('T');
        let time = DT[1].split(':');
        datetime.push(time[0], time[1], moment(DATETIME).format('DD/MM/YYYY'));
        return datetime;
    }
    const HandlerShow = async function (value) {
        localStorage.setItem('Blog', JSON.stringify(value));
        setBlog(value);
    };
    const HandlerEdit = async function (value) {
        localStorage.setItem('Blog', JSON.stringify(value));
        localStorage.setItem('EditBlog', '0');
        setBlog(value);
        setEditBlog('0');
    };
    const HandlerRemove = async function (values) {
        console.log('Remove', values);
        try {
            if (values.Image != '') {
                let Url = values.Image.split('learn_nodejs/')[1];
                const UrlDelete = { imageUrl: 'learn_nodejs/' + Url.split('.')[0] };
                await axiosClient
                    .post('/pathImg', UrlDelete, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const token = localStorage.getItem('token-login');
            const _token = token.substring(1, token.length - 1);

            await axiosClient
                .delete(
                    '/Blog/remove/' + values.ID,
                    { x: 1 },
                    {
                        headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: _token },
                    },
                )
                .then((response) => {
                    console.log(response);
                });
        } catch (error) {
            console.error(error);
        }
        navigate('/');
    };
    if (localStorage.getItem('Blog') && localStorage.getItem('EditBlog')) {
        return (
            <div className={cx('')}>
                <EditBlogComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Blog');
                        localStorage.removeItem('EditBlog');
                        setBlog([]);
                        setEditBlog('');
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (localStorage.getItem('Blog')) {
        let Blog = JSON.parse(localStorage.getItem('Blog'));
        return (
            <div className={cx('wrapper_detail')}>
                <h1>{Blog.Content}</h1>
                <div className={cx('Content')}>
                    <img className={cx('Image')} src={Blog.Image} alt={Blog.ID} />
                    <p className={cx('Content_text')}>{Blog.Content}</p>
                </div>

                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('Blog');
                        setBlog([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else if (JSON.parse(localStorage.getItem('AddBlog')) === 0) {
        return (
            <div>
                <AddBlogComponent />
                <button
                    className={cx('Cancel')}
                    onClick={() => {
                        localStorage.removeItem('AddBlog');
                        setBlog([]);
                    }}
                >
                    Cancel
                </button>
            </div>
        );
    } else {
        if (data && Label && Key) {
            return (
                <div className={cx('wrapper')}>
                    <Container className={cx('container')}>
                        <Table striped bordered hover>
                            <thead className={cx('thead')}>
                                <tr>
                                    {Label.map((value, index) => (
                                        <th key={index}>{value}</th>
                                    ))}

                                    <th>Xem</th>
                                    <th>Sửa</th>
                                    <th>Xóa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((value, index) => (
                                    <tr key={index}>
                                        <td>{value[Key[0]]}</td>
                                        <td>{value[Key[1]]}</td>
                                        <td>
                                            <p className={cx('derc')}>{value[Key[2]]}</p>
                                        </td>
                                        <td>
                                            <img
                                                className={cx('avatar')}
                                                src={value[Key[3]] ? value[Key[3]] : AvatarError}
                                                alt={value[Key[1]]}
                                            />
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'show')} onClick={() => HandlerShow(value)}>
                                                Xem
                                            </a>
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'edit')} onClick={() => HandlerEdit(value)}>
                                                Sửa
                                            </a>
                                        </td>
                                        <td>
                                            <a className={cx('btn', 'delete')} onClick={() => HandlerRemove(value)}>
                                                Xóa
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Container>
                </div>
            );
        }
    }
}

function TableBlog(props) {
    const [BtnAddBlog, setBtnAddBlog] = useState('');
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <Container className={cx('container')}>
                <TableBlogDetail />
                <a
                    className={cx('AddNew')}
                    onClick={(e) => {
                        localStorage.setItem('AddBlog', '0');
                        setBtnAddBlog(0);
                        navigate('/Admin');
                    }}
                ></a>
            </Container>
        </div>
    );
}

export default TableBlog;
