---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

## BankConnect: Check Session Upload Status

### 1. Webhooks

Utilize Webhooks for real-time notification on completion of upload in the session. Webhooks need to be configured once and then both the webhooks for Completion and [Enrichment](processing-status.html) would be triggered on the configured URL.

Ensure your webhook endpoint is consistently available; if not, consider the polling approach or fetching all payloads for a given `session_id`

**Important Note:** The webhook will only be triggered once the upload has been completed by the user.

**Configuration:** Share a valid endpoint that receives a POST request, accepts a request body with content-type application/json and returns a 200 status code on successful reception.

**Update the endpoint using the API:**

::: tip Endpoint

POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/update_webhook/**

:::

**Request:**

```json
{
    "webhook_url": "https://postman-echo.com/post",
    "webhook_mode": 1
}
```

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Receiving Success Payload:**

```json
{
  "message": "success"
}
```

**Receiving Webhook Success Payload:**

```json
{
  "session_id": "409ed817-b824-4818-a7f7-dc532ce0d8fc",
  "event_name": "SESSION_REQUIREMENT_COMPLETION_NOTIFICATION/SESSION_EXPIRY_NOTIFICATION",
  "message": "Session expired/Upload Completed",
  "accounts": [
    {
      "account_id": "814d062e-1c36-409f-9f9c-acb32e7984b0",
      "account_number": "5413699704",
      "bank_name": "kotak",
      "created_at": "2024-04-26 12:25:57",
      "last_updated_at": "2024-04-26 12:26:27",
      "statements": [
        {
          "statement_id": "fe49d6a6-1c0e-4e6d-911a-c38b6a4f0d04",
          "statement_status": "completed",
          "error_code": null,
          "error_message": null,
          "source": "pdf",
          "created_at": "2024-04-26 12:25:56.172124+00:00"
        }
      ],
      "account_status": "PARTIAL",
      "months": [
        "2023-10",
        "2023-11",
        "2023-12",
        "2024-01",
        "2024-02",
        "2024-03",
        "2024-04"
      ]
    }
  ],
  "session_date_range": {
    "from_date": "25/10/2023",
    "to_date": "25/04/2024"
  }
}

```


### 2. Polling:

Use Polling as a backup if the webhook endpoint is down or a webhook call fails.

For cases when the COMPLETION webhook is not triggered, the Upload Status API can be polled to check the status. Polling requires the `session_id`.

**Note:** To review the status at the account/statement level, refer to the statuses within the corresponding block.

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/session_upload_status/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
    "session_id": "",
    "session_date_range": {
        "from_date": "",
        "to_date": ""
    },
    "upload_status": "NO_UPLOAD/IN_PROGRESS/COMPLETED",
    "accounts": [
        {
            "account_id": "8702145a-aaa3-4ee0-acb7-9a328b54905a",
            "account_number": "XXXXXXXXXX",
            "bank_name": "icici",
            "account_status": "PARTIAL/COMPLETED",
            "months": [],
            "created_at": "2024-04-16 07:47:42",
            "last_updated_at": "2024-04-16 07:48:21",
            "statements": [
                {
                    "statement_id": "567700a6-570d-4f75-ae60-d79357dabdb4",
                    "statement_status": "completed",
                    "error_code": "",
                    "error_message": "",
                    "source": "pdf",
                    "statement_date_range": {
                        "from_date": "",
                        "to_date": ""
                    },
                    "created_at": "2024-04-16T07:47:40.806223Z"
                }
            ]
        }
    ]
}

```

**Error Response:**

```json
{
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "The provided session ID is invalid"
  }
}
```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**

|Code|Message|HTTP status code|
|------------------------------| ----------------------------------| ---------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|

