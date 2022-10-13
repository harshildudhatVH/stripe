const Secret_Key = process.env.SECRET_KEY
const Publishable_Key = process.env.Publishable_Key
const stripe = require("stripe")(Secret_Key)

exports.newCustomer = async (req, res) => {
    try {
        const customer = await stripe.customers.create({
            name: req.body.name,
            email: req.body.email
        })
        return res.status(200).json({
            message: "Customer created successfully",
            customer
        })
    } catch (error) {
        return res.status(400).json({
            message: "Unable to create"
        })
    }
}

exports.addCard =  async (req, res) => {
    try {
        const card_token = await stripe.tokens.create({
            card: {
                name: req.body.card_name,
                number: req.body.card_number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
        })
        const customer_Id = req.body.customer_id
        const card = await stripe.customers.createSource(customer_Id, {
            source: `${card_token.id}`
        })
        return res.status(200).json({ card: card.id })
    } catch (error) {
        return res.status(400).json({
            message: "Unable to create card",
            error
        })
    }
}

exports.newPayment = async (req, res, next) => {
    try {

        let paymentMethod = await stripe.paymentMethods.create({
            type: "card",
            card: {
                number: req.body.card_number,
                exp_month: req.body.exp_month,
                exp_year: req.body.exp_year,
                cvc: req.body.cvc
            }
        })
        let paymentIntent = await stripe.paymentIntents.create({
            payment_method: paymentMethod.id,
            amount: 75 * 100,
            currency: "inr",
            confirm: true,
            payment_method_types: ["card"]
        })
        return res.status(200).json({
            message: "Payment made successfully",
            paymentIntent
        })
    } catch (error) {
        return res.status(400).json({
            message: "Something is wrong",
            error
        })
    }
}

exports.getPaymentDetails = async (req,res) => {
    try {
        const paymentDetails =  await stripe.paymentIntents.retrieve(`${req.body.payment_id}`);
          return res.status(200).json(paymentDetails)
    } catch (error) {
        return res.status(400).json({
            message:"Unable to fetch details",
            error
        })
    }
}

exports.getRefund = async (req,res) => {
    try {
        const refundData = await await stripe.refunds.create({
            payment_intent: `${req.body.payment_id}`,
          });
          return res.status(200).json({
            message:"Refund make successfully",
            refundData
          })
    } catch (error) {
        return res.status(400).json({
            message:"Unable to make refund",
            error
        })
    }
}