
import promisePool from '../utils/database.mjs';

const listAllEntries = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM FoodEntries');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const listAllEntriesByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM FoodEntries WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findEntryById = async (id, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM FoodEntries WHERE entry_id = ? AND user_id = ?',
      [id, userId],
    );
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addEntry = async (entry) => {
  const {user_id, entry_date, meal, calories, foodname, notes} = entry;
  const sql = `INSERT INTO FoodEntries
               (user_id, entry_date, meal, calories, foodname, notes)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [user_id, entry_date, meal, calories, foodname, notes];
  try {
    const rows = await promisePool.query(sql, params);
    return {entry_id: rows[0].insertId};
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const updateEntryById = async (entryId, userId, entryData) => {
  try {
    const params = [entryData, entryId, userId];
    const sql = promisePool.format(
      `UPDATE FoodEntries SET ? WHERE entry_id=? and user_id=?`, params,
    );
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry data updated', entry_id: entryId};
  } catch (error) {
    // fix error handling
    console.error('updateEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteEntryById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM FoodEntries WHERE entry_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'entry not found'};
    }
    return {message: 'entry deleted', entry_id: id};
  } catch (error) {
    console.error('deleteEntryById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllEntries,
  listAllEntriesByUserId,
  findEntryById,
  addEntry,
  updateEntryById,
  deleteEntryById,
};