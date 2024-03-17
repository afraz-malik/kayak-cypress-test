class rateConvert {
  rateConversion(currencyRate, currencyPrice) {
    var newPrice = currencyRate * currencyPrice;
    var roundPrice = Math.ceil(newPrice);
    return roundPrice;
  }

  extractPriceValue(priceString) {
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }
}
export default new rateConvert();
