const express = require('express');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/booklistRoutes');

const app = express();
app.use(express.json());
app.use('/books', bookRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`Booklist service running on port ${PORT}`));
    })
    .catch(err => console.log(err));
