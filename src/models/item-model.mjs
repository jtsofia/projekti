import promisePool from '../utils/database.mjs';

const listAllItems = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM FoodEntries');
    console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findItemById = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM FoodEntries WHERE entry_id = ?', [id]);
    console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addItem = async (entry) => {
  const {user_id, entry_date, meal, calories, foodname, notes} = item;
  const sql = `INSERT INTO FoodEntries (user_id, entry_date, meal, calories, foodname  VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, meal, calories, foodname, notes];
  try {
    const rows = await promisePool.query(sql, params);
    console.log('rows', rows);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

export default listAllItems;


