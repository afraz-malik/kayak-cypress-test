class searchResult {
  getCheapest() {
    return cy.get('[aria-label="Cheapest"]');
  }
  getCheapPrice() {
    cy.wait(10000)
   return cy.get("div.Fxw9 [data-resultid]").first()
  }
  getCurrency(){
    cy.get('[aria-label="Navigation menu"]').click({force: true})
    cy.get('.pRB0 > :nth-child(1) > :nth-child(13) > div:nth-child(2)').click({force: true})
  }
 
  storeCurrency(){
    var currency;
     cy.get(':nth-child(2) > :nth-child(2) > .KmfS').then((text) =>{
     currency = text.text()
     //cy.log(currency);
     //cy.wrap('text').its('text').should('eq',currency)
    
    })
   
   
  }
  saveSCurrency(){
    cy.get(':nth-child(2) > :nth-child(2) > .KmfS').click({force: true})
    return cy.get('[aria-label="close"] >.Py0r-button-container') 
  }
  saveTCurrency(){
    cy.get(':nth-child(2) > :nth-child(3) > .KmfS').click({force: true})
    return cy.get('[aria-label="close"] >.Py0r-button-container') 
  }
}

export default new searchResult();
