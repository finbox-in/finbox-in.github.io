---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


### Backend integration

**Uploading via REST APIs**

1.  Create a session using the Session API.

2.  Obtain the session_id from the API and pass it in the upload API request.


**Upload API:**

::: tip Endpoint

POST **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/statement/upload_session/**

:::

**Authentication**

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

