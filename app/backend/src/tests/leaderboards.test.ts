import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../app';
import SequelizeMatches from '../database/models/MatchesModel';
import {
  create,
  createErrorIdIguais,
  matche,
  matches,
  team1,
  team2,
} from './mooks.ts/matchesMock';
import SequelizeTeam from '../database/models/TeamsModel';
import { teams } from './mooks.ts/teamsMock';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Leader Test', function () {
  it('Retorna todos o leader', async function () {
    sinon.stub(SequelizeTeam, 'findAll').resolves([team2] as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
  });
  afterEach(sinon.restore);
});
