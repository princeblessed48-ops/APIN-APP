const request = require('supertest');
const app = require('../src/app');
const { connectDatabase, disconnectDatabase } = require('../src/config/database');

let storekeeperToken;

beforeAll(async () => {
  await connectDatabase();

  const registerResponse = await request(app)
    .post('/api/auth/register')
    .send({
      fullName: 'Storekeeper Phase 2',
      email: 'storekeeper.phase2@example.com',
      password: 'SecurePass123',
      role: 'Storekeeper',
      department: 'Stores'
    });

  if (registerResponse.status === 201) {
    storekeeperToken = registerResponse.body.token;
    return;
  }

  const loginResponse = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'storekeeper.phase2@example.com',
      password: 'SecurePass123'
    });

  storekeeperToken = loginResponse.body.token;
});

afterAll(async () => {
  await disconnectDatabase();
});

describe('Inventory and operations workflow', () => {
  it('adds a stock item as a storekeeper', async () => {
    const response = await request(app)
      .post('/api/inventory/items')
      .set('Authorization', `Bearer ${storekeeperToken}`)
      .send({
        name: 'PCR Master Mix',
        category: 'Reagent',
        sku: 'PCR-001',
        unit: 'ml',
        openingBalance: 40,
        reorderLevel: 10,
        location: 'Freezer 1'
      });

    expect(response.status).toBe(201);
    expect(response.body.item).toMatchObject({
      name: 'PCR Master Mix',
      sku: 'PCR-001',
      quantity: 40
    });
  });

  it('lists inventory items for authenticated users', async () => {
    const response = await request(app)
      .get('/api/inventory/items')
      .set('Authorization', `Bearer ${storekeeperToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.items)).toBe(true);
    expect(response.body.items.some((item) => item.sku === 'PCR-001')).toBe(true);
  });

  it('creates a stock request for operational use', async () => {
    const response = await request(app)
      .post('/api/inventory/requests')
      .set('Authorization', `Bearer ${storekeeperToken}`)
      .send({
        itemName: 'PCR Master Mix',
        requestedQuantity: 5,
        unit: 'ml',
        requestType: 'issue',
        reason: 'PCR run preparation'
      });

    expect(response.status).toBe(201);
    expect(response.body.request).toMatchObject({
      itemName: 'PCR Master Mix',
      status: 'pending'
    });
  });

  it('rejects inventory access for a non-storekeeper', async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Lab Staff',
        email: 'labstaff.phase2@example.com',
        password: 'SecurePass123',
        role: 'Laboratory Staff',
        department: 'Molecular Lab'
      });

    const response = await request(app)
      .post('/api/inventory/items')
      .set('Authorization', `Bearer ${registerResponse.body.token}`)
      .send({
        name: 'Test Tube',
        category: 'Consumables',
        sku: 'TUBE-001',
        unit: 'pcs',
        openingBalance: 100,
        reorderLevel: 20,
        location: 'Cabinet A'
      });

    expect(response.status).toBe(403);
  });
});
