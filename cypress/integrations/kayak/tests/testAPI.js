import main_page from "../pages/main_page";
import search_result from "../pages/search_result";
import date_Conversion from "../helpers/date_Conversion";
import rate_Conversion from "../helpers/rate_Conversion";
const currency = {
  USD: "United States dollar",
  EUR: "Euro",
  CAD: "Canadian dollar"
};

describe("Search Tests", () => {
  before(() => {
  
  });

  it("let the user search flights from the application", () => {
   
  
      
     ///// compare rates using rates API
      cy.request('GET', 'https://open.er-api.com/v6/latest/USD').then((response) => {
        // Assertions on the response
        expect(response.status).to.equal(200);
       
        //cy.log('Response:', JSON.stringify(response.body));
      //  cy.log(price1, price2, price3, storeSecondCurrency, storeThirdCurrency)
        // Perform assertion: Compare payload USD rate with response
        let USDrate = JSON.stringify(response.body.rates.USD) 
        cy.log(USDrate)
        var usd = 3.987
        cy.log(Math.round(usd))

        var USDprice = 118
        var rate = 1.35
        var USDconvertedPrice = rate_Conversion.rateConversion(rate,USDprice)
        cy.log(USDconvertedPrice)
      });
     
  });
});
