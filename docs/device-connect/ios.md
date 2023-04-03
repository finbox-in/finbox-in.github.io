# DeviceConnect: IOS

Device Connect IOS SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.

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

Call `createUser` method to create the user. It takes Client Api Key and Customer Id as the arguments.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never be `null` or a blank string `""`.
:::

The response to this method (success or failure) can be captured using the callback `FinBoxAuthCallback`.

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

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals.

<CodeSwitcher :languages="{swift:'Swift'}">
<template v-slot:swift>

```swift
let finbox = FinBox()
finbox.startPeriodicSync()
```

</template>

</CodeSwitcher>

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
