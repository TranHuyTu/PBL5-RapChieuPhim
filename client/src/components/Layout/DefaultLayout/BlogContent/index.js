import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogContent.module.scss';
import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';

const cx = classNames.bind(styles);

function BlogContent(props) {
    const [BlogMovie, setBlogMovie] = useState([]);
    const [Blog, setBlog] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post('/BlogMovie').then((response) => {
                    setBlogMovie(response.result);
                });
                await axios.post('/Blog').then((response) => {
                    setBlog(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if (BlogMovie && Blog && props.numberRow) {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('comment')}>
                    <div className={cx('row')}>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BÌNH LUẬN PHIM</a>
                            <div className={cx('sub_col')}>
                                {BlogMovie.map((item, index) => {
                                    if (index < props.numberRow) {
                                        return (
                                            <div className={cx('blog')} key={index}>
                                                <div className={cx('movie_thub')}>
                                                    <img src={item.AvatarMovie} alt={item.title} />
                                                    <div className={cx('bgr')}></div>
                                                </div>
                                                <div className={cx('sub_movie_thub')}>
                                                    <h5>
                                                        <a
                                                            href="/Blog"
                                                            onClick={() => {
                                                                localStorage.setItem('blog', JSON.stringify(item));
                                                            }}
                                                        >
                                                            [Review] {item.MovieName}
                                                        </a>
                                                    </h5>
                                                    <div className={cx('blog_content')}>
                                                        <div className={cx('desc')}>
                                                            <p>{item.TomTat}</p>
                                                            <p>{item.GioiThieu}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BLOG ĐIỆN ẢNH</a>
                            <div className={cx('sub_col')}>
                                {Blog.map((item, index) => {
                                    if (index < props.numberRow) {
                                        return (
                                            <div className={cx('blog')} key={index}>
                                                <div className={cx('movie_thub')}>
                                                    <img src={item.Image} alt={item.title} />

                                                    <div className={cx('bgr')}></div>
                                                </div>
                                                <div className={cx('sub_movie_thub')}>
                                                    <h5>
                                                        <a
                                                            href="/Blog"
                                                            onClick={() => {
                                                                localStorage.setItem('blog', JSON.stringify(item));
                                                            }}
                                                        >
                                                            {item.Title}
                                                        </a>
                                                    </h5>
                                                    <div className={cx('blog_content')}>
                                                        <div className={cx('desc')}>
                                                            <p>{item.Content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={cx('wrapper')}>
                <div className={cx('comment')}>
                    <div className={cx('row')}>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BÌNH LUẬN PHIM</a>
                            <div className={cx('sub_col')}></div>
                        </div>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BLOG ĐIỆN ẢNH</a>
                            <div className={cx('sub_col')}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BlogContent;
