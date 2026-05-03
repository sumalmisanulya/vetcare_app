const axios = require("axios");

/**
 * Send SMS using eSMS API (GET method)
 * @param {string} phoneNumber - Recipient's phone number
 * @param {string} message - The message content
 */
const sendSMS = async (phoneNumber, message) => {
  if (!phoneNumber) return null;

  try {
    const esmsqk = process.env.ESMS_API_KEY;
    const source_address = process.env.ESMS_SENDER_ID;
    
    // Format number: Remove non-digits and leading zero
    let formattedNumber = phoneNumber.replace(/\D/g, "");
    
    // Convert local format (07XXXXXXXX) to international (947XXXXXXXX)
    if (formattedNumber.startsWith("0")) {
      formattedNumber = "94" + formattedNumber.substring(1);
    } else if (!formattedNumber.startsWith("94") && formattedNumber.length === 9) {
      formattedNumber = "94" + formattedNumber;
    }

    const url = "https://e-sms.dialog.lk/api/v1/message-via-url/create/url-campaign";
    
    const response = await axios.get(url, {
      params: {
        esmsqk: esmsqk,
        list: formattedNumber,
        source_address: source_address,
        message: message
      }
    });

    // API returns '1' on success
    if (response.data == 1) {
      console.log(`[SMS] Successfully sent to ${formattedNumber}`);
    } else {
      console.warn(`[SMS] API returned status: ${response.data} for ${formattedNumber}`);
    }
    
    return response.data;
  } catch (error) {
    console.error("[SMS] Sending failed:", error.response?.data || error.message);
    return null;
  }
};

module.exports = { sendSMS };
