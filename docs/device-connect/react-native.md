# DeviceConnect: React Native
The React Native package can be used to integrate mobile apps with DeviceConnect so that users can share their data.

## Setting up the bridge

1. Install the React SDK from the npm package:
    ```sh
    yarn add react-native-risk-sdk
    ```
2. Now to auto link this native module to your app, run following command:
    ```sh
    react-native link
    ```
3. Once the linking is done you need to open Android Studio and add a maven repository url in your project level `build.gradle` file
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
4. Specify the following in `local.properties` file:
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

5. Final change required is in the `MainApplication` class of your native app.
    ```java
    @Override  
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            ....
            new RiskSdkPackage(),
            ...
        );
    }
    ```

## Create User Method
Call `createUser` method using the `FinBoxRiskSdk` instance to create the user (first time) or check the API credentials for the SDK. It takes `CUSTOMER_ID` as one of its arguments which is a unique identifier for a user.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never `null` or a blank string `""`.
:::

The response to this method (success or failure) can be captured using the callback, and on success [Start Periodic Sync Method](/device-connect/react-native.html#start-period-sync-method) should be called.
```javascript
import FinBoxRiskSdk from 'react-native-risk-sdk';
//Function to trigger RiskSdk
const callModule = () => {
    FinBoxRiskSdk.createUser(
        "CLIENT_API_KEY",
        "CUSTOMER_ID",
        (errorStatus) => {
	    // Error Callback
            console.log("Error status -> ", errorStatus)
        }, 
        (msg) => {
            // Success Callback, Call the periodic sync once the user has been created
	    console.log("Final message", msg)
	    FinBoxRiskSdk.startPeriodicSync(12) //Start the sync periodically after every 12 hour
	}
    )
}
```

You can read about the error codes in [this](/device-connect/react-native.html#error-codes) section.

## Start Periodic Sync Method

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:

```javascript
FinBoxRiskSdk.startPeriodicSync(12) //Start the sync periodically after every 12 hour
```

::: tip Handle Sync Frequency
`startPeriodicSync` takes one argument which indicates the frequency of sync **in hours**.
:::

## Cancel Periodic Syncing

If you have already set up the sync for the user data, you can cancel it any time by the following code:

```javascript
FinBoxRiskSdk.stopPeriodicSync();
```

## Reset User Data

In case the user data needs to be removed to re-sync the entire data, use the method `resetData`.

```javascript
FinBoxRiskSdk.resetData();
```
