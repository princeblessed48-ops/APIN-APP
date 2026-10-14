const labRequests = [];
const labWorksheets = [];
const labResults = [];

function findRequestById(id) {
  return labRequests.find((request) => String(request._id) === String(id)) || null;
}

function findWorksheetById(id) {
  return labWorksheets.find((worksheet) => String(worksheet._id) === String(id)) || null;
}

function createLabRequest(req, res) {
  const { patientName, patientId, specimenType, testName, priority, notes } = req.body;

  if (!patientName || !patientId || !specimenType || !testName) {
    return res.status(400).json({
      message: 'patientName, patientId, specimenType, and testName are required.'
    });
  }

  const request = {
    _id: String(labRequests.length + 1),
    patientName: String(patientName).trim(),
    patientId: String(patientId).trim(),
    specimenType: String(specimenType).trim(),
    testName: String(testName).trim(),
    priority: priority ? String(priority).trim() : 'routine',
    notes: notes ? String(notes).trim() : '',
    status: 'pending',
    createdBy: req.user ? req.user.fullName : 'Unknown',
    createdByRole: req.user ? req.user.role : 'Unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  labRequests.push(request);
  return res.status(201).json({ request });
}

function listLabRequests(req, res) {
  return res.json({ requests: labRequests });
}

function createWorksheet(req, res) {
  const { requestId, assay, runDate, technicianName, comments } = req.body;

  if (!requestId || !assay) {
    return res.status(400).json({
      message: 'requestId and assay are required.'
    });
  }

  const request = findRequestById(requestId);
  if (!request) {
    return res.status(404).json({ message: 'Lab request not found.' });
  }

  const worksheet = {
    _id: String(labWorksheets.length + 1),
    requestId: String(requestId),
    assay: String(assay).trim(),
    runDate: runDate ? String(runDate).trim() : new Date().toISOString().slice(0, 10),
    technicianName: technicianName ? String(technicianName).trim() : req.user.fullName,
    comments: comments ? String(comments).trim() : '',
    status: 'open',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  labWorksheets.push(worksheet);
  request.status = 'assigned';
  request.updatedAt = new Date();
  return res.status(201).json({ worksheet });
}

function listWorksheets(req, res) {
  return res.json({ worksheets: labWorksheets });
}

function createResult(req, res) {
  const { requestId, worksheetId, testName, resultValue, units, interpretation } = req.body;

  if (!requestId || !testName || !resultValue) {
    return res.status(400).json({
      message: 'requestId, testName, and resultValue are required.'
    });
  }

  const request = findRequestById(requestId);
  if (!request) {
    return res.status(404).json({ message: 'Lab request not found.' });
  }

  const worksheet = worksheetId ? findWorksheetById(worksheetId) : null;

  const result = {
    _id: String(labResults.length + 1),
    requestId: String(requestId),
    worksheetId: worksheetId ? String(worksheetId) : null,
    testName: String(testName).trim(),
    resultValue: String(resultValue).trim(),
    units: units ? String(units).trim() : '',
    interpretation: interpretation ? String(interpretation).trim() : '',
    status: 'pending',
    enteredBy: req.user ? req.user.fullName : 'Unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  };

  labResults.push(result);
  request.status = 'in-review';
  request.updatedAt = new Date();
  return res.status(201).json({ result });
}

function listResults(req, res) {
  return res.json({ results: labResults });
}

function approveResult(req, res) {
  const { id } = req.params;
  const { approvedBy, comment } = req.body;
  const result = labResults.find((entry) => String(entry._id) === String(id));

  if (!result) {
    return res.status(404).json({ message: 'Result not found.' });
  }

  result.status = 'approved';
  result.approvedBy = approvedBy ? String(approvedBy).trim() : req.user.fullName;
  result.comment = comment ? String(comment).trim() : '';
  result.approvedAt = new Date();
  result.updatedAt = new Date();

  const request = findRequestById(result.requestId);
  if (request) {
    request.status = 'completed';
    request.updatedAt = new Date();
  }

  return res.json({ result });
}

module.exports = {
  labRequests,
  labWorksheets,
  labResults,
  createLabRequest,
  listLabRequests,
  createWorksheet,
  listWorksheets,
  createResult,
  listResults,
  approveResult,
  findRequestById,
  findWorksheetById
};
