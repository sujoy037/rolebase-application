const express = require('express');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');  // Import authentication routes
const userRoleStatusRoutes=require('./routes/userRoleStatusRoutes')
const rolesRoutes=require('./routes/rolesRoutes')
const statusRoutes=require('./routes/statusRoutes')
const userCdRoutes=require('./routes/userCdRoutes')
const circleRoutes=require('./routes/circleRoutes')
const chargeRoutes=require('./routes/chargeRoutes')
const designationcdRoutes=require('./routes/designationcdRoutes')
const distcdRoutes=require('./routes/distcdRoutes')
const officecdRoutes=require('./routes/officecdRoutes')

const userRoutes=require('./routes/userRoutes')



const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

// Session configuration (Optional for JWT authentication)
app.use(session({
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
}));

app.use(cors());
// app.use(cors({
//   origin: 'http://localhost:3001',  // Adjust the allowed origin
//   methods: 'GET,POST',
//   allowedHeaders: ['Content-Type'],
//   credentials: true,
// }));


// Use authentication routes
app.use('/api', authRoutes);
app.use('/api', rolesRoutes);
app.use('/api',statusRoutes)
app.use('/api', userCdRoutes);
app.use('/api',userRoleStatusRoutes)
app.use('/api',circleRoutes)
app.use('/api',chargeRoutes)
app.use('/api',designationcdRoutes)
app.use('/api',distcdRoutes)
app.use('/api',officecdRoutes)

//user
app.use('/api',userRoutes)


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
