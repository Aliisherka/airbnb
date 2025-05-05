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
  const [showLoader, setShowLoader] = useState(false);

  const [params] = useSearchParams();
  const location = params.get('location');

  useEffect(() => {
    if (location) {
      dispatch(searchHouses(location));
    } else {
      dispatch(fetchHouses());
    }
  }, [location ,dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (status === 'loading') {
      timer = setTimeout(() => {
        setShowLoader(true);
      }, 600);
    } else {
      if (timer) clearTimeout(timer);
      setShowLoader(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    }
  }, [status]);

  const displayedHouses = searchResults !== null ? searchResults : houses;

  return (
    <div className={styles['home']}>
      {showLoader && <LoadingScreen />}
      {displayedHouses.length > 0 && <HouseList houses={displayedHouses} />}
    </div>
  );
};

export default Home;