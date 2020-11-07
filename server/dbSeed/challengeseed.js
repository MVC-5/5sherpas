let mongoose = require("mongoose");
let db = require("../models");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/5sherpas", {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

let challenges = [
  {
    name: "Exercise",
    description:
      "Whether it's cardio, strength, calisthenics or any exercise, physical activity benefits the mind and body",
    links: [
      "https://www.healthline.com/health/fitness-exercise/10-best-exercises-everyday",
      "https://www.acefitness.org/education-and-resources/lifestyle/blog/6593/top-25-at-home-exercises/",
      "https://greatist.com/fitness/50-bodyweight-exercises-you-can-do-anywhere",
    ],
    categoryreference: 1,
  },

  {
    name: "Nutritious Meal Plan",
    description:
      "Proper nutrition has tremendous physical and mental health benefits, and planning your meals will help you stick to your nutrition plan",
    links: [
      "https://www.choosemyplate.gov/ten-tips-build-healthy-meal",
      "http://www.eatingwell.com/article/289245/7-day-heart-healthy-meal-plan-1200-calories/",
      "https://www.cookinglight.com/healthy-living/weight-loss/31-day-healthy-meal-plans",
    ],
    categoryreference: 1,
  },

  {
    name: "Reduce Screen Time",
    description: "Install an app on your phone that limits your screen time",
    links: [
      "https://play.google.com/store/apps/details?id=com.accessibility.keepfocus&hl=en_US&gl=US",
      "https://play.google.com/store/apps/details?id=com.stayfocused&hl=en_US&gl=US",
    ],
    categoryreference: 6,
  },

  {
    name: "Learn a musical instrument",
    description: "Pick a musical instrument and start taking lessons for it",
    links: [
      "https://www.pastemagazine.com/tech/apps/learn-a-new-musical-instrument-with-these-10-great/",
    ],
    categoryreference: 3,
  },

  {
    name: "Learn an art form",
    description: "Develop the artistic side of your brain",
    links: [
      "https://www.skillshare.com/browse/art",
      "https://www.creativebloq.com/features/online-art-classes",
    ],
    categoryreference: 3,
  },

  {
    name: "Learn a second language",
    description: "",
    links: [
      "https://www.babbel.com/en/magazine/10-tips-from-an-expert",
      "https://www.duolingo.com/",
    ],
    categoryreference: 2,
  },
];

db.Challenge.deleteMany({})
  .then(() => db.Challenge.collection.insertMany(challenges))
  .then((data) => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
