let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/appdb", {
  useNewUrlParser: true,
  useFindAndModify: false
});

let categories = [
  {
    name: "Wellness",

  },

  {
    name: "Intelligence",

  },

  {
    name: "Well-Roundedness",

  },

  {
    name: "Organization",
 
  },

  {
    name: "Career",

  },

  {
    name: "Bad Habit Cessation",

  },

  {
    name: "Bad Habit Cessation",

  },

  {
    name: "Interpersonal Relationships",
 
  },
  
];

db.Category.deleteMany({})
  .then(() => db.Category.collection.insertMany(categories))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  // let categories = [
  //   {
  //     category: "Wellness",
  //     description: "Feel your best by optimizing your mental & physical health and your overall wellbeing.",
  //     activities: [
  //       "Do an exercise", "Meal Plan for Nutrition", "Meditate", "Reduce Screen Time"
  //     ]
  //   },
  
  //   {
  //     category: "Intelligence",
  //     description: "Improve your IQ.",
  //     activities: [
  //       "Read a book", "Trivia", "Math Quiz"
  //     ]
  //   },
  
  //   {
  //     category: "Well-Roundedness",
  //     description: "Exercise different areas of your brain and become a more complete person.",
  //     activities: [
  //       "Learn a musical instrument", "Take an art class", "Learn a second language", "Talk to a stranger"
  //     ]
  //   },
  
  //   {
  //     category: "Organization",
  //     description: "Feel better about your habitat by making it easier to live in.",
  //     activities: [
  //       "Clean up your computer desktop", "Clean your living space", "Go through your stuff and get rid of things you don't need", "Organize your calendar"
  //     ]
  //   },
  
  //   {
  //     category: "Career",
  //     description: "Accomplish your work goals and attain more overall career satisfaction",
  //     activities: [
  //       "Learn a new skill", "Read a book relevant to your field", "Take an online course", "Attend a career fair", "Update your LinkedIn", "Update your resume", "Talk to your boss about your career goals", "Ask for a raise"
  //     ]
  //   },
  
  //   {
  //     category: "Bad Habit Cessation",
  //     description: "Whether it's smoking, junk food, or anything in between, your bad habits are holding you back from your true potential.  Ditch them!",
  //     activities: [
  //        "Pick a second category to work on to replace your bad habit", "Develop a 'cold-turkey' mechanism", "Take up a new hobby", "Set reminders on your phone", "Leave post-it notes for yourself", "Enlist a friend's support"
  //     ]
  //   },
  
  //   {
  //     category: "Bad Habit Cessation",
  //     description: "Whether it's smoking, junk food, or anything in between, your bad habits are holding you back from your true potential.  Ditch them!",
  //     activities: [
  //        "Pick a second category to work on to replace your bad habit", "Develop a 'cold-turkey' mechanism", "Take up a new hobby", "Set reminders on your phone", "Leave post-it notes for yourself", "Enlist a friend's support"
  //     ]
  //   },
  
  //   {
  //     category: "Interpersonal Relationships",
  //     description: "Your friends, family, those closest to you matter. Make sure to nurture those relationships",
  //     activities: [
  //        "Call someone who you haven't spoke to in a while", "Develop a list of what you should say 'no' to.", "Help a friend or family member with a project", "Listen more during your next conversation",
  //     ]
  //   },
    
  // ];