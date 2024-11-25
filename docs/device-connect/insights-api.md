# DeviceConnect: Insights API

The FinBox DeviceConnect REST API enables **server-to-server** retrieval of anonymized device data for customers across supported platforms. Data can be fetched using the unique `CUSTOMER_ID` associated with each customer. The API accepts JSON-encoded request bodies and returns JSON-encoded responses, ensuring secure and efficient integration.


::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `SERVER_API_KEY`
- `SERVER_HASH`
- `DC_PREDICTORS_VERSION`
:::

## Authentication

FinBox ensures secure communication by providing a valid, signed certificate for all API methods and endpoints. To access these APIs, the requesting client must use a connection library that supports HTTPS.

API authentication is managed using the **SERVER_API_KEY** provided by FinBox. Server-to-server communication is permitted only after the requester's **IP addresses are whitelisted** on FinBox servers. Whitelisting can be set up easily upon request

## Endpoints

| Insights | Endpoint | Request Type | IP Whitelisting |
| - | - | -| - |
| Production | **https://insights.finbox.in/v2/risk/predictors** | POST | Yes |
| Development | **https://insights.finbox.in/staging/risk/predictors** | POST |  No |

## Request

### Request Header and Body

For all the Insights API request structure is the same, all requests must have `x-api-key` field in **header** having the value as the `SERVER_API_KEY` shared by FinBox team. The following **keys** must be passed in every request body as keys to a JSON document:

**Request Body**
| Key | Type | Description |
| --- | --- | --- |
| customer_id | String | `CUSTOMER_ID` for which feature vector is required |
| version | Integer | Version of the feature set shared by FinBox team as `DC_PREDICTORS_VERSION` |
| salt | String | A salt which is computed basis logic mentioned in the [Salt Generation](/device-connect/salt-generation.html) section |

:::danger IMPORTANT
The `CUSTOMER_ID` used here must match the identifier passed during SDK initialization. This ensures the predictors are calculated for the correct customer.
:::

### Sample Request

**Headers**

```yaml
Content-Type: application/json
x-api-key: XXXX-XXXX-XXXX
```

**Request Body**

```json
{
    "customer_id": "1234ABCD4567",
    "version": 1,
    "salt": "5vVMNofMy5kQXx647sBdYBoMolMb1GGBSYLkzwaa9v8="
}
```

## Response

API will give a JSON Response with the following keys:

### Response Keys

| Key | Description | Type | Nullable |
| --- | --- | --- | --- |
| customer_id | CUSTOMER_ID for which data was requested | STRING [260] | Yes |
| request_id | A unique string for each request | STRING [32] | Yes |
| status | Status of the operation. | STRING [20] | No |
| message | Description of status | STRING [200] | No |
| date_requested | Timestamp of processing request | STRING with `YYYY-MM-DDThh:mm:ss:mil` format | Yes |
| date_processed | Timestamp of processing completion | STRING with `YYYY-MM-DDThh:mm:ss:mil` format | Yes |
| data | An array of objects, each object representing the predictors, having keys `name` indicating the predictor name and `value` indicating the values | JSON | Yes |

::: danger data key
The list of predictors in the `data` key will be different based on the result API endpoint, feature set version and requester. This **list will hence be shared separately** by the FinBox team during the integration.
:::

::: warning NOTE
Some of the keys in response may be missing based on the availability of data and HTTP Status code. Please refer to examples for each of the cases listed [here](/device-connect/insights-api.html#status-values).
:::

### `status` values

Depending on the availability of data, there can be different cases with different `status` values as follows:

| Case | `status` value | HTTP Status Code | Description / Action |
| - | - | - | - |
| [Calculation in progress](/device-connect/insights-api.html#case-1-calculation-in-progress) | `"in_progress"` | 202 | The request input is correct and data processing started |
| [Calculation complete and data is available](/device-connect/insights-api.html#case-2-calculation-complete-and-data-is-available) | `"complete"` | 200 | The request input is correct and processing has completed. Response contains the predictors |
| [Calculation complete and data is unavailable](/device-connect/insights-api.html#case-3-calculation-complete-and-data-is-unavailable) | `"no_data"` | 200 | The request input is correct and processing has completed but response contains no predictors because of lack of data from user's device |
| [Invalid customer ID](/device-connect/insights-api.html#case-4-invalid-customer-id) | `"not_found"` | 200 | User does not exist in FinBox system |
| [Bad request](/device-connect/insights-api.html#case-5-bad-request) | `"error"` | 400 | The request input is incorrect / malformed. More details available in `message` key |
| [Unauthorized](/device-connect/insights-api.html#case-6-unauthorized) | `"error"` | 403 | This happens in case SERVER_API_KEY is incorrect or IP address in not whitelisted |
| [Internal Server Error](/device-connect/insights-api.html#case-6-unauthorized) | `"error"` | 5xx | The request processing failed because of some internal error. In this case, please retry twice with an exponential backoff i.e. retry after 2 seconds, then retry after 5 seconds. If the issue persists, please contact support |
| [Rate Limit Exceeded](/device-connect/insights-api.html#case-8-rate-limit-exceeded) | `"error"` | 429 | This happens in case the maximum allowed rate limit on API exceeds. In this case, please retry twice with an exponential backoff i.e. retry after 2 seconds, then retry after 5 seconds. Contact FinBox to know your rate limits.|

::: danger IMPORTANT
In case your are running a daily CRON that fetches data using insights API, ensure you are not breaching the rate limit. Please contact FinBox to know your rate limits.
:::

### Case 1 - Calculation in Progress

HTTP Status Code: **202**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-xcds1",
    "date_requested": "2019-01-03T06:37:44:003",
    "status": "in_progress",
    "message": "Featurization in Progress, please try again in 10 Seconds"
}
```

### Case 2 - Calculation complete and data is available

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-jjj1",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed": "2018-12-12T01:01:57:221",
    "status": "complete",
    "message": "data processed successfully",
    "data": [] // will hold the predictor objects
}
```

### Case 3 - Calculation complete and data is unavailable

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482169F9F",
    "request_id": "abcd-def-dfdf-000l",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed": "2018-12-12T01:01:57:221",
    "status": "no_data",
    "message": "No data available for user",
    "data": null
}
```

### Case 4 - Invalid Customer ID

HTTP Status Code: **200**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482160F9F",
    "request_id": "abcd-def-dfdf-ddd1",
    "date_requested": "2019-01-03T06:37:44:003",
    "date_processed":null,
    "status": "not_found",
    "message": "User not found",
    "data": null
}
```

### Case 5 - Bad Request

HTTP Status Code: **400**

Sample Response Body:

```json
{
    "customer_id": "A145BC6312B50CA2B58233288F81C02114A6A74E9A62482160F9F",
    "request_id": "abcd-def-dfdf-ddd1",
    "date_requested": "2019-01-03T06:37:44:003",
    "status": "error",
    "message":"Missing Key version"
}
```

### Case 6 - Unauthorized

HTTP Status Code: **403**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Incorrect API Key"
}
```

### Case 7 - Internal Server Error

HTTP Status Code: **5xx**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Internal Server Error. Please retry. If issue persists, please contact support"
}
```

### Case 8 - Rate Limit Exceeded

HTTP Status Code: **429**

Sample Response Body:

```json
{
    "status": "error",
    "message": "Rate limit exceeded"
}
```

<!-- ## Webhook Integration

FinBox fires a webhook when a user's results are updated. The response received in the callback is same as the [Insights API Response](#response).

:::warning IMPORTANT
You have to register your webhook address with FinBox. Please get in touch with us for the same.
::: -->
