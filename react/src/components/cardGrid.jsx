import React from 'react';
import styles from '../css/CardGrid.module.css';

const CardGrid = ({ children }) => {
  return <div className={styles.grid}>{children}</div>;
};

export default CardGrid;
