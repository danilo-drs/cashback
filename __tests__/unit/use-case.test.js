
const {
  createReseller,
  accumulatedCashback,
  createTicket,
  listTicket,
  loginReseller
} = require('../../src/application/use_cases');


describe('use-cases', () => {

  it('create-reseller shoud output saved data with success', async () => {
    const resellerModel = {
      name: 'Reseller Teste',
      cpf: 121212,
      email: 'reseller@reseller.com',
      password: 'xptoqwerty',
    };
    const result = await createReseller(resellerModel, { save: () => resellerModel });
    expect(result.success).toBe(true);
  });

  test('accumulated-cashback shoud output saved data with success', async () => {
    const tiketModel = {
      cpf: 15350946057
    }
    const result = await accumulatedCashback(tiketModel, () => tiketModel);
    expect(result.success).toBe(true);
  });

  test('create-ticket shoud output saved data with success', async () => {
    const tiketModel = {
      code: 1212,
      amount: 2000,
      date: '2020-07-30',
      cpf: 15350946057
    }
    const result = await createTicket(tiketModel, { save: () => tiketModel });
    expect(result.success).toBe(true);
  });

  test('list-ticket shoud output data with success', async () => {
    const tiketModel = {
      cpf: 15350946057,
      amount: 1000,
    }
    const tikets = { tickets: [{ code: 1 }], count: 1 }
    const result = await listTicket(tiketModel, { getById: () => tikets });
    expect(result.count).toBe(1);
  });

  test('login-resseler shoud output saved data with success', async () => {
    const resellerModel = {
      email: 'reseller@reseller.com',
      password: 'xptoqwerty',
    };
    const loginFound = { Items: [resellerModel] };
    const result = await loginReseller(resellerModel, { get: () => loginFound });
    expect(result.success).toBe(true);
  });
});
