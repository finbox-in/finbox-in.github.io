---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


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

