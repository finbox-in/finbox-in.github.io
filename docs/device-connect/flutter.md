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

Call `FinBoxDcPlugin.createUser` method to create the user. It takes Client Api Key and Customer Id as the arguments.

::: danger IMPORTANT
Please make sure `CUSTOMER_ID` is **not more than 64** characters and is **alphanumeric** (with no special characters). Also it should never `null` or a blank string `""`.
:::

  ```dart
  static String _deviceConnectValue = "";

    Future _loadDC() async {
      try {
        _deviceConnectValue = await FinBoxDcPlugin.createUser("CLIENT_API_KEY", "CUSTOMER_ID");
      } on PlatformException catch (e) {
        _deviceConnectValue = 'Failed to fetch data';
        print(e.message);
      }
    }
  ```
As success result, you will get an 'accessToken'

