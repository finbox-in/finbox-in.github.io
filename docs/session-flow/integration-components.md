---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

# Integration Steps

The BankConnect journey can be divided broadly into two steps:

1.  Submit the data to FinBox

2.  Get enriched data from FinBox


## BankConnect: Check Session Upload Status

### 1. Webhooks

Utilize Webhooks for real-time notification on completion of upload in the session. Webhooks need to be configured once and then both the webhooks for Completion and [Enrichment](session-flow/integration-components.html#bankconnect-check-processing-status) would be triggered on the configured URL.

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
    "webhook_mode": ["ENRICHMENT_NOTIFICATION"]
}
```

**Authentication**

The request header `x-secret-key` with the Secret Key as its value will be included in the request. The client will provide this Secret Key, and it is optional.

**Receiving Success Payload:**

```json
{
    "session_id": "6d105744-f304-4637-8220-1e217ec84fcf",
    "session_date_range": {
        "from_date": "",
        "to_date": ""
    },
    "event_name": "SESSION_REQUIREMENT_COMPLETION_NOTIFICATION",
    "message": "",
    "accounts": [
        {
            "account_id": "8702145a-aaa3-4ee0-acb7-9a328b54905a",
            "account_number": "XXXXXXXXXXX",
            "bank_name": "icici",
            "account_status": "COMPLETED",
            "created_at": "2024-04-16 07:47:42",
            "last_updated_at": "2024-04-16 07:48:21",
            "statements": [
                {
                    "statement_id": "567700a6-570d-4f75-ae60-d79357dabdb4",
                    "statement_status": "completed",
                    "error_code": "",
                    "error_message": "",
                    "source": "pdf",
                    "created_at": "2024-04-16T07:47:40.806223Z"
                }
            ]
        }
    ]
}
```

### 2. Polling:

Use Polling as a backup if the webhook endpoint is down or a webhook call fails.

For cases when the COMPLETION webhook is not triggered, the Upload Status API can be polled to check the status. Polling requires the `session_id`.

**Note:** To review the status at the account/statement level, refer to the statuses within the corresponding block.

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/upload_status/**

:::

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


## Fetch Enriched data

Upon finishing the statement upload or completing the BankConnect journey, please activate the processing of the uploaded statements by triggering the designated processing API.

**Please note that once processing is underway, additional statements cannot be uploaded as the session will have concluded and expired.**


## Initiate Processing API

::: tip Endpoint

POST  **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/initiate_processing/**

:::

**Success Response:**

HTTP Status code: 202 Accepted

```json
{
  "session_id": "uuid_for_session_id",                             
  "message": "success"   
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
|DUPLICATE_PROCESSING_REQUEST|Request for processing have already been initiated|409|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|


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
    "webhook_mode": ["ENRICHMENT_NOTIFICATION"] 
}
```

**Authentication**

The request header `x-secret-key` with the Secret Key as its value will be included in the request. The client will provide this Secret Key, and it is optional.

**Receiving Success Payload:**

```json
{
  "session_id":"abcd",
  "event_name": "ENRICHMENT_NOTIFICATION",
  "accounts":[
    {
      "bank_name": "sbi",
      "account_id" :"account_uuid4",
      "account_status" :"completed",
      "error_code" : null,
      "error_message": null
    }
  ]
}
```
**Receiving Failure Payload:**

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

```
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


## BankConnect: Fetching Data

BankConnect REST APIs can be used to fetch enriched data for a session.


