const Paytm = require("paytm-pg-node-sdk");
require("dotenv").config();

// Initialize Paytm Merchant Properties
const initializePaytm = () => {
    const environment =
        process.env.PAYTM_ENVIRONMENT === "PRODUCTION"
            ? Paytm.LibraryConstants.PRODUCTION_ENVIRONMENT
            : Paytm.LibraryConstants.STAGING_ENVIRONMENT;

    Paytm.MerchantProperties.initialize(
        environment,
        process.env.PAYTM_MID,
        process.env.PAYTM_KEY,
        process.env.PAYTM_CLIENT_ID,
        process.env.PAYTM_WEBSITE
    );

    Paytm.MerchantProperties.setCallbackUrl(process.env.PAYTM_CALLBACK_URL);
};

// Create a transaction token
const createTransactionToken = async (req, res) => {
    try {
        initializePaytm(); // Ensure Paytm is initialized

        const { orderId, amount, customerId, email, mobile } = req.body;

        const txnAmount = Paytm.Money.constructWithCurrencyAndValue(
            Paytm.EnumCurrency.INR,
            amount
        );

        const userInfo = new Paytm.UserInfo(customerId);
        userInfo.setEmail(email);
        userInfo.setMobile(mobile);

        const paymentDetailBuilder = new Paytm.PaymentDetailBuilder(
            Paytm.EChannelId.WEB,
            orderId,
            txnAmount,
            userInfo
        );

        const paymentDetail = paymentDetailBuilder.build();
        const response = await Paytm.Payment.createTxnToken(paymentDetail);

        res.json({ success: true, token: response.getResponseObject().body });
    } catch (error) {
        console.error("Error creating transaction token:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get payment status
const getPaymentStatus = async (req, res) => {
    try {
        initializePaytm();

        const { orderId } = req.body;

        const paymentStatusDetailBuilder = new Paytm.PaymentStatusDetailBuilder(
            orderId
        );
        const paymentStatusDetail = paymentStatusDetailBuilder.build();

        const response = await Paytm.Payment.getPaymentStatus(paymentStatusDetail);

        res.json({ success: true, status: response.getResponseObject().body });
    } catch (error) {
        console.error("Error fetching payment status:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    createTransactionToken,
    getPaymentStatus,
};
