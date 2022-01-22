/// <reference types="cypress" />

import req from '../support/api/requests'
import assert from '../support/api/assertions'

context('Ping @healthcheck', () => {
    it('GET Healthcheck', () => {
        req.getPing().then(getPingResponse => {
            assert.shouldHaveStatus(getPingResponse, 201)
        })
    });
});