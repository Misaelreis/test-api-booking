/// <reference types="cypress" />

import req from '../support/api/requests'
import asserts from '../support/api/assertions'
import schemas from '../support/api/schemas'

context('Booking', () => {
    before('Setup', () => {
        req.doAuth()
    })

    it('Validar contrato get-booking @contract', () => {
        req.getBooking().then(getBookingResponse => {
            asserts
            .validateContractOf(getBookingResponse, schemas.getBookingSchema()
            )
        })
    });

    it('Criar uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            asserts.shouldHaveStatus(postBookingResponse, 200)
            asserts.shoukdBookingIdIsNotNull(postBookingResponse)
            asserts.shouldDuration(postBookingResponse)
            asserts.shouldHavedefaultHeaderSet(postBookingResponse)
            asserts.shouldHaveContentTypeAppJson(postBookingResponse)
        })
    })

    it('Tentar alterar a reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
        req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                asserts.shouldHaveStatus(putBookingResponse, 403)
            })
        })
    })

    it('Alterar um reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBooking(postBookingResponse).then(putBookingResponse => {
                    asserts.shouldHaveStatus(putBookingResponse, 200)
                })
            })
    })

    it('Alterar um reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingInexistent(postBookingResponse).then(putBookingResponse => {
                    asserts.shouldHaveStatus(putBookingResponse, 405)
                })
            })
    })

    it('Excluir uma reserva com sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
                    asserts.shouldHaveStatus(deleteBookingResponse, 201)
                })
            })
    })
});

context('Booking', () => {
    
    it('Alterar reserva sem token @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
                    asserts.shouldHaveStatus(putBookingResponse, 403)
                })
            })
    })

    it('Alterar um reserva sem sucesso @functional', () => {
        req.postBooking().then(postBookingResponse => {
            req.deleteBookingWithoutToken(postBookingResponse).then(deleteBookingResponse => {
                    asserts.shouldHaveStatus(deleteBookingResponse, 403)
                })
            })
    })
});