# BankConnect Session Flow Implementation

## BankConnect: Overview

FinBox BankConnect allows users to submit their bank account statements
(including scanned statements) via Account Aggregator (AA), Net banking
or manual upload methods in your application, then processes them and
shares the enriched data with you.

BankConnect is currently used in use-cases such as personal and business
loan disbursals by platforms and lenders in their respective online /
offline journeys.

## Key Terminologies

<img src="/basic_terms.jpg" alt="Basic Terms" />

**Link ID:** A unique identifier provided by the client to reference an
individual user.

This is used to uniquely identify a user throughout the BankConnect
integration process. This identifier is referred to as link_id

**Session:** Instances generated to initiate the BankConnect process are
called sessions. The creation of a session can be achieved through the
[[Sessions]](https://docs.finbox.in/bank-connect/javascript-client.html#session-api)
API. Every BankConnect journey is associated with a specific session.
Each session is valid for a defined TTL (Time To Live) of x time.

**Account:** Bank accounts connected within a session, located in the
same or different banks.

Each account within a session is uniquely identified by an account_id
assigned by FinBox.

**Statement:** Bank transaction records submitted or fetched within a
session. Identified by a unique statement_id, multiple statements can be
uploaded for a given account over a period. BankConnect automatically
links statements to the corresponding account using the account_id.

**Notes:**

You have the flexibility to generate multiple sessions for an individual
user, also referred as a LinkID in BankConnect. Each session exclusively
provides responses for the statements uploaded within that specific
session.

It\'s important to note that data from different sessions cannot be
combined.

For instance, when a customer visits your platform, you initiate
BankConnect with a new sessionID. The customer uploads multiple
statements to cover a 6-month duration. If the customer returns after 3
months, a new session must be created for that subsequent interaction.




# Getting API Keys

BankConnect requires API Keys to initialize the SDK and/or access the
REST APIs. There will be separate keys for DEV and PROD environments.

You can get your keys on the [[FinBox
Dashboard]](https://dashboard.bankconnect.finbox.in/settings).
Please login to the BankConnect Dashboard using the credentials shared
with you by the FinBox team. Once you\'re in, head to the Settings\>
Configurations tab, where you\'ll find the Integration Keys (Bank
Connect). These keys are essential for making API calls in your
workflow.

## Implementation Flow

<img src="/basic_terms.jpg" alt="Basic Terms" />


# Integration Components

The BankConnect journey can be divided broadly into two steps:

1.  Submit the data to FinBox

2.  Get enriched data from FinBox

## BankConnect: Submit Data to FinBox (Uploading Bank Statements)

The data can be submitted / uploaded to FinBox backend in two ways:

1.  Frontend (using FinBox UI i.e Javascript SDK)

2.  Backend (using FinBox REST APIs)

## To begin uploading, we first need to initiate a session. In both the methods, a session needs to be initialized using Session API.

## Session API

To start with the integration, call the following API to create a
session:

**Endpoint**

POST https://apis.bankconnect.finbox.in/bank-connect/v1/session/

**Request Parameters**

  ---------------- ---------- --------------------------------------- --------------
  **Name**         **Type**   **Description**                         **Required**

  link_id          string     link_id value                           Yes

  api_key          string     API key provided by FinBox              Yes

  redirect_url     string     URL to redirect to incase of success or Yes for
                              failure                                 Redirect
                                                                      Workflow

  from_date        string     Start date range to fetch statements.   Yes
                              Should be of format DD/MM/YYYY          

  to_date          string     End date range to fetch statements.     Yes
                              Should be of format DD/MM/YYYY          

  logo_url         string     An optional parameter to show logo      No
                              branding in bank connect SDK. Should be 
                              a URL.                                  

  bank_name        string     pass the bank identifier to skip the    No
                              bank selection screen and directly open 
                              a that bank\'s screen instead           

  mode             string     optional parameter to set the mode(i.e. No
                              pdf, aa, and online)                    

  mobile_number    string     Optional parameter to prefill phone     No
                              number in Account Aggregator mode       

  session_expiry   integer    Optional parameter to set expiry timing No
                              for each session created                

  journey_mode     string     optional parameter to set the           
                              journey(i.e. multi_pdf or               
                              multi_banking)                          
  ---------------- ---------- --------------------------------------- --------------

from_date and to_date specify the period for which the statements will
be fetched. For example, if you need the last 6 months of data from
statements, from_date will be today\'s date - 6 months and to_date will
be today\'s date - 1 day. If not provided the default date range is 6
months from the current date. It should be in DD/MM/YYYY format.

**Note**: If the to_date lies in the first week of the month, the
respective month is not considered in the journey.

-   redirect_url in request is a compulsory field in [Redirect
    Workflow](https://docs.finbox.in/bank-connect/javascript-client.html#redirect-workflow)
    but is not required with the [Inline Frame
    workflow](https://docs.finbox.in/bank-connect/javascript-client.html#inline-frame-workflow)

-   Please make sure from_date is always less than to_date

-   Make sure to_date is never today\'s date, the maximum possible value
    for it is today\'s date - 1 day

**Success Response**

On successful API call, it gives a 200 HTTP code with a response in
following format:

+-----------------------------------------------------------------------+
| {                                                                    |
|                                                                       |
| \"session_id\": \"8d5ea22b-216a-4fe2-90da-65d1c67c8964\",             |
|                                                                       |
| \"redirect_url\":                                                     |
| \"https://bankconn                                                    |
| ectclient.finbox.in/session_id=8d5ea22b-216a-4fe2-90da-65d1c67c8964\" |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

Use redirect_url to open up the BankConnect SDK. This URL can be used
embedded inside an \<iframe\> or can be opened in a new tab or current
window.

To proceed with additional enriched APIs, it is imperative to store the
session_id for subsequent calls.

**Error Response**

+-----------------------------------------------------------------------+
| {                                                                    |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"INVALID_DATE_FORMAT\",                                    |
|                                                                       |
| \"message\": \"Invalid format for from_date and to_date, \"Supported  |
| format: \'DD/MM/YYYY\'\"                                              |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API. 

  --------------------- ------------------------------ --------------------
  **Error code**        **Error message**              **HTTP Response
                                                       Status**

  INVALID_DATE_FORMAT   Invalid \'from_date\' or       400
                        \'to_date\' format. Use        
                        \'DD/MM/YYYY\'.                

  INVALID_DATE_RANGE    from_date\' can\'t be greater  400
                        or equal to \'to_date\'.       

  MISSING_DATE_FIELD    from_date\' and \'to_date\'    400
                        are required.                  

  INVALID_BANK_NAME     Invalid bank identifier.       400

  MISSING_BANK_NAME     bank_name\' is required with   400
                        \'mode\'.                      

  MODE_NOT_AVAILABLE    Specified mode not available   400
                        for this bank.                 

  MODE_NOT_ENABLED      Specified mode not enabled.    403
                        Contact FinBox Admin.          

  INVALID_DATE_FORMAT   Invalid \'max_from_date\' or   400
                        \'max_to_date\' format. Use    
                        \'DD/MM/YYYY\'.                

  INVALID_DATE_RANGE    max_from_date\' can\'t be      400
                        greater or equal to            
                        \'max_to_date\'.               
  --------------------- ------------------------------ --------------------



## Frontend integration (JavaScript SDK)

The JavaScript Client SDK helps users submit their bank statements via
upload, net banking credentials or in your Web applications. The SDK
will be opened via a web URL.

The first step in integration involves calling the Session API Then the
workflow can be implemented in one of the following ways:

## Redirection Workflow

<img src="/basic_terms.jpg" alt="Basic Terms" />

The flow for this involves following steps:

-   Create a session using Session API

-   Get the URL received from above API and open it in a new tab

-   On success / exit, Client SDK will redirect to the specified
    redirect URL with parameters as follows:

> Exit: {url}?success=false
>
> Success: {url}?success=true&session_id=\<some-session-id\>

NOTE: Since there is no callback received on this flow, it is
recommended to configure Webhook


## Backend integration

**Uploading via REST APIs**

1.  Create a session using the Session API.

2.  Obtain the session_id from the API and pass it in the upload API
    request.

**Upload API:**

*Request Parameters:*

**Endpoint**

POST
https://apis.bankconnect.finbox.in/bank-connect/v1/statement/upload_session/

  ------------------------------------------------------------------------------------
  **Name**       **Type**   **Description**                             **Required**
  -------------- ---------- ------------------------------------------- --------------
  file           file       the statement pdf file                      Yes

  bank_name      string     a valid bank identifier                     Yes

  session_id     string     a session_id against which you want to      Yes
                            upload the statement                        

  upload_type    string     The format of file that is being uploaded   Yes
                            (PDF, BASE64)                               

  pdf_password   string     password for the pdf in case it is password No
                            protected                                   
  ------------------------------------------------------------------------------------

**Query Parameters:** Optional parameters appended to the URL like
*upload_session/?identity=true*

*entity_progress (optional, string):* Filters progress for a specific
session.

*progress (optional, string):* Provides progress of uploaded statements.

*identity (optional, string):* Provides identity details for uploaded
statements.

**Successful upload response (HTTP 200):**

+-----------------------------------------------------------------------+
| {\                                                                    |
| \"bank_name\":\"karur\",\                                             |
| \"statement_id\":\"59767460-08d7-4551-badb-46e2d9861a9\",             |
|                                                                       |
| \"account_id\":\"3628c6a0-16f7-424d-80b1-6244a2deba9d\",              |
| \"masked_account_number\":\"XXXXXXXXXXXX5980\",\                      |
| \"status\":1,\                                                        |
| \"session_id\": \"8d5ea22b-216a-4fe2-90da-65d1c67c8964\"              |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \'entity_id\':\'\',                                                   |
|                                                                       |
| \'statement_id\':\'\',                                                |
|                                                                       |
| \'error\': {                                                          |
|                                                                       |
| \'code\': \'SESSION_NOT_FOUND\',                                      |
|                                                                       |
| \'message\': \'The provided Session ID is invalid\'                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API. 

  -----------------------------------------------------------------------
  **Code**                       **Message**                   **HTTP
                                                               status
                                                               code**
  ------------------------------ ----------------------------- ----------
  TRIAL_PERIOD_EXPIRED           Your trial period has         402
                                 expired. Please request       
                                 FinBox to upgrade your plan   

  INVALID_FILE_OBJECT            This field must be present as 400
                                 a form field. Send request    
                                 with content type             
                                 x-www-form-urlencoded or      
                                 form-data                     

  INVALID_FILE_OBJECT            File object is invalid        400

  INVALID_FILE_URL               This file url is invalid      400

  MISSING_FILE_OBJECT            This file object is required  400

  INVALID_BASE_64                Invalid Base 64 string        400

  INVALID_ACCOUNT_CATEGORY       account_category\' should be  400
                                 \'SAVINGS\', \'CURRENT\' or   
                                 \'OVERDRAFT\'                 

  PASSWORD_INCORRECT             The provided password is      400
                                 incorrect                     

  STATEMENT_UNSUPPORTED_FORMAT   The statement format is not   400
                                 supported                     

  BANK_NAME_UNDETECTED           Unable to detect bank. Please 400
                                 provide BANK NAME.            

  PDF_IS_IMAGE                   Scanned images are not        400
                                 supported                     

  BANK_NAME_MISMATCH             Not {selected_bank_name} bank 400
                                 statement                     

  OUT_OF_DATE_RANGE              No transactions in expected   400
                                 date range                    

  STATEMENT_DUPLICATE            A duplicate statement has     400
                                 been detected                 
  -----------------------------------------------------------------------

## Fetch Enriched data

Upon finishing the statement upload or completing the BankConnect
journey, please activate the processing of the uploaded statements by
triggering the designated processing API.

**Please note that once processing is underway, additional statements
cannot be uploaded as the session will have concluded and expired.**


## Initiate Processing API

**Endpoint**

POST
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/`<session_id>`/initiate_p
rocessing/

**Success Response:**

HTTP Status code: 202 Accepted

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"session_id\": \"uuid_for_session_id\",                              |
|                                                                       |
| \"message\": \"success\"                                              |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API. 

  ------------------------------ ---------------------------------- ---------------
  **Code**                       **Message**                        **HTTP status
                                                                    code**

  SESSION_NOT_FOUND              The provided session ID is invalid 404

  DUPLICATE_PROCESSING_REQUEST   Request for processing have        409
                                 already been initiated             

  SESSION_DELETED                The provided session ID has been   410
                                 deleted                            

  ACCESS_DENIED                  Authentication credentials were    403
                                 not provided                       
  ------------------------------ ---------------------------------- ---------------

## BankConnect: Check Processing Status

### 1. Webhooks

Utilize Webhooks for real-time notification on completion or failure of
the transaction extraction process.

Ensure your webhook endpoint is consistently available; if not, consider
the polling approach or fetching all payloads for a given session_id

**Important Note:** The webhook will only be triggered once the
processing has been completed.

**Configuration:** Share a valid endpoint that receives a POST request,
accepts a request body with content-type application/json and returns a
200 status code on successful reception.

**Update the endpoint using the API:**

**Endpoint**

POST

https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/update_webhook/

**Request:**

+-----------------------------------------------------------------------+
| {                                                                    |
|                                                                       |
| \"webhook_url\": \"https://postman-echo.com/post\",                   |
|                                                                       |
| \"webhook_mode\": 3 // Enable for all modes                           |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Note :** Ensure to specify webhook_mode to invoke webhooks for all
modes.

**Authentication**

The request header \"x-secret-key\" with the Secret Key as its value
will be included in the request. The client will provide this Secret
Key, and it is optional.

**Receiving Success Payload:**

+-----------------------------------------------------------------------+
| {                                                                    |
|                                                                       |
| \"session_id\":\"abcd\",                                              |
|                                                                       |
| \"event_name\": \"ENRICHMENT_NOTIFICATION\"                           |
|                                                                       |
| \"accounts\":\[                                                       |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"bank_name\": \"sbi\",                                               |
|                                                                       |
| \"account_id\" :\"account_uuid4\",                                    |
|                                                                       |
| \"account_status\" :\"completed\",                                    |
|                                                                       |
| \"error_code\" : null,                                                |
|                                                                       |
| \"error_message\": null                                               |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+



**Receiving Fail Payload:**

+-----------------------------------------------------------------------+
| {                                                                    |
|                                                                       |
| \"session_id\":\"abcd\",                                              |
|                                                                       |
| \"event_name\": \"ENRICHMENT_NOTIFICATION\"                           |
|                                                                       |
| \"accounts\":\[                                                       |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"bank_name\": \"sbi\",                                               |
|                                                                       |
| \"account_id\" :\"account_uuid4\",                                    |
|                                                                       |
| \"account_status\" :\"failed\",                                       |
|                                                                       |
| \"error_code\" : \"MISSING_TRANSACTIONS\",                            |
|                                                                       |
| \"error_message\": \"One or more transactions are missing in the      |
| specified date range\"                                                |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+



**Account Status:**

The account_status field indicates the status of the overall account
extraction and processing. It can be either \"completed\" or \"failed.\"
In case of successful completion, the message will be null.

For failed cases, the following error codes and messages are applicable:

  -------------------------- --------------------------------------------------
  **Code**                   **Message**

  MISSING_TRANSACTIONS       One or more transactions are missing in the
                             specified date range

  INCOMPLETE_MONTHS          Insufficient data to generate report. There are no
                             transactions for Nov 2023, Dec 2023

  NULL_ACCOUNT_NUMBER        Account number is unavailable or unidentified

  BALANCE_MISMATCH           Calculated transaction balance does not match

  INCOMPLETE_MONTHS_UPLOAD   Statement(s) uploaded contain incomplete months.
                             Missing data present for Nov 2023, Dec 2023

  INCOMPLETE_DATES_UPLOAD    Statement(s) uploaded contain incomplete dates.
                             Missing dates present for {\\\"Jan 2024\\\": \[1,
                             2, 3, 4\]}
  -------------------------- --------------------------------------------------



**\
**

### 2. Polling:

Use Polling as a backup if the webhook endpoint is down or a webhook
call fails.

Continuously poll the Progress API every 2 seconds until
**session_progress** indicate \"completed\" for the session. Polling
requires the session_id.

Once session_progress is \"completed,\" proceed to step B and fetch data
using REST API.

**Note:** To review the status at the statement level, refer to all the
statuses within the progress block corresponding to the respective
statement_id.

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/progress/

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in
following format:

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"session_id\": \"bfb98ac5-7224-401b-a643-175235856187\",             |
|                                                                       |
| \"session_progress\":\"completed/processing\"                         |
|                                                                       |
| \"progress\": \[                                                      |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"identity_status\": \"completed\",                                   |
|                                                                       |
| \"transaction_status\": \"completed\",                                |
|                                                                       |
| \"processing_status\": \"completed\",                                 |
|                                                                       |
| \"fraud_status\": \"completed\",                                      |
|                                                                       |
| \"statement_id\": \"4164bc05-7b3f-4a5c-8e31-ca3c2648ec6b\",           |
|                                                                       |
| \"message\": null,                                                    |
|                                                                       |
| \"source\": \"pdf\"                                                   |
|                                                                       |
| },                                                                    |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"identity_status\": \"completed\",                                   |
|                                                                       |
| \"transaction_status\": \"completed\",                                |
|                                                                       |
| \"processing_status\": \"completed\",                                 |
|                                                                       |
| \"fraud_status\": \"completed\",                                      |
|                                                                       |
| \"statement_id\": \"bd90d1c9-7b1a-4300-9987-3c6c20bbe71d\",           |
|                                                                       |
| \"message\": null,                                                    |
|                                                                       |
| \"source\": \"pdf\"                                                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API. 

  -------------------------- ---------------------------------- -------------
  **Code**                   **Message**                        **HTTP status
                                                                code**

  SESSION_NOT_FOUND          The provided session ID is invalid 404

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing   400
                             has not been requested yet         

  SESSION_DELETED            The provided session ID has been   410
                             deleted                            

  ACCESS_DENIED              Authentication credentials were    403
                             not provided                       
  -------------------------- ---------------------------------- -------------


**\
**

## BankConnect: Fetching Data

BankConnect REST APIs can be used to fetch extracted and enriched data
for a session.

Postman collection and environment for BankConnect REST APIs can be
accessed here:

[[Postman Collection BankConnect Session
Flow]{.underline}](https://drive.google.com/drive/folders/1Ld0vdlblUvbL_S_B6OBhOPTILDc9AAXU?usp=drive_link)

Please replace x-api-key and server-hash in the Postman environment with
the API Key and Server Hash provided by FinBox Team.

## Get Session Status

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/session_status/

**Success Response**

On successful API call, it gives a 200 HTTP code with a response in
following format:

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"session_id\": \"abcd\",                                             |
|                                                                       |
| \"accounts\": \[                                                      |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"bank_name\": \"sbi\",                                               |
|                                                                       |
| \"account_number\": \"\",                                             |
|                                                                       |
| \"account_id\": \"account_uuid4\",                                    |
|                                                                       |
| \"account_status\": \"completed\",                                    |
|                                                                       |
| \"error_code\": null,                                                 |
|                                                                       |
| \"error_message\": null,                                              |
|                                                                       |
| "created_at": "",\                                                    |
| "last_updated_at": "",                                                |
|                                                                       |
| \"statements\": \[                                                    |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"statement_id\": \"\",                                               |
|                                                                       |
| \"statement_status\": \"\",                                           |
|                                                                       |
| \"error_code\": \"\",                                                 |
|                                                                       |
| \"error_message\": \"\",                                              |
|                                                                       |
| \"source\": \"\",                                                     |
|                                                                       |
| \"created_at\": \"\"                                                  |
|                                                                       |
| },                                                                    |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"statement_id\": \"\",                                               |
|                                                                       |
| \"statement_status\": \"\",                                           |
|                                                                       |
| \"error_code\": \"\",                                                 |
|                                                                       |
| \"error_message\": \"\",                                              |
|                                                                       |
| \"source\": \"\",                                                     |
|                                                                       |
| \"created_at\": \"\"                                                  |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Account Status:**

The account_status field indicates the status of the overall account
extraction and processing. It can be either \"completed\" or \"failed.\"
In case of successful completion, the message will be null.

For failed cases, the following error codes and messages are applicable:

  -------------------------- ------------------------------------------------
  **Code**                   **Message**

  MISSING_TRANSACTIONS       One or more transactions are missing in the
                             specified date range

  INCOMPLETE_MONTHS          Insufficient data to generate report. There are
                             no transactions for Nov 2023, Dec 2023

  NULL_ACCOUNT_NUMBER        Account number is unavailable or unidentified

  BALANCE_MISMATCH           Calculated transaction balance does not match

  INCOMPLETE_MONTHS_UPLOAD   Statement(s) uploaded contain incomplete months.
                             Missing data present for Nov 2023, Dec 2023

  INCOMPLETE_DATES_UPLOAD    Statement(s) uploaded contain incomplete dates.
                             Missing dates present for {}
  -------------------------- ------------------------------------------------

**Statement Status:**

  ------------------------------ -------------------------------------------
  **Code**                       **Message**

  PASSWORD_INCORRECT             The provided password is incorrect

  BANK_NAME_MISMATCH             The bank name in the statement doesn\'t
                                 match the selected bank

  STATEMENT_UNSUPPORTED_FORMAT   The statement format is not supported

  STATEMENT_DUPLICATE            A duplicate statement has been detected

  NULL_ACCOUNT_NUMBER            Account number is unavailable or
                                 unidentified

  STATEMENT_TOO_MANY_PAGES       The statement exceeds the allowed page
                                 limit

  NO_TRANSACTIONS_FROM_AA        Not able to fetch transactions from Account
                                 Aggregator
  ------------------------------ -------------------------------------------

The statement_status field indicates the status of the overall statement
extraction and processing. It can be either \"completed\" or \"failed.\"
In case of successful completion, the message will be null.

For failed cases, the following error codes and messages are applicable:

  --------------------------- -------------------------------------------
  PDF_IS_IMAGE                Scanned images are not supported

  EXTRACTION_FAILED           Failed to extract information from the
                              statement

  OUT_OF_DATE_RANGE           The statement uploaded is beyond the
                              specified date range

  STATEMENT_NO_TRANSACTIONS   No transactions were identified in the
                              uploaded statement

  BANK_NAME_UNDETECTED        Bank name could not be identified
  --------------------------- -------------------------------------------

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API. 

  -------------------------- ---------------------------------- -------------
  **Code**                   **Message**                        **HTTP status
                                                                code**

  SESSION_NOT_FOUND          The provided session ID is invalid 404

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing   400
                             has not been requested yet         

  SESSION_DELETED            The provided session ID has been   410
                             deleted                            

  ACCESS_DENIED              Authentication credentials were    403
                             not provided                       

  PROCESSING_NOT_COMPLETED   The processing for this session is 400
                             currently in progress              
  -------------------------- ---------------------------------- -------------

## Detailed Excel Report API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/xlsx_report/

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in
following format:

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"session_id\": \"67adce35-960f-40cb-84ab-b6805998f614\",             |
|                                                                       |
| \"reports\": \[                                                       |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"link\": \"s3 link\",                                                |
|                                                                       |
| \"account_id\": \"07df9b6b-535f-4928-b6b8-8f39fcf79ec9\"              |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API: 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------

## Identity API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/identity/

**Success Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"session_id\": \"b03af350-d17a-4b3d-802a-b581356b818c\",             |
|                                                                       |
| \"accounts\": \[                                                      |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"account_category\": \"individual\",                                 |
|                                                                       |
| \"account_id\": \"246ab76a-9081-4882-9a8c-11d76fbd2b9d\",             |
|                                                                       |
| \"account_number\": \"XXXXXXXXXXXX56103\",                            |
|                                                                       |
| \"account_opening_date\": null,                                       |
|                                                                       |
| \"bank\": \"sbi\",                                                    |
|                                                                       |
| \"credit_limit\": 0,                                                  |
|                                                                       |
| \"ifsc\": \"SBIN0013507\",                                            |
|                                                                       |
| \"micr\": \"110002341\",                                              |
|                                                                       |
| \"missing_data\": \[                                                  |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"from_date\": \"2023-10-12\",                                        |
|                                                                       |
| \"to_date\": \"2023-11-27\"                                           |
|                                                                       |
| } \],                                                                 |
|                                                                       |
| \"od_limit\": 0,                                                      |
|                                                                       |
| \"statements\": \[                                                    |
|                                                                       |
| \"9d75da22-bfe0-43b5-9018-535bc6b203f6\"                              |
|                                                                       |
| \],                                                                   |
|                                                                       |
| \"months\": \[                                                        |
|                                                                       |
| \"2023-07\",                                                          |
|                                                                       |
| \"2023-08\",                                                          |
|                                                                       |
| \"2023-09\",                                                          |
|                                                                       |
| \"2023-10\"                                                           |
|                                                                       |
| \],                                                                   |
|                                                                       |
| \"country_code\": \"IN\",                                             |
|                                                                       |
| \"currency_code\": \"INR\",                                           |
|                                                                       |
| \"last_updated\": \"2024-01-05T15:45:14.657268Z\"                     |
|                                                                       |
| } \],                                                                 |
|                                                                       |
| \"identity\": \[                                                      |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"account_number\": \"XXXXXXXXXXXX56103\",\                           |
| \"address\": \"S/O BABU RAM MOHALLA TEH BALLABGARH DT                 |
|                                                                       |
| FARIDABAD-121004 Faridabad\",                                         |
|                                                                       |
| \"account_category\": \"individual\",                                 |
|                                                                       |
| \"account_id\": \"246ab76a-9081-4882-9a8c-11d76fbd2b9d\",             |
|                                                                       |
| \"raw_account_category\": \"SBCHQ\",                                  |
|                                                                       |
| \"name\": \"MR. MEHAR CHAND\",                                        |
|                                                                       |
| \"micr\": \"110002341\",                                              |
|                                                                       |
| \"credit_limit\": 0,                                                  |
|                                                                       |
| \"bank_name\": \"sbi\",                                               |
|                                                                       |
| \"ifsc\": \"SBIN0013507\",                                            |
|                                                                       |
| \"metadata_analysis\": {                                              |
|                                                                       |
| \"name_matches\": \[\]                                                |
|                                                                       |
| }                                                                     |
|                                                                       |
| } \]                                                                  |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------


