

# Backend API
## Running/Installation

**Dependencies**  
Global: 

- `sudo npm install babel-cli -g`  
- mongodb
- node/npm

Local Dependencies: 
`cd path/to/scaventure-backend`
`npm install` 

**.env file configurations**
.env file should be manually created in project root directory as 
`vi .env` 

paste the following:

    DB_URL=mongodb://localhost/scaventure
    JWT_SECRET=somerandomhashyoushouldgenerate

This file will contain all the sensitive information (e.g. API keys, secrets etc.) and **should not** be committed. 

You can run the app by using this command: 
`npm start` 


## Querying API Endpoints

Most API Endpoints are auth-protected, you can register new user by accessing
`/api/auth/register` http endpoint 
with JSON content-type & body;


    {
            "email" : "youremail@scv.com",
            "password" : "testtest"
    }

and login as 

    /api/auth/login

with JSON content-type & body;


    {
            "email" : "youremail@scv.com",
            "password" : "testtest"
    }

It will return something like (token & other values will vary): 

    {
            "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTY0ZjAxZTZmMmVjNDYwOThmYWU3ZGUiLCJlbWFpbCI6InNjYXZlbnR1cmVAc2N2LmNvbSIsImlhdCI6MTUxNjU3NTM0MSwiZXhwIjoxNTE2NTg1NDIxfQ.chqfMcUH1UuIyS9nuCmP6mfDyC1gtyg1-iwsRYj6E6A",
            "user": {
                    "_id": "5a64f01e6f2ec46098fae7de",
                    "email": "scaventure@scv.com"
            }
    }

In order to access any other endpoints, you need to pass the returned “token” from login endpoint to ‘Authorization” header:

| Key           | Value                                                                                                                                                                                                                   |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Authorization | JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTY0ZjAxZTZmMmVjNDYwOThmYWU3ZGUiLCJlbWFpbCI6InNjYXZlbnR1cmVAc2N2LmNvbSIsImlhdCI6MTUxNjU3NTM0MSwiZXhwIjoxNTE2NTg1NDIxfQ.chqfMcUH1UuIyS9nuCmP6mfDyC1gtyg1-iwsRYj6E6A |



## Testing With [INSOMNIA](https://insomnia.rest/) 

You can import insomnia.json file from the root directory of the backend folder which will let you test API endpoints with less hassle (otherwise you will have to include Authorization header each time you make a request)

Don’t forget to commit your modifications to the insomnia.json by opening insomnia GUI → Application → preferences → data → export data → export into backend folder.


# Resources
## MongoDb : Handling 1-to-many

https://www.mongodb.com/blog/post/6-rules-of-thumb-for-mongodb-schema-design-part-1

## MongoDB: GEO Location

Any schema (table) that is supposed to store location properties, should comply the GEO JSON format e.g. :


    ...
    location: {
          type: "Point",
          coordinates: [-73.856077, 40.848447] //  latitude and longitude
    }

And as in Mongoose Schema :

      loc: { 
        type: {type: String, default: 'Point'}, 
        coordinates: [Number] 
      }

Type can be point, line-string, polygon etc. (see this [page](https://docs.mongodb.com/manual/reference/geojson/) )

**More information:**

- see for queries & more information on GEO Json: https://docs.mongodb.com/manual/geospatial-queries/ 
- Mongoose Support: https://github.com/Automattic/mongoose/wiki/3.6-Release-Notes#geojson-support-mongodb--24
