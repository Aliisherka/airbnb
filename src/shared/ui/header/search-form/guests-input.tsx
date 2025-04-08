import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
  focusField: string | null;
  setFocusField: (field: string | null) => void;
  showGuestsPopup: boolean;
  setShowGuestsPopup: (value: boolean) => void;
  guestsPopupRef: React.RefObject<HTMLDivElement>;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

const GuestsInput: React.FC<Props> = ({
  focusField,
  setFocusField,
  showGuestsPopup,
  setShowGuestsPopup,
  guestsPopupRef,
  onMouseEnter,
  onMouseLeave,

}) => {
  const { t } = useTranslation();
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const toggleGuestsPopup = () => {
    if (focusField === 'guests') {
      setShowGuestsPopup(false);
      setFocusField(null);
    } else {
      setFocusField('guests');
      setShowGuestsPopup(true);
    }
  };

  const guestsString = () => {
    const guestsCount = adults + children;
    if (guestsCount === 0) return '';
    let str = `${adults} взросл${adults > 1 ? 'ых' : 'ый'}`;
    if (children > 0) {
      str += `, ${children} дет${children > 1 ? 'ей' : 'ёныш'}`;
    }
    return str;
  };

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

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
        <input
          type='text'
          id='guests'
          name='guests'
          placeholder={t('add-guests')}
          className={styles['input']}
          onClick={toggleGuestsPopup}
          value={guestsString()}
          readOnly
        />
      </div>
      {showGuestsPopup && (
        <div
          ref={guestsPopupRef}
          style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            zIndex: 1001,
            padding: '1rem',
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Взрослые
            </label>
            <button onClick={decrementAdults} disabled={adults <= 1}>-</button>
            <span style={{ margin: '0 8px' }}>{adults}</span>
            <button onClick={incrementAdults}>+</button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Дети
            </label>
            <button onClick={decrementChildren} disabled={children <= 0}>-</button>
            <span style={{ margin: '0 8px' }}>{children}</span>
            <button onClick={incrementChildren}>+</button>
          </div>
        </div>
      )}
    </>
  );
};

export default GuestsInput;