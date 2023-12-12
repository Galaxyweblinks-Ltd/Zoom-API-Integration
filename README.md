## Getting Started

### Zoom Integration Document with step by step

**To integrate Zoom meeting SDK into React Application-**

#### Basic configuration steps:

1. Registered on [One platform to connect | Zoom](https://zoom.us/).

2. After login, we need to create 2 App types i.e., Oauth App and Meeting SDK on App Marketplace.

3. Create an OAuth app on the [App Marketplace (zoom.us)](https://marketplace.zoom.us/develop/create), it generates the **Client Id** and **Client Secret** which is used in the React code to access the Zoom SDK for authorization and Zoom meeting list and schedule meeting APIs.

4. Create a Meeting SDK app on the [App Marketplace (zoom.us)](https://marketplace.zoom.us/develop/create), it generates the **SDK Key** and **SDK Secret**, now called **Client ID** and **Client Secret** which is used in the React code to generate the signature for joining a Zoom meeting.

#### Follow below steps to setup into the React code:

1. If you do not have a Node server installed then please install it from here [Download | Node.js (nodejs.org)](https://nodejs.org/en/download).

2. Go to a specific folder, where need to take React Zoom clone from **[http://gitlab.galaxyweblinks.com/root/atg-poc.git](http://gitlab.galaxyweblinks.com/root/atg-poc.git)**

3. Run the “npm install” command on the terminal/cmd.

4. Open the file `zoom-integration/react-sdk/src/CommonUtils/Constants.js`. and enter the Zoom meeting SDK key in the `MEETING_SDK_KEY` variable.

5. At Node end, the user needs to enter all related IDs and URLs in the `.env file` (file location - `zoom-integration/node-sdk/.env`) of the Node server code, they are-

   i) Add **Zoom Oauth App Client ID** and **Client Secret** in the `ZOOM_CLIENT_ID` and `ZOOM_CLIENT_SECRET` variables.

   ii) Add **Zoom meeting SDK key** and **Zoom meeting SDK Secret** in the `ZOOM_MEETING_SDK_KEY` and `ZOOM_MEETING_SDK_SECRET` variable.

   iii) Change the `ZOOM_REDIRECT_URL` value if the user wants to change the redirect URL to get the **access token** and **refresh token** value that comes from the server.

6. Go to the specific path of Node and run the “npm start” command. It will start the Node server.

7. To run the Zoom Application, go to a specific path of React setup and run the “npm start” command.
