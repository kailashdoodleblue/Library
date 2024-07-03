const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`User service running on port ${PORT}`));
    })
    .catch(err => console.log(err));
