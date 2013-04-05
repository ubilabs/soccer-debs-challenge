var
  ITERATIONS = 6000, // set to 600 to slow down
  MAXX = 52483,
  MAXY = 33960,
  START = 13086639146403495,
  GOAL_XMIN = 20494,
  GOAL_XMAX = 31994,
  GOAL_Y = MAXY,
  GOAL_Z = 4440,
  BALL_SIZE = 1000,

  TYPES = {
    BALL: "BALL",
    TEAM1: "TEAM1",
    TEAM2: "TEAM2",
    NEUTRAL: "NEUTRAL"
  },

  MAPPING = {
    BALL: [4,8,10,12],
    TEAM1: [13,14,97,98,47,16,49,88,19,52,53,54,23,24,57,58,59,28],
    TEAM2: [61,62,99,100,63,64,65,66,67,68,69,38,71,40,73,74,75,44],
    NEUTRAL: [105,106]
  },

  COLORS = {
    BALL: "#FFF",
    TEAM1: "#F00",
    TEAM2: "#00F",
    NEUTRAL: "#F0F"
  },

  PLAYERS = {
    "Nick Gertje": [13, 14, 97, 98],
    "Dennis Dotterweich": [47, 16],
    "Niklas Waelzlein": [49, 88],
    "Wili Sommer": [19, 52],
    "Philipp Harlass": [53, 54],
    "Roman Hartleb": [23, 24],
    "Erik Engelhardt": [57, 58],
    "Sandro Schneider": [59, 28],
    "Leon Krapf": [61, 62, 99, 100],
    "Kevin Baer": [63, 64],
    "Luca Ziegler": [65, 66],
    "Ben Mueller": [67, 68],
    "Vale Reitstetter": [69, 38],
    "Christopher Lee": [71, 40],
    "Leon Heinze": [73, 74],
    "Leo Langhans": [75, 44]
  },

  SPEED = {
    "1": "standing",
    "11": "trot",
    "14": "low speed run",
    "17": "medium speed run",
    "24": "high speed run",
    "9999": "sprint"
  },

  SPEED_COLOR = {
    "1":  "green",
    "11": "blue",
    "14": "purple",
    "17": "red",
    "24": "orange",
    "9999": "yellow"
  }