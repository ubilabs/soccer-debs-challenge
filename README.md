# ACM DEBS 2013 Grand Challenge

Description: [http://www.orgs.ttu.edu/debs2013/](http://www.orgs.ttu.edu/debs2013/index.php?goto=cfchallengedetails)

### Install

1. Clone this repo.
2. Install Yeoman 1.0: `npm install -g yo grunt-cli bower`
3. Install dependencies: `npm install` 
4. Download the 2.6GB data file: [full-game.gz](http://lafayette.tosm.ttu.edu/debs2013/grandchallenge/full-game.gz)
5. Extract to _app/data_
6. Get last 2M samples: `tail -n 2000000 full-game > samples.csv`
7. Run the app: `grunt server`
8. Change `ITERATIONS` in _app/scripts/settings.js_ to slow down playback.