# BankConnect: Android Client SDK
The Android Client SDK helps user submits their bank statements via upload or net banking credentials in your Android application.

## See in action
The demo video below shows how a user submit a bank statement using net banking credentials:
<div class="embed-container">
<iframe src="https://www.youtube.com/embed/Q4hv2Z-UEB0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

The video below shows a user submit bank statement by uploading the PDF file:
<div class="embed-container">
<iframe src="https://www.youtube.com/embed/FLWRiW25ELw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

## Requirements

Bank Connect Android SDK works on Android 5.0+ (API level 21+), on Java 8+ and AndroidX. In addition to the changes, enable desugaring to support older versions.

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
implementation("in.finbox:bankconnect:<BC_SDK_VERSION>:release@aar") {
    isTransitive = true
    exclude("in.finbox", "common")
    exclude("in.finbox", "logger")
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
implementation('in.finbox:bankconnect:<BC_SDK_VERSION>:release@aar') {
    transitive = true
    exclude group: "in.finbox", module: "common"
    exclude group: "in.finbox", module: "logger"
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
- `BC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Integration Workflow
The diagram below illustrates the integration workflow in a nutshell:
<img src="/client_sdk.jpg" alt="Client SDK Workflow" />

## Sample Project
We have hosted a sample project on GitHub, you can check it out here:
<div class="button_holder">
<a class="download_button" target="_blank" href="https://github.com/finbox-in/bankconnect-android">Open GitHub Repository</a>
</div>

## Build Bank Connect
Build the `FinBoxBankConnect` object by passing `apiKey`, `linkId`, `fromDate`, `toDate` and `bank`.

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
FinBoxBankConnect.Builder(applicationContext)
    .apiKey("CLIENT_API_KEY")
    .linkId("your_link_id")
    .fromDate("01/01/2021") // Optional: Default 6 months old date
    .toDate("01/04/2021") // Optional: Default value 1 day less than current date
    .bank("sbi") // Optional
    .build()
```

</template>
<template v-slot:java>

```java
new FinBoxBankConnect.Builder(getApplicationContext())
    .apiKey("your_api_key")
    .linkId("your_link_id")
    .fromDate("01/01/2021") // Optional: Default 6 months old date
    .toDate("01/04/2021") // Optional: Default value 1 day less than current date
    .bank("sbi") // Optional
    .build();
```

</template>
</CodeSwitcher>


| Builder Property | Description | Required |
| - | - | - |
| `apiKey` | specifies the `api_key` | Yes |
| `linkId` | specifies the `link_id` | Yes |
| `fromDate` | specifies the starting period of the statement in `dd/MM/yyyy` format | No |
| `toDate` | specifies the end period of the statement in `dd/MM/yyyy` format | No |
| `bank` | pass the [bank identifier](/bank-connect/appendix.html#bank-identifiers) to skip the bank selection screen and directly open a that bank's screen instead | No |

`fromDate` and `toDate` specify the period for which the statements will be fetched. For example, if you need the last 6 months of statements, `fromDate` will be today's date - 6 months and `toDate` will be today's date - 1 day. If not provided the default date range is 6 months from the current date. It should be in `dd/MM/yyyy` format.

Once the above statement is added, a series of checks are done to make sure the SDK is implemented correctly. A `RunTimeException` will be thrown while trying to build the project in case any of the checks are not completed.

::: warning Minimal Requirements for SDK to work:
1. `apiKey` is is mandatory
2. `linkId` is mandatory, and should be at least 8 characters long
3. In case `fromDate` / `toDate` is provided, make sure they are of correct date format: `dd/MM/yyyy`.
4. Make sure `fromDate` is always less than `toDate`
5. Make sure `toDate` is never today's date, the maximum possible value for it is today's date - 1 day
Once all these conditions are met, the BankConnect object will build.
:::

## Show SDK Screen
Start BankActivity and listten for the result

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
/**
 * Activity Result
 */
private val result = registerForActivityResult(
    ActivityResultContracts.StartActivityForResult()
) {
    // Parse the result
    parseActivityResult(it)
}

// Start Bank Activity
result.launch(Intent(this, BankActivity::class.java))
```

</template>
<template v-slot:java>

```java
/**
 * Activity Result
 */
@NonNull
private final ActivityResultLauncher<Intent> result =
        registerForActivityResult(new ActivityResultContracts.StartActivityForResult(),
                this::parseActivityResult);

// Start Bank Activity
result.launch(new Intent(this, BankActivity.class));
```

</template>
</CodeSwitcher>

## Parse Results
Once the user navigates through the banks and uploads the bank statement, the sdk automatically closes `BankActivity` and returns `FinboxOnSuccessPayload`.

`FinboxOnSuccessPayload` contains `linkId` and `entityId`. A successful upload contains a unique `entityId`.
* linkId - Unique id passed when building the Bank Connect object
* entityId - Unique id of a successful statement upload

<CodeSwitcher :languages="{kotlin:'Kotlin',java:'Java'}">
<template v-slot:kotlin>

```kotlin
if (result?.resultCode == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    val extras = result.data?.extras
    // Read success payload
    val payload = extras?.getParcelable<FinboxOnSuccessPayload>(
        FinboxBankConstants.BUNDLE_EXTRA_SUCCESS_PAYLOAD
    )
    when {
        payload == null -> {
            // Failed to Receive Payload
        }
        payload.entityId.isNullOrBlank() -> {
            // Failed to Upload Document
        }
        else -> {
            // Upload Success
        }
    }
} else {
    // Result Failed or User Cancelled
}
```

</template>
<template v-slot:java>

```java
if (result != null && result.getResultCode() == Activity.RESULT_OK) {
    // Result is success
    // Read extras
    @Nullable final Bundle extras = result.getData() != null ? result.getData().getExtras() : null;
    if (extras != null) {
        // Read success payload
        @Nullable final FinboxOnSuccessPayload payload =
                extras.getParcelable(FinboxBankConstants.BUNDLE_EXTRA_SUCCESS_PAYLOAD);
        if (payload == null) {
            // Failed to Receive Payload
        } else if (payload.getEntityId() == null || payload.getEntityId().length() == 0) {
            // Failed to Upload Document
        } else {
            // Upload Success
        }
    } else {
        // Failed to Receive data
    }
} else {
    // Result Failed or User Cancelled
}
```

</template>
</CodeSwitcher>


:::warning Webhook
To track detailed errors, and transaction process completion at the server-side, it is recommended to also integrate [Webhook](/bank-connect/webhook.html).
:::

## Customization
`BankActivity` inherits the themes and color from Material Dark Action Bar Theme. Most of the case, there would be less customization requried but if there is a mismatch in colors, you can customize it through your `styles.xml` file.

1. The sdk Toolbar color uses `colorPrimary`. If your app toolbar color is different from `colorPrimary` then change the color by updating the background color
	```xml
    <style name="BankConnectTheme.Toolbar">
        <item name="android:background">@color/colorWhite</item>
    </style>
	```

2. `BankConnectTheme` is the base theme of the sdk and it inherits `Theme.MaterialComponents.Light.DarkActionBar`. If your app doesn't inherit Dark Action Bar theme then you can change the sdk theme to inherit your app base theme.

	```xml
    <style name="BankConnectTheme" parent="AppTheme">

    </style>

    <style name="BankConnectTheme.AppBarOverlay" parent="AppTheme.AppBarOverlay" />

    <style name="BankConnectTheme.PopupOverLay" parent="AppTheme.PopupOverlay" />
	```
