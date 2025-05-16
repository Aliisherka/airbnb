import React, { useEffect } from 'react';
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
  const location = params.get('location') || '';
  const adults = params.get('adults') || '0';
  const children = params.get('children') || '0';
  const infants = params.get('infants') || '0';
  const pets = params.get('pets') || '0';
  const arrival = params.get('arrival') || '';
  const departure = params.get('departure') || '';

  const totalAdults = String((parseInt(adults, 10) || 0) + (parseInt(children, 10) || 0));

  useEffect(() => {
    if (location || parseInt(adults) > 0 || arrival || departure) {
      dispatch(searchHouses({ 
        location, 
        totalAdults, 
        infants, 
        pets,
        arrival, 
        departure
      }));
    } else {
      dispatch(fetchHouses());
    }
  }, [location, totalAdults, infants, pets, arrival, departure, dispatch]);

  const displayedHouses = searchResults ?? houses;

  return (
    <div className={styles['home']}>
      {displayedHouses.length === 0 && status === 'loading' && <LoadingScreen />}
      {displayedHouses.length > 0 && <HouseList houses={displayedHouses} />}
    </div>
  );
};

export default Home;