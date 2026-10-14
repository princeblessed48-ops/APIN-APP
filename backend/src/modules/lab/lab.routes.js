const express = require('express');
const { requireAuth } = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');
const {
  createLabRequest,
  listLabRequests,
  createWorksheet,
  listWorksheets,
  createResult,
  listResults,
  approveResult
} = require('./lab.controller');

const router = express.Router();

router.use(requireAuth);

router.post(
  '/requests',
  authorize(['APIN Doctor', 'General Doctor', 'Receptionist']),
  createLabRequest
);
router.get('/requests', listLabRequests);

router.post(
  '/worksheets',
  authorize(['Laboratory Staff', 'Scientist', 'Technical Supervisor']),
  createWorksheet
);
router.get('/worksheets', listWorksheets);

router.post(
  '/results',
  authorize(['Laboratory Staff', 'Scientist', 'Technical Supervisor']),
  createResult
);
router.get('/results', listResults);
router.patch(
  '/results/:id/approve',
  authorize(['Scientist', 'Technical Supervisor']),
  approveResult
);

module.exports = router;
