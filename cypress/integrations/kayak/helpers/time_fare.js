class timeFare {
  timeFareCalc(fareTime) {
    let hours = "",
      mins = "",
      mTH = "",
      totalHours = "";
    hours = parseFloat(fareTime.split(" ").shift());
    mins = parseFloat(fareTime.split(" ").pop());
    mTH = mins / 60;
    totalHours = hours + mTH;
    return totalHours;
  }
}

export default new timeFare();
