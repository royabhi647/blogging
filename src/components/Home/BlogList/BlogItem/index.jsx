import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Chip from '../../../common/Chip';
import './styles.css';

const BlogItem = ({
  blog: {
    description,
    title,
    createdAt,
    authorName,
    authorAvatar,
    cover,
    category,
    id,
  },
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const blogItemRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (blogItemRef.current) {
        const top = blogItemRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (top < windowHeight * 0.9) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`blogItem-wrap ${isVisible ? 'visible' : ''}`}
      ref={blogItemRef}
    >
      <div className='parallax-container'>
        <img className={`blogItem-cover ${isVisible ? 'visible' : ''}`} src={cover} alt='cover' />
      </div>
      <Chip label={category} />
      <h3 className={isVisible ? 'visible' : ''}>{title}</h3>
      <p className={`blogItem-desc ${isVisible ? 'visible' : ''}`}>{description}</p>
      <footer className={isVisible ? 'visible' : ''}>
        <div className='blogItem-author'>
          <img src={authorAvatar} alt='avatar' />
          <div>
            <h6>{authorName}</h6>
            <p>{createdAt}</p>
          </div>
        </div>
        <Link className='blogItem-link' to={`/blog/${id}`}>
          ➝
        </Link>
      </footer>
    </div>
  );
};

export default BlogItem;