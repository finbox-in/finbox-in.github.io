---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

## BankConnect: Check Processing Status

### 1. Webhooks

Utilize Webhooks for real-time notification on completion or failure of the transaction extraction process.

Ensure your webhook endpoint is consistently available; if not, consider the polling approach or fetching all payloads for a given `session_id`

**Important Note:** The webhook will only be triggered once the processing has been completed.

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
<!-- **Receiving Failure Payload:**

```json
{
  "session_id":"abcd",
  "event_name": "ENRICHMENT_NOTIFICATION"
  "accounts":[
    {
      "bank_name": "sbi",
      "account_id" :"account_uuid4",
      "account_status" :"failed",
      "error_code" : "MISSING_TRANSACTIONS",
      "error_message": "One or more transactions are missing in the specified date range"
    }
  ]
}

``` -->
**Account Status:**

The account_status field indicates the status of the overall account extraction and processing. It can be either "completed" or "failed." In case of successful completion, the message will be null. 

For failed cases, the following error codes and messages are applicable:

|Code|Message|
|----------------------------|-------------------------------------------------------------------------------------------|
|MISSING_TRANSACTIONS|One or more transactions are missing in the specified date range|
|INCOMPLETE_MONTHS|Insufficient data to generate report. There are no transactions for Nov 2023, Dec 2023|
|NULL_ACCOUNT_NUMBER|Account number is unavailable or unidentified|
|BALANCE_MISMATCH|Calculated transaction balance does not match|
|INCOMPLETE_MONTHS_UPLOAD|Statement(s) uploaded contain incomplete months. Missing data present for Nov 2023, Dec 2023|
|INCOMPLETE_DATES_UPLOAD|Statement(s) uploaded contain incomplete dates. Missing dates present for {\"Jan 2024\": [1, 2, 3, 4]}|

### 2. Polling:

Use Polling as a backup if the webhook endpoint is down or a webhook call fails.

Continuously poll the Progress API every 2 seconds until `session_progress` indicate "completed" for the session. Polling requires the `session_id`.

Once session_progress is "completed" proceed to step B and fetch data using REST API.

**Note:** To review the status at the statement level, refer to all the statuses within the progress block corresponding to the respective statement_id.

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/progress/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
    "session_id": "bfb98ac5-7224-401b-a643-175235856187",
    "session_progress":"completed/processing"
    "progress": [
        {
            "identity_status": "completed",
            "transaction_status": "completed",
            "processing_status": "completed",
            "fraud_status": "completed",
            "statement_id": "4164bc05-7b3f-4a5c-8e31-ca3c2648ec6b",
            "message": null,
            "source": "pdf"
        },
        {
            "identity_status": "completed",
            "transaction_status": "completed",
            "processing_status": "completed",
            "fraud_status": "completed",
            "statement_id": "bd90d1c9-7b1a-4300-9987-3c6c20bbe71d",
            "message": null,
            "source": "pdf"
        }
    ]
}

```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**

|Code|Message|HTTP status code|
|------------------------------| ----------------------------------| ---------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|PROCESSING_NOT_REQUESTED|Cannot proceed as the processing has not been requested yet|400|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|

