import * as React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewSelect.module.scss';
import Container from 'react-bootstrap/Container';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Pagination from 'react-bootstrap/Pagination';
import { useState, useEffect } from 'react';
import axios from '~/api/axiosClient';
const cx = classNames.bind(styles);

function ListBlog(props) {
    const [active, setActive] = useState(1);
    const [like, setLike] = useState([]);
    const [follow, setFollow] = useState([]);
    let num = 0;
    let data = [];
    props.data.map((value, index) => {
        if (value.Type == props.index) {
            data.push(value);
            num++;
        }
    });
    let items = [];
    for (let number = 1; number <= num / 7 + 1; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={() => {
                    setActive(number);
                }}
            >
                {number}
            </Pagination.Item>,
        );
    }
    return (
        <div className={cx('wrapper')}>
            <Container fluid="xxl">
                <h1 className={cx('title')}>PHIM HAY THÁNG</h1>
                {data.map((value, index) => {
                    if ((active - 1) * 7 <= index && active * 7 > index) {
                        let numLike = value.Like;
                        let numFollow = value.Follow;
                        if (like.includes(value)) {
                            numLike = numLike + 1;
                        }
                        if (follow.includes(value)) {
                            numFollow = numFollow + 1;
                        }
                        const ValueUpdate = {
                            Title: value.Title,
                            Content: value.Content,
                            Image: value.Image,
                            Type: value.Type,
                            Like: numLike,
                            Follow: numFollow,
                            ID: value.ID,
                        };
                        try {
                            axios.put('/Blog/update', ValueUpdate).then((response) => {
                                console.log(response.result);
                            });
                        } catch (error) {
                            console.error(error);
                        }
                        return (
                            <div className={cx('blog-wrapper')} key={index}>
                                <a href="" className={cx('a-image')}>
                                    <img className={cx('blog-image')} src={value.Image} alt={value.ID} />
                                </a>
                                <div className={cx('hover')}></div>
                                <div className={cx('blog_content')}>
                                    <h2 className={cx('blog_title')}>
                                        <a
                                            href="./Blog"
                                            className={cx('link-image')}
                                            onClick={() => {
                                                localStorage.setItem('blog', JSON.stringify(value));
                                            }}
                                        >
                                            {value.Title}
                                        </a>
                                    </h2>
                                    <div className={cx('blog-like')}>
                                        <button
                                            className={cx('btn', 'like')}
                                            onClick={() => {
                                                if (like == []) {
                                                    setLike(value);
                                                } else {
                                                    if (like.includes(value)) {
                                                        let listLike = [];
                                                        like.map((val, ind) => {
                                                            if (val.ID != value.ID) {
                                                                listLike.push(val);
                                                            }
                                                        });
                                                        setLike(listLike);
                                                    } else {
                                                        setLike([value, ...like]);
                                                    }
                                                }
                                            }}
                                        >
                                            <ThumbUpAltIcon />
                                            Like {numLike}
                                        </button>
                                        <button
                                            className={cx('btn')}
                                            onClick={() => {
                                                if (follow == []) {
                                                    setFollow(value);
                                                } else {
                                                    if (follow.includes(value)) {
                                                        let listfollow = [];
                                                        follow.map((val, ind) => {
                                                            if (val.ID != value.ID) {
                                                                listfollow.push(val);
                                                            }
                                                        });
                                                        setFollow(listfollow);
                                                    } else {
                                                        setFollow([value, ...follow]);
                                                    }
                                                }
                                            }}
                                        >
                                            <RemoveRedEyeIcon />
                                            Follow {numFollow}
                                        </button>
                                    </div>
                                    <p className={cx('content')}>{value.Content}</p>
                                </div>
                            </div>
                        );
                    }
                })}
                <div className={cx('next-page')}>
                    <Pagination size="lg">{items}</Pagination>
                </div>
            </Container>
        </div>
    );
}
function ReviewSelect() {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await axios.post('/Blog').then((response) => {
                    setData(response.result);
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);
    if (data) {
        if (JSON.parse(localStorage.getItem('Blog')) === 0) {
            return <ListBlog data={data} index={1} />;
        } else if (JSON.parse(localStorage.getItem('Blog')) === 1) {
            return <ListBlog data={data} index={0} />;
        } else if (JSON.parse(localStorage.getItem('Blog')) === 1) {
            return <ListBlog data={data} index={2} />;
        } else if (JSON.parse(localStorage.getItem('Blog')) === 1) {
            return <ListBlog data={data} index={3} />;
        } else if (JSON.parse(localStorage.getItem('Blog')) === 1) {
            return <ListBlog data={data} index={4} />;
        } else {
            return <ListBlog data={data} index={5} />;
        }
    }
}

export default ReviewSelect;
