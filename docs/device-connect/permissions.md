# DeviceConnect: Handle Permissions

When integrating DeviceConnect, developers must handle runtime permissions while invoking helper methods. The SDK intelligently syncs alternate data based on the permissions provided by the user.

### Create a Consent Screen
To ensure a seamless user experience, it’s essential to create a Consent Screen before requesting permissions. It’s highly recommended to provide context on:
- The permissions being requested.
- How the data will be collected.
- The benefits users will gain from granting these permissions.
Additionally, include a link to the Privacy Policy at the bottom of the screen for transparency.

Here’s an example structure for a Consent Screen

<img src="/Permissions_screen.jpg" alt="Permission Screen" style="width:500;height:600" />

### Runtime Permissions Added by the SDK
Below are the list of Runtime permissions the sdk automatically adds to the application Manifest, if Manifest Merger is enabled:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Removing Unused Permissions

To remove the unused permissions, add node marker value as `remove` to that permission as shown below:
```xml
<uses-permission
    android:name="android.permission.ACCESS_FINE_LOCATION"
    tools:node="remove" />
```

### If Manifest Merger is not enabled
Add the required permissions manually to your app’s manifest file. Use the list of permissions provided above as a reference. If Manifest Merger is enabled, you can skip this section

::: warning BEST PRACTICES
- Clearly communicate why each permission is needed to the end user.
- Only request permissions that are essential for the app’s functionality.
- Ensure that your Permission Screen aligns with Google Play policies for transparency and user consent
:::