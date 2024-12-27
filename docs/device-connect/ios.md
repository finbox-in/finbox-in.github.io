# DeviceConnect: IOS

DeviceConnect IOS SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.

## Requirements

Device Connect IOS SDK works on IOS 16.1 and Xcode 14.1.

## Adding Dependency

Add the SDK to the application using Swift Package Manager (Preferred) or Cocopods.

<CodeSwitcher :languages="{spm:'Swift Package Manager',cocopods:'CocoaPods'}">
<template v-slot:spm>

1. In Xcode, select File > Add Packages...

2. Enter the [Risk Manager URL](https://gitlab.com/finbox/deviceconnect/mobile/ios-risk-manager) for this repository

</template>
<template v-slot:cocopods>

1. Edit the `pod` file and add `pod 'RiskManager`

</template>
</CodeSwitcher>

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

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

The response to this method (success or failure) can be captured using the callback.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
Finbox.createUser(apiKey: "API_KEY", customerId: "CUSTOMER_ID") { token in
    // Authentication is success
} error: { code in
    // Authentication failed
}
```

</template>

</CodeSwitcher>

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync

The startPeriodicSync method should be invoked only after receiving a successful response from the `createUser` method callback. This method initiates background syncing for all data sources based on the permissions granted by the user. Data is synced at regular intervals in the background, ensuring continuous and seamless data collection.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
let finbox = FinBox()
finbox.startPeriodicSync()
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

## Cancel Periodic Sync

If you have already set up the sync for the user, cancel the syncs using `stopPeriodicSync` method.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
finbox.stopPeriodicSync()
```

</template>

</CodeSwitcher>

## Handle Sync Frequency

By default sync frequency is set to **8 hours**, you can modify it by passing preferred time **in seconds** as an argument to `setSyncFrequency` method once the user is created.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
finbox.setSyncFrequency(12 * 60 * 60)
```

</template>

</CodeSwitcher>

## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
FinBox.resetData()
```

</template>

</CodeSwitcher>

## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
FinBox.forgetUser()
```

</template>
</CodeSwitcher>
