# DeviceConnect: Integration Flow

DeviceConnect SDK Integration Summary:

**User Permissions & Consent**:

* Obtain necessary user permissions for anonymized data collection.
* Ensure full compliance with privacy policies and user trust.

**SDK Initialization & User Creation**:

* Initialize the SDK.
* Create a user with a custom hash (no PII).

**Data Synchronization**:

* Anonymized data is synced to FinBox every 8 hours by default.
* Supports advanced features:
* Fraud control
* Real-time data collection requests (even if app is killed)

**Insights API**:

* Access actionable insights derived from processed data.
* Use the Insights API for real-time decision-making at key customer journey touchpoints

<img src="/device_connect_integration.svg" alt="Device Connect Integration Workflow" style="width:150%;height:150%" />

Explore the [Data Collection](/device-connect/mobile-integration.html), followed by [Fetching Insights and Predictors](/device-connect/insights-integration-flow.html) sections for better understanding
