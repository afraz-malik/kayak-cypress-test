import main_page from "../pages/main_page";
import search_result from "../pages/search_result";
import date_Conversion from "../helpers/date_Conversion";
import rate_Conversion from "../helpers/rate_Conversion";
const currency = {
  USD: "United States dollar",
  EUR: "Euro",
  CAD: "Canadian dollar",
};

describe("Search Tests", () => {
  before(() => {
    cy.clearCookies();

    // Set a cookie
    cy.setCookie("kayak", "R3Q0UUi78WlHf$EpALjI");

    // Visit a page where the cookie is used
    cy.visit("https://www.kayak.com/");

    // Retrieve the cookie and assert its value

    cy.getCookie("kayak").should(
      "have.property",
      "value",
      "R3Q0UUi78WlHf$EpALjI"
    );
  });

  it("let the user search flights from the application", () => {
    main_page.gotToWays();
    cy.fixture("searchcriteria").then(($origin) => {
      var Departure = date_Conversion.dateConversion(
        $origin.Scenario_1.Departure
      );

      /**
       * Converting date
       */
      var Arrival = date_Conversion.dateConversion($origin.Scenario_1.Arrival);
      /**
       * Go to search page
       */
      main_page.goToSearchInput(
        $origin.Scenario_1.Origin_Input,
        $origin.Scenario_1.Origin_Selection,
        $origin.Scenario_1.Destination_Input,
        $origin.Scenario_1.Destination_Selection,
        Departure,
        Arrival
      );
      //  main_page.goToSearchInput($origin.Scenario_2.Origin_Input,$origin.Scenario_2.Origin_Selection,
      //   $origin.Scenario_2.Destination_Input, $origin.Scenario_2.Destination_Selection,
      //   $origin.Scenario_2.Departure)
      /**
       * Here we are making assertion with date input and the date coming from api and displayed on DOM
       */
      var DepCompare = date_Conversion.dateSlice(Departure);
      main_page.checkDepdate().should("include.text", DepCompare);
      var ArrCompare = date_Conversion.dateSlice(Arrival);
      main_page.checkArrdate().should("include.text", ArrCompare);
      // main_page.searchFlight();
      let flightOriginInput;
      let flightDestinationInput;

      cy.get('[aria-controls="flight-origin-smarty-input-list"]')
        .invoke("attr", "data-test-origin")
        .then((value) => {
          // Assign the value to flightOriginInput
          flightOriginInput = value;
          cy.log("1", flightOriginInput);
        });

      cy.get('[aria-controls="flight-destination-smarty-input-list"]')
        .invoke("attr", "data-test-destination")
        .then((value) => {
          // Assign the value to flightDestinationInput
          flightDestinationInput = value;
        })
        .then(() => {
          // Perform action after obtaining both inputs
          cy.log("flightOriginInput:", flightOriginInput);
          cy.log("flightDestinationInput:", flightDestinationInput);

          // Generate URL with inputs
          const url = `https://www.kayak.com/flights/${flightOriginInput}-${flightDestinationInput}/${Departure[2]}-${Departure[0]}-${Departure[1]}${Arrival[2]}-${Arrival[0]}-${Arrival[1]}`;

          // Open the URL
          cy.visit(url);
        });
    });

    search_result.getCheapest().click();

    /*
       
    //// get best fare


 
  let Best = '', bTime= '' , bTime1 = '' 
    cy.server()
    cy.route({
        method: 'GET',
        url: '**?sort=bestflight_a**',
      }).as('searchDataB')
      cy.wait(10000)
      main_page.getBestPrice()
      .then ((number)=> {
        Best = parseFloat( number
          .text()
          .split('$')
          .pop())
      })

      main_page.getBestTime()
      .then ((time)=> {
       bTime1 = time.text()
       bTime = time_fare.timeFareCalc(bTime1)
      })
      

      cy.wait('@searchDataB').then((xhr) => {
        main_page.getBestPrice()
        .should('contain', Best)

        cy.log(Best)
        cy.log(bTime)
      })
      cy.log(Best)

*/
    /// get cheapest fare

    // cy.wait(10000);
    // main_page.getCheapPrice().click({force: true})

    var Cheap = "",
      cTime = "",
      cTime1 = "";
    let storeSecondCurrency, storeThirdCurrency;

    // cy.request({
    //   method: "GET",
    //   url: "**/horizon/flights/results/FlightSearchPollAction**",
    // }).as("searchDataC");

    // This will return data of first card.
    cy.wait(10000);
    search_result.getCheapPrice().then(($firstChild) => {
      var uniqueId = $firstChild[0].getAttribute("data-resultid");
      var price1, price2, price3;
      // Use $firstChild as needed
      // console.log($firstChild[0]);
      cy.wait(10000);
      cy.get(`[data-resultid=${uniqueId}]`)
        .find(".f8F1-price-text")
        .eq(0)
        .then((PriceVal) => {
          price1 = PriceVal.text();

          cy.log("in then first card price is ", price1, uniqueId);

          // select second currency and store its value
          search_result.getCurrency();
          cy.get(":nth-child(2) > :nth-child(2) > .KmfS").then((text) => {
            storeSecondCurrency = text.text();
          });

          search_result.saveSCurrency().click({ force: true });
          cy.wait(10000);

          //cy.get(`[data-resultid=${uniqueId}] > .yuAt > .nrc6-wrapper > .nrc6-inner > .nrc6-price-section > .Oihj > .Oihj-bottom-booking > .M_JD > .M_JD-large-display > :nth-child(1) > .oVHK-fclink > .f8F1 > .f8F1-above > .f8F1-price-text-container > .f8F1-price-text`)
          cy.get(`[data-resultid=${uniqueId}]`)
            .find(".f8F1-price-text")
            .eq(0)
            .then((PriceVal) => {
              price2 = PriceVal.text();
              cy.log("in then second card price is ", price2, uniqueId);
            });
          cy.clearCookies();

          // select third currency and store its value
          search_result.getCurrency();

          cy.get(":nth-child(2) > :nth-child(3) > .KmfS").then((text) => {
            storeThirdCurrency = text.text();
          });

          search_result.saveTCurrency().click({ force: true });
          cy.wait(10000);

          //cy.get(`[data-resultid=${uniqueId}] > .yuAt > .nrc6-wrapper > .nrc6-inner > .nrc6-price-section > .Oihj > .Oihj-bottom-booking > .M_JD > .M_JD-large-display > :nth-child(1) > .oVHK-fclink > .f8F1 > .f8F1-above > .f8F1-price-text-container > .f8F1-price-text`)
          cy.get(`[data-resultid=${uniqueId}]`)
            .find(".f8F1-price-text")
            .eq(0)
            .then((PriceVal) => {
              price3 = PriceVal.text();
              cy.log("in then third card price is ", price3, uniqueId);
            });

          var APIResponse;
          ///// compare rates using rates API
          cy.request("GET", "https://open.er-api.com/v6/latest/USD").then(
            (response) => {
              // Assertions on the response
              expect(response.status).to.equal(200);
              APIResponse = response;
              //cy.log('Response:', JSON.stringify(response.body));
              cy.log(
                price1,
                price2,
                price3,
                storeSecondCurrency,
                storeThirdCurrency
              );
              // Perform assertion: Compare payload USD rate with response
              let USDrate = JSON.stringify(response.body.rates.USD);
              let EURrate = JSON.stringify(response.body.rates.EUR);
              let CADrate = JSON.stringify(response.body.rates.CAD);
              cy.log("Rates from API are: ", USDrate, EURrate, CADrate);
              cy.log(price1, price2, price3);
              var USDprice = rate_Conversion.extractPriceValue(price1);
              var EURprice = rate_Conversion.extractPriceValue(price2);
              var CADprice = rate_Conversion.extractPriceValue(price3);
              cy.log("DOM Prices are: ", USDprice, EURprice, CADprice);
              var USDconvertedPrice = rate_Conversion.rateConversion(
                USDrate,
                USDprice
              );
              var EURconvertedPrice = rate_Conversion.rateConversion(
                EURrate,
                USDprice
              );
              var CADconvertedPrice = rate_Conversion.rateConversion(
                CADrate,
                USDprice
              );

              cy.log(
                "Flight prices after conversion from the API are: ",
                USDconvertedPrice,
                EURconvertedPrice,
                CADconvertedPrice
              );

              // assertion to compare DOM Rates with Conversion API rates
              expect(USDprice).to.equal(USDconvertedPrice);
              expect(EURprice).to.equal(EURconvertedPrice);
              expect(CADprice).to.equal(CADconvertedPrice);
            }
          );

          Object.keys(currency).forEach((key) => {
            // var currencyCode = key;
            //  var currencyString = currency[key];
            // cy.clearCookies();
            //search_result.getCurrency(currencyString)
            /* cy.wait(10000);
          cy.get(`[data-resultid=${uniqueId}]`)
            .find(".f8F1-price-text")
            .eq(0)
            .then((el) => {
              cy.log(
                "Final Results:",
                "Original USD Price " + price1,
                "Converted " + key + " " + el.text()
              );
            });*/
          });
        });

      // console.log(uniqueId, price1, "hello afraz");
      // cy.log("out of then",price1, price2, price3, uniqueId)
    });

    // cy.log(Cheap,  "hello world  123"); // not getting Cheap value here

    /* main_page.getCheapTime()
    .then ((time)=> {
    
             cTime1 =time.text()
    cTime = time_fare.timeFareCalc(cTime1)
    
           })*/

    // cy.wait("@searchDataC").then((xhr) => {
    //   main_page.getCheapPrice().should("contain", Cheap);
    //   cy.log(Cheap);
    //   //cy.log(cTime)
    // });

    /*        /// get quickest fare

         cy.wait(10000)
         main_page.getQuickPrice().click({force: true})
         
         let Quick = '', qTime = '', qTime1 = ''
        
         
         cy.server()
         cy.route({
             method: 'GET',
             url: '**?sort=duration_a**',
           }).as('searchDataQ')
           main_page.getQuickPrice()
           .then((number) => {
             Quick = parseFloat( number
               .text()
               .split('$')
               .pop())
           })
         
           main_page.getQuickTime()
           .then ((time)=> {
            qTime1 = time.text()
            qTime = time_fare.timeFareCalc(qTime1)
               
           })

           cy.wait('@searchDataQ').then((xhr) => {
             main_page.getQuickPrice()
             .should('contain', Quick)
             cy.log(Quick)
             cy.log(qTime)
             
           
         })
    


         main_page.getQuickPrice()
           .then(() => {
             if(Cheap <= Best && Cheap <= Quick){
              cy.log('Cheap fare is less than from Best and Quick fares')
              cy.log('Cheapest:',Cheap)
              cy.log('Best:',Best) 
              cy.log('Quickest:',Quick)
              // Compares Cheap fare with Best fare
              if(Cheap< Best){
                expect(Cheap).to.be.lessThan(Best)
              }
              else{
                if(Cheap == Best){
                  expect(Cheap).to.be.equal(Best)
                }
                else{
                  cy.log("Cheap fare is greater than Best fare")
                }
              }


              //Compares Cheap fare with Quick fare
              if(Cheap < Quick){
                expect(Cheap).to.be.lessThan(Quick)
              }
              else{
                if(Cheap == Quick){
                  expect(Cheap).to.be.equal(Quick)
                }
                else{
                  cy.log("Cheap fare is greater than Quick fare")
                }
              }
             
             }
             else{
               cy.log('I am mad')
             }
           
            })

           main_page.getBestPrice()
           .then(() => {
             
             if(qTime <= cTime && qTime <= bTime){
              cy.log('Quick time is less than or equal to Cheap and Best times')
              cy.log('Cheapest Time:',cTime)
              cy.log('Best Time:',bTime) 
              cy.log('Quickest Time:',qTime)

              // Compares qTime with cTime
              if (qTime< cTime){
                expect(qTime).to.be.lessThan(cTime)
              }
              else {
                if(qTime==cTime){
                  expect(qTime).to.be.equal(cTime)
              
                }
                else{
                  cy.log("Quick time is not less than Cheap time")
                }
              }
                 // Compares qTime with bTime
              if(qTime<bTime){
                expect(qTime).to.be.lessThan(bTime)
              }
              else{
                if(qTime == bTime){
                  expect(qTime).to.be.equal(bTime)
                }
                else
                {
                  cy.log("Quick time is not less than Best time")
                }
              }
            
             }
             else{
               cy.log('I am mad')
             }

           })
*/
  });
  /* it('lets the user compare cheap flight rates', () => {
     
     
    })*/
});
