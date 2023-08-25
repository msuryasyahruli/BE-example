const Pool = require("../config/db");

const selectAllExample = (limit, offset, sortby, sort) => {
  return Pool.query(
    `SELECT * FROM examples ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectExample = (id) => {
  return Pool.query(`SELECT * FROM examples WHERE id='${id}'`);
};

const insertExample = (data) => {
  const { id, name, image } = data;
  return Pool.query(
    `INSERT INTO examples(id,name,image) VALUES('${id}','${name}','${image}')`
  );
};

const updateExample = (data) => {
  const { id, name, image } = data;
  return Pool.query(
    `UPDATE examples SET name='${name}', image='${image}' WHERE id='${id}'`
  );
};

const deleteExample = (id) => {
  return Pool.query(`DELETE FROM examples WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM examples");
};

const findId = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT id FROM examples WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

const searching = (name) => {
  return Pool.query(`SELECT * FROM examples WHERE name ILIKE '%${name}%'`);
};

module.exports = {
  selectAllExample,
  selectExample,
  insertExample,
  updateExample,
  deleteExample,
  countData,
  findId,
  searching,
};
