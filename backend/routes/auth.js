const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { getDB } = require("../config/db");
const { sendOTPEmail } = require("../services/emailService");

// Function to generate a 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to generate OTP expiration time (10 minutes from now)
const getOTPExpiration = () => {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
};

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const db = getDB();

    // Find admin by email
    const admin = await db.collection("admins").findOne({ email });

    if (!admin) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Return success response with admin info (without password)
    res.json({
      success: true,
      admin: {
        id: admin._id,
        email: admin.email,
        username: admin.username,
        createdAt: admin.createdAt,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// Check if admin exists (for frontend verification)
router.get("/check", async (req, res) => {
  try {
    const db = getDB();
    const adminExists = await db.collection("admins").findOne({});

    res.json({
      adminExists: !!adminExists,
    });
  } catch (error) {
    console.error("Check admin error:", error);
    res.status(500).json({ error: "Failed to check admin" });
  }
});

// Forgot Password: Send OTP to email
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Validate input
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const db = getDB();

    // Check if admin exists
    const admin = await db.collection("admins").findOne({ email });

    if (!admin) {
      // For security, don't reveal if email exists or not
      return res
        .status(400)
        .json({ error: "If the email exists, OTP will be sent shortly" });
    }

    // Generate OTP
    const otp = generateOTP();
    const expiresAt = getOTPExpiration();

    // Store OTP in database
    await db.collection("otpRequests").updateOne(
      { email },
      {
        $set: {
          email,
          otp,
          expiresAt,
          createdAt: new Date(),
          verified: false,
        },
      },
      { upsert: true },
    );

    // Send OTP email
    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      return res
        .status(500)
        .json({ error: "Failed to send OTP. Please try again." });
    }

    res.json({
      success: true,
      message: "OTP has been sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate input
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    const db = getDB();

    // Find the OTP request
    const otpRequest = await db.collection("otpRequests").findOne({ email });

    if (!otpRequest) {
      return res
        .status(400)
        .json({ error: "No OTP request found for this email" });
    }

    // Check if OTP has expired
    if (new Date() > otpRequest.expiresAt) {
      return res
        .status(400)
        .json({ error: "OTP has expired. Please request a new one." });
    }

    // Check if OTP matches
    if (otpRequest.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Mark OTP as verified
    await db
      .collection("otpRequests")
      .updateOne(
        { email },
        { $set: { verified: true, verifiedAt: new Date() } },
      );

    res.json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
});

// Reset Password
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
      return res
        .status(400)
        .json({ error: "Email, OTP, and new password are required" });
    }

    // Validate password strength
    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const db = getDB();

    // Find the OTP request
    const otpRequest = await db
      .collection("otpRequests")
      .findOne({ email, verified: true });

    if (!otpRequest) {
      return res.status(400).json({ error: "OTP verification required first" });
    }

    // Check if OTP matches
    if (otpRequest.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (new Date() > otpRequest.expiresAt) {
      return res
        .status(400)
        .json({ error: "OTP has expired. Please request a new one." });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin password
    const result = await db.collection("admins").updateOne(
      { email },
      {
        $set: {
          password: hashedPassword,
          passwordChangedAt: new Date(),
        },
      },
    );

    if (result.matchedCount === 0) {
      return res.status(400).json({ error: "Admin not found" });
    }

    // Delete the OTP request after successful password reset
    await db.collection("otpRequests").deleteOne({ email });

    res.json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ error: "Failed to reset password" });
  }
});

module.exports = router;
