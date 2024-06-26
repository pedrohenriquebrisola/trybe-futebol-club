import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import SequelizeTeam from '../database/models/TeamsModel';
import { team, teams } from './mooks.ts/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Teams Testes', () => {
  it('Retorna todos os times', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });
  it('Retorna time pelo id', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(team as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(team);
  });

  it('Não retorna o time', async function () {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/0');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team 0 not found');
  });
  afterEach(sinon.restore);
});
