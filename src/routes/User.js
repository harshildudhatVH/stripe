const express = require("express")
const { newCustomer, addCard, newPayment, getPaymentDetails, getRefund } = require("../controllers/Payment")
const router = express.Router()
const Secret_Key = process.env.SECRET_KEY
const Publishable_Key = process.env.Publishable_Key
const stripe = require("stripe")(Secret_Key)

router.get("/", (req, res) => {
    res.render('Home', {
        key: Publishable_Key
    })
})

router.post("/customer/new",newCustomer)

router.post("/card/add",addCard)

/**
 * !Payment
 */

router.post("/payment", newPayment)

/**
 * !Get payment details
 */

router.get("/payment/detail",getPaymentDetails)

/**
 * !Post refund request
 */

router.post("/refund",getRefund)

module.exports = router