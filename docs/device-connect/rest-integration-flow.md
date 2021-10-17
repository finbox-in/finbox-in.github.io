# DeviceConnect: Integration Flow

Once FinBox DeviceConnect SDK is initialized, data from the device is sent to the FinBox processing engine against an anonymous `CUSTOMER_ID` which will be the primary key from retrieving any information from the server.

Clients need to call the **Insights API** with `CUSTOMER_ID` to trigger the predictor calculation for a given customer. In case Insights API returns with status `"in_progress"` (meaning data is currently being processed), the client should poll the Insights API with a delay of at least **10 seconds**

An overview of the API calling is shown below

<img src="/device_connect_back_end_integration.jpg" alt="Device Connect Backed Integration Workflow" />

1. Call FinBox Insights API
2. In case the response status is `"in_progress"`, wait for the callback to receive [Insights API Response](/device-connect/rest-api.html#insights-api-response).
3. In case the response status is `"complete"`, consume the [Insights API Response](/device-connect/rest-api.html#insights-api-response) section.
