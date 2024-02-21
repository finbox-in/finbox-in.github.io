# DeviceConnect: Handle Permissions

The Runtime permissions needs to handled by the developer when calling the helper methods. Based on the permissions available, the SDK intelligently syncs the alternate data.

Create a Permission Screeen with the list of permissions with a description that explains how the data is collected benefits the user. In addition to it, add Privacy Policy to the bottom of the screen.

<img src="/permission_screen.png" alt="Permission Screen" style="width:80%;height:80%" />

Below are the list of Runtime permissions the sdk automatically adds to the application Manifest, if Manifest Merger is enabled:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

To remove the unused permissions, add node marker value as `remove` to that permission as shown below:
```xml
<uses-permission
    android:name="android.permission.ACCESS_FINE_LOCATION"
    tools:node="remove" />
```

In case the Manifest merger is not enabled add the above-specified permissions manually. Otherwise this section can be ignored
