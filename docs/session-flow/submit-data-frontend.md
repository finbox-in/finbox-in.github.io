---
base_url: https://apis.bankconnect.finbox.in/bank-connect #base URL for the API
version: v1 # version of API
---


### Frontend integration (JavaScript SDK)

The JavaScript Client SDK helps users submit their bank statements via
upload, net banking credentials or in your Web applications. The SDK
will be opened via a web URL.

The first step in integration involves calling the Session API Then the
workflow can be implemented in one of the following ways:

### Redirection Workflow

<img src="/redirect-workflow.png" alt="Redirect Workflow" />

The flow for this involves following steps:

- Create a session using Session API

- Get the URL received from above API and open it in a new tab

- On success / exit, Client SDK will redirect to the specified
  redirect URL with parameters as follows:
  - Exit: `{url}?success=false`
  - Success: `{url}?success=true&session_id=<some-session-id>`

<b>NOTE</b>: Since there is no callback received on this flow, it is recommended to configure Webhook
