class mainPage {
  gotToWays() {
    /**
     * This code set the filter to -> RoundTrip
     */
    cy.get(".zcIg")
      .find(".Uczr-select-title.Uczr-mod-alignment-left")
      .eq(0)
      .contains("Round-trip")
      .click();
    cy.get("#roundtrip").contains("Round-trip").click();
  }
  goToSearchInput(
    Origin,
    OriSelection,
    Destination,
    DesSelection,
    Depart,
    Arrive
  ) {
    // --------- FROM? --------------
    cy.get('[aria-label="Remove"]').click();
    cy.get('[aria-label="Flight origin input"]').click().type(Origin);
    cy.get("#flight-origin-smarty-input-list")
      .find(".JyN0-name")
      .eq(0)
      .invoke("text")
      .then(($text) => {
        expect($text).to.contain(OriSelection);
      });
    cy.get("#flight-origin-smarty-input-list").find(".JyN0-name").eq(0).click();

    // ------------ TO? --------------

    cy.get('[aria-label="Flight destination input"]').click().type(Destination);
    cy.get("#flight-destination-smarty-input-list")
      .find(".JyN0-name")
      .eq(0)
      .invoke("text")
      .then(($text) => {
        expect($text).to.contain(DesSelection);
      });
    cy.get("#flight-destination-smarty-input-list")
      .find(".JyN0-name")
      .eq(0)
      .click();

    // ---------- Date Picker ---------------

    cy.get('[aria-label="Start date calendar input"]').click();
    
    cy.get('[role="gridcell"]')
      .find(".ggde.ggde-button")
      .eq(Number(Depart[1])-1)
      .click();
    cy.get('[aria-label="End date calendar input"]').click();
    cy.get('[role="gridcell"]')
      .find(".ggde.ggde-button")
      .eq(Number(Arrive[1]) + 29)
      .click();

    /*
        // ---------- Invoke Selection Text ---------

        let flight, travs, cabin, bags , depart , arrive, startdate
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(1)>div>div>div>div').then(($text) => {
            flight = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(2)>div>button>div>div:nth-child(1)').then(($text) => {
            travs = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(3)>div>div>div>div').then(($text) => {
            cabin = $text.text()
        })
        cy.get('.form-section.noBg>div>div>div:nth-child(1)>div:nth-child(4)>div>button>div>div:nth-child(1)').then(($text) => {
            bags = $text.text()
        })
       cy.get('.search-form-inner>div>div>div>div>div>div>div[id$="-origin-input-wrapper"]>div>div>div>div:nth-child(1)>div:nth-child(2)')
        .then(($text) => {
            depart = $text.text()
        })
       cy.get('.search-form-inner>div>div>div>div:nth-child(3)>div>div>div>div>div>div>div:nth-child(2)').then(($text) => {
            arrive = $text.text()
        })
        cy.get('.search-form-inner>div>div:nth-child(1)>div:nth-child(1)>div:nth-child(4)>div:nth-child(1)>div:nth-child(1)>div>div>div[data-placeholder="Depart"]')
        .then(($text) => {
            startdate = $text.text()
        })
        

     */

    /*  // ------------ Verify Selection Text -------------

        cy.get('div[id$="-switch-display"]>div').should(($text2) => {
            expect($text2.text()).to.eq(flight)
        })
        cy.get('.travelersAboveForm>div>button>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(travs)
        })
        cy.get('div[class*="cabinAboveForm"]>div>div>div:nth-child(1)>div').should(($text2) => {
            expect($text2.text()).to.eq(cabin)
        })
        cy.get('div[id$="-baggageDropdownContainer"]>div>button>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(bags)
        })
       cy.get('div[id$="-origin-input-wrapper"]>div>div>div>div>div:nth-child(2)').should(($text2) => {
            expect($text2.text()).to.eq(depart)
        })
        cy.get('div[id$="-destination-input-wrapper"]>div>div>div>div>div:nth-child(2)').should(($text2) => {
            expect($text2.text()).to.eq(arrive)
        })
        cy.get('div[id$="-dateRangeInput-display-start"]>div>div>div:nth-child(1)').should(($text2) => {
            expect($text2.text()).to.eq(startdate)
        })*/
  }

  checkDepdate() {
    //Assertion
    // var txt = cy.get('[aria-label="Start date calendar input"]').find('.sR_k-value').eq(0)
    return cy.get(":nth-child(1) > .sR_k-date > .sR_k-value");
  }
  checkArrdate() {
    return cy.get(":nth-child(3) > .sR_k-date > .sR_k-value");
  }

  checkOriginInput(){
    
    return cy.get('[aria-controls="flight-origin-smarty-input-list"]')
  
  }
  checkDestinationInput(){
   
  }

  searchFlight() {
    // ------------- Search Flight ------------

    //return cy.get('.zEiP-formField.zEiP-submit')
    //return cy.get('.zEiP-formField.zEiP-submit').invoke('removeAttr', 'target')

    cy.window().then((win) => {
      cy.stub(win, "open").as("NewTabs");
    });

    //cy.contains('button', 'buttonName').click()
    cy.get('.zEiP-formField.zEiP-submit [aria-label="Search"]').click();
    // cy.get("@NewTabs").should("be.called");
  }

  /*getCheapPrice() {
    // This will return data about first card.
    cy.get("div.Fxw9 [data-resultid]")
      .first()
      .then(($firstChild) => {
        var uniqueId = $firstChild[0].getAttribute("data-resultid");

        // Use $firstChild as needed
         console.log($firstChild[0]);
     //   var price = cy.get(`[data-resultid=${uniqueId}]`).find('.f8F1-price-text').eq(0);
      //  console.log(uniqueId, "hello afraz");
      });
    // return cy.get(
    //   ".Hv20-mod-state-active > .Hv20-content > .Hv20-value > div > :nth-child(1)"
    // );
  }*/


  goToSorting() {
    cy.get(
      'div[id$="-tabs"]>a[data-sort="price_a"]>div>div>div>div>div>span>span'
    ).should(($sort) => {
      expect($sort.text()).contains("Cheapest");
    });
    cy.get(
      'div[id$="-tabs"]>a:nth-child(2)>div>div>div>div>div>span>span:nth-child(1)'
    ).should(($sort) => {
      expect($sort.text()).contains("Best");
    });

    cy.get(
      'div[id$="-tabs"]>a:nth-child(3)>div>div>div>div>div>span>span'
    ).should(($sort) => {
      expect($sort.text()).contains("Quickest");
    });
  }
}

export default new mainPage();