## Transactions API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/transactions/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [Transactions                                                         |
| A                                                                     |
| PI.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/EYEy9wmnbZFJte7l8cc4SqwBPzOajWVOHHHWKkWWdYpv_A?e=CYIBZq) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------



## Predictors API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/
predictors/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [Predictors                                                           |
| A                                                                     |
| PI.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/EdyyKL6jGzJPvlfp3hj53DUBgQoCt4eFtelXSkDiUZl-RQ?e=i5ABUY) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

The following table lists API error codes applicable to this API

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------



## EOD Balances API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/
eod_balances/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [EOD                                                                  |
| balanc                                                                |
| es.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/EePrh3F1bSdMrAuLDhQkvXMBinPQhQwoJZ9B8aMmbuj0wg?e=oKIBYQ) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------


## Monthly Analysis API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/monthly_analysis_updated/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [Monthly                                                              |
| Analys                                                                |
| is.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/EWN0SiUqAHVBuJpNulCWGz0BETafdZj09kUH95bjEkhaXQ?e=l1tOFn) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------



## Recurring Transactions API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/
recurring_transactions/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [Recurring                                                            |
| Transactio                                                            |
| ns.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/ERYvoFaMeDpHhqUKVwhiAXwBH-yX0JWexmIxq7GxVB2rLQ?e=f35wYV) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------