## Get Session Status

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/session_status/**

:::

**Success Response**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
  "session_id": "abcd",
  "accounts": [
    {
      "bank_name": "sbi",
      "account_number": "",
      "account_id": "account_uuid4",
      "account_status": "completed",
      "error_code": null,
      "error_message": null,
      "created_at": “”,
      "last_updated_at": “”,
      "statements": [
        {
          "statement_id": "",
          "statement_status": "",
          "error_code": "",
          "error_message": "",
          "source": "",
          "created_at": ""
        },
        {
          "statement_id": "",
          "statement_status": "",
          "error_code": "",
          "error_message": "",
          "source": "",
          "created_at": ""
        }
      ]
    }
  ]
}

```
**Account Status:**

The account_status field indicates the status of the overall account extraction and processing. It can be either "completed" or "failed." In case of successful completion, the message will be null. For failed cases, the following error codes and messages are applicable:

|Code|	Message|
|------------------------------| ----------------------------------|
|MISSING_TRANSACTIONS|One or more transactions are missing in the specified date range|
|INCOMPLETE_MONTHS|Insufficient data to generate report. There are no transactions for Nov 2023, Dec 2023|
|NULL_ACCOUNT_NUMBER|Account number is unavailable or unidentified|
|BALANCE_MISMATCH|Calculated transaction balance does not match|
|INCOMPLETE_MONTHS_UPLOAD|Statement(s) uploaded contain incomplete months. Missing data present for Nov 2023, Dec 2023|
|INCOMPLETE_DATES_UPLOAD|Statement(s) uploaded contain incomplete dates. Missing dates present for {}|

The statement_status field indicates the status of the overall statement extraction and processing. It can be either "completed" or "failed." In case of successful completion, the message will be null.

|Code|Message|
|------------------------------| ----------------------------------|
|PASSWORD_INCORRECT|The provided password is incorrect|
|BANK_NAME_MISMATCH|The bank name in the statement doesn't match the selected bank|
|STATEMENT_UNSUPPORTED_FORMAT|The statement format is not supported|
|STATEMENT_DUPLICATE|A duplicate statement has been detected|
|NULL_ACCOUNT_NUMBER|Account number is unavailable or unidentified|
|STATEMENT_TOO_MANY_PAGES|The statement exceeds the allowed page limit|
|NO_TRANSACTIONS_FROM_AA|Not able to fetch transactions from Account Aggregator|


For failed cases, the following error codes and messages are applicable:

|Code|Message|
|------------------------------| ----------------------------------|
|PDF_IS_IMAGE	|Scanned images are not supported|
|EXTRACTION_FAILED	|Failed to extract information from the statement|
|OUT_OF_DATE_RANGE|	The statement uploaded is beyond the specified date range|
|STATEMENT_NO_TRANSACTIONS	|No transactions were identified in the uploaded statement|
|BANK_NAME_UNDETECTED|Bank name could not be identified|


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
|------------------------------| ----------------------------------|------------------------------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|PROCESSING_NOT_REQUESTED|Cannot proceed as the processing has not been requested yet|400|
|SESSION_DELETED|The provided session ID has been deleted|410|
|ACCESS_DENIED|Authentication credentials were not provided|403|
|PROCESSING_NOT_COMPLETED|The processing for this session is currently in progress|400|


## Insights API

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/insights/**

:::

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
    "session_id":"fdf6fe90-c1a0-41f7-964f-bb2425975309",
    "accounts":[
       {
          "account_id":"8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753",
          "data":{
             "account_details":{
                "account_category":"savings",
                "account_number":"1234567890",
                "account_opening_date":null,
                "bank":"central",
                "name":"ABCD ENTERPRISES",
                "address":"ABCD Nagar",
                "credit_limit":"0",
                "ifsc":null,
                "micr":null,
                "missing_data":[
                   {
                      "from_date":"2024-02-21",
                      "to_date":"2024-04-21"
                   }
                ],
                "od_limit":"0",
                "salary_confidence":null,
                "statements":[
                   "036917f1-06dc-44c1-8f40-509c3a6093aa"
                ],
                "months":[
                   "2023-10",
                   "2023-11",
                   "2023-12",
                   "2024-01",
                   "2024-02"
                ],
                "country_code":"IN",
                "currency_code":"INR",
                "metadata_analysis":{
                   "name_matches":[
                      
                   ]
                }
             },
             "fraud":[
                {
                   "statement_id":"036917f1-06dc-44c1-8f40-509c3a6093aa",
                   "fraud_type":"author_fraud",
                   "transaction_hash":null,
                   "fraud_category":"metadata"
                }
             ],
             "transactions":[
                {
                   "transaction_type":"credit",
                   "transaction_note":"UPI~1234567890~swiggystores@icici~Swiggy-1234567890qwertyuiop",
                   "chq_num":null,
                   "amount":6500.0,
                   "balance":6500.94,
                   "date":"2023-11-05 00:00:00",
                   "hash":"4ce4c53c266511d3f4270e7bf98756fc",
                   "category":"Food"
                },
                {
                   "transaction_type":"credit",
                   "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                   "chq_num":null,
                   "amount":10890.0,
                   "balance":10955.62,
                   "date":"2023-12-15 00:00:00",
                   "hash":"57977dd68368daf5309a6c126a778606",
                   "category":"Salary"
                }
             ],
             "salary_transactions":[
                {
                   "transaction_type":"credit",
                   "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                   "chq_num":null,
                   "amount":10890.0,
                   "balance":10955.62,
                   "date":"2023-12-15 00:00:00",
                   "hash":"57977dd68368daf5309a6c126a778606",
                   "category":"Salary",
                   "employer_name":null,
                   "salary_month":"Nov-2023"
                }
             ],
             "top_credits_debits":[
                {
                   "type":"top_5_debit",
                   "data":[
                      {
                         "month":"Oct-23",
                         "data":[
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            }
                         ]
                      },
                      {
                         "month":"Nov-23",
                         "data":[
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"debit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            }
                         ]
                      }
                   ]
                },
                {
                   "type":"top_5_credit",
                   "data":[
                      {
                         "month":"Oct-23",
                         "data":[
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            }
                         ]
                      },
                      {
                         "month":"Nov-23",
                         "data":[
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            },
                            {
                               "transaction_type":"credit",
                               "transaction_note":"IMP-334925115915-9999999999-1234567890qwertyuiop -RBL BANK -salary",
                               "chq_num":null,
                               "amount":10890.0,
                               "balance":10955.62,
                               "date":"2023-12-15 00:00:00",
                               "hash":"57977dd68368daf5309a6c126a778606",
                               "category":"Salary"
                            }
                         ]
                      }
                   ]
                }
             ],
             "monthly_analysis":{
                "opening_balance":{
                   "Oct-2023":10289.49,
                   "Nov-2023":97862.41,
                   "Dec-2023":208.11,
                   "Jan-2024":323.62,
                   "Feb-2024":122548.98
                },
                "closing_balance":{
                   "Oct-2023":97862.41,
                   "Nov-2023":208.11,
                   "Dec-2023":323.62,
                   "Jan-2024":122548.98,
                   "Feb-2024":898.98
                }
             },
             "predictors":{
                "accountnumber":"1234567890",
                "bank_name":"central",
                "ifsc_code":null,
                "customer_name":"ABCD ENTERPRISES",
                "account_type":"corporate",
                "ccod_limit":0.0,
                "month_0":"Feb-24",
                "month_1":"Jan-24",
                "month_2":"Dec-23",
                "month_3":"Nov-23",
                "month_4":"Oct-23",
                "month_5":null,
                "month_6":null,
                "month_7":null,
                "month_8":null,
                "month_9":null,
                "month_10":null,
                "month_11":null,
                "expense_0":760951.0,
                "expense_1":1288794.04,
                "expense_2":10415328.91,
                "expense_3":4701695.02,
                "expense_4":1080581.91,
                "expense_5":null,
                "expense_6":null,
                "expense_7":null,
                "expense_8":null,
                "expense_9":null,
                "expense_10":null,
                "expense_11":null,
                "total_inward_chq_bounces_insuff_fund_0":0
             },
             "eod_balances":{
                "Months_order":[
                   "Oct-23",
                   "Nov-23",
                   "Dec-23",
                   "Jan-24",
                   "Feb-24"
                ],
                "start_date":[
                   "23-Oct-23",
                   "01-Nov-23",
                   "01-Dec-23",
                   "02-Jan-24",
                   "01-Feb-24"
                ],
                "Nov-23":[
                   320772.41,
                   107510.5,
                   3401.59,
                   53401.59,
                   53401.59,
                   901.59,
                   -399480.41,
                   -404078.41,
                   -404078.41,
                   -394202.41,
                   -394202.41,
                   -404202.41,
                   -404202.41,
                   -404202.41,
                   -404202.41,
                   -400481.69,
                   -400481.69,
                   -400481.69,
                   -400481.69,
                   -400481.69,
                   -230481.69,
                   -400481.69,
                   -400481.69,
                   -401028.89,
                   -401087.89,
                   -404187.89,
                   -404187.89,
                   -404187.89,
                   -404187.89,
                   -404187.89
                ]
             },
             "xlsx_report_url": "s3_presigned_url",
             "xml_report_url": "s3_presigned_url"
          }
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

### List of API Error Codes**

**The following table lists API error codes applicable to this API:**

|Code|Message|HTTP status code|
|------------------------------| ----------------------------------| ---------------|
|SESSION_NOT_FOUND|The provided session ID is invalid|404|
|PROCESSING_NOT_REQUESTED|Cannot proceed as the processing has not been requested yet|400|
|SESSION_DELETED|The provided session ID has been deleted|410|
|PROCESSING_NOT_COMPLETED|The processing for this session is currently in progress|400|
|ACCESS_DENIED|Authentication credentials were not provided|403|
  


## Possible Scenarios

**Scenario 1: Single account Flow**

Once a session is initiated for a user, they upload a statement for a specified time period through any of the provided modes, completing the journey. In this scenario, there is no necessity for multiple statements from the user. The journey concludes at this point, and the `session_id` is now ready for retrieving enriched data.

**Scenario 2: Multibanking Flow**

Upon initiating a session for a user, they upload statements for a specified time period or multiple statements for a given account over a period, using any of the provided modes, thus completing the journey. In scenarios where additional statements are needed from the user, either for a different bank or using the same mode, the existing session must be invoked again by utilizing the previously received `session_id`. After all uploads are finalized, the `session_id` can then be employed to retrieve enriched data.

**Scenario 3: User Revisits**

A user concluded a journey using a specific `session_id` about a month ago. Upon returning after 3 months, a new session should be initiated for this subsequent interaction.

**Scenario 4: User Drops Off**

A session is started, and users partially upload statements for a specified time period, exiting the journey without completion. If the user returns to upload statements for the remaining duration, the same `session_id` can be utilized if the session is still within its defined TTL (Time To Live) of x days. However, if the session has expired, the user needs to upload from the beginning. It's crucial to note that there is no cross-linking between sessions, even if they are associated with the same linkID.

After successfully concluding a journey for a specific session, and considering the TTL has elapsed, there is a need for additional
statements from the user. This requirement arises to display a booster offer by obtaining statements from the user for other banks.
