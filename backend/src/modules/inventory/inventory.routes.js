const express = require('express');
const { requireAuth } = require('../../middleware/auth');
const { authorize } = require('../../middleware/authorize');
const {
  createInventoryItem,
  listInventoryItems,
  createInventoryRequest,
  listInventoryRequests
} = require('./inventory.controller');

const router = express.Router();

router.use(requireAuth);

router.post('/items', authorize(['Storekeeper']), createInventoryItem);
router.get('/items', listInventoryItems);
router.post('/requests', createInventoryRequest);
router.get('/requests', listInventoryRequests);

module.exports = router;
