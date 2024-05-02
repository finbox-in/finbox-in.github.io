---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---



## BankConnect: Fetching Data

BankConnect REST APIs can be used to fetch enriched data for a session.


## Get Session Status

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/session_status/**

:::

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

**Success Response**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
  "session_id": "abcd",
  "accounts": [
    {
      "bank_name": "sbi",
      "account_number": null,
      "account_id": "account_uuid4",
      "account_status": "completed",
      "error_code": null,
      "error_message": null,
      "created_at": null,
      "last_updated_at": null,
      "statements": [
        {
          "statement_id": null,
          "statement_status": null,
          "error_code": null,
          "error_message": null,
          "source": null,
          "created_at": null,
        },
        {
          "statement_id": null,
          "statement_status": null,
          "error_code": null,
          "error_message": null,
          "source": null,
          "created_at": null
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

**Authentication**

Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

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
                "credit_limit": 0,
                "ifsc":null,
                "micr":null,
                "missing_data":[
                   {
                      "from_date":"2024-02-21",
                      "to_date":"2024-04-21"
                   }
                ],
                "od_limit": 0,
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
  

