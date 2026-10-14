const inventoryItems = [];
const inventoryRequests = [];

function sanitizeItemPayload(payload = {}) {
  const { name, category, sku, unit, openingBalance, reorderLevel, location } = payload;

  if (!name || !category || !sku || !unit) {
    throw new Error('name, category, sku, and unit are required.');
  }

  const numericOpeningBalance = Number(openingBalance ?? 0);
  const numericReorderLevel = Number(reorderLevel ?? 0);

  if (!Number.isFinite(numericOpeningBalance) || numericOpeningBalance < 0) {
    throw new Error('openingBalance must be a non-negative number.');
  }

  if (!Number.isFinite(numericReorderLevel) || numericReorderLevel < 0) {
    throw new Error('reorderLevel must be a non-negative number.');
  }

  return {
    name: String(name).trim(),
    category: String(category).trim(),
    sku: String(sku).trim(),
    unit: String(unit).trim(),
    quantity: numericOpeningBalance,
    reorderLevel: numericReorderLevel,
    location: location ? String(location).trim() : 'General store',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date()
  };
}

function createInventoryItem(req, res, next) {
  try {
    const itemPayload = sanitizeItemPayload(req.body);
    const existingItem = inventoryItems.find((item) => item.sku.toLowerCase() === itemPayload.sku.toLowerCase());

    if (existingItem) {
      return res.status(409).json({ message: 'An inventory item with this SKU already exists.' });
    }

    const item = {
      _id: String(inventoryItems.length + 1),
      ...itemPayload
    };

    inventoryItems.push(item);
    return res.status(201).json({ item });
  } catch (error) {
    return res.status(400).json({ message: error.message || 'Unable to create inventory item.' });
  }
}

function listInventoryItems(req, res) {
  return res.json({ items: inventoryItems });
}

function createInventoryRequest(req, res) {
  const { itemName, requestedQuantity, unit, requestType, reason } = req.body;

  if (!itemName || !requestedQuantity || !unit || !requestType) {
    return res.status(400).json({
      message: 'itemName, requestedQuantity, unit, and requestType are required.'
    });
  }

  const parsedQuantity = Number(requestedQuantity);
  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
    return res.status(400).json({ message: 'requestedQuantity must be a positive number.' });
  }

  const item = inventoryItems.find((inventoryItem) => inventoryItem.name.toLowerCase() === String(itemName).trim().toLowerCase());

  if (!item) {
    return res.status(404).json({ message: 'Inventory item not found.' });
  }

  const request = {
    _id: String(inventoryRequests.length + 1),
    itemName: item.name,
    requestedQuantity: parsedQuantity,
    unit: String(unit).trim(),
    requestType: String(requestType).trim(),
    reason: reason ? String(reason).trim() : '',
    requestedBy: req.user ? req.user.fullName : 'Unknown user',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  inventoryRequests.push(request);
  return res.status(201).json({ request });
}

function listInventoryRequests(req, res) {
  return res.json({ requests: inventoryRequests });
}

module.exports = {
  inventoryItems,
  inventoryRequests,
  createInventoryItem,
  listInventoryItems,
  createInventoryRequest,
  listInventoryRequests
};
