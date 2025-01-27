import React from 'react';
import styles from '../css/product-card.module.css';

const ProductCard = ({ title, img, onIconClick }) => {
  const handleIconClick = () => {
    onIconClick({ title, img }); 
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.top}>
          <img src={img} alt={title} className={styles.image} />
        </div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <div className={styles.details}>
              <h1 className={styles.productTitle}>{title}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.inside}>
        <div className={styles.icon} onClick={handleIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            style={{ fill: 'rgba(0, 0, 0, 1)', transform: 'none' }}
          >
            <path d="M19.045 7.401c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.378-.378-.88-.586-1.414-.586s-1.036.208-1.413.585L4 13.585V18h4.413L19.045 7.401zm-3-3 1.587 1.585-1.59 1.584-1.586-1.585 1.589-1.584zM6 16v-1.585l7.04-7.018 1.586 1.586L7.587 16H6zm-2 4h16v2H4z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

