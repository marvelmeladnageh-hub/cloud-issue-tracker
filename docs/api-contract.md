
# API Contract: Issues API

## Data Dictionary: Issue

| Field | Type | Source | Rule |
|---|---|---|---|
| id | string | Server | Required, unique, immutable |
| title | string | Client | Required; 3–100 characters after trimming |
| description | string | Client | Required; 5–500 characters after trimming |
| priority | string enum | Client | Low, Medium, or High |
| status | string enum | Server / controlled update | Open or Resolved; new issues start as Open |
| createdAt | string (ISO 8601) | Server | Generated when the issue is created; immutable |

A complete issue returned by the API:

```json
{
  "id": "ISS-101",
  "title": "Unable to access Wi-Fi",
  "description": "Connection fails in the teaching lab.",
  "priority": "High",
  "status": "Open",
  "createdAt": "2026-09-15T12:30:00.000Z"
}
```

## Contract 1: View All Issues

- Request: `GET /api/issues`
- Request body: None
- Success: `200 OK` with a JSON array of issues.
- If no issues exist: `200 OK` with `[]`.
- Error: `500 Internal Server Error`.

## Contract 2: Create an Issue

- Request: `POST /api/issues`
- Header: `Content-Type: application/json`

Request body:

```json
{
  "title": "Projector not detected",
  "description": "Laptop cannot detect the classroom projector.",
  "priority": "Medium"
}
```

- Success: `201 Created` with the complete created issue.
- Errors: `400`, `415`, `500`.

The client must not choose the id, initial status, or createdAt. These fields are controlled by the server.

## Contract 3: Change Issue Status

- Request: `PATCH /api/issues/{id}/status`
- Header: `Content-Type: application/json`

Request body:

```json
{
  "status": "Resolved"
}
```

- Success: `200 OK` with the complete updated issue.
- Errors: `400`, `404`, `415`, `500`.

## Error Responses

All errors use this JSON format:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Title must contain between 3 and 100 characters."
  }
}
```

| Status | Code | Meaning |
|---|---|---|
| 400 | VALIDATION_ERROR | Input is missing, malformed, or breaks a validation rule |
| 404 | ISSUE_NOT_FOUND | The requested issue ID does not exist |
| 415 | UNSUPPORTED_MEDIA_TYPE | The request body is not JSON when JSON is required |
| 500 | INTERNAL_ERROR | An unexpected server error occurred |
