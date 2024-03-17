class dateConvert {
  dateConversion(inputDate) {
    var inputDeparture = inputDate;
    var depart = inputDeparture.split("/");
    var monthD = depart[0];
    var dayD = depart[1];
    var yearD = depart[2];
    cy.log(dayD, monthD, yearD);

    /*   var inputArrival = $origin.Scenario_1.Departure
        var arrive = inputArrival.split('/');
        var monthA = arrive[0]
        var dayA = arrive[1]
        var yearA = arrive[2]
      cy.log(dayA, monthA, yearA)*/
    return depart;
  }
  dateSlice(inputDate) {
    var m, d;
    m = inputDate[0];
    d = inputDate[1];
    if (inputDate[0].startsWith("0")) {
      m = inputDate[0].slice(1);
    }
    if (inputDate[1].startsWith("0")) {
      d = inputDate[1].slice(1);
    }
    var md = m + "/" + d;
    cy.log("md is " + md);
    return md;
  }
}

export default new dateConvert();
