const db = require("../models");

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

const newChallengeSet = (doc, amount = 3) => {
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

      userDoc.currentChallenge = newChall;
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
    const id = req.body.id;
    db.User.findById(id)
      .populate("challengeCategories")
      .populate("matchingChallenges")
      .populate("currentChallenge.challengeId")
      // we do not need to populate the neverDoList
      .then(async (results) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const userDoc = results;
        if (userDoc.totalProgress.length === 0) {
          const nearestSun = getLastSunday(today);
          const endOfWeek1 = nearestSun.addDays(6);

          const firstDateRange = {
            dateRange: [nearestSun, endOfWeek1],
            completed: 0,
          };
          userDoc.totalProgress.push(firstDateRange);
          // add get challenges for new user
          const challenges = await newChallengeSet(userDoc);
          userDoc.currentChallenge = challenges;
          await userDoc.populate("currentChallenge.challengeId").execPopulate();
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

    // TODO: when grabbing new set of challenges. put current challenges into matching and remove new set from array
    // frontend can calculate the remaining days from the last item in total progress array
  },
  completeChallenge: function (req, res) {
    db.User.findById(req.body.userId)
      .populate("challengeCategories")
      .then(async (userDoc) => {
        let success = false;

        userDoc.currentChallenge.forEach((chall) => {
          console.log(success);
          if (chall.challengeId == req.body.challengeId) {
            console.log(chall.challengeId + " MATCHES");
            success = true;
            chall.completed = true;
            userDoc.totalProgress[
              userDoc.totalProgress.length - 1
            ].completed += 1;
            console.log(
              userDoc.totalProgress[userDoc.totalProgress.length - 1].completed,
              "COMPLETED"
            );

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
        console.log(newChallenge, req.body.challengeId);
        let challIndex = false;
        userDoc.currentChallenge.forEach((chall, index) => {
          if (chall.challengeId == req.body.challengeId) {
            // add current back to matching
            userDoc.matchingChallenges.push(req.body.challengeId);
            // remove new challenge
            const removed = userDoc.matchingChallenges.shift();
            console.log(removed);
            console.log(chall);
            challIndex = index;

            return;
          }
        });
        console.log(challIndex);
        userDoc.currentChallenge[challIndex] = newChallenge[0];

        if (challIndex === false) {
          res
            .status(500)
            .json(
              `No challenge with id: ${req.body.challengeId} found in user document`
            );
          return;
        }
        console.log(userDoc);
        await userDoc.save();
        res.send(userDoc);
      });
    // add challenge back to matching array and shift item from top of array and add it to challenges (in the same index of the one that was swapped)
  },
  neverDoChallenge: function (req, res) {
    res.json({
      challId: req.body.challengeId,
      userId: req.body.userId,
      action: req.body.action,
    });
    // remove from challenges and get a new one challenge from matching to add at the same index, add to neverdo array
    // neverdo exists so the user never sees those activities even if they update their settings and get a fresh list of activities
  },
  getNewMatching: function (req, res, categoryArr) {
    const userId = req.body.id;
    console.log(categoryArr[0]);
    db.Challenge.find({
      $or: [
        { categoryReference: categoryArr[0] },
        { categoryReference: categoryArr[1] },
        { categoryReference: categoryArr[2] },
      ],
    }).then(async (matchingChall) => {
      const matchIds = matchingChall.map((item) => {
        return item._id;
      });
      shuffle(matchIds);
      db.User.findById(userId)
        .populate("challengeCategories")
        .populate("matchingChallenges")
        .populate("currentChallenge.challengeId")
        .then(async (userDoc) => {
          userDoc.matchingChallenges = matchIds;
          // TODO: give user a fresh set of challenges using these

          await userDoc.save();
          res.json(userDoc);
        });
    });
  },
};
