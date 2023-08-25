const express = require("express");
const router = express.Router();
const examplesController = require("../controller/examples");
const upload = require("../middleware/upload");
// const {  validationRole, protect } = require("../middleware/auth");
// const {
//   hitCacheExampleDetail,
//   clearCacheExampleDetail,
// } = require("../middleware/redis");

router
  .get("/", examplesController.getAllExample)
  .get("/search", examplesController.searching)
  .get(
    "/:id",
    // hitCacheExampleDetail,
    examplesController.getDetailExample
  )
  .post(
    "/",
    // protect,
    // validationRole,
    upload,
    examplesController.createExample
  )
  .put(
    "/:id",
    // protect,
    // validationRole,
    upload,
    // clearCacheExampleDetail,
    examplesController.updateExample
  )
  .delete(
    "/:id",
    // protect,
    // validationRole,
    // clearCacheExampleDetail,
    examplesController.deleteExample
  );

module.exports = router;
