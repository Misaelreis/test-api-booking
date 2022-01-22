class Assertions {
    shouldHaveStatus(response, status){
        expect(response.status, `status is ${status}`).to.eq(status)
    }

    validateContractOf(response, schema){
        return cy.wrap(response.body).should(
            schema
        )
    }

    shoukdBookingIdIsNotNull(response){
        expect(response.body.bookingid, 'bookingid exist').to.not.be.null;
    }

    shouldHavedefaultHeaderSet(response){
        expect(response.headers, 'default headers').to.include({
            server: 'Cowboy',
            connection: 'keep-alive',
            'x-powered-by': 'Express'	
        })
    }

    shouldHaveContentTypeAppJson(response){
        expect(response.headers, 'contet types').to.include({
            'content-type': 'application/json; charset=utf-8'
        })
    }

    shouldDuration(response){
        expect(response.duration, 'duration').lessThan(1000000)
    }
}

export default new Assertions();