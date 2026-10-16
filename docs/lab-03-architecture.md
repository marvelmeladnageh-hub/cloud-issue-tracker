
# Lab 3 — Cloud Issue Tracker Architecture

## 1. Application Goal

The goal of the Cloud Issue Tracker is to allow users to create issues, view all issues, and change issue statuses.

The application will use a three-layer architecture consisting of a frontend, a REST API, and a data layer.

## 2. Functional Scope

The application supports three main operations:

- Create an issue.
- View all issues.
- Change an issue status.

## 3. Request Flow

### Create Issue

The user fills in the frontend form and submits it. The frontend sends a POST request to `/api/issues` with the issue data as JSON.

The API validates the request. If the data is valid, the data service stores the issue and generates its ID, initial status, and creation timestamp. The API returns `201 Created` with the created issue as JSON.

### View Issues

When the page loads, the frontend sends a GET request to `/api/issues`. The API asks the data service to read the stored issues and returns `200 OK` with a JSON array.

If there are no issues, the API returns an empty array.

### Change Issue Status

When the user changes an issue status, the frontend sends a PATCH request to `/api/issues/{id}/status`.

The API checks that the issue exists and that the requested status is valid. The data service updates the status and returns the updated issue.

## 4. Trust Boundaries

The browser is user-controlled. Users can modify form values or send requests using tools such as browser developer tools or Postman.

The REST API and data layer are application-controlled.

The API must validate every request, even if the frontend already validates the input. The browser must not access the data file directly. Issue text must be displayed as plain text rather than HTML.
