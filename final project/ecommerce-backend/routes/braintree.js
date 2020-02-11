const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controller/auth");
const { userbyId } = require("../controller/user");
const { generateToken, processPayment } = require("../controller/braintree");

router.get("/braintree/getToken/:userId", requireSignin, isAuth, generateToken);
router.post(
    "/braintree/payment/:userId",
    requireSignin,
    isAuth,
    processPayment
);

router.param("userId", userbyId);

module.exports = router;
