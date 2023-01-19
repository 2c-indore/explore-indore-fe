## Explore Indore

Do you know where the closest hospital is from your home? Do you know where you can easily access an ambulance from during an emergency situation? Are you prepared?

Explore Indore app is the answer to these questions and more. Acropolis Institute of Technology and Research, the local partner of the Secondary Cities initiative, with help from Kathmandu Living Labs, has been spearheading the ground effort to produce robust geospatial data for Indore for the past one and a half years. It is hoped that the critical infrastructure information made open here plays an integral part in keeping both yourself and your neighbors safe.

This repository contains code for front end application of Explore Indore web application. Currently the version of the app is hosted [here](http://exploreindore.klldev.org).

### Getting Started
Use the following steps to get started with the dev version of the application:

1. Clone this repository using the command line: `git clone https://github.com/2c-indore/explore-indore-fe.git`
2. Switch to `develop` branch: `git checkout develop`
3. Install dependencies: `npm install`
4. Start development server: `npm run start`
5. The app will be running at `http://localhost:3000`

Note: Some of the dependencies are a little old, as a result, there might be weird looking messages when running `npm install`. We will be fixing them at a later date.


### Contributing guide
We will be using the git-flow based model to manage changes to the app.

1. We wiil be maintaining two core branches, `master` and `develop` with `master` containing the last release, and `develop` containing the latest stable version.
2. All core contributors are required to work on the `develop` branch.
3. Depending on the nature of the work, branch types can be of two types, `feature/feature-name` and `hotfix/hotfix-name` which upon completion of work should be merged to the develop branch.
4. You can learn more about gitflow in this excellent [stackoverflow answer](https://softwareengineering.stackexchange.com/questions/255404/how-to-use-github-branches-and-automatic-releases-for-version-management).


### Bugs and feature requests

We will be using Github issues to solicit and work on issues and feature requests. To submit an issue or feature request, head over to the [issues section.](https://github.com/2c-indore/explore-indore-fe/issues/new/choose)
