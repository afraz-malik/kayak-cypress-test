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
    cy.on("window:before:load", (win) => {
      if (win.jQuery === undefined && (win.$ === undefined || win.$ === {})) {
        win.$ = Cypress.cy.$$;
      }
    });
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

    // Click on the cheapest tab
    search_result.getCheapest().click();

    cy.wait(10000); // If we remove this, we get $remoteJquery not defined at .then

    // Get the first cheap price card from results
    search_result.getCheapPrice().then(($firstChild) => {
      // unique id of selected card
      var uniqueId = $firstChild[0].getAttribute("data-resultid");

      var price2, price3;

      // Get the currency conversion api response
      cy.request("GET", "https://open.er-api.com/v6/latest/USD").then(
        (apiResponse) => {
          expect(apiResponse.status).to.equal(200);
          // Get the currency value of USD
          cy.log("hello", apiResponse.body.rates.USD);
          cy.get(`[data-resultid=${uniqueId}]`)
            .find(".f8F1-price-text")
            .eq(0)
            .then((PriceVal) => {
              var USDPrice = PriceVal.text().replace(/\D/g, "");

              let USDrate = JSON.stringify(apiResponse.body.rates.USD);
              var USDconvertedPrice = rate_Conversion.rateConversion(
                USDrate,
                USDPrice
              );
              expect(parseInt(USDPrice)).to.equal(parseInt(USDconvertedPrice));
              // here we are going to loop through it.
              var loop = Object.keys(currency);
              cy.wrap(loop).each((key) => {
                search_result.openCurrencyModal();
                search_result
                  .selectSpecificCurrency(currency[key])
                  .click({ force: true });
                cy.wait(10000); // here we wait for page to reload
                search_result.getCheapest().click(); // sometimes when page reloads, it goes back to "Best" tab, so we have to click on "Cheapest" tab
                cy.get(`[data-resultid=${uniqueId}]`)
                  .find(".f8F1-price-text")
                  .eq(0)
                  .then((PriceVal) => {
                    var currentSelectedPrice = PriceVal.text().replace(
                      /\D/g,
                      ""
                    );
                    let currentSelectedPriceRate = JSON.stringify(
                      apiResponse.body.rates[key]
                    );
                    var currentSelectedConvertedPriceInUSD =
                      rate_Conversion.rateConversion(
                        currentSelectedPriceRate,
                        currentSelectedPrice
                      );
                    cy.log("in then second card price is ", price2, uniqueId);
                    expect(
                      parseInt(currentSelectedConvertedPriceInUSD)
                    ).to.equal(parseInt(USDPrice));
                  });
                cy.clearCookies();
              });
            });
        }
      );
    });
  });
});
