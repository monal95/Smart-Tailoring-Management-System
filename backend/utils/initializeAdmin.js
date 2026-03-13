const bcrypt = require("bcrypt");

/**
 * Initialize admin user if it doesn't exist
 * This function runs when the server starts
 */
const initializeAdmin = async (db) => {
  try {
    // Delete any existing admin users
    await db.collection("admins").deleteMany({});
    console.log("✓ Existing admin users deleted");

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("newstar1234", salt);

    // Create default admin user
    const result = await db.collection("admins").insertOne({
      username: "Chinna Kannan (Owner)",
      email: "monalprashanth98@gmail.com",
      password: hashedPassword,
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("✓ Admin user created successfully");
    console.log("  Username: Chinna Kannan (Owner)");
    console.log("  Email: monalprashanth98@gmail.com");
    console.log("  Password: newstar1234");
    console.log("  Note: Please change the password after first login");

    return result;
  } catch (error) {
    console.error("Error initializing admin:", error);
    throw error;
  }
};

module.exports = { initializeAdmin };
