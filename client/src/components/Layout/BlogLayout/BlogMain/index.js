import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogMain.module.scss';

import { useState, useEffect } from 'react';
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';

const cx = classNames.bind(styles);

function BlogMain(props) {
    const [Blog, setBlog] = useState();
    useEffect(() => {
        setBlog(JSON.parse(localStorage.getItem('blog')));
    }, []);
    if (Blog) {
        if (Blog.MovieName) {
            return (
                <div className={cx('wrapper')}>
                    <Container fluid="xxl">
                        <h1>{Blog.MovieName}</h1>
                        <h3>{Blog.TomTat}</h3>
                        <img className={cx('img-movie')} src={Blog.AvatarMovie} alt={Blog.AvatarMovie} />
                        <p>{Blog.GioiThieu}</p>
                    </Container>
                </div>
            );
        } else {
            return (
                <div className={cx('wrapper')}>
                    <Container fluid="xxl">
                        <h1>{Blog.Title}</h1>
                        <img className={cx('img-movie')} src={Blog.Image} alt={Blog.AvatarMovie} />
                        <p>{Blog.Content}</p>
                    </Container>
                </div>
            );
        }
    }
}
export default BlogMain;
