// requerir mongoose
const mongoose = require('mongoose');

// conectarme
mongoose.connect(process.env.MONGO_URL);