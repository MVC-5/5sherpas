let mongoose = require("mongoose");
let db = require("../models");

mongoose.connect("mongodb://localhost/5sherpas", {
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
    categoryReference: 1,
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
    categoryReference: 1,
  },

  {
    name: "Reduce Screen Time",
    description: "Install an app on your phone that limits your screen time",
    links: [
      "https://play.google.com/store/apps/details?id=com.accessibility.keepfocus&hl=en_US&gl=US",
      "https://play.google.com/store/apps/details?id=com.stayfocused&hl=en_US&gl=US",
    ],
    categoryReference: 6,
  },

  {
    name: "Learn a musical instrument",
    description: "Pick a musical instrument and start taking lessons for it",
    links: [
      "https://www.pastemagazine.com/tech/apps/learn-a-new-musical-instrument-with-these-10-great/",
    ],
    categoryReference: 3,
  },

  {
    name: "Learn an art form",
    description: "Develop the artistic side of your brain",
    links: [
      "https://www.skillshare.com/browse/art",
      "https://www.creativebloq.com/features/online-art-classes",
    ],
    categoryReference: 3,
  },

  {
    name: "Learn a second language",
    description: "",
    links: [
      "https://www.babbel.com/en/magazine/10-tips-from-an-expert",
      "https://www.duolingo.com/",
    ],
    categoryReference: 2,
  },
  {
    name: "Be Present",
    description:
      "In our busy lives, we forget to slow down and experience the simple pleasures of food and activity. Eat slowly and experience the flavors, textures, sights and smells. Notice when you feel hungry or comfortably full. When you exercise, appreciate the sensations and feelings of the present moment and your surroundings. Being grounded in the present moment helps you relax and connect to your body, mind, and spirit.",
    categoryReference: 1,
  },
  {
    name: "Go meatless!",
    description:
      "Swap meat for a vegetarian protein source in a few meals this week. Quinoa, black beans or lentils with rice, Greek yogurt, tempeh and eggs are all good sources of protein.",
    categoryReference: 1,
  },
  {
    name: "Sit up straight",
    description:
      "Keeping good posture will not only strengthen your core, but will also add a small extra calorie burn because youre working slightly harder to maintain the position.",
    categoryReference: 1,
  },
  {
    name: "Fight sitting disease",
    description:
      "For the next week, convert one of your meetings to a walking meeting and let the ideas flow with each step",
    categoryReference: 1,
  },
  {
    name: "Never stop learning",
    description:
      "The broader your knowledge base, the easier it is to land on your feet when life tosses you about. Never pass up an opportunity to learn more about your job or industry. Don’t refuse to take any training your company offers. You never know when recalling information from yesterday can save you today. Be a perpetual student of personal success.",
    categoryReference: 3,
  },
  {
    name: "Focus your life",
    description:
      "Do you have a direction established for your career? Are you clear about the values and direction you want to create for your life? Focus helps establish priorities and enhances your ability to reach greater levels of success.",
    categoryReference: 3,
  },
  {
    name: "Be an effective communicator",
    description:
      "Learn how to express yourself well with words. Take a speech class. Join Toastmasters. Listen to great speakers. Adapt what they teach and demonstrate.",
    categoryReference: 3,
  },
  {
    name: "Develop a sound value system",
    description:
      "A well-rounded approach to value identification begins with deep thought. Think about what is most important concerning your behavior and actions. List the value you subscribe to on these points. Then, create the list you vow to never violate.",
    categoryReference: 3,
  },
  {
    name: "Be a people person",
    description:
      "This starts with caring. Strive to understand the other person’s point of view. Practice empathy and walking in their shoes before casting judgment.",
    categoryReference: 3,
  },
  {
    name: "Find one good trait in every co-worker",
    description:
      " If a colleague’s personality clashes completely with your own, the best way to handle the situation is by finding at least one good trait in that person—preferably something professional.",
    categoryReference: 7,
  },
  {
    name: "Control your emotions",
    description:
      "Take a deep breath and tone your emotions down. Always express yourself in a calm, patient manner.",
    categoryReference: 7,
  },
  {
    name: "Maintain your relationships",
    description:
      "Connect with college friends and former colleagues on social media or through email; try to set up face-to-face meetings now and then.",
    categoryReference: 7,
  },
  {
    name: "Cultivate a positive outlook",
    description:
      "Teach yourself to be positive by reminding yourself every day of the good things about your life and your job. If you’re upset about a personal matter, set those feelings aside until after work. If you’re stressed about a work issue, look for the positive in the situation and try to build on that.",
    categoryReference: 7,
  },
  {
    name: "Acknowledge others’ expertise",
    description:
      " Ask for their help on projects and give credit where credit is due.",
    categoryReference: 7,
  },
  {
    name: "Be an early bird",
    description:
      "You are more likely to get more things done, and in time, if you start early. Of course, this should reflect on the work schedule you make, but getting started early also means there are other things you can do to keep you on your toes, such as daily exercise and a good breakfast. Starting early also means you avoid stress by having plenty of time to get to work and do anything else you need to do.",
    categoryReference: 4,
  },
  {
    name: "Keep a working calendar",
    description:
      "At the same time you are planning the day and making your list of tasks, you should make a schedule, giving each task a prescribed time to do each one. You can ensure you meet all your deadlines, and nothing is left by the wayside.",
    link: "https://sheplt1.github.io/Day-Planner/",
    categoryReference: 4,
  },
  {
    name: "Create a running list that you add to constantly",
    description:
      " If there is a book you want to read or a restaurant you want to try, make a running list that you have on you at all times. If you want to see a movie, you don’t necessarily need to see it today, and therefore don’t want it on your daily to-do list. Having a running list will help remind you of your “extra” to-dos.",
    link: "https://sleepy-caverns-87027.herokuapp.com/notes",
    categoryReference: 4,
  },
  {
    name: "Create binders for important items in your life",
    description:
      "Create labeled binders for “Auto Insurance”, “Vacation”, “Receipts”, “Budget”, and any other important item or even in your life.",
    categoryReference: 4,
  },
  {
    name: "Create a to-do list",
    description:
      "Order your to-do list by high priority to low priority. Assess the urgency and importance of each to help you prioritize. If possible, make a to-do list for the next day and refer to it before you go to sleep. By doing so, you will wake up with an action plan in mind.",
    categoryReference: 4,
  },
  {
    name: "Identify a habit you want to change",
    description:
      "Be specific – what behavior do you want to change? This entails accepting that you have a habit of getting in the way of your fullest life. After all, if you avoid the problem, you won’t solve it. Envision the new behavior and make a list of the steps needed to get there. Make a commitment to making the desired change. Tell supportive friends and family about your commitment. Research shows that making a public commitment to others supports committed to action.",
    categoryReference: 6,
  },
  {
    name: "Know your cues",
    description: "Knowing your triggers can help you avoid them.",
    categoryReference: 6,
  },
  {
    name: "Recruit someone else",
    description:
      "Use the people around you for help. Let people nag you to stop a behavior. Humans are social creatures, and the feedback we get from other people is a powerful way to help us stop our bad habits.",
    categoryReference: 6,
  },
  {
    name: "Read outside your scope",
    description:
      "Choose books on different subjects. Read outside your comfort topics.",
    categoryReference: 2,
  },
  {
    name: "Subscribe to blogs that focus on thought-provoking posts",
    description:
      "Never stop learning. Subscribe to interesting blogs that share insightful posts that stimulates the mind. There are interesting websites that provide answers to questions you weren’t even aware you were asking.",
    categoryReference: 2,
  },
  {
    name: "Start reflecting on what you have learned by blogging",
    description:
      "Once you commit to the habit of reading about your industry and sharing what you know with your audience, you will begin to comprehend and process information faster.",
    categoryReference: 2,
  },
  {
    name: "Read the newspaper daily",
    description:
      "You’ll become exposed to a wide variety of opinions and boost your critical thinking capabilities in the process.",
    categoryReference: 2,
  },
  {
    name: "Get your (career) story straight",
    description:
      "Properly crafted, your career story helps to differentiate you from your competitors, highlight your value, and to draw others to you.",
    categoryReference: 5,
  },
  {
    name: "Practice empathy",
    description:
      "To become more empathetic, shift your mindset to put people first, seeing them as human beings rather than a means to the end of a transaction or task, ask thoughtful and probing questions that draw out implications and feelings, which in turn, fosters a deeper connection, and listen more and talk less.",
    categoryReference: 5,
  },
  {
    name: "Subscribe to a meetup group",
    description:
      "Find a meetup group that your seriously thinking about delving into their career to help network and gain an advantage on your career",
    categoryReference: 5,
  },
  {
    name: "Update your Linkedin profile",
    description:
      "Look up ways to make your self more marketable and create new connections to people you have met.",
    categoryReference: 5,
  },
  {
    name: "Always be learning new skills",
    description:
      "whether its skills in your current field, or new skills to enhance other parts that involve your current knowledge, you should always be trying to learn as much as you can to keep yourself engaged",
    categoryReference: 5,
  },
  {
    name: "Attend a career services event",
    description:
      "If you are currently a student looking to get a kick off for your career, try attending a career services event that looks interesting and ask questions pertaining to the event.",
    categoryReference: 5,
  },
  {
    name: "Network with your friends",
    description:
      "If you have friends in the field that you are learning about, try to get some insight as to what experience they have and learn from them.",
    categoryReference: 5,
  },
  {
    name: "Set meetings with your career director",
    description:
      "Even if it is for somthing very miniscule, you never know if you might be missing particular ideas that you have not thought of. Try to make it as eventful as you can since this is something big you are preparing for.",
    categoryReference: 5,
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
