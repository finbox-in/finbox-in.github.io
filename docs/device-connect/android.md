# DeviceConnect: Android SDK
Device Connect Android SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.

## Requirements

Device Connect Android SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring to support older versions.

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

## Adding Dependency
In the project level `build.gradle` file, add the repository URLs to all `allprojects` block.

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

Now add the dependency to module level `build.gradle.kts` or `build.gradle` file:

<CodeSwitcher :languages="{kotlin:'Kotlin',groovy:'Groovy'}">
<template v-slot:kotlin>

```kotlin
implementation("in.finbox:mobileriskmanager:<DC_SDK_VERSION>:parent-release@aar") {
    isTransitive = true
}
implementation("in.finbox:common:<COMMON_SDK_VERSION>:<COMMON_FLAVOR>-release@aar") {
    isTransitive = true
}
implementation("in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar") {
    isTransitive = true
}
```

</template>
<template v-slot:groovy>

```groovy
implementation('in.finbox:mobileriskmanager:<DC_SDK_VERSION>:parent-release@aar') {
    transitive = true
}
implementation ('in.finbox:common:<COMMON_SDK_VERSION>:<COMMON_FLAVOR>-release@aar') {
    transitive = true
}
implementation ('in.finbox:logger:<LOGGER_SDK_VERSION>:parent-release@aar') {
    transitive = true
}
```

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Handle Permissions

The Runtime permissions needs to handled by the developer when calling the helper methods. Based on the permissions available, the SDK intelligently syncs the alternate data.

Below are the list of Runtime permissions the sdk adds to the application Manifest, if Manifest Merger is enabled:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

<!-- ::: warning WARNING
In the case of Xiaomi we need to ask for a special Service SMS Permission so that SMS Data can be synced. Please look at the sample app in which in order to navigate the user to the settings screen, we are calling the function:
`CommonUtils.showServiceSmsPermissionSetting(this);` and then listening to the callback in `OnActivityResult` with RequestCode `REQUEST_SMS_PERMISSION_CODE`
::: -->

To remove the unused permissions, add node marker value as `remove` to that permission as shown below:
```xml
<uses-permission
    android:name="android.permission.READ_CONTACTS"
    tools:node="remove" />
```

In case the Manifest merger is not enabled add the above-specified permissions manually.

## Create User Method

Call `createUser` method to create the user (first time) or check the API credentials for the SDK. It takes `CUSTOMER_ID` as one of its arguments which is a unique identifier for a user.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never `null` or a blank string `""`.
:::

The response to this method (success or failure) can be captured using the callback `FinBoxAuthCallback`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.createUser("CLIENT_API_KEY", "CUSTOMER_ID",
    object : FinBox.FinBoxAuthCallback {
        override fun onSuccess(accessToken: String) {
            // Authentication is success
        }
        
        override fun onError(@FinBoxErrorCode errorCode: Int) {
            // Authentication failed
        }
    })
```

</template>
<template v-slot:java>

```java
FinBox.createUser("CLIENT_API_KEY", "CUSTOMER_ID",
    new FinBox.FinBoxAuthCallback() {
        @Override
        public void onSuccess(@NonNull String accessToken) {
            // Authentication is success
        }

        @Override
        public void onError(@FinBoxErrorCode int error) {
            // Authentication failed
        }
    });
```

</template>
</CodeSwitcher>

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync Method

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val finbox = FinBox()
finbox.startPeriodicSync()
```

</template>

<template v-slot:java>

```java
FinBox finbox = new FinBox();
finbox.startPeriodicSync();
```

</template>
</CodeSwitcher>

## Match Details on Device

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Create the builder by passing email address, phone number and name of the customer.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val deviceMatch = DeviceMatch.Builder().apply {
    setEmail("useremail@gmail.com")
    setPhone("User Name")
    setName("9999999999")
}.build()
```

</template>

<template v-slot:java>

```java
final DeviceMatch.Builder builder = new DeviceMatch.Builder();
builder.setEmail("useremail@gmail.com");
builder.setName("Full Name");
builder.setPhone("9999999999");
final DeviceMatch deviceMatch = builder.build();
```

</template>
</CodeSwitcher>


Once the in-device values are set, call `setDeviceMatch` before starting the syncs.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finBox.setDeviceMatch(deviceMatch)
```

</template>

<template v-slot:java>

```java
finBox.setDeviceMatch(deviceMatch);
```

</template>
</CodeSwitcher>

::: tip TIP
For Device Match to work at full potential, the SDK expects `android.permission.READ_CONTACTS`, `android.permission.GET_ACCOUNTS`, `android.permission.READ_SMS` to be accepted by the user.
:::

## Forward Notifications to SDK

In certain cases, FinBox server often requests critical data from SDK directly (other than scheduled sync period), to make sure this works it is required to forward FCM Notifications to SDK.

Add the following lines inside the overridden `onMessageReceived` method available in the service that extends `FirebaseMessagingService`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
if (MessagingService.forwardToFinBoxSDK(remoteMessage.data)) {
    val firebaseMessagingService = MessagingService()
    firebaseMessagingService.attachContext(this)
    firebaseMessagingService.onMessageReceived(remoteMessage)
} else {
    // Rest of your FCM logic
}
```

</template>
<template v-slot:java>

```java
if(MessagingService.forwardToFinBoxSDK(remoteMessage.getData())) {
    final MessagingService firebaseMessagingService = new MessagingService();
    firebaseMessagingService.attachContext(this);
    firebaseMessagingService.onMessageReceived(remoteMessage);
} else {
    // Rest of your FCM logic
}
```

</template>
</CodeSwitcher>

## Multi-Process Support

DeviceConnect uses a content provider to auto initialize the SDK. The limitation with the OS is that content providers are only initialized once in a **multi-process application** and from the main process. For this reason, any calls to the SDK from other processes will lead to unstable behavior.

In case, you want to use the SDK from a process other than the main process, follow the two steps mentioned below to initialize the SDK.

### Remove the Content Provider

Remove the content provider that auto initializes the SDK from the Android Manifest file.
```xml
<provider
    android:name="in.finbox.mobileriskmanager.init.AutoInitProvider"
    android:authorities="in.finbox.lenderapplication.riskmanagerprovider"
    android:enabled="true"
    android:exported="false"
    tools:node="remove" />
```
### Initialize the SDK

Initialize the FinBox SDK in the `onCreate` method of Application class.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.initLibrary(this)
```

</template>
<template v-slot:java>

```java
FinBox.initLibrary(this);
```

</template>
</CodeSwitcher>

## Cancel Periodic Syncing

If you have already set up the sync for the user data, you can cancel it any time by the following code:

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.stopPeriodicSync()
```

</template>
<template v-slot:java>

```java
finbox.stopPeriodicSync();
```

</template>
</CodeSwitcher>

## Handle Sync Frequency

By default sync frequency is set to **8 hours**, you can modify it by passing preferred time **in seconds** as an argument to `setSyncFrequency` method once the user is created.

## Reset User Data

In case the user data needs to be removed to re-sync the entire data, use the method `resetData`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
finbox.resetData()
```

</template>
<template v-slot:java>

```java
finbox.resetData();
```

</template>
</CodeSwitcher>

