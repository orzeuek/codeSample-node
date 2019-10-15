# Some sample code for recruitment purposes :) 

## what does it do ?

Send movie title, it will find movie in [omdb](http://www.omdbapi.com/), pull movie details and store that info 
in local storage.

## how to run it ?

```
docker build -t movies ./
docker run -p 9000:9000 movies 
```

## how to test it?
```
docker build -t movies ./
docker run  movies npm run integration-test
docker run  movies npm run unit-test
```

## API spec
Sorry about lack of "cool formatted spec" (like raml or sth...) but I'm out of time...

### GET /movies
Read list of all movies persisted in storage. 
```
curl -X GET http://127.0.0.1:9000/movies
```

### POST /movies
Get details of movies and add them to storage.
Return list of URLs to get stored movies. 
```
curl -X POST http://127.0.0.1:9000/movies \
-H 'content-type: application/json' \
-d '["Matrix", "Shrek"]'
```

### GET /movies/:id
Read movies persisted in storage. 
```
curl -X GET http://127.0.0.1:9000/movies/0
```


### POST /movies/:id/comments
Add comment for particular movie.
Return URL for added comment.
```
curl -X POST http://127.0.0.1:9000/movies/0/comments \
-H 'content-type: application/json' \
-d '{"content": "Lorem ipsum ...."}'
```

### GET /comments/:id
Read particular comment.
```
curl -X GET http://127.0.0.1:9000/comments/0
```

### GET /comments
Read all comments persisted in storage.
```
curl -X GET http://127.0.0.1:9000/comments
```

### GET /movies/:id/comments
Read all comments for particular movie.
```
curl -X GET http://127.0.0.1:9000/movies/0/comments
```


## TO-DO
There are numbers of things to improve:
- documentation should be in some standardize format (ie. RAML)
- app should be parsed to .js (ts compile) and then exposed in container
- Dockerfile for dev purpose should be more "dev-friendly" (use nodemon.js)
- Docker should be slim. Do not install dev dependencies, add some stages to 
Dockerfile to get rid of some files not necessary to run. 
- integration tests should be refactored (improve code quality in stepsDefinitions)
- add "real" storage, in-memory is cool for testing but not for ready-to-go app
- with "real" storage, docker-compose should be introduce (or other form of "containers orchestration")
- improve error handling
- TBA.
