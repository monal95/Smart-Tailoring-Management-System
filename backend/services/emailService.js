const axios = require("axios");

// Initialize Brevo with API key from environment
const apiKey = process.env.BREVO_API_KEY;
const brevoApiUrl = "https://api.brevo.com/v3/smtp/email";
const fromEmail = process.env.BREVO_FROM_EMAIL || "monalprashanth98@gmail.com";
const fromName = "New Star Tailors";

if (!apiKey) {
  console.error("⚠️ WARNING: BREVO_API_KEY is not configured in .env file");
}

// Email templates for different order statuses
const emailTemplates = {
  Pending: {
    subject: "Order Confirmed - Your Tailoring Order Has Been Received",
    getBody: (orderData) => `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { padding: 20px; }
                    .order-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
                    .footer { text-align: center; color: #999; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Confirmed!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${orderData.name},</p>
                        <p>Thank you for placing your order with us. Your tailoring order has been successfully received and is now in our system.</p>
                        
                        <div class="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                            <p><strong>Status:</strong> Order Received</p>
                            <p><strong>Number of Sets:</strong> ${orderData.noOfSets}</p>
                            <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                            <p><strong>Payment Method:</strong> ${orderData.paymentMethod}</p>
                        </div>
                        
                        <p>We will notify you as soon as your order moves to the next stage. If you have any questions, please don't hesitate to contact us.</p>
                        <p>Best regards,<br/><strong>New Star Tailors</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  },
  "In Progress": {
    subject: "Your Order is Now in Progress - Update on Your Tailoring Order",
    getBody: (orderData) => `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { padding: 20px; }
                    .order-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #2196F3; margin: 20px 0; }
                    .footer { text-align: center; color: #999; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order in Progress</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${orderData.name},</p>
                        <p>Great news! Your tailoring order is now in progress. Our skilled tailors are working on your order with utmost care and precision.</p>
                        
                        <div class="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                            <p><strong>Status:</strong> In Progress</p>
                            <p><strong>Number of Sets:</strong> ${orderData.noOfSets}</p>
                            <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                        </div>
                        
                        <p>We will keep you updated throughout the process. Thank you for your patience!</p>
                        <p>Best regards,<br/><strong>New Star Tailors</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  },
  Completed: {
    subject: "Your Order is Ready! - Tailoring Complete",
    getBody: (orderData) => `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { padding: 20px; }
                    .order-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #FF9800; margin: 20px 0; }
                    .footer { text-align: center; color: #999; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Ready for Pickup!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${orderData.name},</p>
                        <p>Excellent! Your tailoring order is now complete and ready for pickup. Our team has put in great effort to ensure the perfect fit and finish.</p>
                        
                        <div class="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                            <p><strong>Status:</strong> Ready for Pickup</p>
                            <p><strong>Number of Sets:</strong> ${orderData.noOfSets}</p>
                            <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                        </div>
                        
                        <p>Please visit our store at your earliest convenience to collect your order. Don't forget to bring your order ID for quick verification.</p>
                        <p>Best regards,<br/><strong>New Star Tailors</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  },
  Delivered: {
    subject: "Order Delivered - Thank You for Your Business!",
    getBody: (orderData) => `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                    .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { padding: 20px; }
                    .order-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; margin: 20px 0; }
                    .footer { text-align: center; color: #999; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Order Delivered Successfully!</h1>
                    </div>
                    <div class="content">
                        <p>Dear ${orderData.name},</p>
                        <p>Your order has been delivered. Thank you for choosing New Star Tailors for your tailoring needs. We hope you are completely satisfied with the quality and fit of your garments.</p>
                        
                        <div class="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
                            <p><strong>Status:</strong> Delivered</p>
                            <p><strong>Number of Sets:</strong> ${orderData.noOfSets}</p>
                            <p><strong>Total Amount:</strong> ₹${orderData.totalAmount}</p>
                        </div>
                        
                        <p>If you have any feedback or need any alterations, please don't hesitate to reach out to us. We look forward to serving you again!</p>
                        <p>Best regards,<br/><strong>New Star Tailors</strong></p>
                    </div>
                    <div class="footer">
                        <p>This is an automated email. Please do not reply to this email.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
  },
};

/**
 * Send email via Brevo API
 * @param {Object} emailData - Email data object
 * @returns {Promise} - Brevo API response
 */
const sendEmailViaBrevo = async (emailData) => {
  try {
    const response = await axios.post(brevoApiUrl, emailData, {
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 second timeout
    });
    return response.data;
  } catch (error) {
    // Enhance error information for debugging
    if (error.response) {
      // Server responded with an error status
      console.error(`Brevo API Error:`, {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error(`No response from Brevo API:`, {
        message: error.message,
        code: error.code,
      });
    } else {
      // Error in request setup
      console.error(`Request setup error:`, error.message);
    }
    throw error;
  }
};

/**
 * Send email notification for order status update
 * @param {Object} orderData - Order details including email, name, orderId, etc.
 * @param {String} status - New order status
 * @returns {Promise} - Brevo API response
 */
const sendOrderStatusEmail = async (orderData, status) => {
  try {
    // Debug: Check configuration
    console.log(`\n📧 Email Service Debug (Brevo):`);
    console.log(`   From Email Configured: ${fromEmail ? "✅ Yes" : "❌ No"}`);
    console.log(`   API Key Configured: ${apiKey ? "✅ Yes" : "❌ No"}`);
    console.log(`   Order ID: ${orderData.orderId}`);
    console.log(`   Customer Email: ${orderData.email}`);
    console.log(`   Status: ${status}`);

    // Only send emails for civil orders (no companyId)
    if (orderData.companyId) {
      console.log(
        `   ⚠️ Skipping email for company order: ${orderData.orderId}`,
      );
      return {
        success: false,
        message: "Company orders do not trigger customer emails",
      };
    }

    // Check if email template exists for this status
    if (!emailTemplates[status]) {
      console.log(`   ❌ No email template for status: ${status}`);
      return {
        success: false,
        message: `No email template for status: ${status}`,
      };
    }

    // Check if customer email exists
    if (!orderData.email || !orderData.email.trim()) {
      console.log(
        `   ❌ No email address provided for order: ${orderData.orderId}`,
      );
      return {
        success: false,
        message: "No email address provided for customer",
      };
    }

    const template = emailTemplates[status];
    const emailPayload = {
      sender: {
        name: fromName,
        email: fromEmail,
      },
      to: [
        {
          email: orderData.email,
          name: orderData.name || "Valued Customer",
        },
      ],
      subject: template.subject,
      htmlContent: template.getBody(orderData),
      replyTo: {
        name: fromName,
        email: fromEmail,
      },
    };

    console.log(`   📤 Attempting to send email via Brevo...`);
    const result = await sendEmailViaBrevo(emailPayload);
    console.log(
      `   ✅ Email sent successfully for order ${orderData.orderId} with status: ${status}`,
    );
    console.log(`   Message ID: ${result.messageId}`);
    return {
      success: true,
      message: "Email sent successfully via Brevo",
      result,
    };
  } catch (error) {
    console.error(
      `\n❌ ERROR sending email via Brevo for order ${orderData.orderId}:`,
    );

    if (error.response) {
      console.error(`   Status Code: ${error.response.status}`);
      console.error(`   Error Message: ${error.response.statusText}`);
      console.error(`   Error Details:`, error.response.data);
    } else if (error.request) {
      console.error(`   ❌ No response from Brevo API`);
      console.error(`   Error Code: ${error.code}`);
      console.error(`   Error Message: ${error.message}`);
    } else {
      console.error(`   Error Message: ${error.message}`);
      console.error(`   Error Stack:`, error.stack);
    }

    return {
      success: false,
      message: error.message,
      error: error.response?.data || error.code,
    };
  }
};

/**
 * Send OTP email for password reset
 * @param {String} email - Admin email address
 * @param {String} otp - One-Time Password (6 digits)
 * @returns {Promise} - Brevo API response
 */
const sendOTPEmail = async (email, otp) => {
  try {
    // Debug: Check configuration
    console.log(`\n📧 OTP Email Service Debug (Brevo):`);
    console.log(`   From Email Configured: ${fromEmail ? "✅ Yes" : "❌ No"}`);
    console.log(`   API Key Configured: ${apiKey ? "✅ Yes" : "❌ No"}`);
    console.log(`   Recipient Email: ${email}`);

    if (!email || !email.trim()) {
      console.log(`   ❌ No email address provided`);
      return { success: false, message: "No email address provided" };
    }

    const emailPayload = {
      sender: {
        name: fromName,
        email: fromEmail,
      },
      to: [
        {
          email: email,
          name: "Admin",
        },
      ],
      subject: "Your Password Reset OTP - New Star Tailors Admin",
      htmlContent: `
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; color: #333; }
                        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
                        .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                        .content { padding: 20px; }
                        .otp-box { background-color: #f0f0f0; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
                        .otp { font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #4CAF50; font-family: monospace; }
                        .warning { background-color: #fff3cd; padding: 10px; border-left: 4px solid #FF9800; margin: 15px 0; }
                        .footer { text-align: center; color: #999; font-size: 12px; padding-top: 20px; border-top: 1px solid #ddd; margin-top: 20px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Password Reset Request</h1>
                        </div>
                        <div class="content">
                            <p>Dear Admin,</p>
                            <p>You have requested to reset your password for your New Star Tailors Admin account. Use the following One-Time Password (OTP) to proceed with the password reset.</p>
                            
                            <div class="otp-box">
                                <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">Your One-Time Password:</p>
                                <div class="otp">${otp}</div>
                            </div>
                            
                            <div class="warning">
                                <p style="margin: 0;"><strong>⚠️ Security Warning:</strong></p>
                                <p style="margin: 5px 0 0 0;">• This OTP is valid for 10 minutes only</p>
                                <p style="margin: 5px 0 0 0;">• Never share this OTP with anyone</p>
                                <p style="margin: 5px 0 0 0;">• If you did not request this, please ignore this email</p>
                            </div>
                            
                            <p style="margin-top: 20px;"><strong>Steps to reset your password:</strong></p>
                            <ol>
                                <li>Go to the password reset page</li>
                                <li>Enter your email address</li>
                                <li>Enter the OTP shown above</li>
                                <li>Create a new password</li>
                                <li>Confirm your new password and submit</li>
                            </ol>
                            
                            <p>If you have any questions or concerns, please contact the system administrator.</p>
                            <p>Best regards,<br/><strong>New Star Tailors Admin System</strong></p>
                        </div>
                        <div class="footer">
                            <p>This is an automated email. Please do not reply to this email.</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
      replyTo: {
        name: fromName,
        email: fromEmail,
      },
    };

    console.log(`   📤 Attempting to send OTP email via Brevo...`);
    const result = await sendEmailViaBrevo(emailPayload);
    console.log(`   ✅ OTP email sent successfully to ${email}`);
    console.log(`   Message ID: ${result.messageId}`);
    return {
      success: true,
      message: "OTP email sent successfully via Brevo",
      result,
    };
  } catch (error) {
    console.error(`\n❌ ERROR sending OTP email via Brevo to ${email}:`);

    if (error.response) {
      console.error(`   Status Code: ${error.response.status}`);
      console.error(`   Error Message: ${error.response.statusText}`);
      console.error(`   Error Details:`, error.response.data);
    } else if (error.request) {
      console.error(`   ❌ No response from Brevo API`);
      console.error(`   Error Code: ${error.code}`);
      console.error(`   Error Message: ${error.message}`);
    } else {
      console.error(`   Error Message: ${error.message}`);
      console.error(`   Error Stack:`, error.stack);
    }

    // Fallback to console logging for development if API fails
    console.warn(`\n📋 OTP FOR TESTING (Brevo API unavailable):`);
    console.log(`   Email: ${email}`);
    console.log(`   OTP: ${otp}`);
    console.log(`   Valid for 10 minutes\n`);

    return {
      success: true,
      message: "OTP generated and logged to console (API unavailable)",
      result: { otp },
    };
  }
};

module.exports = { sendOrderStatusEmail, sendOTPEmail };
