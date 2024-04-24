# BankConnect: Flutter

BankConnect Cordova SDK helps user submits their bank statements via upload or net banking credentials in your Android application.

## Requirements

Bank Connect Flutter SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring so that our SDK can run smoothly on Android 7.0 and versions below.

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
BC_SDK_VERSION=<BC_SDK_VERSION>
```

Add plugin dependency in `pubspec.yaml` file:

```yml
finbox_bc_plugin: any
```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `ACCESS_KEY`
- `SECRET_KEY`
- `BC_SDK_VERSION`
:::

## Integration Workflow

The diagram below illustrates the integration workflow in a nutshell:
<img src="/client_sdk.jpg" alt="Client SDK Workflow" />

## Sample Project

We have hosted a sample project on GitHub, you can check it out here:
<div class="button_holder">
<a class="download_button" target="_blank" href="https://github.com/finbox-in/bank-connect-sample-flutter">Open GitHub Repository</a>
</div>

## Show SDK Screen

```dart
FinBoxBcPlugin.initSdk("CLIENT_API_KEY","FROM_DATE","TO_DATE","BANK_NAME","MODE", "MOBILE_NUMBER", "JOURNEY_MODE", "AA_JOURNEY_MODE", "AA_RECURRING_TENURE_MONTH_COUNT", "AA_RECURRING_FREQUENCY_UNIT", "AA_RECURRING_FREQUENCY_VALUE");
```

| Builder Property | Description | Required |
| - | - | - |
| `apiKey` | specifies the `api_key` | Yes |
| `linkId` | specifies the `link_id` | Yes |
| `fromDate` | specifies the starting period of the statement in `DD/MM/YYYY`format | No |
| `toDate` | specifies the end period of the statement in `DD/MM/YYYY` format | No |
| `bank` | pass the [bank identifier](/bank-connect/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No |
| `mode` | set the mode as pdf (manual upload) or aa (Account Aggregator) or online (Net Banking) | No |
| `mobile_number` | Prefills phone number in Account Aggregator mode | No |
| `journey_mode` | Optional parameter to set the journey (i.e.multi_pdf or multi_banking) | No |
| `aa_journey_mode` | set the journey mode for AA (i.e only_once or only_recurring) | No |
| `aa_recurring_tenure_month_count` | set the recurring consent duration (min: 1 and max: 24) | No |
| `aa_recurring_frequency_unit` | set the frequency unit to pull the data during the recurring consent duration (year, month, day, hour) | No |
| `aa_recurring_frequency_value` | set the frequency value to pull the data during the recurring consent duration (min: 1 and max: 3) | No |

`fromDate` and `toDate` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `fromDate` will be today's date - 6 months and `toDate` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `DD/MM/YYYY` format.

Once the above statement is added, a series of checks are done to make sure the SDK is implemented correctly. A `RunTimeException` will be thrown while trying to build the project in case any of the checks are not completed.

::: warning Minimal Requirements for SDK to work:

1. `apiKey` is is mandatory
2. `linkId` is mandatory, and should be at least 8 characters long
3. In case `fromDate` / `toDate` is provided, make sure they are of correct date format: `DD/MM/YYYY`.
4. Make sure `fromDate` is always less than `toDate`
5. Make sure `toDate` is never today's date, the maximum possible value for it is today's date - 1 day
Once all these conditions are met, the BankConnect object will build.
:::

## Parse Results

Once the user navigates through the banks and uploads the bank statement, the sdk automatically closes `FinBoxBcPlugin` and returns the result inside `_getJourneyResult`.

`call.arguments` contains `linkId` and `entityId` (or `sessionId`). A successful upload contains a unique `entityId` (or `sessionId`).

- linkId - Unique id passed when building the Bank Connect object
- entityId - Unique id of a successful statement upload during Entity flow
- sessionId - Session id of a successful statement upload during Session flow

```dart
static Future<void> _getJourneyResult(MethodCall call) async {
    if (call.method == 'getJourneyResult') {
        var json = call.arguments
    }
}
```

Following json will be received

```json
{
    "linkId": "link_id",
    "entityId": "entity_id", // Entity id will be available only for entity flow
    "sessionId": "session_id", // Session Id will be available only for session flow
    "error_type": "error_code",
    "message": "msg"
}
```
