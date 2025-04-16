import { describe, it, expect } from 'vitest';
import { demoqaApi } from '../../api/client';

const credentials = {
  userName: 'Roma',
  password: 'Adewdew123!',
};

describe('DemoQA API tests', () => {
  it('should create user (or return "User exists!")', async () => {
    try {
      const res = await demoqaApi.post('/Account/v1/User', credentials);
      expect(res.status).toBe(201);
    } catch (err: any) {
      expect(err.response.status).toBe(406);
      expect(err.response.data.message).toBe('User exists!');
    }
  });

  it('should authenticate user', async () => {
    const res = await demoqaApi.post('/Account/v1/Authorized', credentials);
    expect(res.status).toBe(200);
    expect(res.data).toBe(true); // demoqa API returns true if authorized
  });

  it('should fetch list of books', async () => {
    const res = await demoqaApi.get('/BookStore/v1/Books');
    expect(res.status).toBe(200);
    expect(res.data.books.length).toBeGreaterThan(0);
  });
});
