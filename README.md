# Users-Management

This project uses : 

* Angular for client
* NestJs for server
* TypeORM - Mysql Driver
with `TypeScript `

## App Goals

* Registration page so every employee can register itself
Employee must login before being able to use the application
Landing page as overview of existing employees

* A logged in employee can add another employee
Ability to import employees over a CSV file


* Being able to edit and delete employees

* Add and display comments to employees on employee detail page
* Display author and date of the comment


## How it Works with Dev

### Client

```bash
cd /path/to/Root/APP/client
npm run start
```

### Server
```bash
cd /path/to/Root/APP/server
npm run start:dev
```
Then navigate to http://localhost:4200

## Tree
.
├── client
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── Components
│       │   ├── AddLoggedUser.js
│       │   ├── ButtonAddUser.js
│       │   ├── ButtonEdditUser.js
│       │   ├── Comments.js
│       │   ├── Employees.js
│       │   ├── HeaderNav.js
│       │   ├── ImportCSVui.js
│       │   ├── InputForm.js
│       │   ├── InsertComment.js
│       │   └── Toolbar.js
│       ├── Context
│       │   ├── AddUserContext.js
│       │   └── AuthUser.js
│       ├── index.css
│       ├── index.js
│       ├── logo.svg
│       ├── reportWebVitals.js
│       ├── Route.js
│       ├── service-worker.js
│       ├── serviceWorkerRegistration.js
│       ├── setupTests.js
│       └── Views
│           ├── Home
│           │   └── index.js
│           ├── Profile
│           │   └── index.js
│           └── Registration
│               ├── index.js
│               ├── signin.js
│               └── signup.js
├── docker-compose.yml
├── README.md
└── server
    ├── app.js
    ├── bin
    │   └── www
    ├── db
    │   └── config.db.js
    ├── Dockerfile
    ├── package.json
    ├── package-lock.json
    ├── routes
    │   ├── comment.js
    │   ├── deleteuser.js
    │   ├── index.js
    │   ├── signin.js
    │   ├── signup.js
    │   ├── upload.js
    │   └── users.js
    ├── tmp
    └── views
        ├── error.ejs
        └── index.ejs


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

Please contact me https://mehdi.contact
