import React from 'react';
import styles from './styles.module.scss';
import HouseCard from './houseCard/houseCard';

const HouseList = ({ houses }: { houses: any[] }) => {
  return (
    <div className={styles['house-list']}>
      {houses.map((house) => (
        <HouseCard
          key={house._id}
          title={house.title}
          distance={house.distance}
          price={house.price}
          rating={house.rating}
          images={house.images}
          _id={house._id}
        />
      ))}
    </div>
  );
};

export default HouseList;