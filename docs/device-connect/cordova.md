# DeviceConnect: Cordova
The Cordova plugin can be used to integrate mobile apps with DeviceConnect so that users can share their data.

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Setting up the bridge

1. Install the Cordova SDK from the npm package:
    ```sh
    cordova plugin add cordova-plugin-finbox-risk-manager
    ```

2. Specify the following in `local.properties` file:
    ```
    AWS_KEY=<ACCESS_KEY>
    AWS_SECRET=<SECRET_KEY>
    FINBOX_RM_VERSION=<DC_SDK_VERSION>
    FINBOX_RM_ARTIFACT=pfm-release
    ```

## Handle Permissions

The Runtime permissions needs to handled by the developer when calling the helper methods. Based on the permissions available, the SDK intelligently syncs the alternate data.

Below are the list of Runtime permissions the sdk adds to the application Manifest, if Manifest Merger is enabled:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_CALL_LOG" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
<uses-permission
    android:name="android.permission.PACKAGE_USAGE_STATS"
    tools:ignore="ProtectedPermissions" />
```

To remove the unused permissions, add a `remove` rule to that permission as shown below:
```xml
<uses-permission
    android:name="android.permission.READ_CALL_LOG"
    tools:node="remove" />
```

In case the Manifest merger is not enabled add the above-specified permissions manually.

## Create User Method
Call `createUser` method using the `FinBoxRiskManager` instance to create the user (first time) or check the API credentials for the SDK. It takes `CUSTOMER_ID` as one of its arguments which is a unique identifier for a user.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never `null` or a blank string `""`.
:::

The response to this method (success or failure) can be captured using the callback, and on success [Start Periodic Sync Method](/device-connect/cordova.html#start-period-sync-method) should be called.
```javascript
cordova.plugins.FinBoxRiskManager.createUser("CLIENT_API_KEY", "CUSTOMER_ID", function (response) {
    console.log(response);
    cordova.plugins.FinBoxRiskManager.startPeriodicSync(12); 
}, function (error) {
    console.log(error);
});
```

## Start Periodic Sync Method

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:

```javascript
cordova.plugins.FinBoxRiskManager.startPeriodicSync(12) //Start the sync periodically after every 12 hour
```

::: tip Handle Sync Frequency
`startPeriodicSync` takes one argument which indicates the frequency of sync **in hours**.
:::

## Cancel Periodic Syncing

If you have already set up the sync for the user data, you can cancel it any time by the following code:

```javascript
cordova.plugins.FinBoxRiskManager.stopPeriodicSync();
```

## Reset User Data

In case the user data needs to be removed to re-sync the entire data, use the method `resetData`.

```javascript
cordova.plugins.FinBoxRiskManager.resetData();
```
