---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---

## BankConnect: Submit Data to FinBox (Uploading Bank Statements)

The data can be submitted / uploaded to FinBox backend in two ways:

1.  Frontend (using FinBox UI i.e Javascript SDK)

2.  Backend (using FinBox REST APIs)

**To begin uploading, we first need to initiate a session. In both the methods, a session needs to be initialized using Session API.**

## Session API

To start with the integration, call the following API to create a
session:

::: tip Endpoint
POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session/**
:::

**Request Parameters**

| Name         | Type   | Description                                                                                                                                               | Required                      | Default                 |
| ------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ----------------------- |
| link_id      | string | link_id value                                                                                                                                             | Yes                           | -                       |
| api_key      | string | API key provided by FinBox                                                                                                                                | Yes                           | -                       |
| redirect_url | string | URL to redirect to incase of success or failure                                                                                                           | Yes for **Redirect Workflow** | -                       |
| from_date    | string | Start date range to fetch statements. Should be of format `DD/MM/YYYY`                                                                                    | No                            | Last 6 month start date |
| to_date      | string | End date range to fetch statements. Should be of format `DD/MM/YYYY`                                                                                      | No                            | Yesterday               |
| logo_url     | string | An optional parameter to show logo branding in bankconnect SDK. Should be a URL.                                                                          | No                            | -                       |
| bank_name    | string | Pass the [bank identifier](/session-flow/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No                            | -                       |
| mode         | string | Optional parameter to set the mode(i.e. pdf, aa, and online)                                                                                              | No                            | -                       |
| mobile_number  | string  | Optional parameter to prefill phone number in Account Aggregator mode                                     | No                        |
| session_expiry | integer | Optional parameter to set expiry timing for each session created                                          | No                        |
| journey_mode   | string  | Optional parameter to set the journey(i.e. multi_pdf or multi_banking)                                    | No                        |


`from_date` and `to_date` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `from_date` will be today's date - 6 months and `to_date` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

<b>Note</b>: If the `to-date` lies in the first week of the month, the respective month is not considered in the journey.

::: warning NOTE

- `redirect_url` in request is a compulsory field in [Redirect Workflow](/bank-connect/javascript.html#redirect-workflow) but is not required with the [Inline Frame workflow](/bank-connect/javascript.html#inline-frame-workflow)
- Please make sure `from_date` is always less than `to_date`
- Make sure `to_date` is never today's date, the maximum possible value for it is today's date - 1 day
  :::


**Success Response**

On successful API call, it gives a **200 HTTP code** with a response in following format:

```json
{
  "session_id": "8d5ea22b-216a-4fe2-90da-65d1c67c8964",
  "redirect_url": "https://bankconnectclient.finbox.in/?session_id=8d5ea22b-216a-4fe2-90da-65d1c67c8964"
}
```

Use `redirect_url` to open up the BankConnect SDK. This URL can be used embedded inside an `<iframe>` or can be opened in a new tab or current window.

To proceed with additional enriched APIs, it is imperative to store the
`session_id` for subsequent calls.

**Error Response**

```json
"error":
{
  "code": "INVALID_DATE_FORMAT",
  "message": "Invalid format for from_date and to_date, 'Supported format: DD/MM/YYYY'"
}
```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**


|Error code|Error message|HTTP Status Code|
| ------------ | ----------------------------------------------------------------------------------- | ----------------------------- |
|INVALID_DATE_FORMAT|Invalid 'from_date' or 'to_date' format. Use 'DD/MM/YYYY'. |400|
|INVALID_DATE_RANGE|from_date' can't be greater or equal to 'to_date'.|400|
|MISSING_DATE_FIELD| from_date' and 'to_date' are required. |400|
|INVALID_BANK_NAME| Invalid bank identifier.| 400|
|MISSING_BANK_NAME |bank_name' is required with 'mode'.|400|
|MODE_NOT_AVAILABLE |Specified mode not available for this bank.|400|
|MODE_NOT_ENABLED| Specified mode not enabled. Contact FinBox Admin.|403|
|INVALID_DATE_FORMAT |Invalid 'max_from_date' or 'max_to_date' format. Use 'DD/MM/YYYY'.| 400|
|INVALID_DATE_RANGE| max_from_date' can't be greater or equal to 'max_to_date'.|400|

## Frontend integration (JavaScript SDK)

The JavaScript Client SDK helps users submit their bank statements via
upload, net banking credentials or in your Web applications. The SDK
will be opened via a web URL.

The first step in integration involves calling the Session API Then the
workflow can be implemented in one of the following ways:

### Redirection Workflow

<img src="/redirect-workflow.png" alt="Redirect Workflow" />

The flow for this involves following steps:

- Create a session using Session API

- Get the URL received from above API and open it in a new tab

- On success / exit, Client SDK will redirect to the specified
  redirect URL with parameters as follows:
  - Exit: `{url}?success=false`
  - Success: `{url}?success=true&session_id=<some-session-id>`

<b>NOTE</b>: Since there is no callback received on this flow, it is recommended to configure Webhook

## Backend integration

**Uploading via REST APIs**

1.  Create a session using the Session API.

2.  Obtain the session_id from the API and pass it in the upload API request.


**Upload API:**

::: tip Endpoint

POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/statement/upload_session/**

:::

### Authentication
Request header `x-api-key` with API Key as value must be present in request.

### Parameters
| Name | Type | Description | Required  | Default |
| - | - | - | - | - |
| file | file  | the statement pdf file | Yes | - |
| bank_name | string | a valid [bank identifier](/session-flow/appendix.html#bank-identifiers) | Yes | - |
| session_id | string | a `session_id` against which you want to upload the statement | Yes | - |
| upload_type | string | The format of file that is being uploaded (PDF, BASE64) | Yes | - |
| pdf_password | string | password for the pdf in case it is password protected | No | - |


**Query Parameters:** Optional parameters appended to the URL like
_upload_session/?identity=true_

_progress (optional, string):_ Provides progress of uploaded statements.

_identity (optional, string):_ Provides identity details for uploaded
statements.


**Successful upload response (HTTP 200):**

```json
{
    "bank_name": "icici",
    "statement_id": "567700a6-570d-4f75-ae60-d79357dabdb4",
    "identity": {
        "account_number": "XXXXXXXXXXX",
        "name": "XYZ PRODUCTS PRIVATE",
        "address": "567/435,Gol Chauraha,MEERUT,250002,UTTAR PRADESH,INDIA",
        "ifsc": "ICIC0000368",
        "micr": null,
        "account_category": "corporate",
        "credit_limit": null,
        "od_limit": null,
        "account_id": "8702145a-aaa3-7gju-7v78-9a327y54905a",
        "bank_name": "icici"
    },
    "date_range": {
        "from_date": "2023-04-01",
        "to_date": "2024-03-23"
    },
    "opening_date": null,
    "opening_bal": null,
    "closing_bal": null,
    "is_fraud": false,
    "fraud_type": null,
    "page_count": 48,
    "metadata_analysis": {
        "name_matches": []
    },
    "country_code": "IN",
    "currency_code": "INR",
    "extracted_date_range": {
        "from_date": "2023-04-01",
        "to_date": "2024-03-23"
    },
    "account_id": "8702145a-aaa3-4ee0-acb7-9a328b54905a",
    "masked_account_number": "XXXXXXXXXXX",
    "status": 1,
    "session_id": "c215f3fd-fcd8-4452-a4d7-2b7ju262aef9"
}
```

**Error Response:**

```json
{
  "session_id":"",
  "statement_id":"",
  "error": {
    "code": "SESSION_NOT_FOUND",
    "message": "The provided Session ID is invalid"
  }
}

```

### List of API Error Codes

**The following table lists API error codes applicable to this API.**

|Code|Message|HTTP status code|
|-------|---------------------------------------------------------------------|--------------------------------------|
|TRIAL_PERIOD_EXPIRED|Your trial period has expired. Please request FinBox to upgrade your plan|402|
|INVALID_FILE_OBJECT|This field must be present as a form field. Send request with content type x-www-form-urlencoded or form-data|400|
|INVALID_FILE_OBJECT|File object is invalid|400|
|INVALID_FILE_URL|This file url is invalid|400|
|MISSING_FILE_OBJECT|This file object is required|400|
|INVALID_BASE_64|Invalid Base 64 string|400|
|INVALID_ACCOUNT_CATEGORY|account_category' should be 'SAVINGS', 'CURRENT' or 'OVERDRAFT'|400|
|PASSWORD_INCORRECT|The provided password is incorrect|400|
|STATEMENT_UNSUPPORTED_FORMAT|The statement format is not supported|400|
|BANK_NAME_UNDETECTED|Unable to detect bank. Please provide BANK NAME.|400|
|PDF_IS_IMAGE|Scanned images are not supported|400|
|BANK_NAME_MISMATCH|Not {selected_bank_name} bank statement|400|
|OUT_OF_DATE_RANGE|No transactions in expected date range|400|
|STATEMENT_DUPLICATE|A duplicate statement has been detected|400|

