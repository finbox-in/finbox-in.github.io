# DeviceConnect: Handle Permissions

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

In case the Manifest merger is not enabled add the above-specified permissions manually. Otherwise this section can be ignored
