<p align="center">Introducing...</p>

<p align="center"><img style="width: 300px;" src='./src/assets/logo/hitme-logo.png'/></p>

<p align="center">
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/html-logo.png'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/sass-logo.png'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/typescript-official-svgrepo-com.svg'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/react.svg'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/Jest.svg'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/node-js.svg'/>
  <img style="width: 30px; background-color: #fff; padding: 1px; height: 27px" src='./src/assets/icons/readme-logos/express.svg'/>
  <img style="padding: 1px; height: 27px" src='./src/assets/icons/readme-logos/s3.svg'/>
  <img style="width: 30px;" src='https://user-images.githubusercontent.com/25181517/192107858-fe19f043-c502-4009-8c47-476fc89718ad.png'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/mysql-svgrepo-com.svg'/>
  <img style="width: 30px;" src='./src/assets/icons/readme-logos/docker-svgrepo-com.svg'/>
</p>

<strong><p align="center"><a href="https://youtu.be/s3xAxtqa6hY">View a demo of Hit Me!</a></p></strong>

Have you ever thought to yourself: "I need some music while I'm working, but I can't decide what to listen to... I need a recommendation!"

We've all been there, right?  Me too!  Well, the Hit Me app helps you with just that.  Just open the app, decide on the genre you want, and how obscure or popular you want the recommendation to be.  Tell the app what you're looking for, and your soundtrack for the day has been set!

NEW: Want music that sounds like one of your favourite artists? You can discover this way too!

Like the recommendation? Save it, refer back to it later, or even find similar artists!  Or - leave a comment to share what you think of the artist!

<p align="center"><strong>Get recommendations by genre</strong></p>

<p align="center"><img width="80%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/get-recos.gif'></p>

<p align="center"><strong>Get recommendations based on favourite music</strong></p>

<p align="center"><img width="80%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/artist-search.gif'></p>

<p align="center"><strong>Save artists to your profile</strong></p>

<p align="center"><img width="80%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/save-artist1.gif'></p>

<p align="center"><img width="80%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/save-artist2.gif'></p>

<p align="center"><strong>Comment on artist recommendations you like</strong></p>

<p align="center"><img style="padding-bottom:20px;" width="80%" src="./src/assets/readme-images/comment.gif"></p>

## Start using Hit Me

<p>No need to download and install...  <a href="https://hitme.rocks/register">Start using it now</a> on the live web app!</p>

Interested in the code and building upon it?  Cool!  See instructions below:

## Installing 'Hit Me' locally

To use the app locally, you will need to install this repository (front end), as well as the back end repository.

Install the back end <a href="https://github.com/andrewgsalmon/andrew-salmon-capstone-be" target="_blank">here</a>.

### Front end installation

1. Clone the app to your local machine
2. Install the necessary dependencies (ex. `npm i` via your CLI)
3. Create a .env file in your root directory.  Before we add anything here, we will need to <a href="https://developer.spotify.com/">register for a developer account with Spotify</a>.
4. Create a Spotify account, or login if you already have one.  Once registered and logged in, click "Create App".  Add a name and description of your choosing, set the website URL to localhost:3000, and your redirect URI to localhost:3000/home.
5. Once submitted, go to your new app's settings and make note of your **client ID** and **client secret**.  We'll need these for your .env file.

#### Configure your .env file

The .env variables required are dictated in the .env.sample file included in this repo.

### Back end installation

1. Clone <a href="https://github.com/andrewgsalmon/andrew-salmon-capstone-be">this back end repo</a> locally.

2. Once cloned, install the necessary dependencies (ex. `npm i` via your CLI).

#### Create a new MySQL database

Create a new schema in a MySQL database, which will allow you to register for an account, leave comments on recommended artists, and save artists to your profile.  Make note of what you called your DB, as you will need this for your .env file - or call it "hit_me", as is named by default in the .env.sample file in the backend repo!

#### Add and configure your .env file

Instructions for .env configuration are included in the .env.sample file in the backend repo.

## Starting your server

Once the above has been completed, complete the following steps in your CLI:

1. `npm run migrate`
2. `npm start`


## Starting the front end

Once the server is up and running, just run `npm start` in your CLI, and you are up and running!

---

<p align="center" style="padding-top: 20px;">I'd love to hear from you!  Reach out below:</p>

<p align="center"><a href="https://www.linkedin.com/in/andrewgsalmon"><img align="center" style="height: 40px; padding: 0 5px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png" /></a>  <a href="mailto:andrew.g.salmon@gmail.com"><img align="center" style="height: 40px;padding: 0 5px" src="https://cdn-icons-png.flaticon.com/512/7718/7718904.png" /></a></p>