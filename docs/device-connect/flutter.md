# DeviceConnect: Flutter

Device Connect Flutter SDK is used to collect anonymised non-PII data from the devices of the users after taking explicit user consent.


## Add Plugin

Specify the following in `local.properties` file:
  ```
  ACCESS_KEY=<ACCESS_KEY>
  SECRET_KEY=<SECRET_KEY>
  DC_SDK_VERSION=<RM_SDK_VERSION>
  COMMON_SDK_VERSION=<COMMON_SDK_VERSION>
  COMMON_FLAVOR=<COMMON_FLAVOR>
  LOGGER_SDK_VERSION=<LOGGER_SDK_VERSION>
  ```

Add plugin dependency in `pubspec.yaml` file:
  ```yml
  finbox_dc_plugin: any
  ```

::: warning NOTE
Following will be shared by FinBox team at the time of integration:
- `ACCESS_KEY`
- `SECRET_KEY`
- `DC_SDK_VERSION`
- `COMMON_SDK_VERSION`
- `COMMON_FLAVOR`
- `LOGGER_SDK_VERSION`
- `CLIENT_API_KEY`
:::


## Create User

Call 'FinBoxDcPlugin.loadDeviceConnect(<CUSTOMER_ID>,<CLIENT_API_KEY>)' to share users data.
  ```dart
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

