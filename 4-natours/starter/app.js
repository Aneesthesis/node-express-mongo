const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));

app.use(express.json());

app.use((req, res, next) => {
  console.log('middleware');
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTE HANDLERS

//app.get('/api/v1/tours', getAllTours);
//app.get('/api/v1/tours/:id', getTour);
//app.post('/api/v1/tours', addTour);
//app.patch('/api/v1/tours/:id', editTour);
//app.delete('/api/v1/tours/:id', deleteTour);

// ROUTES

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// SERVER
const port = 3000;
app.listen(port, () => {
  console.log('port ' + port);
});
