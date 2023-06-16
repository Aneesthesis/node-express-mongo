const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const reviewRouter = require('./routes/reviewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARES

// serving static files
app.use(express.static(path.join(__dirname, 'public')));

// set security HTTP headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// limit requests from the same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, // IN 1 HOUR
  message: 'Too many requests from this IP, try again in an hour!',
});

app.use('/api', limiter);

// body parser, reading data from the body into req.body
// app.use function sits until it is called
app.use(express.json({ limit: '10kb' }));

// data sanitisation against nosql query injection
app.use(mongoSanitize());

// data sanitisation against XSS
app.use(xss());

// prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsAverage',
      'ratingsQuantity',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// test middleware
app.use((req, res, next) => {
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

app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404)); //passing anywhere into the next function means it's an error, the middleware stack also skips at this point, send the error to the global error handling middleware
});

app.use(globalErrorHandler);

// SERVER
module.exports = app;
