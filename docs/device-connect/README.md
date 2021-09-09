# DeviceConnect: Introduction
DeviceConnect lets businesses get access to enriched Android mobile device data of customers to build lending and wealth management apps. This is especially useful when borrowers are new to credit or are thin-file customers, as it helps them get better terms based on the shared data.

::: tip Try DeviceConnect
[Contact us](https://finbox.in/contact-us) and request for a pilot.
:::

## Getting Started
FinBox DeviceConnect requires two integrations - first on Android app from which **users can share data**:
- [Android SDK](/device-connect/android.html)
- [React Native](/device-connect/react-native.html)
- [Cordova](/device-connect/cordova.html)
- [Flutter](/device-connect/flutter.html)

And then on the backend to **fetch predictors** responsible for making decisions:
- [REST API](/device-connect/rest-api.html)

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
| NO_ACTIVE_NETWORK | 7678              | Device is not connected to an active network                              |
| NETWORK_TIME_OUT | 7679              | Request timed out               |
| NETWORK_RESPONSE_NULL | 7681              | Network response is null               |
| USER_TOKENS_NULL | 7682              | Both access token and refresh token is null               |
| ACCESS_TOKEN_NULL | 7683              | Access token is null               |
| REFRESH_TOKEN_NULL | 7684              | Refresh token is null               |
| AUTHENTICATE_NOT_FOUND | 7685              | End point is not found               |

Some error codes can be resolved by validating the implementation and some by retrying the creation of the user, while other error codes can only be resolved by contacting FinBox.
