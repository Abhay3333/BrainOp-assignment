const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');
const userRouter = require('./routers/user.route');
const postRouter = require('./routers/post.route');

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello World');
    }
);

app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    }
);
