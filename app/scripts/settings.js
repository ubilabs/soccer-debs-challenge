var
  ITERATIONS = 6000, // set to 600 to slow down
  MAXX = 52477,
  MAXY = 33960,
  START = 14879639146403495,
  GOAL_XMIN = 20494,
  GOAL_XMAX = 31994,
  GOAL_Y = MAXY,
  GOAL_Z = 4440,
  BALL_SIZE = 1000,

  TYPES = {
    BALL: "BALL",
    RED: "RED",
    BLUE: "BLUE",
    NEUTRAL: "NEUTRAL"
  },

  MAPPING = {
    BALL: [4,8,10,12],
    RED: [13,14,97,98,47,16,49,88,19,52,53,54,23,24,57,58,59,28],
    BLUE: [61,62,99,100,63,64,65,66,67,68,69,38,71,40,73,74,75,44],
    NEUTRAL: [105,106]
  },

  COLORS = {
    BALL: "#FFF",
    RED: "#F00",
    BLUE: "#00F",
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
  };