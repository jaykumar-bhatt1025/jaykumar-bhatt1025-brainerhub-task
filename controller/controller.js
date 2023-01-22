const path = require("path");
const { successResponse, errorResponse, dateDiffInDays } = require("./service");

exports.getFrom = (req, res) =>
  res.sendFile(path.join(__dirname, "../views/index.html"));

exports.submitFrom = (req, res) => {
  try {
    let { bookingDate, checkinDate, downPayment, amount, days } = req.body;

    let durationDays = dateDiffInDays(bookingDate, checkinDate);
    if (durationDays < 30)
      return successResponse(
        req,
        res,
        { emi_available: false, Data: [] },
        "",
        200
      );

    // all EMI should be completed before 14 Days.
    durationDays = durationDays - 14;

    // when DownPayment is not provided by User defualt 25%.
    if (!downPayment) downPayment = (amount / 100) * 25;

    // Remaining amount after pay downPayment
    let remainingAmount = amount - downPayment;

    const data = [];

    // Number of EMI
    let countOfEMI = Math.floor(durationDays / days);

    // count out remainingAmount
    let amountOfEMI = remainingAmount / countOfEMI;

    let it = 0

    // Date and EMI
    while (countOfEMI--) {
      let startDate = new Date(bookingDate);
      startDate.setDate(startDate.getDate()+7*it);

      const obj = {
        emi_date: startDate.toString(),
        amount: amountOfEMI,
      };

      data.push(obj);
      it++;
    }

    successResponse(req,res,data,'Success',200);
  } catch (error) {
    errorResponse(req, res);
  }
};
