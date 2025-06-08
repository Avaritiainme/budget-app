import React from 'react';

function MonthFilter({
  transactions,
  selectedMonth,
  setSelectedMonth,
  filterMode,
  setFilterMode,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}) {
  const getMonthOptions = () => {
    const uniqueMonths = new Set();
    transactions.forEach((t) => {
      if (!t.date) return;
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      uniqueMonths.add(monthKey);
    });
    const sorted = [...uniqueMonths].sort().reverse();
    return ['all', ...sorted];
  };

  const formatLabel = (value) => {
    if (value === 'all') return 'Depuis le début';
    const [year, month] = value.split('-');
    return `${new Date(year, month - 1).toLocaleString('fr-FR', { month: 'long' })} ${year}`;
  };  const styles = {
    container: {
      textAlign: 'center',
      marginBottom: '1rem',
      fontFamily: 'Galdeano, sans-serif',
    },
    toggle: {
      marginBottom: '1rem',
    },
    select: {
      padding: '0.5rem 1rem',
      backgroundColor: '#261B1B',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
    },
    input: {
      padding: '0.5rem 1rem',
      backgroundColor: '#261B1B',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      margin: '0 0.5rem',
    },
    label: {
      marginRight: '0.5rem',
      color: '#fff',
    },
  };

  const handleStartChange = (e) => {
    const value = e.target.value;
    if (endDate && value && value > endDate) {
      alert('La date de d\xE9but doit \xEAtre ant\xE9rieure \xE0 la date de fin.');
      return;
    }
    setStartDate(value);
  };

  const handleEndChange = (e) => {
    const value = e.target.value;
    if (startDate && value && value < startDate) {
      alert('La date de fin doit \xEAtre post\xE9rieure \xE0 la date de d\xE9but.');
      return;
    }
    setEndDate(value);
  };

  return (
    <div style={styles.container}>
      <div style={styles.toggle}>
        <label style={styles.label}>
          <input
            type="radio"
            value="month"
            checked={filterMode === 'month'}
            onChange={() => setFilterMode('month')}
          />{' '}
          Par mois
        </label>
        <label style={styles.label}>
          <input
            type="radio"
            value="range"
            checked={filterMode === 'range'}
            onChange={() => setFilterMode('range')}
          />{' '}
          Entre deux dates
        </label>
      </div>

      {filterMode === 'month' ? (
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={styles.select}
        >
          {getMonthOptions().map((month) => (
            <option key={month} value={month}>
              {formatLabel(month)}
            </option>
          ))}
        </select>
      ) : (
        <div>
          <input
            type="date"
            value={startDate}
            onChange={handleStartChange}
            style={styles.input}
          />
          <input
            type="date"
            value={endDate}
            onChange={handleEndChange}
            style={styles.input}
          />
        </div>
      )}
    </div>
  );
}

export default MonthFilter;
