# Integration Pre-requisites


<img src="/implementation-flow.png" alt="Integration Steps" />


## Step 1: Choose Upload Mode

There are primarily three data submission modes for integration,
accessible through either SDK or API integration. All three modes are
accessible when integrating with the FinBox UI (JS SDK). However, if
you opt for building a custom experience and integrate with APIs, only
the PDF mode is available.

**a. Account Aggregator Integration:**

Integrate using the Frontend JavaScript SDK. Ensure AA credentials are
shared and activated with the FinBox team.

**b. Net Banking Integration:**

Utilize the Frontend JavaScript SDK for seamless integration.

**c. PDF Upload Integration:**

Choose between SDK integration (JavaScript SDK) or APIs (Uploading via
Rest APIs). Support for scanned statements is available on request.

## Step 2: Select Session Upload Status Integration Method (Webhook/Polling)

For cases when the user has been shared the link, the status can be
monitored through webhook or API polling. Refer to the Webhook and
Polling sections for details.

## Step 3: Initiate Processing

After uploading statements through SDK/API, FinBox needs to be
notified that uploads have been completed and processing needs to
requested by calling Initiate Processing API

## Step 4: Check Processing Status

Once the processing has begun, status for processing can be monitored
through webhook or API polling. Refer to the Webhook and Polling
sections for details.

## Step 5: Utilize Enrich APIs

Upon receiving webhook confirmation or in polling ("status" and
"transaction_status" both: "completed" for all the statements),
proceed to use Analysis APIs for specific analysis and information
based on the uploaded bank statement.
