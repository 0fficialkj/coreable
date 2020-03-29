import mocha, { describe, it } from 'mocha';
import chai, { expect, assert } from 'chai';
import server from '../src/server';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Server [src/server.ts]', () => {

  before(async() => {
    await server;
  });

  it('should be a HTTP server', async() => {
    return expect(server).to.exist;
  });



});