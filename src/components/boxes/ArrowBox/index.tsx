import React from 'react';
import styles from './styles.module.css';

type ArrowBoxProps = {
  children: string;
};

const ArrowBox: React.FC<ArrowBoxProps> = ({ children }) => {
  return <div className={styles.arrowBox}>{children}</div>;
};

export default ArrowBox;
