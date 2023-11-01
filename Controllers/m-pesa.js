const mpesaApiUrl = process.env.MPESA_TEST_URL; // Use MPESA_PROD_URL for production
const apiKey = process.env.MPESA_API_KEY;
const apiSecret = process.env.MPESA_API_SECRET;
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file
// Generate an access token for authentication
const generateAccessToken = async () => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {},
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.error("Error generating access token:", error.response.data);
    throw error;
  }
};
const sendMoney = async () => {
  try {
    const accessToken = await generateAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-:.\D]/g, "")
      .slice(0, -3);
    const password = Buffer.from(
      `${lipaNaMpesaShortcode}${lipaNaMpesaPasskey}${timestamp}`
    ).toString("base64");
    const transactionRequest = {
      Initiator: initiatorName,
      SecurityCredential: securityCredential,
      CommandID: "SalaryPayment",
      Amount: amount,
      PartyA: lipaNaMpesaShortcode,
      PartyB: phoneNumber,
      Remarks: "Payment",
      QueueTimeOutURL: "http://your-callback-url.com/timeout",
      ResultURL: "http://your-callback-url.com/result",
      Occasion: "Payment",
      TransactionType: "CustomerPayBillOnline",
      LipaNaMpesaOnlinePasskey: lipaNaMpesaPasskey,
    };
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      transactionRequest,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("M-Pesa transaction response:", response.data);
  } catch (error) {
    console.error("Error sending money:", error.response.data);
  }
};
sendMoney();

const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64');
const headers = {
  'Authorization': `Basic ${auth}`,
  'Content-Type': 'application/json',
};

const requestData = {
  BusinessShortCode: process.env.MPESA_SHORTCODE,
  Password: process.env.MPESA_SECURITY_CREDENTIAL,
  Timestamp: 'YYYYMMDDHHmmss',
  TransactionType: 'CustomerPayBillOnline',
  Amount: '1',
  PartyA: 'YOUR_PHONE_NUMBER',
  PartyB: process.env.MPESA_SHORTCODE,
  PhoneNumber: 'YOUR_PHONE_NUMBER',
  CallBackURL: 'https://your-callback-url.com/callback',
  AccountReference: 'TestAccount',
  TransactionDesc: 'Test payment',
};

axios.post(`${mpesaApiUrl}/mpesa/stkpush/v1/processrequest`, requestData, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
