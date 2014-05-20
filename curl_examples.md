// POST
curl -i -X POST -H "Content-Type: application/json" -d '{"name":"NodeJS Dev" , "description":"NodeJS setup" , "category": "server", "rating": 1, "estimatedTime":  1000}' http://127.0.0.1:8080/workouts

// PUT
curl -i -X PUT -H "Content-Type: application/json" -d '{"name":"NodeJS Dev" , "description":"NodeJS setup" , "category": "server", "rating": 1, "estimatedTime":  1000}' http://127.0.0.1:8080/workouts


// GET ONE
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:8080/workouts/537ba7a3441cdf65536d654d

// GET ALL
curl -i -H "Accept: application/json" -H "Content-Type: application/json" http://127.0.0.1:8080/workouts

// DELETE
curl -X DELETE http://127.0.0.1:8080/exercises/537bcbbc91051128ab167d50 