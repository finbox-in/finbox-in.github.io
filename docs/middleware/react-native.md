# FinBox Lending: React Native

FinBox Lending React Native SDK is a wrapper around the Web SDK which helps add a digital lending journey to any mobile application.

## Installation

Using yarn:

```sh
yarn add react-native-finbox-middleware-sdk
```

or using npm:

```sh
npm install --save react-native-finbox-middleware-sdk
```

Our SDK will auto link automatically with your application

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
        includeGroup("in.finbox.lending")
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

## Start SDK flow

Once all dependencies are added, SDK requires 3 inputs: `CUSTOMER_ID`, `USER_TOKEN` and `CLIENT_API_KEY`.

`ENVIRONMENT` is an optional field. Default value of environment is `PROD`.

::: tip Note
`USER_TOKEN` needs to be generated against a `CUSTOMER_ID` on backend before starting the SDK. Refer [here](/middleware/sourcing-rest-api.html#generate-token)

`ENVIRONMENT` needs to be updated to `PROD` when migrating application to production.
:::

Now that all required parameters are available, we can start the SDK flow as follows:

```javascript
import FinBoxMiddlewareSdk from 'react-native-finbox-middleware-sdk';
//Function to trigger Lending journey
const callModule = () => {
    FinBoxMiddlewareSdk.startLendingJourney(
        "<ENVIRONMENT>",
        "<CLIENT_API_KEY>",
        "<CUSTOMER_ID>",
        "<USER_TOKEN>"
        (errorMessage) => {
            // Error Callback
            console.log("Error message -> ", errorMessage)
        }, 
        (resultCode) => {
            // Success Callback, once the user exits from the journey
            console.log("resultCode", resultCode)
        }
    )
}
```

## Credit Line

In case of credit line product, once the lending journey is completed, user can opt-in for a credit while doing a transaction. For such a case use following method to start the credit line withdrawl journey:

```javascript
import FinBoxMiddlewareSdk from 'react-native-finbox-middleware-sdk';
//Function to trigger credit line withdrawl
const callModule = () => {
    FinBoxMiddlewareSdk.startCreditLineLendingJourney(
        "<ENVIRONMENT>",
        "<CLIENT_API_KEY>",
        "<CUSTOMER_ID>",
        "<USER_TOKEN>",
        WITHDRAW_AMOUNT,
        "TRANSACTION_ID",
        (errorMessage) => {
            // Error Callback
            console.log("Error message -> ", errorMessage)
        }, 
        (resultCode) => {
            // Success Callback, once the user exits from the journey
            console.log("resultCode", resultCode)
        }
    )
}
```

| Field | Type | Description |
| - | - | - |
| `WITHDRAW_AMOUNT` | Float | indicates the amount that a user is trying to withdraw |
| `TRANSACTION_ID` | String | will hold the transaction id for the withdrawal flow |

## Callback

There are 2 callbacks that needs to be handled. 

### successCallback

Success Callback will have a `resultCode`. Possible values for `resultCode` are as follows:

| Result Code | Description |
| - | - | - |
| `MW200` | Journey is completed successfully |
| `MW500` | User exits the journey |
| `MW400` | Some error occurred in the SDK |
| `CL200` | Credit line withdrawal success |
| `CL500` | Credit line withdrawal failed |


### errorCallback

Error callback will contain the error message.

## Notifications

FinBox Lending SDK sends notifications of its own for mandatory events. It is expected that the client app has Firebase configured and can forward the notification payload to the SDK. In order for SDK to capture the notifications add the following:


```js
import messaging from '@react-native-firebase/messaging';


useEffect(() => {
    
    // Send the notification payload to a common function. If sent by FinBox team notification will be shown.
    const pushPayloadToFinBox = () => {
        FinBoxMiddlewareSdk.canForwardToFinBoxLendingSdk(
            JSON.stringify(remoteMessage.data),
            (success) => {
            if (success)
                FinBoxMiddlewareSdk.forwardToFinBoxLendingSdk(
                    JSON.stringify(remoteMessage.data),
                    "CLIENT_API_KEY",
                    "CUSTOMER_ID",
                    "TOKEN",
                );
            },
        );
    };
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        pushPayloadToFinBox();
    });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
        pushPayloadToFinBox();
    });
    return unsubscribe;
}, []);
```

## Customizations

1. The privacy policy URL needs to be updated to the company policy. The default privacy policy is pointing to FinBox privacy. Add a String resource to specify the policy URL.

```xml
<string name="finbox_lending_privacy_policy_url">https://finbox.in/about/privacy</string>
```

::: tip Note
Make sure the value passed is a valid URL
:::

2. The toolbar title can be updated which will be visible in the Dashboard module. In order to update the toolbar just add a String resource for the same.

```xml
<string name="finbox_appbar_title">My App</string>
```

3. SDK fonts can be customised to match the parent application. The SDK used 3 main fonts as mentioned below:

```xml
<style name="FBLendingAppTheme.FinBox.TextPrimary" parent="TextAppearance.AppCompat">
    <item name="fontFamily">bold-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextSecondary" parent="TextAppearance.AppCompat">
    <item name="fontFamily">regular-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextSubHead" parent="TextAppearance.AppCompat">
    <item name="fontFamily">semibold-font</item>
</style>
```

- `FBLendingAppTheme.FinBox.TextPrimary` is used for all buttons and bold headers
- `FBLendingAppTheme.FinBox.TextSecondary` is the regular font that is used for regular text
- `FBLendingAppTheme.FinBox.TextSubHead` is the medium bold font that is used for Sections or subheadings

Customize the SDK font by adding the application `fontFamily` in the styles.

4. SDK Buttons can be customized by overriding `FBLendingAppTheme`

```xml
<style name="FBLendingAppTheme.FinBox.Button" parent="Widget.MaterialComponents.Button">
    <item name="cornerRadius">16dp</item>
    <item name="fontFamily">button-font</item>
</style>

<style name="FBLendingAppTheme.FinBox.TextButton" parent="Widget.MaterialComponents.Button.TextButton"></style>
```

Change button corner radius and text font as per your application theme.