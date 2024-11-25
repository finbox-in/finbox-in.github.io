# DeviceConnect: Backend Integration Flow

Once the FinBox DeviceConnect SDK is initialized, data collected from the device is sent to the FinBox processing engine, mapped to an anonymous `CUSTOMER_ID`. The `CUSTOMER_ID` acts as the primary key for retrieving processed insights and predictors.

The **Insights API** allows clients to:
1. Trigger predictor calculations for a specific customer.
2. Retrieve real-time insights once the processing is complete.

An overview of the API calling is shown below

<img src="/device_connect_back_end_integration.jpg" alt="Device Connect Backed Integration Workflow" />

### **Integration Workflow**

### Step 1: Trigger Insights Processing

Call the Insights API with the `CUSTOMER_ID` to start predictor calculations for a specific customer. The API will return a status:

 **`"in_progress"`**: The data is still being processed.

### Step 2: Poll the Insights API

If the status is `"in_progress"`, poll the Insights API at intervals of at least **10 seconds**. Continue polling for a maximum duration of **120 seconds**.

### Step 3: Retrieve the results

Once processing is complete, the API will return a status:
- **`"complete"`**: Insights and predictors are now available in the response. [Insights API Response](/device-connect/insights-api.html#response)


::: danger IMPORTANT
- The `CUSTOMER_ID` used here must be the same as the one provided during SDK initialization when calling the `createUser` method. This ensures that the predictors are calculated for the correct user, as the CUSTOMER_ID serves as the primary key for linking data in both FinBox's system and your database.
:::

<!-- ::: tip
The response status will be `"complete"` instead of `"in_progress"` if the results are already computed and returned through callback in the last 15 mins.
::: -->

<!-- Incase we have the `request_id` and we can fetch the [Pre-Computed results](insights-api.html#pre-computed-results). -->
