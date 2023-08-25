const {
  selectAllExample,
  selectExample,
  insertExample,
  updateExample,
  deleteExample,
  countData,
  findId,
  searching,
} = require("../model/example");
const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middleware/cloudinary");
// const client = require("../config/redis");

const exampleController = {
  getAllExample: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllExample(limit, offset, sortby, sort);
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };
      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },
  getDetailExample: async (req, res) => {
    const id = String(req.params.id);
    const { rowCount } = await findId(id);
    if (!rowCount) {
      return res.json({ message: "ID Not Found" });
    }
    selectExample(id)
      .then((result) => {
        // client.setEx(`examples/${id}`, 60 * 60, JSON.stringify(result.rows));
        commonHelper.response(
          res,
          result.rows,
          200,
          "get data success from database"
        );
      })
      .catch((err) => res.send(err));
  },
  createExample: async (req, res) => {
    // const PORT = process.env.PORT || 2525;
    // const DB_HOST = process.env.PGHOST || "localhost";
    const result = await cloudinary.uploader.upload(req.file.path);
    const image = result.secure_url;
    const { name } = req.body;
    const id = uuidv4();
    const data = {
      id,
      name,
      image,
    };
    insertExample(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Example created")
      )
      .catch((err) => res.send(err));
  },
  updateExample: async (req, res) => {
    try {
      // const PORT = process.env.PORT || 2525;
      // const DB_HOST = process.env.PGHOST || "localhost";
      const id = String(req.params.id);
      const result = await cloudinary.uploader.upload(req.file.path);
      const image = result.secure_url;
      const { name } = req.body;
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      const data = {
        id,
        name,
        image,
      };
      updateExample(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Example updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  deleteExample: async (req, res) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findId(id);
      if (!rowCount) {
        res.json({ message: "ID is Not Found" });
      }
      deleteExample(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Example deleted")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },
  searching: async (req, res) => {
    const search = req.query.keyword;
    searching(search)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, "Search success");
      })
      .catch((err) => res.send(err));
  },
};

module.exports = exampleController;
