import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import HouseList from '../../features/houses/houseList';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { fetchHouses, searchHouses } from '../../app/slices/housesSlice';
import { LoadingScreen } from '../../shared/ui/loading-screen';
import { useSearchParams } from 'react-router-dom';

const Home = () => {
  const dispatch = useAppDispatch();
  const { houses, searchResults, status } = useAppSelector(state => state.houses);
  const [params] = useSearchParams();
  const location = params.get('location');

  useEffect(() => {
    if (location) {
      dispatch(searchHouses(location));
    } else {
      dispatch(fetchHouses());
    }
  }, [location ,dispatch]);

  const displayedHouses = searchResults ?? houses;

  return (
    <div className={styles['home']}>
      {displayedHouses.length === 0 && status === 'loading' && <LoadingScreen />}
      {displayedHouses.length > 0 && <HouseList houses={displayedHouses} />}
    </div>
  );
};

export default Home;