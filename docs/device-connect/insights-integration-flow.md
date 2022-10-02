# DeviceConnect: Integration Flow

Once FinBox DeviceConnect SDK is initialized, data from the device is sent to the FinBox processing engine against an anonymous `CUSTOMER_ID` which will be the primary key from retrieving any information from the server.

Clients need to call the **Insights API** with `CUSTOMER_ID` to trigger the predictor calculation for a given customer. In case Insights API returns with status `"in_progress"` (meaning data is currently being processed), the client should poll the Insights API with a delay of at least **10 seconds**

An overview of the API calling is shown below

<img src="/device_connect_back_end_integration.jpg" alt="Device Connect Backed Integration Workflow" />

1. Call Insights API. We will start processing the results and return response status as `"in_progress"`.
2. Hit the API every 10 seconds for a maximum of 120 seconds.
3. Once the results are computed, we will return the status as `"complete"` with predictors [Insights API Response](/device-connect/insights-api.html#response).

<!-- ::: tip
The response status will be `"complete"` instead of `"in_progress"` if the results are already computed and returned through callback in the last 15 mins.
::: -->

Incase we have the `request_id` and we can fetch the [Pre-Computed results](insights-api.html#pre-computed-results).
