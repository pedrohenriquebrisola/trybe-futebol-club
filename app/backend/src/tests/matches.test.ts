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

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Matches Test', function () {
  it('Retorna todos o metches', async function () {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });
  it('finaliza partida', async function () {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      );

    expect(status).to.equal(200);
    expect(body.message).to.equal('Finished');
  });
  it('atualiza partida', async function () {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);

    const { status, body } = await chai
      .request(app)
      .patch('/matches/:i')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      )
      .send({
        homeTeamGoals: 3,
        awayTeamGoals: 1,
      });

    expect(status).to.equal(200);
    expect(body.message).to.equal('Changed Successfully');
  });

  it('ERRO ao criar não encontra time', async function () {
    sinon
      .stub(SequelizeTeam, 'findOne')
      .onFirstCall()
      .resolves(null)
      .onSecondCall()
      .resolves(null);

    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      )
      .send(create);

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('There is no team with such id!');
  });

  it('ERRO ao criar times iguais', async function () {
    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      )
      .send(createErrorIdIguais);

    expect(status).to.equal(422);
    expect(body.message).to.deep.equal(
      'It is not possible to create a match with two equal teams'
    );
  });
  it('Cria matche', async function () {
    sinon
      .stub(SequelizeTeam, 'findOne')
      .onFirstCall()
      .resolves(team1 as any)
      .onSecondCall()
      .resolves(team2 as any);

    sinon.stub(SequelizeMatches, 'create').resolves(matche as any);

    const { status, body } = await chai
      .request(app)
      .post('/matches')
      .set(
        'authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTcxMjc5NzM4MywiZXhwIjoxNzEzNjYxMzgzfQ.bwxUtj4UpB8pLS1yK69LDDHmd5Nx21ioZlegkdsB5Aw'
      )
      .send(create);

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matche);
  });

  afterEach(sinon.restore);
});
