const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const contactRouter = require('./routes/contact');
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'front-end')));

app.use('/api/contacts', contactRouter);
    
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