## EOD Balances API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/
eod_balances/

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [EOD                                                                  |
| balanc                                                                |
| es.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/EePrh3F1bSdMrAuLDhQkvXMBinPQhQwoJZ9B8aMmbuj0wg?e=oKIBYQ) |
+-----------------------------------------------------------------------+

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API: 

  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------



## Catalogue API

**Endpoint**

GET https://apis.bankconnect.finbox.in/bank-connect/v1/ banks/catalogue

**Success Response**

+-----------------------------------------------------------------------+
| Please navigate to the link below to find the response for the above  |
| API.                                                                  |
|                                                                       |
| [Bank                                                                 |
| Catalog                                                               |
| ue.txt](https://infinbox-my.sharepoint.com/:t:/g/personal/nayan_parut |
| hi_finbox_in/ESOCfRVa7vZItraEUlDJmUoBlgKxlfz-Ev9uSSmg23ALVw?e=LlKY7x) |
+-----------------------------------------------------------------------+

## Get PDFs API

**Endpoint**

GET
https://apis.bankconnect.finbox.in/bank-connect/v1/session_data/{{session_id}}/get_pdfs/

**Success Response**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"statements\": \[                                                    |
|                                                                       |
| {                                                                     |
|                                                                       |
| \"statement_id\": \"9d75da22-bfe0-43b5-9018-535bc6b203f6\",           |
|                                                                       |
| \"bank_name\": \"sbi\",                                               |
|                                                                       |
| \"pdf_password\": \"\",                                               |
|                                                                       |
| \"pdf_url\": \"s3_link\",                                             |
|                                                                       |
| \"account_id\": \"246ab76a-9081-4882-9a8c-11d76fbd2b9d\",             |
|                                                                       |
| \"source\": \"PDF\",                                                  |
|                                                                       |
| \"message\": \"Success\"                                              |
|                                                                       |
| }                                                                     |
|                                                                       |
| \]                                                                    |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of Possible Message**

