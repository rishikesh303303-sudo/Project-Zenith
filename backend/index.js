const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const skyRoutes = require('./routes/skyRoutes');

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api', skyRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(5000, () => console.log('Zenith Backend running on port 5000'));