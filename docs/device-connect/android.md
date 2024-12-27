# DeviceConnect: Android SDK setup
The DeviceConnect Android SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.

<div class="embed-container">
<iframe src="https://www.youtube.com/embed/SfzGylmUVpY" title="Device Connect Data Sync" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Requirements

DeviceConnect Android SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

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

## Adding Dependency
In the project level `build.gradle` file or `settings.gradle`, add the repository URLs to all `allprojects` block or `repositories` block inside `dependencyResolutionManagement`.

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

The response (success or failure) is handled using the `FinBoxAuthCallback` callback.

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

## Start Periodic Sync

The startPeriodicSync method should be invoked only after receiving a successful response from the `createUser` method callback. This method initiates background syncing for all data sources based on the permissions granted by the user. Data is synced at regular intervals in the background, ensuring continuous and seamless data collection.


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

::: tip RECOMMENDATION
To handle cross-login scenarios:

When a user logs back into the app with fresh credentials:
- Call the `createUser` method to register the new user.
- Follow it by `startPeriodicSync` to resume data syncing for the new user.
Even though the SDK automatically adapts to a new user, this approach minimizes potential delays in syncing during the first session
:::

## Match Details on Device (Important)

Device matching enables additional pattern recognition to match email, phone numbers and name. The matching happens on the device and the user phone numbers, email addresses won't leave the device.

Create the builder by passing email address, phone number and name of the customer.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
val deviceMatch = DeviceMatch.Builder().apply {
    setEmail("useremail@gmail.com")
    setName("Full Name")
    setPhone("9999999999")
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
finbox.setDeviceMatch(deviceMatch)
```

</template>

<template v-slot:java>

```java
finbox.setDeviceMatch(deviceMatch);
```

</template>
</CodeSwitcher>

::: tip TIP
For Device Match to work at full potential, the SDK expects `android.permission.READ_CONTACTS`, `android.permission.GET_ACCOUNTS`, `android.permission.READ_SMS` to be accepted by the user.
:::

## Forward Notifications to SDK (Important)

Certain phone manufacturers, implement aggressive battery optimization features that kill apps running in the background after a certain period of inactivity. This can prevent the DeviceConnect SDK's continuous syncing from functioning properly, as it relies on background data collection. In such cases, FinBox’s server may need to request data from the SDK when continuous sync has stopped.

To enable this functionality, we use Firebase Cloud Messaging (FCM) notifications process. Forwarding these notifications allows the app to "wake up" if it has been killed by the device’s background processes, ensuring continuous data collection. When the app receives an FCM notification, it "wakes up" and continues collecting the necessary data for integration.


Add the following lines inside the overridden `onMessageReceived` method available in the service that extends `FirebaseMessagingService`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
if (MessagingService.forwardToFinBoxSDK(remoteMessage.data)) {
    val firebaseMessagingService = MessagingService(this)
    firebaseMessagingService.onMessageReceived(remoteMessage.data)
} else {
    // Rest of your FCM logic
}
```

</template>
<template v-slot:java>

```java
if(MessagingService.forwardToFinBoxSDK(remoteMessage.getData())) {
    final MessagingService firebaseMessagingService = new MessagingService(this);
    firebaseMessagingService.onMessageReceived(remoteMessage.getData());
} else {
    // Rest of your FCM logic
}
```

</template>
</CodeSwitcher>

## Multi-Process Support (Optional)

DeviceConnect uses a **content provider** to automatically initialize the SDK. However, Android has a limitation: in multi-process applications, **content providers are only initialized in the main process**. This means that any SDK calls from other processes may result in **unstable behavior**

If you need to use the SDK in a process **other than the main process**, you must:
1. Remove the auto-initializing content provider.
2. Manually initialize the SDK in the required processes


### Remove the Content Provider

Remove the content provider from your `AndroidManifest.xml` file using the following snippet:
```xml
<provider
    android:name="in.finbox.mobileriskmanager.init.AutoInitProvider"
    android:authorities="in.finbox.lenderapplication.riskmanagerprovider"
    android:enabled="true"
    android:exported="false"
    tools:node="remove" />
```
### Initialize the SDK

After removing the auto-initializing content provider, you must manually initialize the FinBox SDK in your app. This ensures the SDK is properly set up whenever the app starts

Open your app’s custom Application class. Override the `onCreate` method in the Application class and add the Finbox SDK initialization code.

Use the following example as a guide:

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

## Handle Sync Frequency (Optional)

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


## Cancel Periodic Sync

Make sure to cancel data synchronization tasks when the user logs out of the app by using the `stopPeriodicSync` method. This ensures that no background sync operations continue unnecessarily, maintaining data security.

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

## Reset User Data

If you need to clear a user's data stored on the device and initiate a fresh data sync, use the `resetData` method. This ensures that all previous data is removed, and syncing starts from scratch.


<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.resetData()
```

</template>
<template v-slot:java>

```java
FinBox.resetData();
```

</template>
</CodeSwitcher>


## Forget User

If a user requests to be forgotten, use the `forgetUser` method. This will delete all user details from our system, ensuring this meets digital guidelines for right to be forgotten.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBox.forgetUser()
```

</template>
<template v-slot:java>

```java
FinBox.forgetUser();
```

</template>
</CodeSwitcher>


::: tip RECOMMENDATION
-  When a user logs out, call both `stopPeriodicSync` and `resetData`  to:
    * Stop any ongoing periodic sync processes.
    * Clear existing user data.
   This approach ensures a clean state before the next user session.
:::