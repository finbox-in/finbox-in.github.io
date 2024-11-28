# DeviceConnect: Cordova

The DeviceConnect Cordova SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.



## Requirements

Device Connect Cordova SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
android {
    ...
    defaultConfig {
        ...
        // Minimum 5.0+ devices
        minSdkVersion(21)
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

Specify the following in `local.properties` file:

```properties
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

To create a user, call the `createUser` method with the following arguments:

- Client API Key
- Customer ID

::: danger IMPORTANT
- `CUSTOMER_ID` Must be **alphanumeric** (no special characters).
- Should not exceed **64** characters.
- Must not be `null` or an empty string `""`.
:::

```javascript
cordova.plugins.FinBoxRiskManager.createUser("CLIENT_API_KEY", "CUSTOMER_ID", function (response) {
    // User is created successfully
    console.log(response);
}, function (error) {
    // User is failed to created
    // Log the error
    console.log(error);
});
```

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.


## Start Periodic Sync

The startPeriodicSync method should be invoked only after receiving a successful response from the `createUser` method callback. This method initiates background syncing for all data sources based on the permissions granted by the user. Data is synced at regular intervals in the background, ensuring continuous and seamless data collection.

```javascript
cordova.plugins.FinBoxRiskManager.startPeriodicSync()
```

::: tip RECOMMENDATION
To handle cross-login scenarios:

When a user logs back into the app with fresh credentials:
- Call the `createUser` method to register the new user.
- Follow it by `startPeriodicSync` to resume data syncing for the new user.
Even though the SDK automatically adapts to a new user, this approach minimizes potential delays in syncing during the first session
:::

## Match Details on Device

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Create the builder by passing email address, phone number and name of the customer.

## Forward Notifications to SDK

In certain cases, FinBox server requests critical data from SDK directly (other than scheduled sync period), to make sure this works it is required to forward FCM Notifications to SDK.

Add the following lines inside `cordova.plugins.firebase.messaging.onMessage` and `cordova.plugins.firebase.messaging.onBackgroundMessage` method.

```javascript
cordova.plugins.FinBoxRiskManager.forwardFinBoxNotificationToSDK(data);
```

## Match Details on Device

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Call `setDeviceMatch` method before starting the syncs.

```javascript
cordova.plugins.FinBoxRiskManager.setDeviceMatch("useremail@gmail.com", "Full Name", "9999999999");
```


## Multi-Process Support

DeviceConnect uses a content provider to auto initialize the SDK. The limitation with the OS is that content providers are only initialized once in a **multi-process application** and from the main process. For this reason, any calls to the SDK from other processes will lead to unstable behavior.

In case, you want to use the Cordova SDK from a process other than the main process, follow the two steps mentioned below to initialize the SDK.

### Remove the Content Provider

Remove the content provider that auto initializes the SDK from the Android Manifest file using `config.xml` file. Add the changes inside `<platform name="android">` tag.

```xml
<config-file parent="/manifest/application" target="AndroidManifest.xml">
    <provider android:authorities="in.finbox.lenderapplication.riskmanagerprovider" android:enabled="true" android:exported="false" android:name="in.finbox.mobileriskmanager.init.AutoInitProvider" tools:node="remove" />
</config-file>
```

Update the widget tag to include

```xml
<widget ... xmlns:android="http://schemas.android.com/apk/res/android" xmlns:tools="http://schemas.android.com/tools"
```

### Initialize the SDK

Initialize the FinBox Cordova SDK as soon as the `onDeviceReady` method is called.

```javascript
cordova.plugins.FinBoxRiskManager.initLibrary(this)
```


## Cancel Periodic Syncing

If you have already set up the sync for the user data, you can cancel it any time by the following code:

```javascript
cordova.plugins.FinBoxRiskManager.stopPeriodicSync();
```


## Handle Sync Frequency

By default sync frequency is set to **8 hours**, you can modify it by passing preferred time **in seconds** as an argument to `setSyncFrequency` method once the user is created.

```javascript
cordova.plugins.FinBoxRiskManager.setSyncFrequency(12 * 60 * 60);
```


## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

```javascript
cordova.plugins.FinBoxRiskManager.resetData();
```


## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

```javascript
cordova.plugins.FinBoxRiskManager.forgetUser();
```
