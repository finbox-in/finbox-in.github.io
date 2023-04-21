# DeviceConnect: Web

Device Connect Web SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.

## Requirements

Device Connect Web SDK works on Google Chrome 27 and above.

## Adding Dependency

Add the SDK to the application to `package.json`.

Using yarn:

```sh
yarn add web-risk-sdk
```

or using npm:

```sh
npm install --save web-risk-sdk
```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:

- `CLIENT_API_KEY`
:::

## Create User

Call `createUser` method to create the user. It takes Client Api Key and Customer Id as the arguments.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never be `null` or a blank string `""`.
:::

The response to this method (success or failure) can be captured using the callbacks.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
FinBox.createUser("CLIENT_API_KEY", "CUSTOMER_ID", (token) => {
    // Authentication is success
    console.log("Token", token)
}, (error) => {
    // Authentication failed
    console.log("Error", error)
})
```

</template>

</CodeSwitcher>

You can read about the errors in the [Error Codes](/device-connect/error-codes.html) section.

## Start Periodic Sync

This is to be called only on a successful response to `createUser` method's callback. On calling this the syncs will start for all the data sources configured as per permissions. The method below syncs data in the background at regular intervals.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
const finbox = new FinBox()
finbox.startPeriodicSync()
```

</template>

</CodeSwitcher>

## Cancel Periodic Sync

If you have already set up the sync for the user, cancel the syncs using `stopPeriodicSync` method.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
finbox.stopPeriodicSync()
```

</template>

</CodeSwitcher>

## Handle Sync Frequency

By default sync frequency is set to **8 hours**, you can modify it by passing preferred time **in seconds** as an argument to `setSyncFrequency` method once the user is created.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
finbox.setSyncFrequency(12 * 60 * 60)
```

</template>

</CodeSwitcher>

## Reset User Data

In case the user data needs to be removed on the device so that you can re-sync the entire data, use the method `resetData`.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
FinBox.resetData()
```

</template>

</CodeSwitcher>

## Forget User

In case the user choose to be forgotten, use the method `forgetUser`. This will delete the user details in our system.

<CodeSwitcher :languages="{javascript:'Javascript'}">
<template v-slot:javascript>

```javascript
FinBox.forgetUser()
```

</template>
</CodeSwitcher>