## The following table lists possible message applicable to this API 

  -----------------------------------------------------------------------
  **Message**

  Success

  Password Incorrect

  Is Image

  Author Fraud

  Date Fraud

  Not a Statement

  Keyword Not Present

  New Template

  No Transactions from Account Aggregator
  -----------------------------------------------------------------------

**Error Response:**

+-----------------------------------------------------------------------+
| {                                                                     |
|                                                                       |
| \"error\": {                                                          |
|                                                                       |
| \"code\": \"SESSION_NOT_FOUND\",                                      |
|                                                                       |
| \"message\": \"The provided Session ID is invalid\"                   |
|                                                                       |
| }                                                                     |
|                                                                       |
| }                                                                     |
+-----------------------------------------------------------------------+

**List of API Error Codes**

## The following table lists API error codes applicable to this API 
  -------------------------- --------------------------------- -------------
  **Code**                   **Message**                       **HTTP status
                                                               code**

  SESSION_NOT_FOUND          The provided Session ID is        404
                             invalid                           

  PROCESSING_NOT_REQUESTED   Cannot proceed as the processing  400
                             has not been requested yet        

  SESSION_DELETED            The provided Session ID has been  410
                             deleted                           

  PROCESSING_NOT_COMPLETED   The processing for this session   400
                             is currently in progress          

  ACCESS_DENIED              Authentication credentials were   403
                             not provided                      
  -------------------------- --------------------------------- -------------


