# flood-it

## colors included are: `["red", "green" "blue"]`


## To run the app navigate to its directory and run `npm run dev`
## To run the unit tests navigate to the app directory and run `npm run test:unit`


### To get the grid access this api -> `GET /api/v1/grid`
*If the grid doesn't exist the api will return a "no content" status code*  


### To make a new grid access this api -> `POST /api/v1/grid`
*This will create a new grid and return it with the api*  


### To choose a color and update a grid access this api -> `PUT /api/v1/grid` with json body as `{ "color": "red" }`
*This api will update the grid according to the game rules and return the new version with a flag key of `solved: true or false`*  


**Note: For the ease of use I have used the filesystem to persist and read the data created**
