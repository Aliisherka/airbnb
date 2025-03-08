import React from 'react';
import styles from './styles.module.scss';
import HouseCard from './houseCard';

const HouseList = ({ houses }: { houses: any[] }) => {
  return (
    <div className={styles['house-list']}>
      {houses.map((house) => (
        <HouseCard
          key={house.id}
          title={house.title}
          distance={house.distance}
          price={house.price}
          rating={house.rating}
          images={house.images}
        />
      ))}
    </div>
  );
};

export default HouseList;