## Possible Scenarios

**Scenario 1: Single account Flow**

Once a session is initiated for a user, they upload a statement for a
specified time period through any of the provided modes, completing the
journey. In this scenario, there is no necessity for multiple statements
from the user. The journey concludes at this point, and the session_id
is now ready for retrieving enriched data.

**Scenario 2: Multibanking Flow**

Upon initiating a session for a user, they upload statements for a
specified time period or multiple statements for a given account over a
period, using any of the provided modes, thus completing the journey. In
scenarios where additional statements are needed from the user, either
for a different bank or using the same mode, the existing session must
be invoked again by utilizing the previously received session_id. After
all uploads are finalized, the session_id can then be employed to
retrieve enriched data.

**Scenario 3: User Revisits**

A user concluded a journey using a specific session_id about a month
ago. Upon returning after 3 months, a new session should be initiated
for this subsequent interaction.

**Scenario 4: User Drops Off**

A session is started, and users partially upload statements for a
specified time period, exiting the journey without completion. If the
user returns to upload statements for the remaining duration, the same
session_id can be utilized if the session is still within its defined
TTL (Time To Live) of x days. However, if the session has expired, the
user needs to upload from the beginning. It\'s crucial to note that
there is no cross-linking between sessions, even if they are associated
with the same linkID.

After successfully concluding a journey for a specific session, and
considering the TTL has elapsed, there is a need for additional
statements from the user. This requirement arises to display a booster
offer by obtaining statements from the user for other banks.
