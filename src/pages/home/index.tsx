import React, { useEffect } from 'react';
import styles from './styles.module.scss';
import HouseList from '../../features/houses/houseList';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { fetchHouses } from '../../app/slices/housesSlice';

const Home = () => {
  const dispatch = useAppDispatch();
  const { houses, searchResults, status } = useAppSelector(state => state.houses);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const displayedHouses = searchResults !== null ? searchResults : houses;

  return (
    <div className={styles['home']}>
      {status === 'loading' && <p>Загрузка...</p>}
      {status === 'failed' && <p>Ошибка загрузки</p>}
      {displayedHouses.length > 0 ? (
        <HouseList houses={displayedHouses} />
      ) : (
        <p>Дома не найдены</p>
      )}
    </div>
  );
};

export default Home;