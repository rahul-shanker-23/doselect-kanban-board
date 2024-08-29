# Vue: Kanban Board

## Objective

The Kanban Board Application is a project management tool designed to help teams organize and track their work using a visual board. This application allows users to create, manage, and view tickets categorized into different types: Story, Epic, and Bug. Each ticket has detailed attributes that help teams track and manage tasks effectively.

## Components

The application consists of four primary components:

### [Create](src/Components/Create.js):

- Fetches a list of users from the server using a GET request to `{apiUrl}users`.
- Fetches a list of epic from the server using a GET request to `{apiUrl}issue`.
- Issue Type is having dropdown with options - `Story`, `Epic` and `Bug`.
- If story is selected, Epic is having dropdown option with list of fetched epic.
- If Epic is selected Severity and Epic label will not shown.
- If Bug is selected Epic label will not shown.
- Reporter and Assignee is having dropdown options with list of fetched users.
- Priority is having dropdown with options - `Low`, `Medium` and `High` with `Low` as default value.
- Severity is having dropdown with options - `Minor`, `Major` and `Critical` with `Minor` as default value.
- Create Issue data as below example and status will be `backlog` for every new issue:
  ```
  {
  issueType:   'Story',
  title:       'Migration of Header Component',
  reporter:    'Jake',
  assignee:    'Beth',
  description: 'Migration of Header Component from React to Vue',
  priority:    'Low',
  severity:    'Minor',
  epic:        'Migration',
  status:      'Backlog'
  }
  ```
- On clicking Create button, Create an issue with POST request after successfull creation make an alert with message "Issue created successfully" and redirect to created issue.

### [Backlog](src/Components/Backlog.js):

- Fetches a list of backlog(story and bug) from the server using a GET request to `{apiUrl}issue?issueType=Bug&issueType=Story`.
- Stores the retrieved data as an array in the component's state.
- Iterates through the backlog data array and display each backlog (story and bug) in tabular form.
- Each backlog item is clickable with id and title and routes to the detailed view (`/backlog/{id}`) upon click, where `id` is the specific backlog ID.

### [Epic](src/Components/Epic.js):

- Fetches a list of epic from the server using a GET request to `{apiUrl}issue?issueType=Epic`.
- Stores the retrieved data as an array in the component's state.
- Iterates through the epic array and display each epic in tabular form.
- Each epic item is clickable with id and title and routes to the detailed view (`/backlog/{id}`) upon click, where `id` is the specific epic ID.

### [Describe](src/Components/Describe.js):

- Retrieves detailed information for a specific backlog and epic using a GET request to `{apiUrl}issue/{id}`.
- Fetches a list of users from the server using a GET request to `{apiUrl}users`.
- Display the fetched data corresponding to its label.
- Display Priority, Severity, Reporter, Assignee as dropdown with values as current fetched value and option as defined in Create Component.
- Status is having dropdown with options Backlog, In Progress, Testing, In Review, Closed and Done.
- On clicking Save button, Update the issue with current selected values with PUT request to `{apiUrl}issue/{id}`.

## Routing

Routing logic is implemented within the [router.js](src/router.js) component.

## Expected Live Preview

![Live Preview (Placeholder)](https://media-doselect.s3.amazonaws.com/generic/2e11nd5V5V8g2LKO4JrBwMO0E/kanban-board.gif)

## Commands

### Install Packages:

```bash
npm install
```

This command will run automatically when the IDE is launched. However, if stopped, you may need to run it manually.

### Start Dev Server:

```bash
npm start
```

This command will start the dev server. You can view the **Live Preview** once the server is started in multiple ways:

- Click the `Preview in Editor` option that pops up at the bottom-right corner
- Click the Open `Preview` option in the `Run` menu

<!-- Dear Creators, Please keep this command only if you are using API calls in the project with the jsoserver npm package, else remove this command from here as well as configuartion.json and change post_start command to only "npm install" -->

### Start API Server:

```bash
npm run server
```

This command will start the api server. The server would start automatically once the packages are installed. However, if it is stopped, you may need to start it manually by running this command.

### Run Test Cases:

```bash
npm test
```

This will run the test cases in the terminal.

> These commands can be executed in the terminal or by selecting options from the `Run` menu.

## Environment

- Vue Version: 3.4.29
- Node Version: 14.21.3
- Default Port: 3000
