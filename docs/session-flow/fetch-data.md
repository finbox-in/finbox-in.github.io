## BankConnect: Fetching Data

BankConnect REST APIs can be used to fetch enriched data for a session.


## Get Session Status

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/{{session_id}}/session_status/**

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


## Subscribed Data API

::: tip Endpoint

GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/{{session_id}}/subscribed_data/**

:::

**Success Response:**

On successful API call, it gives a 200 HTTP code with a response in following format:

```json
{
  "session_id": "fdf6fe90-c1a0-41f7-964f-bb2425975309",
  "accounts": {
    "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753": {
      "account_details": [
        {
          "account_category": "corporate",
          "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753",
          "account_number": "3055870344",
          "account_opening_date": null,
          "bank": "central",
          "credit_limit": "0",
          "ifsc": null,
          "micr": null,
          "missing_data": [
            { "from_date": "2024-02-21", "to_date": "2024-04-21" }
          ],
          "od_limit": "0",
          "salary_confidence": null,
          "statements": ["036917f1-06dc-44c1-8f40-509c3a6093aa"],
          "months": ["2023-10", "2023-11", "2023-12", "2024-01", "2024-02"],
          "country_code": "IN",
          "currency_code": "INR"
        }
      ],
      "fraud": {
        "fraudulent_statements": ["036917f1-06dc-44c1-8f40-509c3a6093aa"],
        "fraud_type": [
          {
            "statement_id": "036917f1-06dc-44c1-8f40-509c3a6093aa",
            "fraud_type": "author_fraud",
            "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753",
            "transaction_hash": null,
            "fraud_category": "metadata"
          },
          {
            "statement_id": "036917f1-06dc-44c1-8f40-509c3a6093aa",
            "fraud_type": "inconsistent_transaction",
            "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753",
            "transaction_hash": "f843a9af98147856faef093376f0669e",
            "previous_date": "2023-11-07 00:00:00",
            "current_date": "2023-11-07 00:00:00",
            "fraud_category": "accounting"
          },
          {
            "statement_id": null,
            "fraud_type": "inconsistent_transaction",
            "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753",
            "transaction_hash": "f843a9af98147856faef093376f0669e",
            "previous_date": "2023-11-07 00:00:00",
            "current_date": "2023-11-07 00:00:00",
            "fraud_category": "accounting"
          }
        ]
      },
      "transactions": [
        {
          "transaction_type": "debit",
          "transaction_note": "23/10/23 TO TRF. PC SMS CHARGES GST S TRF TO 60124003651",
          "chq_num": "",
          "amount": 59.0,
          "balance": 10230.49,
          "date": "2023-10-23 00:00:00",
          "transaction_channel": "Other",
          "hash": "2d02c1e7863e2844bf9a6fb6c983e4d3",
          "merchant_category": "",
          "description": "gst",
          "category": "Others",
          "statement_id": null,
          "bank": null,
          "template_id": null,
          "updated_at": null,
          "matched_regex": null,
          "matched_account_type": null,
          "matched_transaction_category": "Other",
          "enriched_transaction_category": null,
          "is_enriched_transaction_category_copied": null,
          "matched_transaction_currency": null,
          "creditor_name": null,
          "creditor_ifsc": null,
          "creditor_upi_handle": null,
          "creditor_bank": null,
          "creditor_account_number": null,
          "receiver_name": null,
          "receiver_ifsc": null,
          "receiver_upi_handle": null,
          "receiver_bank": null,
          "reciever_account_number": null,
          "merchant_name": null,
          "merchant_ifsc": null,
          "merchant_upi_handle": null,
          "merchant_bank": null,
          "matched_merchant_category": null,
          "cheque_number": null,
          "transaction_reference_1": null,
          "transaction_reference_2": null,
          "primary_channel": null,
          "secondary_channel": null,
          "tertiary_channel": null,
          "transaction_timestamp": null,
          "transaction_amount": null,
          "raw_location": null,
          "currency": null,
          "categorization_time_stamp": "2024-04-22",
          "regex_id": null,
          "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753"
        },
        {
          "transaction_type": "credit",
          "transaction_note": "23/10/23 BY TRF. IMPS TRF FROM 51190049822",
          "chq_num": "",
          "amount": 59620.32,
          "balance": 69850.81,
          "date": "2023-10-23 00:00:00",
          "transaction_channel": "Other",
          "hash": "f41e034fb0551724bdb1c2ca218ba136",
          "merchant_category": "",
          "description": "",
          "category": "Others",
          "statement_id": null,
          "bank": null,
          "template_id": null,
          "updated_at": null,
          "matched_regex": null,
          "matched_account_type": null,
          "matched_transaction_category": "Other",
          "enriched_transaction_category": null,
          "is_enriched_transaction_category_copied": null,
          "matched_transaction_currency": null,
          "creditor_name": null,
          "creditor_ifsc": null,
          "creditor_upi_handle": null,
          "creditor_bank": null,
          "creditor_account_number": null,
          "receiver_name": null,
          "receiver_ifsc": null,
          "receiver_upi_handle": null,
          "receiver_bank": null,
          "reciever_account_number": null,
          "merchant_name": null,
          "merchant_ifsc": null,
          "merchant_upi_handle": null,
          "merchant_bank": null,
          "matched_merchant_category": null,
          "cheque_number": null,
          "transaction_reference_1": null,
          "transaction_reference_2": null,
          "primary_channel": null,
          "secondary_channel": null,
          "tertiary_channel": null,
          "transaction_timestamp": null,
          "transaction_amount": null,
          "raw_location": null,
          "currency": null,
          "categorization_time_stamp": "2024-04-22",
          "regex_id": null,
          "account_id": "8cdcf3f2-e4ba-4be8-b0eb-bc619c6cc753"
        }
      ],
      "salary_transactions": [],
      "top_credits_debits": {
        "top_5_debit": {
          "Oct-23": {
            "27/10/23 RTGS AMAN FEED I 081343 CBINR52023102710": 500000.0,
            "25/10/23 CSH(CHQ) 081342 Paid to SELF": 225000.0,
            "27/10/23 CSH(CHQ) 081344 Paid to SELF": 90000.0,
            "31/10/23 NEFT Rahul batra CBINI23304008785 TRF TO 59466026840": 86000.0,
            "25/10/23 CSH(CHQ) 081341 Paid to SELF": 50000.0
          }
        },
        "top_5_credit": {
          "Oct-23": {
            "27/10/23 BY TRF. RTGSRAJA RICE MILLS TRF FROM 59116232661": 400000.0,
            "31/10/23 BY CASH CASHRC Deposit by CA TRF FROM 58090003651": 125000.0,
            "27/10/23 NEFT AGGARWAL AGRO F POD001161362": 111226.0,
            "29/10/23 NEFT AGGARWAL AGRO F POD001293058": 91111.0,
            "27/10/23 NEFT SHIVA AGRO INDU N300232705847561": 79625.0
          }
        }
      },
      "monthly_analysis": {
        "opening_balance": {
          "Oct-2023": 10289.49,
          "Nov-2023": 97862.41,
          "Dec-2023": 208.11,
          "Jan-2024": 323.62,
          "Feb-2024": 122548.98
        },
        "closing_balance": {
          "Oct-2023": 97862.41,
          "Nov-2023": 208.11,
          "Dec-2023": 323.62,
          "Jan-2024": 122548.98,
          "Feb-2024": 898.98
        }
      },
      "predictors": {
        "accountnumber": "3055870344",
        "bank_name": "central",
        "ifsc_code": null,
        "customer_name": "R K ENTERPRISES",
        "account_type": "corporate",
        "ccod_limit": 0.0,
        "month_0": "Feb-24",
        "month_1": "Jan-24",
        "month_2": "Dec-23",
        "month_3": "Nov-23",
        "month_4": "Oct-23",
        "month_5": null,
        "month_6": null,
        "month_7": null,
        "month_8": null,
        "month_9": null,
        "month_10": null,
        "month_11": null,
        "expense_0": 760951.0,
        "expense_1": 1288794.04,
        "expense_2": 10415328.91,
        "expense_3": 4701695.02,
        "expense_4": 1080581.91,
        "expense_5": null,
        "expense_6": null,
        "expense_7": null,
        "expense_8": null,
        "expense_9": null,
        "expense_10": null,
        "expense_11": null,
        "total_inward_chq_bounces_insuff_fund_0": 0
      },
      "eod_balances": {
        "Months_order": ["Oct-23", "Nov-23", "Dec-23", "Jan-24", "Feb-24"],
        "start_date": [
          "23-Oct-23",
          "01-Nov-23",
          "01-Dec-23",
          "02-Jan-24",
          "01-Feb-24"
        ],
        "Nov-23": [
          320772.41, 107510.5, 3401.59, 53401.59, 53401.59, 901.59, -399480.41,
          -404078.41, -404078.41, -394202.41, -394202.41, -404202.41,
          -404202.41, -404202.41, -404202.41, -400481.69, -400481.69,
          -400481.69, -400481.69, -400481.69, -230481.69, -400481.69,
          -400481.69, -401028.89, -401087.89, -404187.89, -404187.89,
          -404187.89, -404187.89, -404187.89
        ]
      }
    },
    "aee2d55d-2a2b-41d7-9ae8-9ab37eaf6cb7": {
      "account_details": [
        {
          "account_category": "individual",
          "account_id": "aee2d55d-2a2b-41d7-9ae8-9ab37eaf6cb7",
          "account_number": "50100199733559",
          "account_opening_date": null,
          "bank": "hdfc",
          "credit_limit": "0",
          "ifsc": "HDFC0009015",
          "micr": "500240101",
          "missing_data": [
            { "from_date": "2024-04-01", "to_date": "2024-04-21" }
          ],
          "od_limit": "0",
          "salary_confidence": null,
          "statements": ["8f22ab11-73e9-47d0-81e8-10af18933a35"],
          "months": [
            "2023-10",
            "2023-11",
            "2023-12",
            "2024-01",
            "2024-02",
            "2024-03",
            "2024-04"
          ],
          "country_code": "IN",
          "currency_code": "INR"
        }
      ],
      "fraud": { "fraudulent_statements": [], "fraud_type": [] },
      "transactions": [
        {
          "transaction_type": "credit",
          "transaction_note": "UPI-LEELA SANKAR PRASAD -9160751095@YBL- ICIC0000598-329849477602-PAYMENT FROM PH ONE",
          "chq_num": "0000329849477602",
          "amount": 1000.0,
          "balance": 1006.86,
          "date": "2023-10-25 00:00:00",
          "transaction_channel": "Other",
          "hash": "939a1aedec6126cb8b410025c8c8fc57",
          "merchant_category": "",
          "description": "Transfer from LEELA SANKAR PRASAD ",
          "category": "Transfer from LEELA SANKAR PRASAD",
          "statement_id": null,
          "bank": null,
          "template_id": null,
          "updated_at": null,
          "matched_regex": null,
          "matched_account_type": null,
          "matched_transaction_category": "Other",
          "enriched_transaction_category": null,
          "is_enriched_transaction_category_copied": null,
          "matched_transaction_currency": null,
          "creditor_name": null,
          "creditor_ifsc": null,
          "creditor_upi_handle": null,
          "creditor_bank": null,
          "creditor_account_number": null,
          "receiver_name": null,
          "receiver_ifsc": null,
          "receiver_upi_handle": null,
          "receiver_bank": null,
          "reciever_account_number": null,
          "merchant_name": null,
          "merchant_ifsc": null,
          "merchant_upi_handle": null,
          "merchant_bank": null,
          "matched_merchant_category": null,
          "cheque_number": null,
          "transaction_reference_1": null,
          "transaction_reference_2": null,
          "primary_channel": null,
          "secondary_channel": null,
          "tertiary_channel": null,
          "transaction_timestamp": null,
          "transaction_amount": null,
          "raw_location": null,
          "currency": null,
          "categorization_time_stamp": "2024-04-22",
          "regex_id": null,
          "account_id": "aee2d55d-2a2b-41d7-9ae8-9ab37eaf6cb7"
        }
      ],
      "salary_transactions": [],
      "top_credits_debits": {
        "top_5_debit": {
          "Oct-23": {
            "FD THROUGH DIGITALFD-50300876789747:LEEL A SANKAR PRASAD ASURU": 50000.0,
            "POS 541919XXXXXX1986 BHARATHI FUELS": 440.0,
            "UPI-SHAIK SHANAWAZ UDDIN-9392683327@YBL- SBIN0020061-329956416276-FOR RAPIDO": 200.0,
            "UPI-RAPIDO-PAYTM-76881028@PAYTM-PYTM0123 456-329930769282-FOR RAPIDO": 81.0,
            "UPI-SURAPANENI LEELA ANA-PAYTMQRU3TDDTBO TC@PAYTM-PYTM0123456-330398666307-CURRIE S": 80.0
          }
        },
        "top_5_credit": {
          "Oct-23": {
            "UPI-LEELA SANKAR PRASAD -9160751095@YBL- ICIC0000598-330003290557-PAYMENT FROM PH ONE": 50000.0,
            "UPI-LEELA SANKAR PRASAD -9160751095@YBL- ICIC0000598-329849477602-PAYMENT FROM PH ONE": 1000.0
          }
        }
      },
      "monthly_analysis": {
        "opening_balance": {
          "Oct-2023": 6.86,
          "Nov-2023": 10.86,
          "Dec-2023": 52134.54,
          "Jan-2024": 355.24,
          "Feb-2024": 1573.24,
          "Mar-2024": 508.16,
          "Apr-2024": 2.81
        }
      },
      "predictors": {
        "accountnumber": "50100199733559",
        "bank_name": "hdfc",
        "ifsc_code": "HDFC0009015",
        "customer_name": "MR. LEELA SANKAR PRASAD ASURU",
        "account_type": "individual",
        "ccod_limit": 0.0,
        "month_0": "Apr-24",
        "month_1": "Mar-24",
        "month_2": "Feb-24"
      },
      "eod_balances": {
        "Months_order": [
          "Oct-23",
          "Nov-23",
          "Dec-23",
          "Jan-24",
          "Feb-24",
          "Mar-24",
          "Apr-24"
        ],
        "start_date": [
          "25-Oct-23",
          "01-Nov-23",
          "02-Dec-23",
          "01-Jan-24",
          "02-Feb-24",
          "01-Mar-24",
          "01-Apr-24"
        ],
        "Nov-23": [
          0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 0.86, 13166.86, 6736.86, 6736.86,
          5781.86, 5366.86, 4575.18, 1355.18, 1355.18, 1355.18, 1245.18,
          1245.18, 761.18, 761.18, 761.18, 761.18, 761.18, 746.18, 512.18,
          283.84, 54828.84, 54828.84, 54328.84, 52134.54
        ]
      }
    }
  }
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
  

