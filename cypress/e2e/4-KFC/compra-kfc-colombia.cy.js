/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

describe('Flujo funcional de compra KFC', () => {
    beforeEach(() => {
      
      cy.visit('https://www.kfc.co/');
    })
  
    it('Check compra exitiosa por parte de un cliente de KFC Colombia', () => {
        cy.get('[data-rs-event-name="Select Menu"] > a').click();
        cy.get(':nth-child(6) > .nav-link > span').click();
        cy.get('#product_173 > .card > .h-100 > .card-body > .mt-auto').click();
        cy.get('.modal-title').contains('Combo Pop Corn');
        cy.get('#options_additional_information').clear().
            type('Prueba Alvaro Valdivia')

        cy.get('#add-to-cart-button').click()

        cy.get('#button-to-cart').click()

        cy.get('.d-flex > #button-checkout-duna').should('be.visible')
        cy.get('.d-flex > #button-checkout-duna').click()
        
        cy.frameLoaded('iframe[title="d_una_checkout"]')

        cy.iframe('iframe[title="d_una_checkout"]').find('input[name="email"]').should('be.visible')
            .clear()
            .type('emailprueba@gmail.com')
            .should('have.value','emailprueba@gmail.com')

        cy.iframe('iframe[title="d_una_checkout"]').find('input[name="first_name"]').should('be.visible')
            .clear()
            .type('Alvaro')
            .should('have.value','Alvaro')

        cy.iframe('iframe[title="d_una_checkout"]').find('input[name="last_name"]').should('be.visible')
            .clear()
            .type('Valdivia')
            .should('have.value','Valdivia')

        cy.iframe('iframe[title="d_una_checkout"]').find('select[class="css-cuh4n3 e17lifyc0"]').should('be.visible')
            .select('+591')
            .should('have.value','+591')

        cy.iframe('iframe[title="d_una_checkout"]').find('input[name="phone"]').should('be.visible')
            .clear()
            .type('75330974')
            .should('have.value','75330974')

        cy.iframe('iframe[title="d_una_checkout"]').find('input[name="identity_document"]').should('be.visible')
            .clear()
            .type('8911507')
            .should('have.value','8911507')
        
        cy.iframe('iframe[title="d_una_checkout"]').find('input[data-testid="address-map-input-field"]').should('be.visible')
            .click()
            
        cy.iframe('iframe[title="d_una_checkout"]').find('input[data-testid="address-map-input-field"]').should('be.visible')
            .clear()
            .type('Calle 134 Bis #17-50',{delay:250})
        
        cy.iframe('iframe[title="d_una_checkout"]').find('ul').eq(1).find('li').eq(1).click()
        
        cy.wait(3000)

        cy.iframe('iframe[title="d_una_checkout"]').contains('Confirmar').should('be.visible')
        .click()

        cy.iframe('iframe[title="d_una_checkout"]').find('button[data-testid="continue-button"]').should('be.visible')
            .wait(5000).click()
        
        cy.iframe('iframe[title="d_una_checkout"]').contains('Dirección de facturación').should('be.visible')
        
     
    })

})