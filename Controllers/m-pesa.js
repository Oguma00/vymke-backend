const mpesaApiUrl = process.env.MPESA_TEST_URL; // Use MPESA_PROD_URL for production
const apiKey = process.env.MPESA_API_KEY;
const apiSecret = process.env.MPESA_API_SECRET;

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
