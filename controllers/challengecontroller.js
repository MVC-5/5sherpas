const db = require("../models");

function removeFromTop(arr, num = 3) {
  const shortenedArr = arr.splice(0, num);
  console.log(shortenedArr, " removed from array");
  return arr;
}

// shuffles array, mainly used for shuffling challenges
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

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
  if (today.valueOf() <= endDate2.valueOf()) {
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

const newChallengeSet = (doc, amount = 3) => {
  // if no matching challenges users must set new categories first
  if (doc.matchingChallenges.length < amount) {
    return "No matching";
  }
  console.log("New challenges to be added");
  const newChall = doc.matchingChallenges
    .slice(0, amount)
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
    if (dateStatus.status || userDoc.currentChallenge.length === 0) {
      const newChall = newChallengeSet(userDoc);
      //update new challenges
      userDoc.currentChallenge = newChall;
      // remove new challenges from matching
      userDoc.matchingChallenges = removeFromTop(userDoc.matchingChallenges);

      // repopulate the challenges with the new ids
      await userDoc.populate("currentChallenge.challengeId").execPopulate();
    }
  } else {
    userDoc.totalProgress.push({
      dateRange: [dateStatus.startOfNewWeek, dateStatus.endOfNewWeek],
      completed: 0,
    });
    processDate(dateStatus.endOfNewWeek, userDoc, dateStatus.status);
  }
};

