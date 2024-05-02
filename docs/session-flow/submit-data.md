---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---



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


Now once you have created a session, you can decide which flow would you like to integrate from - Frontend/Backend. Head to [Frontend Integration](/session-flow/submit-data-frontend.html) or [Backend Integration](/session-flow/submit-data-backend.html) to start the integration process.