const express = require("express");

const {
    createTransactionToken,
    getPaymentStatus,
} = require("../controllers/payment/paymentController");

const { auth } = require('../middlewares/auth')
const router = express.Router();

router.post("/createTransactionToken", auth, createTransactionToken);
router.post("/getPaymentStatus", auth, getPaymentStatus);

module.exports = router;
