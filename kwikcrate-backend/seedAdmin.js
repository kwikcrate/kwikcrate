// seedAdmin.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./models/Admin');

mongoose.connect("mongodb+srv://Admin:Admin123@kwikcratecluster.ngbhpxs.mongodb.net/?retryWrites=true&w=majority&appName=kwikcrateCluster", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const hashedPassword = await bcrypt.hash('admin567', 10);

  const admin = new Admin({
    username: 'admin',
    password: hashedPassword
  });

  await Admin.deleteMany(); // Optional: Clean previous admins
  await admin.save();
  console.log("✅ Admin user created successfully");
  process.exit();
}).catch(err => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});