module.exports = {
  // returns current challenges and graph data in a json object
  getChallenges: function (req, res) {
    const id = req.params.id;
    db.User.findById(id)
      .populate("challengeCategories")
      .populate("matchingChallenges")
      .populate("currentChallenge.challengeId")
      // we do not need to populate the neverDoList
      .then(async (results) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const userDoc = results;

        // if new user
        if (userDoc.totalProgress.length === 0) {
          // if today is saturday the first week starts tomorrow
          if (today.getDay() === 6) {
            today.addDays(1);
          }
          const nearestSun = getLastSunday(today);
          const endOfWeek1 = nearestSun.addDays(6);

          const firstDateRange = {
            dateRange: [nearestSun, endOfWeek1],
            completed: 0,
          };
          userDoc.totalProgress.push(firstDateRange);

          await userDoc.save();
          console.log("First week created");
          res.json(userDoc);
          return;
        }
        let mostRecentEnd =
          userDoc.totalProgress[userDoc.totalProgress.length - 1].dateRange[1];

        // process date and get new challenges if needed
        await processDate(mostRecentEnd, userDoc);

        await userDoc.save();
        res.json(userDoc);

        console.log("Complete");
      })
      .catch((err) => res.status(422).json(err));
  },
  completeChallenge: function (req, res) {
    db.User.findById(req.body.userId)
      .populate("challengeCategories")
      .populate("matchingChallenges")
      .then(async (userDoc) => {
        let success = false;

        userDoc.currentChallenge.forEach((chall) => {
          console.log(success);
          if (chall.challengeId == req.body.challengeId) {
            console.log(chall.challengeId + " MATCHES");
            success = true;

            // you can only completed a challenge once!
            if (chall.completed !== true) {
              chall.completed = true;

              // increment totalProgress tracker
              const currentWeek = userDoc.totalProgress.pop();
              currentWeek.completed += 1;
              userDoc.totalProgress.push(currentWeek);
              console.log(userDoc.totalProgress);
              // Completed amount
              console.log(
                userDoc.totalProgress[userDoc.totalProgress.length - 1]
                  .completed,
                "COMPLETED"
              );
            }

            return;
          }
        });
        if (!success) {
          res
            .status(500)
            .json(
              `No challenge with id: ${req.body.challengeId} found in user document`
            );
          return;
        }
        console.log(userDoc.totalProgress, " the total progress");
        await userDoc.populate("currentChallenge.challengeId").execPopulate();
        await userDoc.save();
        res.send(userDoc);
      });

    // this will add one to the last total progress date range and mark as completed
  },
  swapChallenge: function (req, res) {
    db.User.findById(req.body.userId)
      .populate("challengeCategories")
      .then(async (userDoc) => {
        const newChallenge = newChallengeSet(userDoc, 1);
        if (newChallenge === "No matching") {
          res
            .status(500)
            .json(
              `No remaining challenges remain. Please select new categories.`
            );
          return;
        }
        let challIndex = false;
        userDoc.currentChallenge.forEach((chall, index) => {
          if (chall.challengeId == req.body.challengeId) {
            // add current back to matching
            userDoc.matchingChallenges.push(req.body.challengeId);
            // remove new challenge
            userDoc.matchingChallenges = removeFromTop(
              userDoc.matchingChallenges,
              1
            );
            challIndex = index;

            return;
          }
        });
        // add new challenge in place of the old
        userDoc.currentChallenge[challIndex] = newChallenge[0];

        if (challIndex === false) {
          res
            .status(500)
            .json(
              `No challenge with id: ${req.body.challengeId} found in user document`
            );
          return;
        }
        await userDoc.populate("currentChallenge.challengeId").execPopulate();
        await userDoc.save();
        res.send(userDoc);
      });
    // add challenge back to matching array and shift item from top of array and add it to challenges (in the same index of the one that was swapped)
  },
  neverDoChallenge: function (req, res) {
    db.User.findById(req.body.userId)
      .populate("challengeCategories")
      .then(async (userDoc) => {
        const newChallenge = newChallengeSet(userDoc, 1);
        if (newChallenge === "No matching") {
          res
            .status(500)
            .json(
              `No remaining challenges remain. Please select new categories.`
            );
          return;
        }
        let challIndex = false;
        userDoc.currentChallenge.forEach((chall, index) => {
          if (chall.challengeId == req.body.challengeId) {
            // add current to neverDoList
            userDoc.neverDoList.push(req.body.challengeId);
            // remove new challenge
            userDoc.matchingChallenges = removeFromTop(
              userDoc.matchingChallenges,
              1
            );
            challIndex = index;

            return;
          }
        });
        userDoc.currentChallenge[challIndex] = newChallenge[0];

        if (challIndex === false) {
          res
            .status(500)
            .json(
              `No challenge with id: ${req.body.challengeId} found in user document`
            );
          return;
        }
        await userDoc.populate("currentChallenge.challengeId").execPopulate();
        await userDoc.save();
        res.send(userDoc);
      });

    // neverdo exists so the user never sees those activities even if they update their settings and get a fresh list of activities
  },

  // gets all challenges that match user-selected challenge categories, shuffles them, grabs the first 3 to display on dashboard, removes those 3 challenges from the matching challenges array, and saves the new user document
  getNewMatching: function (req, res, categoryArr) {
    const checkNeverDo = (matchingArr, neverDoArr) => {
      const verifiedArr = matchingArr.filter((id) => !neverDoArr.includes(id));
      return verifiedArr;
    };
    const userId = req.body.id;
    console.log(categoryArr[0]);

    // find challenges that match the new categories
    db.Challenge.find({
      $or: [
        { categoryReference: categoryArr[0] },
        { categoryReference: categoryArr[1] },
        { categoryReference: categoryArr[2] },
      ],
    }).then(async (matchingChall) => {
      // create array of matching challenges
      const matchIds = matchingChall.map((item) => {
        return item._id;
      });
      shuffle(matchIds);

      // get user
      db.User.findById(userId)
        .populate("challengeCategories")
        .then(async (userDoc) => {
          // removing any neverDo challenges from matching and set to user
          userDoc.matchingChallenges = await checkNeverDo(
            matchIds,
            userDoc.neverDoList
          );
          // get new challenges using updated user matching. Default new challenge count is 3.
          const newChallenges = newChallengeSet(userDoc);
          // if there was an error and there were no matching challenges given
          if (newChallenges === "No matching") {
            res
              .status(500)
              .json(
                `No remaining matching challenges. Please select new categories.`
              );
            return;
          }
          userDoc.currentChallenge = newChallenges;
          // remove new challenges from matching. defaults to 3
          userDoc.matchingChallenges = removeFromTop(
            userDoc.matchingChallenges
          );
          await userDoc.populate("currentChallenge.challengeId").execPopulate();

          await userDoc.save();
          res.json(userDoc);
        });
    });
  },
};
