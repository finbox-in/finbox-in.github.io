---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


# BankConnect: Management

BankConnect REST APIs also provide additional APIs for management purposes. This article lists them.

## Get PDFs
This API can be used to fetch statement PDF files for a given entity.

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/session_data/`<session_id>`/get_pdfs/**
:::

### Authentication
Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

### Response
On fetching information successfully, the response would be of the following format with **200 HTTP code**:

```json
{
    "statements": [
        {
            "statement_id": "statement_uuid4_here",
            "bank_name": "axis",
            "pdf_password": null,
            "pdf_url": "https://long_url_here",
            "account_id": "account_uuid4_here",
            "source": "PDF",
            "message": "Success"
        }
    ]
}
```
### Error Response

```json 
{
    "error": {
        "code": "SESSION_NOT_FOUND",
        "message": "The provided Session ID is invalid"
    }
}
```

Here, `statements` key will contain a list of statements for the given entity. Each of this list item is an object with following keys:

- `statement_id`: a unique identifier for this statement
- `bank_name`: a valid bank identifier
- `pdf_password`: Password for the PDF file. Will be `null` if no password.
- `pdf_url`: Contains a URL for the PDF file.
- `account_id`: a unique identifier for a customer bank account
- `source`: Displays the mode of upload.
- `message`: Success/Failure

:::danger IMPORTANT
- Statement files on our system get automatically deleted after 30 days of upload date has passed. Post this, the "pdf_url" key will be a blank string. `""`.
- `pdf_url` if present is valid for 1 hour since the time of link generation
- In case the `session_id` doesn't exists the API will return a **404 HTTP Code**.
:::

## Bank Catalogue API
The Bank Catalogue API provides a comprehensive list of all active banks, including their respective details and the modes available for connection. This API helps you understand which banks support various methods like PDF Upload, Net Banking, and Account Aggregator (AA).

::: tip Endpoint
GET **{{$page.frontmatter.base_url}}/{{$page.frontmatter.version}}/banks/catalogue/**
:::

### Authentication
Request headers `x-api-key` with API Key as value and `server-hash` with Server Hash as value must be present in request.

### Response
On successful fetching, the API gives a **200 HTTP code** with following response:
```json
{
    "count": 492,
    "banks": [
        {
            "name": "SBI",
            "full_name": "State Bank of India",
            "npci_code": "SBIN",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/sbi_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": false
        },
        {
            "name": "HDFC",
            "full_name": "HDFC Bank",
            "npci_code": "HDFC",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/hdfc_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": true
        },
        {
            "name": "ICICI",
            "full_name": "ICICI Bank",
            "npci_code": "ICIC",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/icici_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": true
        },
        {
            "name": "AXIS",
            "full_name": "Axis Bank",
            "npci_code": "UTIB",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/axis_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": true
        },
        {
            "name": "KOTAK",
            "full_name": "Kotak Mahindra Bank",
            "npci_code": "KKBK",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/kotak_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": true
        },
        {
            "name": "INDUSIND",
            "full_name": "IndusInd Bank",
            "npci_code": "INDB",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/indusind_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": true
        },
        {
            "name": "CITI",
            "full_name": "Citibank",
            "npci_code": "CITI",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/citi_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": false,
            "is_aa_available": false
        },
        {
            "name": "ANDHRA",
            "full_name": "Andhra Bank",
            "npci_code": null,
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/andhra_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": false,
            "is_aa_available": false
        },
        {
            "name": "UCO",
            "full_name": "UCO Bank",
            "npci_code": "UCBA",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/uco_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": false,
            "is_aa_available": false
        },
        {
            "name": "CENTRAL",
            "full_name": "Central Bank of India",
            "npci_code": "CBIN",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/central_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": false,
            "is_aa_available": false
        },
        {
            "name": "BARODA",
            "full_name": "Bank of Baroda",
            "npci_code": "BARB",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/baroda_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": true,
            "is_aa_available": false
        },
        {
            "name": "CANARA",
            "full_name": "Canara Bank",
            "npci_code": "CNRB",
            "logo_url": "https://s3.ap-south-1.amazonaws.com/finbox-cdn/bank_logos/canara_light.png",
            "is_pdf_upload_available": true,
            "is_net_banking_available": false,
            "is_aa_available": false
        }
    ]
}
```
