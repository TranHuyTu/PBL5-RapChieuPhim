import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './BlogContent.module.scss';
import { useState, useEffect } from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import axios from '~/api/axiosClient';

const cx = classNames.bind(styles);

function BlogContent(props) {
    const [Blog, setBlog] = useState([]);
    const [like, setLike] = useState([]);
    const [follow, setFollow] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post('/Blog').then((response) => {
                    setBlog(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if (Blog && props.numberRow) {
        let numRow1 = 0;
        let numRow2 = 0;
        return (
            <div className={cx('wrapper')}>
                <div className={cx('comment')}>
                    <div className={cx('row')}>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BÌNH LUẬN PHIM</a>
                            <div className={cx('sub_col')}>
                                {Blog.map((item, index) => {
                                    if (item.Type === 1) {
                                        numRow1++;
                                        if (numRow1 < props.numberRow) {
                                            let numLike = item.Like;
                                            let numFollow = item.Follow;
                                            if (like.includes(item)) {
                                                numLike = numLike + 1;
                                            }
                                            if (follow.includes(item)) {
                                                numFollow = numFollow + 1;
                                            }
                                            const itemUpdate = {
                                                Title: item.Title,
                                                Content: item.Content,
                                                Image: item.Image,
                                                Type: item.Type,
                                                Like: numLike,
                                                Follow: numFollow,
                                                ID: item.ID,
                                            };
                                            try {
                                                axios.put('/Blog/update', itemUpdate).then((response) => {
                                                    console.log(response.result);
                                                });
                                            } catch (error) {
                                                console.error(error);
                                            }
                                            return (
                                                <div className={cx('blog')} key={index}>
                                                    <div className={cx('movie_thub')}>
                                                        <img
                                                            className={cx('image-blog')}
                                                            src={item.Image}
                                                            alt={item.Title}
                                                        />

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
                                                            <div className={cx('blog-like')}>
                                                                <button
                                                                    className={cx('btn-z', 'like')}
                                                                    onClick={() => {
                                                                        if (like == []) {
                                                                            setLike(item);
                                                                        } else {
                                                                            if (like.includes(item)) {
                                                                                let listLike = [];
                                                                                like.map((val, ind) => {
                                                                                    if (val.ID != item.ID) {
                                                                                        listLike.push(val);
                                                                                    }
                                                                                });
                                                                                setLike(listLike);
                                                                            } else {
                                                                                setLike([item, ...like]);
                                                                            }
                                                                        }
                                                                    }}
                                                                >
                                                                    <ThumbUpAltIcon />
                                                                    Like{numLike}
                                                                </button>
                                                                <button
                                                                    className={cx('btn-z')}
                                                                    onClick={() => {
                                                                        if (follow == []) {
                                                                            setFollow(item);
                                                                        } else {
                                                                            if (follow.includes(item)) {
                                                                                let listfollow = [];
                                                                                follow.map((val, ind) => {
                                                                                    if (val.ID != item.ID) {
                                                                                        listfollow.push(val);
                                                                                    }
                                                                                });
                                                                                setFollow(listfollow);
                                                                            } else {
                                                                                setFollow([item, ...follow]);
                                                                            }
                                                                        }
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeIcon />
                                                                    Follow{numFollow}
                                                                </button>
                                                            </div>
                                                            <div className={cx('desc')}>
                                                                <p>{item.Content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })}
                                <a
                                    href="/MovieBlog"
                                    onClick={() => {
                                        localStorage.setItem('Blog', '0');
                                    }}
                                >
                                    Xem thêm
                                </a>
                            </div>
                        </div>
                        <div className={cx('col_content')}>
                            <a className={cx('title_content')}>BLOG ĐIỆN ẢNH</a>
                            <div className={cx('sub_col')}>
                                {Blog.map((item, index) => {
                                    if (item.Type == 0) {
                                        numRow2++;
                                        if (numRow2 < props.numberRow) {
                                            let numLike = item.Like;
                                            let numFollow = item.Follow;
                                            if (like.includes(item)) {
                                                numLike = numLike + 1;
                                            }
                                            if (follow.includes(item)) {
                                                numFollow = numFollow + 1;
                                            }
                                            const itemUpdate = {
                                                Title: item.Title,
                                                Content: item.Content,
                                                Image: item.Image,
                                                Type: item.Type,
                                                Like: numLike,
                                                Follow: numFollow,
                                                ID: item.ID,
                                            };
                                            try {
                                                axios.put('/Blog/update', itemUpdate).then((response) => {
                                                    console.log(response.result);
                                                });
                                            } catch (error) {
                                                console.error(error);
                                            }
                                            return (
                                                <div className={cx('blog')} key={index}>
                                                    <div className={cx('movie_thub')}>
                                                        <img
                                                            className={cx('image-blog')}
                                                            src={item.Image}
                                                            alt={item.title}
                                                        />

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
                                                            <div className={cx('blog-like')}>
                                                                <button
                                                                    className={cx('btn-z', 'like')}
                                                                    onClick={() => {
                                                                        if (like == []) {
                                                                            setLike(item);
                                                                        } else {
                                                                            if (like.includes(item)) {
                                                                                let listLike = [];
                                                                                like.map((val, ind) => {
                                                                                    if (val.ID != item.ID) {
                                                                                        listLike.push(val);
                                                                                    }
                                                                                });
                                                                                setLike(listLike);
                                                                            } else {
                                                                                setLike([item, ...like]);
                                                                            }
                                                                        }
                                                                    }}
                                                                >
                                                                    <ThumbUpAltIcon />
                                                                    Like{numLike}
                                                                </button>
                                                                <button
                                                                    className={cx('btn-z')}
                                                                    onClick={() => {
                                                                        if (follow == []) {
                                                                            setFollow(item);
                                                                        } else {
                                                                            if (follow.includes(item)) {
                                                                                let listfollow = [];
                                                                                follow.map((val, ind) => {
                                                                                    if (val.ID != item.ID) {
                                                                                        listfollow.push(val);
                                                                                    }
                                                                                });
                                                                                setFollow(listfollow);
                                                                            } else {
                                                                                setFollow([item, ...follow]);
                                                                            }
                                                                        }
                                                                    }}
                                                                >
                                                                    <RemoveRedEyeIcon />
                                                                    Follow{numFollow}
                                                                </button>
                                                            </div>
                                                            <div className={cx('desc')}>
                                                                <p>{item.Content}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    }
                                })}
                                <a
                                    href="/DienAnh"
                                    onClick={() => {
                                        localStorage.setItem('Blog', '0');
                                    }}
                                >
                                    Xem thêm
                                </a>
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
