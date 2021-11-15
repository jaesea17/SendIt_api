# SendIT API

This is the API that serves the courier service web application "sendit"
<br />
<br />


# Table of Contents

- [Getting Started](#Getting-Started "Goto Getting-Started")
- [Technology Stack](#Technology-Stack "Goto Technology-Stack")
- [Installation](#Installation "Goto Installation")
- [Features](#Features "Goto Features")
- [Usage](#Usage "Goto Usage")
- [Testing](#Testing "Goto Testing")
- [Questions](#Questions "Goto Questions")
- [Support or Contributions](#Support-or-Contributions "Support-or-Contributions")

## Getting Started

This is a frontend javascript application built with [React JS](https://reactjs.org/).

## Technology Stack

ReactJS

## Installation

1. Install Node JS on your machine.

2. Clone the repository [here](https://github.com/jaesea17/react_sendit).

3. Change directory into the root of the project directory.

4. Run `npm install` on the terminal to install project dependecies.

5. Start the application: Different Build Environments.

## Features

You can carry out the following with the api
-Signup a customer <br>
-Signin a customer <br>
-Signout a customer <br>
-Signup an Admin <br>
-Signin an Admin <br>
-Signout an Admin <br>
-Create an order <br>
-Customer can edit order <br>
-Customer can delete order <br>
-Admin can edit order status and location


### Usage

#### Customer registration

-To `signup` send `post` request containing `first name`, `last name`, `email` and `password` to `https://jsendit-api.herokuapp.com/user/signUp` <br>
-To `signin` send `post` request containing `email` and `password` to `https://jsendit-api.herokuapp.com/user/signIn`

#### Admin registration

-Admins can `signup` by, sending `post` request containing `id number`, `email` and `password` to `https://git.heroku.com/jsendit-api.git/admin/signUp` <br>
-Admins can `signin` by, sending `post` request containing `id number`, `email` and `password` to `https://git.heroku.com/jsendit-api.git/admin/signIn`


### Development

run `node index.js` in terminal 
or install nodemon to enable automatic resart on each save;`npm install nodemon`
then run `nodemon index` to run the project

## Questions

For more details contact  `oforkajajoseph@gmail.com`

## Support or Contributions

Support or Contributions are highly appreciated. Please send me an email for any suggestion, support or issue. To contribute:

1. Fork this repository or clone the repository with the command
   `$ git clone https://github.com/jaesea17/react_sendit`.

2. Change directory into the root of the project directory.

3. Create your feature branch and make your contributions to your local copy of the project.

4. Raise a pull request against the develop branch describing what your feature does and how it can be tested.
