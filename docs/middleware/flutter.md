# FinBox Lending: Flutter

FinBox Lending Flutter SDK is a wrapper around the Android SDK which helps add a digital lending journey to any mobile application.

## Requirements

Lending SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

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

  ```
  ACCESS_KEY=<ACCESS_KEY>
  SECRET_KEY=<SECRET_KEY>
  LENDING_SDK_VERSION=<LENDING_SDK_VERSION>
  DC_SDK_VERSION=<DC_SDK_VERSION>
  COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
  COMMON_FLAVOR=<COMMON_FLAVOR>
  LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
  ```

Add plugin dependency in `pubspec.yaml` file:

  ```yml
  finbox_lending_plugin: any
  ```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `LENDING_SDK_VERSION`
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

In the `onCreate` of your application class initialize dependencies required by the SDK:

```kotlin
FinBoxLendingPlugin.initLibrary(this)
```

Now that all required parameters are available, we can start the SDK flow as follows:

```dart
 FinBoxLendingPlugin.initSdk(
    "<ENVIRONMENT>",
    "<CUSTOMER_ID>",
    "<CLIENT_API_KEY>",
    "<USER_TOKEN>");
```

## Credit Line

For credit line journey, include the following dependency in the module `build.gradle` file:

```dart
 FinBoxLendingPlugin.initSdk(
    "<ENVIRONMENT>",
    "<CUSTOMER_ID>",
    "<CLIENT_API_KEY>",
    "<USER_TOKEN>",
    <WITHDRAW_AMOUNT>,
    "<TRANSACTION_ID>");
```

- WITHDRAW_AMOUNT is passed to the init method that will contain the amount (in **Float**) that a user is trying to withdraw
- TRANSACTION_ID will hold the transaction id (in **String**) for the withdrawal flow

## Callback

The callback will be provided when the user exits the SDK. You can track the status of user exit actions in the `onActivityResult` callback function

```dart
static Future<void> _getJourneyResult(MethodCall call) async {
    if (call.method == 'getJourneyResult')
        {
            var json=call.arguments
        }
}
```

Following json will be received

```json
{
    "code":"code",
    "screen":"screen",
    "message":"message"
}
```

- `code`: Status code for the journey.
- `screen`: Name of the last screen in the journey
- `message`: Any additional message to describe the resultCode

Possible values for `resultCode` are as follows:
| Result Code | Description |
| - | - | - |
| `MW200` | Journey is completed successfully |
| `MW500` | User exits the journey |
| `MW400` | Some error occurred in the SDK |
| `CL200` | Credit line withdrawal success |
| `CL500` | Credit line withdrawal failed |
