import React from 'react';
import { useTranslation } from 'react-i18next';
import IconSvg from '../../../assets/icons/icon';
import DropdownMenu from '../../dropdown-menu/dropdown-menu';
import GuestCounterItem from './guest-counter-item';
import styles from './styles.module.scss';

type GuestType = 'adults' | 'children' | 'infants' | 'pets';
type GuestsSetter = React.Dispatch<React.SetStateAction<number>>

type GuestsProps = {
  adults: number;
  children: number;
  infants: number;
  pets: number;
  increment: (type: GuestType) => void;
  decrement: (type: GuestType) => void;
  guestsString: () => string;
  setAdults: GuestsSetter;
  setChildren: GuestsSetter;
  setInfants: GuestsSetter;
  setPets: GuestsSetter;
};

type Props = {
  guests: GuestsProps;
  focusField: string | null;
  setFocusField: (field: string | null) => void;
  showGuestsPopup: boolean;
  setShowGuestsPopup: (value: boolean) => void;
  guestsPopupRef: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const GuestsInput: React.FC<Props> = ({
  guests,
  focusField,
  setFocusField,
  showGuestsPopup,
  setShowGuestsPopup,
  guestsPopupRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { t } = useTranslation();
  const { adults, children, infants, pets, increment, decrement, guestsString, setAdults, setChildren, setInfants, setPets  } = guests;

  const toggleGuestsPopup = () => {
    if (focusField === 'guests') {
      setShowGuestsPopup(false);
      setFocusField(null);
    } else {
      setFocusField('guests');
      setShowGuestsPopup(true);
    }
  };

  const resetGuests = () => {
    setAdults(0)
    setChildren(0)
    setInfants(0)
    setPets(0)
    setShowGuestsPopup(true);
  }

  return (
    <>
      <div
        className={`${styles['search-field']} ${styles['guests']} ${
          focusField === 'guests' ? styles['active'] : ''
        }`}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <label htmlFor='guests' className={styles['label']}>
          {t('who')}
        </label>
        <DropdownMenu
          button={
            <input
              type='text'
              id='guests'
              name='guests'
              placeholder={t('add-guests')}
              className={`${styles['input']} ${styles['guests-input']} ${focusField === 'guests' ? styles['active'] : ''}`}
              onClick={toggleGuestsPopup}
              value={guestsString()}
              readOnly
            />
          }
          isOpen={showGuestsPopup}
          onClose={() => {setShowGuestsPopup(false)}}
          positionStyle={{ right: '0', top: '58px' }}
        >
          <div className={styles['dropdown-list-guests']} ref={guestsPopupRef}>
            <GuestCounterItem 
              title={t('adults')} 
              subtitle={t('ages-13-or-above')}
              value={adults}
              onIncrement={() => increment('adults')}
              onDecrement={() => decrement('adults')}
              isDecrementDisabled={adults <= 0 || (adults === 1 && (children > 0 || infants > 0 || pets > 0))}
            />
            <GuestCounterItem 
              title={t('children')} 
              subtitle={t('ages-2-12')}
              value={children}
              onIncrement={() => increment('children')}
              onDecrement={() => decrement('children')}
            />
            <GuestCounterItem 
              title={t('infants')} 
              subtitle={t('under-2')}
              value={infants}
              onIncrement={() => increment('infants')}
              onDecrement={() => decrement('infants')}
            />
            <GuestCounterItem 
              title={t('pets')} 
              subtitle={t('bringing-a-service-animal?')}
              value={pets}
              onIncrement={() => increment('pets')}
              onDecrement={() => decrement('pets')}
            />
          </div>
        </DropdownMenu>

        {(focusField === 'guests' && (adults > 0 || children > 0 || infants > 0 || pets > 0)) && (
          <button
            type='button'
            className={styles['clear-button']}
            onClick={(e) => {
              e.stopPropagation();
              resetGuests();
            }}
            aria-label='Clear guest selection'
          >
            <IconSvg name='close' width='12px' height='12px'/> 
          </button>
        )}
      </div>
    </>
  );
};

export default GuestsInput;