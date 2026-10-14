const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, disconnectDatabase } = require('../src/config/database');

jest.setTimeout(30000);

let doctorToken;
let laboratoryStaffToken;
let scientistToken;
let requestId;

beforeAll(async () => {
  await connectDatabase();

  const doctorResponse = await request(app)
    .post('/api/auth/register')
    .send({
      fullName: 'APIN Doctor',
      email: 'doctor.phase3@example.com',
      password: 'SecurePass123',
      role: 'APIN Doctor',
      department: 'Clinic'
    });

  doctorToken = doctorResponse.body.token;

  const labStaffResponse = await request(app)
    .post('/api/auth/register')
    .send({
      fullName: 'Lab Technician',
      email: 'lab.phase3@example.com',
      password: 'SecurePass123',
      role: 'Laboratory Staff',
      department: 'Molecular Lab'
    });

  laboratoryStaffToken = labStaffResponse.body.token;

  const scientistResponse = await request(app)
    .post('/api/auth/register')
    .send({
      fullName: 'Scientist',
      email: 'scientist.phase3@example.com',
      password: 'SecurePass123',
      role: 'Scientist',
      department: 'Research'
    });

  scientistToken = scientistResponse.body.token;
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('Laboratory request, worksheet, and results workflow', () => {
  it('creates a laboratory request from an APIN doctor', async () => {
    const response = await request(app)
      .post('/api/lab/requests')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        patientName: 'Jane Doe',
        patientId: 'PT-101',
        specimenType: 'Whole Blood',
        testName: 'HIV PCR',
        priority: 'urgent',
        notes: 'Repeat confirmatory testing'
      });

    expect(response.status).toBe(201);
    expect(response.body.request).toMatchObject({
      patientName: 'Jane Doe',
      testName: 'HIV PCR',
      status: 'pending'
    });

    requestId = response.body.request._id;
  });

  it('creates a worksheet for a lab request', async () => {
    const response = await request(app)
      .post('/api/lab/worksheets')
      .set('Authorization', `Bearer ${laboratoryStaffToken}`)
      .send({
        requestId,
        assay: 'PCR amplification',
        runDate: '2026-10-14',
        technicianName: 'Lab Technician',
        comments: 'Run started on schedule'
      });

    expect(response.status).toBe(201);
    expect(response.body.worksheet).toMatchObject({
      requestId,
      assay: 'PCR amplification',
      status: 'open'
    });
  });

  it('records and approves a test result by a scientist', async () => {
    const resultResponse = await request(app)
      .post('/api/lab/results')
      .set('Authorization', `Bearer ${scientistToken}`)
      .send({
        requestId,
        worksheetId: requestId,
        testName: 'HIV PCR',
        resultValue: 'Negative',
        units: 'qualitative',
        interpretation: 'No HIV RNA detected'
      });

    expect(resultResponse.status).toBe(201);
    expect(resultResponse.body.result).toMatchObject({
      requestId,
      status: 'pending'
    });

    const approveResponse = await request(app)
      .patch(`/api/lab/results/${resultResponse.body.result._id}/approve`)
      .set('Authorization', `Bearer ${scientistToken}`)
      .send({
        approvedBy: 'Scientist',
        comment: 'Approved after verification'
      });

    expect(approveResponse.status).toBe(200);
    expect(approveResponse.body.result.status).toBe('approved');
  });

  it('rejects worksheet creation for unauthorized roles', async () => {
    const response = await request(app)
      .post('/api/lab/worksheets')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        requestId,
        assay: 'Specimen check',
        runDate: '2026-10-14',
        technicianName: 'Doctor'
      });

    expect(response.status).toBe(403);
  });
});
