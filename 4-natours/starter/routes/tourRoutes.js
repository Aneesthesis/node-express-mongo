const express = require('express');
const {
  getAllTours,
  getTour,
  addTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');

const router = express.Router();
//router.param('id', checkID);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/').get(getAllTours).post(addTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
