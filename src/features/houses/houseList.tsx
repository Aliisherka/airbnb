import React from 'react';
import styles from './styles.module.scss';
import HouseCard from './houseCard/houseCard';
import { House } from '../../shared/types/house';

const HouseList = ({ houses }: { houses: House[] }) => {
  return (
    <div className={styles['house-list']}>
      {houses.map((house) => (
        <HouseCard
          key={house._id}
          title={house.title}
          // distance={house.distance}
          price={house.price}
          rating={house.rating}
          images={house.images}
          _id={house._id} 
          city={''} 
          country={''} 
          createdAt={''} 
          updatedAt={''} 
          __v={0}        />
      ))}
    </div>
  );
};

export default HouseList;