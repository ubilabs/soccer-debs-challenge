# ACM DEBS 2013 Grand Challenge

Analytics of Realtime Soccer Match Sensor Data with JavaScript and WebGL – Reprocessed and Visualized for Web Browser or Command Line Consumption.

More info: [http://www.orgs.ttu.edu/debs2013/](http://www.orgs.ttu.edu/debs2013/index.php?goto=cfchallengedetails)

### Install

1. Clone this repo or [download as .ZIP](https://github.com/ubilabs/soccer-debs-challenge/archive/master.zip).
2. Download the 2.6GB data file: [full-game.gz](http://lafayette.tosm.ttu.edu/debs2013/grandchallenge/full-game.gz)
3. Extract to [./app/data](./app/data)
4. Download [Node.js](http://nodejs.org/download/)

### Visualize Output in Browser

```sh
cd ./app
node server.js
```

This will start a server on [http://localhost:9000](http://localhost:9000).

### Create Streams via Command Line

```sh
cd ./app
node commandline.js
```

This will create several file steams in [./output](./app/output).

### Screenshot

![Screenshot](https://raw.github.com/ubilabs/soccer-debs-challenge/master/paper/soccer.png)

Watch a short intro on [YouTube](http://youtu.be/3SBIFFqjle4)!

Read the paper on [EasyChair](https://www.easychair.org/conferences/submission.cgi?a=3869730;track=65072;submission=1305881).

### Author

Martin Kleppe - kleppe@ubilabs.net