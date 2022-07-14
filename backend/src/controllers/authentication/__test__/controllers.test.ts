import { app } from 'src/server';
const request = require('supertest');
// const express = require('express');

describe('login', () => {
  it('returns status 200 and posts positive login message', () => {
    // const session = app.
    const res = request(app)
      .get('/users')
      .send({ session: { username: 'mack' } });
    expect(res.status).toEqual(200);
  });
});
