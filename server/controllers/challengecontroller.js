const db = require("../models");

Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

function getLastSunday(date) {
  date.setDate(date.getDate() - date.getDay());
  date.setHours(0, 0, 0, 0);
  return date;
}

const checkDate = (endDate, status) => {
  // midnight of current day
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // make the date a js date obj
  const endDate2 = new Date(endDate);

  // because this will always end with "current" we set status to record if it has gone through checkDate and created a new week
  if (today.valueOf() < endDate2.valueOf()) {
    const returnObj = {
      msg: "current",
      status: status,
    };
    return returnObj;
  }
  // if a new week has started
  else if (today.valueOf() >= endDate2.valueOf()) {
    const startOfNewWeek = endDate2.addDays(1);
    const endOfNewWeek = startOfNewWeek.addDays(6);

    const returnWeek = {
      startOfNewWeek,
      endOfNewWeek,
      status: "new week started",
    };
    return returnWeek;
  }
};

const newChallengeSet = (doc) => {
  console.log("New challenges to be added");
  const newChall = doc.matchingactivities
    .slice(0, 3)
    .map((chall) => ({ challengeId: chall._id, completed: false }));

  return newChall;
};

const processDate = async (endDate, userDoc, status = null) => {
  const dateStatus = checkDate(endDate, status);
  if (dateStatus.msg === "current") {
    console.log("Current week is set in db");

    // was a new progress date week started?
    console.log(`status: ${dateStatus.status || "no new week"}`);
    // if yes or if a user has no challenges
    if (dateStatus.status || userDoc.currentchallenge.length === 0) {
      const newChall = newChallengeSet(userDoc);

      userDoc.currentchallenge = newChall;
      // repopulate the challenges with the new ids
      await userDoc.populate("currentchallenge.challengeId").execPopulate();
    }
  } else {
    userDoc.totalprogress.push({
      dateRange: [dateStatus.startOfNewWeek, dateStatus.endOfNewWeek],
      completed: 0,
    });
    processDate(dateStatus.endOfNewWeek, userDoc, dateStatus.status);
  }
};

module.exports = {
  // returns current challenges and graph data in a json object
  getChallenges: function (req, res) {
    const id = req.body.id;
    db.User.findById(id)
      .populate("challengeCategories")
      .populate("matchingactivities")
      .populate("currentchallenge.challengeId")
      // we do not need to populate the neverdolist
      .then(async (results) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const userDoc = results;
        if (userDoc.totalprogress.length === 0) {
          const nearestSun = getLastSunday(today);
          const endOfWeek1 = nearestSun.addDays(6);

          const firstDateRange = {
            dateRange: [nearestSun, endOfWeek1],
            completed: 0,
          };
          userDoc.totalprogress.push(firstDateRange);
          await userDoc.save();
          console.log("First week created");
          res.json(userDoc);
          return;
        }
        let mostRecentEnd =
          userDoc.totalprogress[userDoc.totalprogress.length - 1].dateRange[1];

        // process date and get new challenges if needed
        await processDate(mostRecentEnd, userDoc);

        await userDoc.save();
        res.json(userDoc);

        console.log("Complete");
      })
      .catch((err) => res.status(422).json(err));

    // TODO: when grabbing new set of challenges. put current challenges into matching and remove new set from array
    // frontend can calculate the remaining days from the last item in total progress array
  },
  // completeChallenge: function(req, res) {
  // this will add one to the last total progress date range and mark as completed

  // },
  // swapChallenge: function(req, res) {
  // add challenge back to matching array and shift item from top of array and add it to challenges (in the same index of the one that was swapped)

  // },
  // neverDoChallenge: function(res, req) {
  // remove from challenges and get a new one challenge from matching to add at the same index, add to neverdo array
  // neverdo exists so the user never sees those activities even if they update their settings and get a fresh list of activities

  // }
  // generateNewMatching: function(res, req) {
  // get all matching activities for each category choice
  // remove all that are in the never do array

  // }
};
