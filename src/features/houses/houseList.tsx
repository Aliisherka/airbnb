import React from 'react';
import styles from './styles.module.scss';
import HouseCard from './houseCard/houseCard';
import { House } from '../../shared/types/house';

const HouseList = ({ houses, exchangeRates }: { houses: House[], exchangeRates: Record<string, number> }) => {
  return (
    <div className={styles['house-list']}>
      {houses.map((house) => (
        <HouseCard
          key={house._id}
          {...house}
          exchangeRate={exchangeRates[house.currency]}
        />
      ))}
    </div>
  );
};

export default HouseList;