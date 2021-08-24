# Flutter DeviceConnect

The plugin can be used to integrate mobile apps with DeviceConnect so that users can share their data.

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `ACCESS_KEY`
- `SECRET_KEY`
- `RM_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::

## Handle Permissions

The Runtime permissions needs to handled by the developer when calling the helper methods. Based on the permissions available, the SDK intelligently syncs the alternate data.

Below are the list of Runtime permissions the sdk adds to the application Manifest, if Manifest Merger is enabled:
```xml
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.READ_SMS" />
<uses-permission android:name="android.permission.RECEIVE_SMS" />
<uses-permission android:name="android.permission.READ_CONTACTS" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.GET_ACCOUNTS" />
```

## Integration Flow

1. Specify the following in `local.properties` file:
    ```
    AWS_KEY=<ACCESS_KEY>
    AWS_SECRET=<SECRET_KEY>
    FINBOX_RM_SDK_VERSION=<RM_SDK_VERSION>
    FINBOX_COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
    FINBOX_LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
    ```

2. Add plugin dependency in 'pubspec.yaml' file:
    ```
    finbox_dc_plugin: ^0.0.2
    ```

3. Call 'FinBoxDcPlugin.loadDeviceConnect(<CUSTOMER_ID>,<CLIENT_API_KEY>)' to share users data.
    ```flutter
    static String _deviceConnectValue = "";
    static String customerId = <CUSTOMER_ID>;
    static String apiKey = <CLIENT_API_KEY>;

      Future _loadDC() async {
        try {
          _deviceConnectValue = await FinBoxDcPlugin.loadDeviceConnect(customerId, apiKey);
        } on PlatformException catch (e) {
          _deviceConnectValue = 'Failed to fetch data';
          print(e.message);
        }
      }
    ```
    As success result, you will get an 'accessToken'

## Error Codes

Below table contains the constant name, error code value and the description of error code:

::: tip TIP
All the constants stated below are available as constants in SDK.
:::

| Constant Name                       | Constant Value| Description |
| :------------------------- | :------------- | --------------- |
| QUOTA_LIMIT_EXCEEDED | 7670            | API Key exceeded its quota limit               |
| AUTHENTICATE_FAILED  | 7671              | Authentication of the API Key and the User failed               |
| AUTHENTICATE_API_FAILED | 7672              | Authentication of the API Key failed               |
| AUTHORIZATION_API_FAILED | 7673              | Authorization of the API Key failed               |
| AUTHENTICATE_API_EMPTY | 7676              | API key is empty               |
| AUTHENTICATE_USER_EMPTY | 7677              | User name is empty               |
| NO_ACTIVE_NETWORK | 7678              | Device is not connected to an active network                              |
| NETWORK_TIME_OUT | 7679              | Request timed out               |
| NETWORK_RESPONSE_NULL | 7681              | Network response is null               |
| USER_TOKENS_NULL | 7682              | Both access token and refresh token is null               |
| ACCESS_TOKEN_NULL | 7683              | Access token is null               |
| REFRESH_TOKEN_NULL | 7684              | Refresh token is null               |
| AUTHENTICATE_NOT_FOUND | 7685              | End point is not found               |

Some error codes can be resolved by validating the implementation and some by retrying the creation of the user, while other error codes can only be resolved by contacting FinBox.