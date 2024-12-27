# DeviceConnect: Web

The DeviceConnect Web SDK enables the collection of anonymized, non-PII data from user devices, ensuring compliance with privacy policies by obtaining explicit user consent before initiating data sync processes.

## Requirements

Device Connect Web SDK works on Google Chrome, Safari, Opera and other popular browsers.

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

To create a user, call the `createUser` method with the following arguments:

- Client API Key
- Customer ID

::: danger IMPORTANT
- `CUSTOMER_ID` Must be **alphanumeric** (no special characters).
- Should not exceed **64** characters.
- Must not be `null` or an empty string `""`.
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

The startPeriodicSync method should be invoked only after receiving a successful response from the `createUser` method callback. This method initiates background syncing for all data sources based on the permissions granted by the user. Data is synced at regular intervals in the background, ensuring continuous and seamless data collection.

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
