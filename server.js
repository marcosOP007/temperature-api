const express = require('express');
const cors = require('cors'); // Importe a biblioteca cors
const datatestRoutes = require('./src/routes/routes');
const path = require('path');
const userRoutes = require('./src/routes/UserRoutes');
const htmlRoutes = require('./src/routes/htmlRoutes');
const temperatureLog = require('./src/routes/TemperatureLogRouters')
const channelRoutes = require('./src/routes/channelRoutes')
const sensorRoutes = require('./src/routes/sensorRouters')
const temperatureRoutes = require('./src/routes/TemperatureLogRouters')
const globalErrorHandler = require('./src/Controller/errorController')



const cookieParser = require("cookie-parser")


require('dotenv').config()
 
require('./src/database/index')
const app = express();
const port = 3000;




app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
// Use o cors para permitir solicitações de qualquer origem (*)
app.use(cors());

app.use('/newview', express.static(path.join(__dirname, '/src/Views')))
app.use('/view', express.static(path.join(__dirname, '/src/viewsOfficial/')))
app.use('/assets', express.static(path.join(__dirname, '/src/viewsOfficial/assets')))
app.use('/js', express.static(path.join(__dirname, '/src/Views/js')))
//app.set('public', path.join(__dirname, 'src/views/html/public'));

//app.use('/', express.static(path.join(__dirname, '/src/Views')))


app.use('/index/', htmlRoutes);
app.use('/api/', datatestRoutes);
app.use('/auth/', userRoutes); 
app.use('/api/', temperatureLog);
app.use('/api/channels/', channelRoutes);
app.use('/api/sensors/', sensorRoutes);

app.use('/api/temperature-logs/', temperatureRoutes);


/*
app.all('*', (req, res, next) => {
    console.log("wow")
    const err = new CustomError(`Não foi possivel encontrar ${req.originalUrl} no servidor`, 404);
    next(err);
});
*/


app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Ocorreu um erro no servidor.' });
});



app.use(globalErrorHandler);



app.listen(port, () => console.log("Server Running on port " + port));