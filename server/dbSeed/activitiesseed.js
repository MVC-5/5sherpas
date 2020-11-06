let mongoose = require('mongoose');
let db = require('./models')
​
mongoose.connect('mongod://localhost/5sherpas', {
    useNewUrlParser: true,
    useFindAndModify: false
});
​
let activities = [
    {
        name: 'Listen to relaxing music',
        activityType: 'Mental',
        link: 'https://somafm.com/listen/'
    },
    {
        name: 'Meditate',
        activityType: 'Mental'
    },
    {
        name: 'Take a power nap',
        activityType: 'Mental'
    },
    {
        name: 'Journal Your Thoughts or Emotions',
        activityType: 'Mental'
    },
    {
        name: 'Practice Gratitude',
        activityType: 'Mental'
    },
    {
        name: 'Take the stairs instead of the elevator',
        activityType: 'Physical'
    },
    {
        name: 'Go Hiking',
        activityType: 'Physical',
        link: 'https://calebkirkish.github.io/discover-serenity/'
    },
    {
        name: 'Read a book',
        activityType: 'Mental'
    },
    {
        name: 'Do chores with your eyes closed. (i.e. shower, fold laundry, cleaning dishes',
        activityType: 'Mental'
    },
    {
        name: 'Practice Gardening',
        activityType: 'Physical'
    },
    {
        name: 'Eat with Chopsticks',
        activityType: 'Mental'
    },
    {
        name: 'Have a constructive argument with a random person',
        activityType: 'Mental'
    },
    {
        name: 'Go for a walk in a park',
        activityType: 'Physical'
    },
    {
        name: 'Practice Yoga',
        activityType: 'Physical'
    },
    {
        name: 'Talk to yourself in 3rd person',
        activityType: 'Mental'
    },
    {
        name: 'Sing a Song',
        activityType: 'Mental'
    },
    {
        name: 'Write a Compliment to a Friend',
        activityType: 'Mental'
    },
    {
        name: 'Drink Water',
        activityType: 'Physical'
    },
    {
        name: 'Create a workout routine',
        activityType: 'Physical'
    },
    {
        name: 'Swimming Laps',
        activityType: 'Physical'
    },
    {
        name: 'Cook Breakfast',
        activityType: 'Physical'
    },
    {
        name: 'Go to the Library',
        activityType: 'Physical'
    },
    {
        name: 'Go Geocaching',
        activityType: 'Physical'
    },
    {
        name: 'Do a neighborhood cleanup',
        activityType: 'Physical'
    },
    {
        name: 'Do some puzzles',
        activityType: 'Mental'
    },
    {
        name: 'Get involved in an open source programming project',
        activityType: 'Mental'
    },
    {
        name: 'Clean out a closet',
        activityType: 'Physical'
    },
    {
        name: 'Take a long, soaking bath',
        activityType: 'Mental'
    },
    {
        name: 'Go star gazing',
        activityType: 'Mental'
    },
    {
        name: 'Explore Wikipedia',
        activityType: 'Mental'
    },
    {
        name: 'Go Coupon Saving',
        activityType: 'Physical'
    },
    {
        name: 'Breakaway from the everyday',
        activityType: 'Mental',
        link: 'https://breakaway-vacay.herokuapp.com/'
    }
];
​
db.ShortActivity.deleteMany({})
  .then(() => db.ShortActivity.collection.insertMany(activities))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });