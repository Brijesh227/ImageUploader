const express = require('express');
const { router: userRoutes } = require('./User/routes/userRoutes');
const { router: imageRoutes } = require('./ImageUploader/routes/imageRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/image', imageRoutes);

app.listen(3000, ()=> {
    console.log(`server is ready`);
})