# DeviceConnect: Frontend Integration Flow

The frontend integration process consists of three key steps.

<img src="/device_connect_android_integration.jpg" alt="Device Connect Android Integration Workflow" style="width:80%;height:80%" />

### Step 1: Requesting Runtime Permissions

Implement a Consent Screen to show the permissions being requested and explain their benefits to the user.

Refer to the [Handle Permissions](/device-connect/permissions.html#runtime-permissions-added-by-the-sdk) section for the complete list of permissions required by the SDK. To exclude unnecessary permissions, use the node marker value `remove` mentioned in the same section.

### Step 2: Creating the User

After obtaining runtime permissions, you can call the `createUser` method with a specified `CUSTOMER_ID`  which serves as a unique identifier for the user.  

The `createUser` method not only creates a user in the FinBox system but also serves as a validation check for your API credentials. This ensures that the credentials provided during integration are authorized and correct, allowing subsequent steps, such as data syncing, to proceed securely.

For sample code and response details, Refer to section [Create User](/device-connect/android.html#create-user)

::: tip TIP

- Avoid using unique personal identifiers like phone numbers or email addresses to ensure user anonymity, when creating the `CUSTOMER_ID`
- Call the `createUser` method even if some permissions are denied by the user. The SDK will automatically sync data based on the granted permissions.
:::

### Step 3: Start Syncing Data

Only after the `createUser`  method returns a successful response, call the `startPeriodicSync` function (Refer [Start Periodic Sync](/device-connect/android.html#start-periodic-sync) section)

This function will sync data at periodic intervals in the background.

::: danger IMPORTANT

- The recommended approach is to call the `createUser` method (and subsequently `startPeriodicSync` on success) each time the user accesses the app. This ensures the background sync process remains active, handles any permission changes seamlessly, and maintains a consistent connection with the FinBox servers
- To ensure seamless communication between the FinBox server and the SDK, it is essential to **forward notifications to the SDK**. This enables the app to handle background process interruptions effectively. Refer [Forward Notifications to SDK
](/device-connect/android.html#forward-notifications-to-sdk) section for it
- In the case of a multi-process application, it is required to initialize the SDK manually before calling the `createUser` method. Refer [Multi-Process Support](/device-connect/android.html#multi-process-support) section for such cases.
:::
