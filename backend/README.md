# API Docs
Documentation for Labelr API.
Create and manage users and Images.

# Clone and run the project

1. After cloning the project from git. (`git clone git@github.com:loychris/image-labeler-app.git`)
2. Use `npm install` to install the dependencies.
3. Run the server by running `npm start`.


## User managing routes
Routes for creating, updating and removing a user

### GET Routes

#### Get my profile
- Get profile of an authenticated user
```javascript
requestOptions = { method: 'GET', redirect: 'follow' };

fetch("localhost:3000/users/me", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Get  user by given ID
- Get user with specific ID
```javascript
const requestOptions = { method: 'GET',  redirect: 'follow' };

fetch("", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Get  all registered users
```javascript
const requestOptions = { method: 'GET',  redirect: 'follow' };

fetch("", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Get  all images uploaded by user (authenticated)
 - Get all images uploaded by the authenticated user .
```javascript
const requestOptions = { method: 'GET',  redirect: 'follow' };

fetch("localhost:3000/users/me/images", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
 ### POST Routes

#### Create new user
 - Create a new user, after created the user will already be logged in and  authenticated
	 - the password will be hashed, and stored hashed in the database.
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({"name":"Labelr",
			"email":"labelr@labelr.com",
			"password":"proLabelr123"});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
#### Log in to an existing account
- Log in to your account. Create an authentication token after making sure the credentials are right.
	- A user can have more then one tokens, in case he use the application from multiple devices.
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({"email":"labelr@labelr.com",
			  "password":"proLabelr123"});

const requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/users/login", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
#### Log out  from current device
-	Will remove the current authentication token, so the user will not be logged in from this device anymore

```javascript
const requestOptions = { method: 'POST',  body: "",  redirect: 'follow' };

fetch("localhost:3000/users/logout", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Log out  from all connected device
-	Will remove all authentication tokens, so the user will not be logged out everywhere

```javascript
const requestOptions = { method: 'POST',  redirect: 'follow' };

fetch("localhost:3000/users/logoutall", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



### PATCH Routes

#### Update user profile
-	Update the logged in user.
-	Not all updates allowed. The route allows only updates of `name, email, password`, can be easily edited in the future to suit better to our needs.
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({"name":"new Name"});

const requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("localhost:3000/users/:userID", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

#### Clear users fetchedImagesID
```javascript
onst myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
	method: 'PATCH',
	headers: myHeaders,
	body: raw,
	redirect: 'follow'
};

fetch("localhost:3000/users/:userID/clearfetched", requestOptions)
	.then(response => response.text())
	.then(result => console.log(result))
	.catch(error => console.log('error', error));
```



### DELETE Routes

#### Delete user ID
- Delete user by provided ID
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
  method: 'DELETE',
  headers: myHeaders,
  body: "",
  redirect: 'follow'
};

fetch("localhost:3000/users/:userID", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


## Image managing routes
Routes for creating, updating and removing an image

### GET Routes

#### Get all existing images
```javascript
const requestOptions = { method: 'GET', redirect: 'follow'};

fetch("localhost:3000/images", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
#### Get all existing image labels

- Return all existing labels without duplicates
```javascript
const request = require("request");

const options = { method: 'GET', url: 'http://localhost:3000/labels',
  headers:    { 'cache-control': 'no-cache' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```
#### Get images with specific label
-	Get and image with given label
```javascript
const requestOptions = { method: 'GET',  redirect: 'follow'};

fetch("localhost:3000/images/:label", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
#### Get next n images
- Get the next n images that the user did not labeled yet.
- User keep list of already labeled images ID, all the returned images are not existing in this list, after an image has been labeled by the user, the ID of the image will be added to the list of the IDs, so it will not show up for the user again.
- In case there are no n images, return 400 at the moment. Next sprint we will modify it so it will return the rest .
```javascript
const requestOptions = { method: 'GET',  redirect: 'follow'};

fetch("localhost:3000/images/next/:n", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```



#### Get next image id  with specific label
- Get the next image id of images that the user did not labeled yet.
- User keep list of already labeled images ID, all the returned images are not existing in this list, after an image has been labeled by the user, the ID of the image will be added to the list of the IDs, so it will not show up for the user again.
- In case there are no n images, return 400 at the moment. Next sprint we will modify it so it will return the rest .
```javascript
var requestOptions = { method: 'GET',  redirect: 'follow'};

fetch("localhost:3000/images/next/id/:label", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


#### Get next image (singular)
-	Same as next n images, but singular
```javascript
const requestOptions = {  method: 'GET',  redirect: 'follow'};

fetch("localhost:3000/images/next", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

### POST Routes

#### Upload a new image file
-	NOT YET TO BE USED
-	Work with Postman.
-	Still might be difficult to integrate to front-end, will be adjusted and tested when the front will be ready.
```javascript
const fs = require("fs");
const request = require("request");

const options = { method: 'POST',
  url: 'http://localhost:3000/upload',
  headers:
   { 'cache-control': 'no-cache',
     'Content-Type': '',
     'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW' },
  formData: { image:
      { value: 'fs.createReadStream("imgRoute")',
        options:
         { filename: 'imgRoute',
           contentType: null 
           label: 'label'     
         } 
      } 
    } 
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

#### Get next n images IDs
- Get the next n images that the user did not labeled yet.
- The images will be added to users fetched images id list
- The images are only images will the given label (inside the req body)
```javascript
const request = require("request");

const options = { method: 'POST',
  url: 'http://127.0.0.1:3000/images/next/:n/id',
  headers: 
   { 'cache-control': 'no-cache',
     Authorization: 'Bearer token',
     'Content-Type': 'application/json' },
  body: { label: 'label' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```
#### Get next image ID
- Get the next image that the user did not labeled yet.
- The image id will be added to users fetched images id list
- The image has the given label (inside the req body)
```javascript
const request = require("request");

const options = { method: 'POST',
  url: 'http://127.0.0.1:3000/images/next/id',
  headers: 
   {'cache-control': 'no-cache',
     Authorization: 'Bearer token',
     'Content-Type': 'application/json' },
  body: { label: 'label' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

```

#### Vote for an image
- Add the id to the labeledImgaesId in user obj.
```javascript
const request = require("request");

const options = { method: 'POST',
  url: 'http://localhost:3000/images/:imgID',
  headers: 
   { 'cache-control': 'no-cache',
     Authorization: 'Bearer token',
     'Content-Type': 'application/json' },
  body: { vote: false, label: 'LABEL' },
  json: true };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```



### PATCH Routes
#### Update an existing file by ID
-	At the moment can edit all fields, will modify to our need as soon as we will integrate with front end.
```javascript
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({"labels":["label6"]});

const requestOptions = { method: 'PATCH',  headers: myHeaders, body: raw, redirect: 'follow'};

fetch("localhost:3000/images/:imageID", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```


### DELETE Routes
#### Delete an existing file by ID
```javascript
const requestOptions = { method: 'DELETE', redirect: 'follow' };

fetch("localhost:3000/images/:imageID", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```
