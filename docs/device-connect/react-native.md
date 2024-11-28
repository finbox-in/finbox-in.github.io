# DeviceConnect: React Native

The DeviceConnect Android SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.

## Requirements

Device Connect React Native SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdk 21
        ...
    }
    ...
    compileOptions {
        // Flag to enable support for the new language APIs
        coreLibraryDesugaringEnabled = true
        // Sets Java compatibility to Java 8
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:1.1.5")
}
```

</template>
<template v-slot:groovy>

```groovy
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdkVersion 21
        ...
    }
    ...
    compileOptions {
        // Flag to enable support for the new language APIs
        coreLibraryDesugaringEnabled true
        // Sets Java compatibility to Java 8
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
    // For Kotlin projects
    kotlinOptions {
        jvmTarget = "1.8"
    }
}

dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:1.1.5'
}
```

</template>
</CodeSwitcher>

## Add Plugin

Specify the following keys in `local.properties` file:

```properties
ACCESS_KEY=<ACCESS_KEY>
SECRET_KEY=<SECRET_KEY>
DC_SDK_VERSION=<DC_SDK_VERSION>
COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
COMMON_FLAVOR=<COMMON_FLAVOR>
LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
```

In the project level `build.gradle` file, add the repository urls to all `allprojects` block.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
maven {
    setUrl("s3://risk-manager-android-sdk/artifacts")
    credentials(AwsCredentials::class) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox")
    }
}
```

</template>
<template v-slot:groovy>

```groovy
maven {
    url "s3://risk-manager-android-sdk/artifacts"
    credentials(AwsCredentials) {
        accessKey = <ACCESS_KEY>
        secretKey = <SECRET_KEY>
    }
    content {
        includeGroup("in.finbox")
    }
}
```

</template>
</CodeSwitcher>

Add plugin dependency

<CodeSwitcher :languages="{npm:'NPM',yarn:'Yarn'}">
<template v-slot:yarn>

```sh
yarn add react-native-risk-sdk
```

</template>
<template v-slot:npm>

```sh
npm install --save react-native-risk-sdk
```

</template>
</CodeSwitcher>

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

To create a user, call the createUser method with the following arguments:

* Client API Key
* Customer ID
::: danger IMPORTANT
* `CUSTOMER_ID` Must be **alphanumeric** (no special characters).
* Should not exceed **64** characters.
* Must not be `null` or an empty `string` ""
:::

The response to this method (success or failure) can be captured using the callback.

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

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync

The startPeriodicSync method should be invoked only after receiving a successful response from the `createUser` method callback. This method initiates background syncing for all data sources based on the permissions granted by the user. Data is synced at regular intervals in the background, ensuring continuous and seamless data collection.

```javascript
FinBoxRiskSdk.startPeriodicSync(12) //Start the sync periodically after every 12 hour
```

::: tip Handle Sync Frequency
`startPeriodicSync` takes one argument which indicates the frequency of sync **in hours**.
:::

## Match Details on Device

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Call `setDeviceMatch` method before starting the syncs.

```javascript
FinBoxRiskSdk.setDeviceMatch("useremail@gmail.com", "Full Name", "9999999999");
```

## Forward Notifications to SDK

Certain phone manufacturers, implement aggressive battery optimization features that kill apps running in the background after a certain period of inactivity. This can prevent the DeviceConnect SDK's continuous syncing from functioning properly, as it relies on background data collection. In such cases, FinBox’s server may need to request data from the SDK when continuous sync has stopped.

To enable this functionality, we use Firebase Cloud Messaging (FCM) notifications process. Forwarding these notifications allows the app to "wake up" if it has been killed by the device’s background processes, ensuring continuous data collection. When the app receives an FCM notification, it "wakes up" and continues collecting the necessary data for integration.

Add the following lines inside the overridden `onMessageReceived` method available in the service that extends `FirebaseMessagingService`.

```javascript
FinBoxRiskSdk.forwardFinBoxNotificationToSDK(remoteMessage.data);
```

## Cancel Periodic

Make sure to cancel data synchronization tasks when the user logs out of the app by using the `stopPeriodicSync` method. This ensures that no background sync operations continue unnecessarily, maintaining data security.

```javascript
FinBoxRiskSdk.stopPeriodicSync();
```
## Handle Sync Frequency

By default, the sync frequency is set to **8 hours**. You can customize this frequency by calling the `setSyncFrequency` method and passing your preferred interval **in seconds** as an argument. Ensure this method is invoked after the user is created


<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.setSyncFrequency(12 * 60 * 60)
```

</template>
<template v-slot:java>

```java
finbox.setSyncFrequency();
```

</template>
</CodeSwitcher>

## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

```javascript
FinBoxRiskSdk.resetData();
```

## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

```javascript
FinBoxRiskSdk.forgetUser();
```
