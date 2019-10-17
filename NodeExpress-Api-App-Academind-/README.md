
<h1>INTRODUCTION</h1>
This is a small project that i made by learning the express js (NODE.JS) concepts. In this project i tried to complete the CRUD operation using web API and mongo DB Atlas as well. In this we used Mongoose. Some other features are also included like File upload, authentication using JWT, route protection, Understanding the MVC pattern and many more.

<h1>How to Run?</h1>
It can be done in two steps:
<h4>step 1:</h4> go to project directory and type (npm install) by using this package.json will install all the necessary dependencies.
<h4>step 2:</h4> run the application : node server.js or nodemon server.js


<h4 style="color:red">Note:<h4>
 Please Note : * Don't forget to give the values of enviormental variables which are given in the nodemon.json because some of the hosting services requires their own variables so in that case use static values.
 Check Nodemon.json file for get more Understanding
<p style="color:red">* [CASE OF MULTER FILE UPLOADING]if you are using Windows machine, the issue may be due to un-valid character in the resulting filename.
for me, it worked after i replaced the colon ":" with "-" as the colon is not a valid character for file names in windows
here -> new Date creates something like this 2018-11-01T15:55:08 so the colon in between the numbers
</p>
 <p>* Use BcryptJS instead of Bcrypt Cause it will create problem while deploying to heroku </p>
<h5>Refer : https://stackoverflow.com/questions/29320201/error-installing-bcrypt-with-npm 
  
<h4>To Verify Token visit Here</h4>
https://jwt.io/




<h1>Deployement :</h1>
<h5>Just click on deploy button and enjoy the Application</h5>
<a href="https://heroku.com/deploy?template=https://github.com/cgqspider/NodeExpress-Api-App-Academind-.git">
  <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>
<h4>Have fun! Good Day</h4> 






