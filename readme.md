## Final Project Due: December 15, 2017

## Project Scope

Create a web based contact list that is centralized across teams. Query down category and internal user heirarchy from internal data. Combine internal heirarchy with user input to form a centralized location to store and update contacts. For demo day, mock data will be used. Internal data and hooks will be excluded from github.

### Tools utilized:

- Backend: mongodb
- Front End: Angular -- not completed
- Hosting service: -- gcloud for demo purpose

## Todo List:

  - [x] Hosted on gcloud -- https://contact-list-demo.appspot.com
  - [x] Setup database:
    - [x] Queryable from internal data (internal heirarchy):
      - [x] Dept#
      - [x] 9 digit vendor record
      - [x] Vendor name
      - [x] Category nbr
      - [x] Category name
      - [x] Manager alignment)
    - [x] User input (Create form for team use)
      - [x] First name
      - [x] Last name
      - [x] Email
      - [x] Phone#
      - [ ] Job alignment (be able to select multiple)
      - [ ] Comments
  - [ ] Research Front End Design if time allows
  - [ ] Build Hooks and schedule task upload from internal system to database
  - [x] Build Routes w/o front end component
  - [x] Build postman examples
  - [ ] Build unit tests

### Requirements (Reference to Class Notes )

- Has an API component
- Provide Postman examples
- Has unit tests
- Has database component
- No front-end required, but OK if wanted
  - Don't spend an inordinate amount of time on front-end
- Uses a combination of core Node modules and external libraries
- Regular commits to GitHub to show progress
- Needs to be deployed to the cloud
- GitHub repo name should be descriptive with respect to what the project is
  - Good: `social-network-for-cats`
  - Bad: `backend-development-final-project`
- Do not use any sort of templating engine or project generator
- Include a set of queries created in Postman that demonstrate all routes
