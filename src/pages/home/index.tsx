import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import HouseList from '../../features/houses/houseList';

const Home = () => {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    fetch('/airbnb/data/houses.json')
      .then((res) => res.json())
      .then((data) => setHouses(data))
      .catch((error) => console.error("Ошибка загрузки данных:", error));
  }, []);

  return (
    <div className={styles['home']}>
      <HouseList houses={houses} />
    </div>
  );
};

export default Home;