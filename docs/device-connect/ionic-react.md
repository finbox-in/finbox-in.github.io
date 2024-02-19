# DeviceConnect: Ionic React

Device Connect Ionic React SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.

## Installation

Using yarn:

```sh
yarn add ionic-risk-sdk
```

or using npm:

```sh
npm install --save ionic-risk-sdk
```

Register our SDK using `registerPlugin(IonicRiskSdkPlugin.class);` in your `MainActivity` class.

## Authentication

Open Android Studio and in the project level `build.gradle` file, add the repository URLs to all `allprojects` block.

```groovy
maven {
    url "s3://risk-manager-android-sdk/artifacts"
    credentials(AwsCredentials) {
        accessKey = "<ACCESS_KEY>"
        secretKey = "<SECRET_KEY>"
    }
    content {
        includeGroup("in.finbox")
    }
}
```

Add the following keys in `local.properties` file:

```
ACCESS_KEY=<ACCESS_KEY>
SECRET_KEY=<SECRET_KEY>
DC_SDK_VERSION=<DC_SDK_VERSION>
COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
COMMON_FLAVOR=<COMMON_FLAVOR>
LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
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

The response to this method (success or failure) can be captured using the callback.

```javascript
import { IonicRiskSdk } from 'ionic-risk-sdk';
//Function to trigger RiskSdk
const token = await IonicRiskSdk.createUser({ apiKey: API_KEY, customerId: CUSTOMER_ID });
```

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:

```javascript
IonicRiskSdk.startPeriodicSync(); //Start the sync periodically after every 12 hour
```

::: tip Handle Sync Frequency
`startPeriodicSync` takes one argument which indicates the frequency of sync **in hours**.
:::

## Cancel Periodic

If you have already set up the sync for the user data, you can cancel it any time by the following code:

```javascript
IonicRiskSdk.stopPeriodicSync();
```

## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

```javascript
IonicRiskSdk.resetData();
```

## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

```javascript
IonicRiskSdk.forgetUser();
```
