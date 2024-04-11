import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Example from '../database/models/ExampleModel';
import {
  users,
  user,
  invalidEmailLoginBody,
  invalidPasswordLoginBody,
  validLoginBody,
  wrongPassUser,
  userRegistered,
  userWithoutPassword,
} from './mooks.ts/usersMock';
import JWT from '../../src/utils/JWT';
import Validations from '../middlewares/validations';

import { Response } from 'superagent';
import SequelizeUser from '../database/models/UsersModel';
import { team, teams } from './mooks.ts/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Login Test', function () {
  it('login sem body', async function () {
    const { status, body } = await chai.request(app).post('/login').send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it("shouldn't login with an invalid email", async function () {
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('login não encontra email', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(null);

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(validLoginBody);
    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('login correto', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });

  it('login com senha incorreta menor que 6', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(Validations, 'validateLogin').returns();

    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send(invalidPasswordLoginBody);

    expect(status).to.equal(401);
    expect(body.message).to.equal('Invalid email or password');
  });

  it('login com email correto e senha incorreta', async function () {
    sinon.stub(SequelizeUser, 'findOne').resolves(userRegistered as any);
    sinon.stub(Validations, 'validateLogin').returns();

    const invalidPassword = 'invalid_password';
    const { status, body } = await chai
      .request(app)
      .post('/login')
      .send({ email: validLoginBody.email, password: invalidPassword });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('login role sem token', async function () {
    const { status, body } = await chai.request(app).get('/login/role');

    expect(status).to.equal(401);
    expect(body.message).to.equal('Token not found');
  });
  it('login role com token invalido', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set('authorization', 'invalidToken');

    expect(status).to.equal(401);
    expect(body.message).to.equal('Token must be a valid token');
  });
  it('login role com sucesso', async function () {
    const { status, body } = await chai
      .request(app)
      .get('/login/role')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      );

    expect(status).to.equal(200);
    expect(body).to.have.key('role');
  });
  afterEach(sinon.restore);
});
