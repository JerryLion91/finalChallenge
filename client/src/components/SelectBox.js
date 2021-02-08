import React from 'react';

export const PERIODS = [
  { value: '2019-01', description: 'jan/2019' },
  { value: '2019-02', description: 'fev/2019' },
  { value: '2019-03', description: 'mar/2019' },
  { value: '2019-04', description: 'abr/2019' },
  { value: '2019-05', description: 'mai/2019' },
  { value: '2019-06', description: 'jun/2019' },
  { value: '2019-07', description: 'jul/2019' },
  { value: '2019-08', description: 'ago/2019' },
  { value: '2019-09', description: 'set/2019' },
  { value: '2019-10', description: 'out/2019' },
  { value: '2019-11', description: 'nov/2019' },
  { value: '2019-12', description: 'dez/2019' },
  { value: '2020-01', description: 'jan/2020' },
  { value: '2020-02', description: 'fev/2020' },
  { value: '2020-03', description: 'mar/2020' },
  { value: '2020-04', description: 'abr/2020' },
  { value: '2020-05', description: 'mai/2020' },
  { value: '2020-06', description: 'jun/2020' },
  { value: '2020-07', description: 'jul/2020' },
  { value: '2020-08', description: 'ago/2020' },
  { value: '2020-09', description: 'set/2020' },
  { value: '2020-10', description: 'out/2020' },
  { value: '2020-11', description: 'nov/2020' },
  { value: '2020-12', description: 'dez/2020' },
  { value: '2021-01', description: 'jan/2021' },
  { value: '2021-02', description: 'fev/2021' },
  { value: '2021-03', description: 'mar/2021' },
  { value: '2021-04', description: 'abr/2021' },
  { value: '2021-05', description: 'mai/2021' },
  { value: '2021-06', description: 'jun/2021' },
  { value: '2021-07', description: 'jul/2021' },
  { value: '2021-08', description: 'ago/2021' },
  { value: '2021-09', description: 'set/2021' },
  { value: '2021-10', description: 'out/2021' },
  { value: '2021-11', description: 'nov/2021' },
  { value: '2021-12', description: 'dez/2021' },
];

export default function SelectBox({ period, onChange }) {
  const handlePeriodChange = ({ target }) => {
    onChange(target.value);
  };
  const handlePeriodDecrement = () => {
    const index = PERIODS.findIndex((e) => {
      return e.value === period;
    });
    onChange(PERIODS[index < 1 ? 0 : index - 1].value);
  };
  const handlePeriodIncrement = () => {
    const index = PERIODS.findIndex((e) => {
      return e.value === period;
    });
    onChange(
      PERIODS[index < PERIODS.length - 1 ? index + 1 : PERIODS.length - 1].value
    );
  };

  return (
    <div style={styles.flexRow}>
      <button className={'btn'} onClick={handlePeriodDecrement}>
        {'<'}
      </button>
      <label>
        Pick your period to analyse:
        <select
          className={'browser-default'}
          value={period}
          style={styles.selectBox}
          onChange={handlePeriodChange}
        >
          {PERIODS.map((period, index) => {
            return (
              <option key={index} value={period.value}>
                {period.description}
              </option>
            );
          })}
        </select>
      </label>
      <button className={'btn'} onClick={handlePeriodIncrement}>
        {'>'}
      </button>
    </div>
  );
}

const styles = {
  flexRow: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  selectBox: {
    width: '40vw',
  },
};
