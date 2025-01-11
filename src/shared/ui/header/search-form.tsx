import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import IconSvg from '../../assets/icons/icon';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// import DatePickerForm from '../datePicker';

const SearchForm = () => {
  const [hoveredField, setHoveredField] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [focusField, setFocusField] = useState<string | null>(null);
  const [dates, setDates] = useState({
    arrival: null,
    departure: null,
  });
  const [calendarStyle, setCalendarStyle] = useState({});
  const [showGuestsPopup, setShowGuestsPopup] = useState(false);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);

  const containerRef = useRef(null);
  const calendarRef = useRef(null);
  const guestsPopupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Обработчик клика вне компонента
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowCalendar(false);
        setFocusField(null);
      }

      if (
        guestsPopupRef.current &&
        !guestsPopupRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowGuestsPopup(false);
        // Если фокус был на поле guests, то сбрасываем (по желанию)
        if (focusField === 'guests') {
          setFocusField(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    // console.log(focusField)
    if (focusField === 'arrival') {
      setDates((prev) => ({
        ...prev,
        arrival: startDate,
        departure: startDate > (prev.departure || startDate) ? null : prev.departure, // Сбрасываем выезд, если дата "прибытия" позже
      }));
      setFocusField('departure'); // Переходим к выбору "Выезда"
    } else {
      setDates((prev) => ({
        ...prev,
        departure: endDate,
      }));
      setShowCalendar(false); // Закрываем календарь после выбора "Выезда"
    }
  };

  const toggleCalendar = (field) => {
    console.log(focusField)
    if (focusField === field) {
      setShowCalendar(false); // Закрываем календарь, если поле уже активно
      setFocusField(null);
    } else {
      setFocusField(field); // Устанавливаем текущее активное поле
      setShowCalendar(true);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setCalendarStyle({
          position: 'absolute',
          top: `${rect.bottom + 0}px`,
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #ddd',
          borderRadius: '25px',
          overflow: 'hidden',
        });
      }
    }
  };

  const handleBlur = () => {
    setFocusField(null); // Сбрасываем активное поле при потере фокуса
  };

  const handleMouseEnter = (field: string) => {
    setHoveredField(field); // Устанавливаем активное поле при наведении
  };

  const handleMouseLeave = () => {
    setHoveredField(null); // Сбрасываем активное поле при выходе мыши
  };

  const toggleGuestsPopup = () => {
    if (focusField === 'guests') {
      // Если уже активно — закрываем
      setShowGuestsPopup(false);
      setFocusField(null);
    } else {
      // Иначе открываем
      setFocusField('guests');
      setShowGuestsPopup(true);
    }
  };

  const incrementAdults = () => setAdults(adults + 1);
  const decrementAdults = () => {
    if (adults > 1) setAdults(adults - 1);
  };

  const incrementChildren = () => setChildren(children + 1);
  const decrementChildren = () => {
    if (children > 0) setChildren(children - 1);
  };

  const guestsString = () => {
    const guestsCount = adults + children;
    if (guestsCount === 0) return '';
    // Пример формата: "2 взрослых, 1 ребёнок"
    let str = `${adults} взросл${adults > 1 ? 'ых' : 'ый'}`;
    if (children > 0) {
      str += `, ${children} дет${children > 1 ? 'ей' : 'ёныш'}`;
    }
    return str;
  };

  return (
    <form
      className={`${styles['search-form']} ${
        focusField ? styles['blurred'] : ''
      }`}
      action='/search'
      method='GET'
      ref={containerRef}
    >
      <div 
        className={`${styles['search-field']} ${styles['location']} ${
          focusField === 'location' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('location')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='location' className={styles["label"]}>
            Где
          </label>
          <input
            type='text'
            id='location'
            name='location'
            placeholder='Поиск направлений'
            required
            className={styles["input"]}
            onFocus={() => setFocusField('location')}
            onBlur={handleBlur}
          />
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'location' || hoveredField === 'arrival' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['arrival']} ${
          focusField === 'arrival' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('arrival')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='arrival' className={styles["label"]}>
            Прибытие
          </label>
          <input
            type='text'
            id='arrival'
            readOnly
            value={dates.arrival ? dates.arrival.toDateString() : ""}
            placeholder='Когда?'
            onClick={() => toggleCalendar('arrival')}
            // onBlur={handleBlur}
            className={styles["input"]}
          />
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'arrival' || hoveredField === 'departure' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['departure']} ${
          focusField === 'departure' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('departure')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='departure' className={styles["label"]}>
            Выезд
          </label>
          <input
            type='text'
            id='departure'
            readOnly
            value={dates.departure ? dates.departure.toDateString() : ""}
            placeholder='Когда?'
            onClick={() => toggleCalendar("departure")}
            className={styles["input"]}
          />
      </div>
      <div 
        className={`${styles['divider']} ${
          hoveredField === 'departure' || hoveredField === 'guests' ? styles['hidden'] : ''
        }`}
      ></div>
      <div 
        className={`${styles['search-field']} ${styles['guests']} ${
          focusField === 'guests' ? styles['active'] : ''
        }`}
        onMouseEnter={() => handleMouseEnter('guests')}
        onMouseLeave={handleMouseLeave}
      >
          <label htmlFor='guests' className={styles["label"]}>
            Кто
          </label>
          <input
            type='text'
            id='guests'
            name='guests'
            placeholder='Кто едет?'
            className={styles["input"]}
            onBlur={handleBlur}
            onClick={toggleGuestsPopup}
            value={guestsString()}
          />
      </div>
      <button type='submit' className={styles["search-button"]}>
        <IconSvg name='search-icon' width='16px' height='16px' />
      </button>
      {showCalendar && (
        <div ref={calendarRef} style={calendarStyle}>
          <DateRange
            ranges={[
              {
                startDate: dates.arrival || new Date(),
                endDate: dates.departure || dates.arrival || new Date(),
                key: "selection",
              },
            ]}
            onChange={handleSelect}
            minDate={new Date()} // Запрет на выбор прошлых дат
            rangeColors={["#ff5a5f"]}
            months={2} // Два месяца рядом
            direction='horizontal' // Горизонтальная ориентация
            className={styles["hiddenRanges"]}
          />
        </div>
      )}
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
            <button onClick={decrementAdults} disabled={adults <= 1}>
              -
            </button>
            <span style={{ margin: '0 8px' }}>{adults}</span>
            <button onClick={incrementAdults}>+</button>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '4px' }}>
              Дети
            </label>
            <button onClick={decrementChildren} disabled={children <= 0}>
              -
            </button>
            <span style={{ margin: '0 8px' }}>{children}</span>
            <button onClick={incrementChildren}>+</button>
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchForm;
