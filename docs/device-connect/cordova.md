# DeviceConnect: Cordova

Device Connect Cordova SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.


## Add Plugin

Specify the following in `local.properties` file:

```
ACCESS_KEY=<ACCESS_KEY>
SECRET_KEY=<SECRET_KEY>
DC_SDK_VERSION=<DC_SDK_VERSION>
COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
COMMON_FLAVOR=<COMMON_FLAVOR>
LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
```

Add the plugin from the npm package:

```sh
cordova plugin add cordova-plugin-finbox-risk-manager
```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `COMMON_FLAVOR`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::


## Create User

Call `createUser` method to create the user. It takes Client Api Key and Customer Id as the arguments.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never be `null` or a blank string `""`.
:::

```javascript
cordova.plugins.FinBoxRiskManager.createUser("CLIENT_API_KEY", "CUSTOMER_ID", function (response) {
    console.log(response);
    cordova.plugins.FinBoxRiskManager.startPeriodicSync(12); 
}, function (error) {
    console.log(error);
});
```

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.


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
