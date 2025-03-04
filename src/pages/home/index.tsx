import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import HouseList from '../../features/houses/houseList';
import { getHouses } from '../../shared/api/houses';

const Home = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    getHouses().then(setHouses);
  }, []);

  return (
    <div className={styles['home']}>
      <HouseList houses={houses} />
    </div>
  );
};

export default Home;