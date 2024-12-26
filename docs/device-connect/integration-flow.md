# DeviceConnect: Integration Flow

The **DeviceConnect** journey starts with a crucial step: obtaining the necessary permissions from users. These permissions allow the SDK to collect anonymized data while fully adhering to privacy policies and maintaining user trust.

Once permissions are granted, and users explicitly consent, the SDK is ready for initialization. At this stage, **you create a user with a custom hash**, ensuring that no personally identifiable information (PII) is shared. This step sets the foundation for secure and compliant data handling.

With the user created, the SDK's data sync function comes into play. By default, anonymized data is synced to FinBox's database every **8 hours**, keeping the process efficient and up-to-date. The integration also supports advanced features, such as **fraud control** and **real-time data collection requests**, even if the app is killed. These features ensure seamless functionality and robust data flow in dynamic scenarios.

The synced data is securely processed and transformed into **actionable insights**. These insights, tailored to your specific use case, are accessible via the **Insights API**. By polling this API in real time, you can empower your business to make key decisions at critical touchpoints of the customer journey

<img src="/device_connect_integration.jpg" alt="Device Connect Integration Workflow" />


Explore the [Data Collection and Syncing](/device-connect/mobile-integration.html), followed by [Fetching Insights and Predictors](/device-connect/insights-integration-flow.html) sections for better understanding