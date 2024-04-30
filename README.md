<p align="center">Introducing...</p>

<p align="center"><img style="width: 300px;" src='./src/assets/logo/hitme-logo.png'/></p>

Have you ever thought to yourself... "I need some music while I'm working, but I can't decide what to listen to! I need a recommendation..."

Probably often, right?  Me too!  Well, the Hit Me app helps you with just that.  Just open the app, decide on the genre you want, and if you want a hugely popular artist, or one that's way more obscure.  Tell the app what you're looking for, and your soundtrack for the day has been set!

Like the recommendation? Save it, and refer back to it later!  Or - leave a comment to share what you think of the artist!

<p align='center'><strong>Get artist recommendations</strong></p>

<img width="100%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/get-recos.gif'>

<p align='center'><strong>Save artists to your profile</strong></p>

<img width="100%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/save-artist1.gif'>

<img width="100%" style="padding-bottom:20px;" align="center" src='./src/assets/readme-images/save-artist2.gif'>

<p align='center'><strong>Comment on artist recommendations you like</strong></p>

<img style="padding-bottom:20px;" width="100%" src='./src/assets/readme-images/comment.gif'>

## Start using Hit Me

<p>No need to download and install...  <a href='https://hitme.rocks/register'>Start using it now</a> on the live web app!</p>

<button style="font-size: 20px; padding: 10px 30px; background-color: #282460; color: white; border-radius: 20px; border: 0px; font-weight: bold; filter: drop-shadow(0px 0px 4px rgba(255, 255, 255, .175)); cursor: pointer;"><a style="color: white;" href="https://hitme.rocks/">HIT ME</a></button>

Interested in the code and building upon it?  Cool!  See instructions below:

## Installing 'Hit Me' locally

To use the app locally, you will need to install this repository (front end), as well as the back end repository.

Install the back end here: [link to backend]

### Front end installation

1. Clone the app to your local machine
2. Install the necessary dependencies (ex. `npm i` via your CLI)
3. Create a .env file in your root directory.  Before we add anything here, we will need to <a href="https://developer.spotify.com/">register for a developer account with Spotify</a>.
4. Create a Spotify account, or login if you already have one.  Once registered and logged in, click "Create App".  Add a name and description of your choosing, set the website URL to localhost:3000, and your redirect URI to localhost:3000/home.
5. Once submitted, go to your new app's settings and make note of your **client ID** and **client secret**.  We'll need these for your .env file.

#### Configure your .env file

To make your app work, you'll need to add the following variables to your .env file:

- *REACT_APP_CLIENT_ID=<span style='color: red;'>your_client_ID</span>*

- *REACT_APP_CLIENT_SECRET=<span style='color: red;'>your_client_secret</span>*

- *REACT_APP_BASE_URL=http://localhost:8080* <span style="color: orange;">--> We'll use this port to connect with the backend in the next step</span>

### Back end installation

1. Clone <a href='https://github.com/andrewgsalmon/andrew-salmon-capstone-be'>this back end repo</a> locally.

2. Once cloned, install the necessary dependencies (ex. `npm i` via your CLI).

#### Create a new MySQL database

Create a new schema in a MySQL database, which will allow you to register for an account, leave comments on recommended artists, and save artists to your profile.  Make note of what you called your DB, as you will need this for your .env file!

#### Add and configure your .env file

Here's all the configuration details required for your .env file:

- CLIENT_URL=http://localhost:3000
- CORS_ORIGIN=http://localhost:3000
- PORT=8080
- DB_HOST=127.0.0.1
- DB_DATABASE=<span style='color: red'>your_DB_name</span>
- DB_USER=<span style='color: red'>your_username</span>
DB_PASSWORD=<span style='color: red'>your_password</span>
- JWT_KEY=<span style='color: red'>your_JWT_key</span> --> Get a
JWT key <a href='https://jwt.io/'>here</a>!

##### Additional variables required for future OAUTH implementation:
- CLIENT_ID=<span style='color: red'>your_spotify_clientID</span>
- CLIENT_SECRET=<span style='color: red'>your_spotify_clientID</span>

## Starting your server

Once the above has been completed, complete the following steps in your CLI:

1. `npm run migrate`
2. `npm start`


## Starting the front end

Once the server is up and running, just run `npm start` in your CLI, and you are up and running!

---

<p align="center" style='padding-top: 20px'>I'd love to hear from you!  Reach out below:</p>

<p align="center"><a href="https://www.linkedin.com/in/andrewgsalmon"><img align="center" style='height: 30px; padding: 0 5px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/1024px-LinkedIn_icon.svg.png' /></a>  <img align="center" style='height: 30px;padding: 0 5px' src='https://cdn-icons-png.flaticon.com/512/7718/7718904.png' /> <a href="mailto:andrew.g.salmon@gmail.com"></a></p>