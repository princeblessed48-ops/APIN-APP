const bcrypt = require('bcryptjs');
const { connectDatabase, disconnectDatabase } = require('../config/database');
const User = require('../modules/users/user.model');

async function seed() {
  await connectDatabase();

  const adminHash = await bcrypt.hash('Admin@123', 10);
  await User.deleteMany({});

  await User.create({
    fullName: 'System Admin',
    email: 'admin@apin-juth.local',
    passwordHash: adminHash,
    role: 'Super Admin',
    department: 'Administration',
    permissions: ['manage_users', 'read_audit', 'configure_system'],
    isActive: true
  });

  console.log('Seed data created.');
  await disconnectDatabase();
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
