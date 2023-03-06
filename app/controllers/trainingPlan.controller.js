function weeksBetween(firstDate, secondDate) {
  return Math.round((secondDate - firstDate) / (7 * 24 * 60 * 60 * 1000));
}

function addDays(date, days) {
  date.setDate(date.getDate() + days);
  return date;
}

let repeatedtypes = ["Recovery", "Build 1", "Build 2", "Key"];

function printResult(numberOfWeeks, startDate, raceDate) {
  let repeatedtypesIndex = 0;
  startDate = new Date(startDate);
  raceDate = new Date(raceDate);

  plan["Plan start date"] = startDate;
  plan["Race date"] = raceDate;
  plan["Week #1"] = `- Test - from ${startDate} to ${addDays(startDate, 6)}`;
  startDate = addDays(startDate, 1);
  plan["Week #2"] = `- Test - from ${startDate} to ${addDays(startDate, 6)}`;

  if (numberOfWeeks % 4 == 0) {
    for (let index = 2; index < numberOfWeeks - 2; index++) {
      startDate = addDays(startDate, 1);
      plan[`Week #${index + 1}`] = `- ${
        repeatedtypes[repeatedtypesIndex]
      } - from ${startDate} to ${addDays(startDate, 6)}`;
      repeatedtypesIndex++;

      if (repeatedtypesIndex == 4) {
        repeatedtypesIndex = 0;
      }
    }
  } else if (numberOfWeeks % 4 == 1) {
    startDate = addDays(startDate, 1);
    plan["Week #3"] = `- Filler - from ${startDate} to ${addDays(
      startDate,
      6
    )}`;
    for (let index = 3; index < numberOfWeeks - 2; index++) {
      startDate = addDays(startDate, 1);
      plan[`Week #${index + 1}`] = `- ${
        repeatedtypes[repeatedtypesIndex]
      } - from ${startDate} to ${addDays(startDate, 6)}`;
      repeatedtypesIndex++;

      if (repeatedtypesIndex == 4) {
        repeatedtypesIndex = 0;
      }
    }
  } else if (numberOfWeeks % 4 == 2) {
    repeatedtypesIndex = 2;
    for (let index = 2; index < numberOfWeeks - 2; index++) {
      startDate = addDays(startDate, 1);
      plan[`Week #${index + 1}`] = `- ${
        repeatedtypes[repeatedtypesIndex]
      } - from ${startDate} to ${addDays(startDate, 6)}`;
      repeatedtypesIndex++;

      if (repeatedtypesIndex == 4) {
        repeatedtypesIndex = 0;
      }
    }
  } else if (numberOfWeeks % 4 == 3) {
    repeatedtypesIndex = 1;
    for (let index = 2; index < numberOfWeeks - 2; index++) {
      startDate = addDays(startDate, 1);
      plan[`Week #${index + 1}`] = `- ${
        repeatedtypes[repeatedtypesIndex]
      } - from ${startDate} to ${addDays(startDate, 6)}`;
      repeatedtypesIndex++;

      if (repeatedtypesIndex == 4) {
        repeatedtypesIndex = 0;
      }
    }
  }
  startDate = addDays(startDate, 1);
  plan[
    `Week #${numberOfWeeks - 1}`
  ] = `- Taper - from ${startDate} to ${addDays(startDate, 6)}`;
  startDate = addDays(startDate, 1);

  plan[`Week #${numberOfWeeks}`] = `- Race - from ${startDate} to ${addDays(
    startDate,
    6
  )}`;
  return plan;
}

let plan = {};
const generatePlan = async (req, res) => {
  let startDate = req.body.startDate;
  let raceDate = req.body.raceDate;
  let numberOfWeeks = weeksBetween(new Date(startDate), new Date(raceDate));
  console.log(numberOfWeeks);

  if (numberOfWeeks < 8) {
    return res.status(400).json({
      message: "Number 0f weeks can't be less than 8",
      success: false,
    });
  }
  printResult(numberOfWeeks, startDate, raceDate);
  res.status(200).send({
    error: false,
    success: true,
    data: plan,
  });
};

module.exports = {
  generatePlan,
};
