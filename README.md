# Placement web app
A system that generates landing pages for positions, receives information from applicants, and parses the resumes to make it easy for placement companies to find suitable candidates.  
- The front end developed with React/Redux, GUI with MaterialUI, and the backend with NodeJs, Express.   
- The architecture is divided into Business and Data Layers and is RESTApi with CRUD.   
- It includes an interface to receive and send emails with Google API for data from Gmail and Drive.   
- MongoDB database with Mongoose ODM making use of JWT for authentication and authorization.   

## Architecture Diagram

![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/arch.png?raw=true)


## Instructions

In order to make use of the system you need to:
1. Download the repository  
2. Create mongodb cluster with a connection string copy it to MONGOURI varible in a .env file
3. Create "users" collection and add document as follow :
```
 {
    "email" : "test",
    "password" : "$2a$10$62wBHP7u3KFSfExAO2fEU.dQpFEK61HR07f7JhI0LHsXn481kloxa",
    "totalMinInSystem" : 120,
    "role" : "BD",
    "__v" : 0
}
```
It will create a user with email and password of "test".

5. Create google api account with OAuth2 concent screen and copy the CLIENT_ID_OFFICE , CLIENT_SECRET_OFFICE , REDIRECT_URI_OFFICE ,REFRESH_TOKEN_OFFICE to a .env file.
6. Install client (client/myapp) and server dependencies with
. ```npm i```
8. go to : localhost:3000/backoffice

## Screen Shots

![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/Frame1.jpg?raw=true)
![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/Frame2.jpg?raw=true)
![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/Frame3.jpg?raw=true)
![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/Frame4.jpg?raw=true)
![alt text](https://github.com/Yefid/placementwebapp/blob/main/client/myapp/src/img/Frame5.jpg?raw=true)




