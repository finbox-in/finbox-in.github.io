# DeviceConnect: Integration Flow

Integration flow in the mobile app should be as follows

<img src="/client_workflow.png" alt="Client Workflow" style="width:80%;height:80%" />

### Step 1: Requesting Runtime Permissions
It is required to show what all permissions you will be needing from users in your app, and then ask them for the permissions. Please refer [Handle Permissions](/device-connect/android.html#handle-permissions) section to get the list of permissions the SDK needs. Also in case you want to exclude certain permissions, you can use node marker value `remove` as mentioned in the same article.

### Step 2: Creating the User
After requesting, the `createUser` method can be called specifying a `CUSTOMER_ID` (Refer to [Create User](/device-connect/android.html#create-user-method) section for sample code and response), which represents a unique identifier for the user.

::: tip TIP
- It is recommended that `CUSTOMER_ID` is a masked value not a unique personal identifier like a phone number or email id so that the user remains anonymous to FinBox.
- SDK will automatically consider syncing based on whether permission was granted by the user or not and what was configured, hence the `createUser` method must be called even though the user denies certain permissions.
:::

`createUser` in general acts as a check for API credentials. For the first time when the user doesn't exists, it will create a user on the FinBox side. The next step will work only if this function returns a success response.

### Step 3: Start Syncing Data
If the `createUser` response is successful, you can call `startPeriodicSync` function (Refer [Start Periodic Sync](/device-connect/android.html#start-periodic-sync-method) section) which will sync data in period intervals in background.

::: danger IMPORTANT
- The recommended approach is to call `createUser` (and then `startPeriodicSync` on success) method every time user accesses the app, so that the background sync process remains in check.
- In certain cases, the FinBox server often communicates with SDK directly, to make sure this works it is required to **forward Notifications to SDK**. Refer [Forward Notifications to SDK
](/device-connect/android.html#forward-notifications-to-sdk) section for it.
- In the case of a multi-process application, it is required to initialize the SDK manually before calling the `createUser` method. Refer [Multi-Process Support](/device-connect/android.html#multi-process-support) section for such cases.
:::