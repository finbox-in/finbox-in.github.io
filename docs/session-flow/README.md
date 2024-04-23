# BankConnect: Overview
FinBox BankConnect allows users to submit their bank account statements
via Account Aggregator (AA), Net banking or manual upload methods in your application, then processes them and
shares the enriched data with you.

BankConnect is currently used in use-cases such as personal and business
loan disbursals by platforms and lenders in their respective online / offline journeys.

This guide will help you integrate BankConnect in your application flow.

Watch the video below then head towards the [Basics](/bank-connect/basics.html) section to understand the basic terms associated with BankConnect.

<!-- ## Understanding the Integration Flow
The video below gives a brief overview of the BankConnect Integration flow: -->

<!-- <div class="embed-container">
<iframe src="https://www.youtube.com/embed/OC2eBqeCKrs?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div> -->


## Getting API Keys
BankConnect requires API Keys to initialize the SDK and/or access the REST APIs. There will be separate keys for **DEV** and **PROD** environments. APIs for fetching enriched data also require an additional **Server Hash**.

You can get your keys on [FinBox Dashboard](https://dashboard.finbox.in/). Please login to the BankConnect Dashboard using the credentials shared with you by the Finbox team. Once you're in, head to the Settings \> Configurations tab, where you'll find the Integration Keys (Bank Connect). These keys are essential for making API calls in your workflow.


<!-- ## Postman Collection
Postman **collection** and **environment** for BankConnect REST APIs can be downloaded using the buttons below:

<div class="button_holder">
<a class="download_button" download href="/finbox_bankconnect.postman_collection.json">Download Collection</a>
<a class="download_button" download href="/finbox_bankconnect.postman_environment.json">Download Environment</a>
</div>

Please replace `x-api-key` and `server-hash` in the Postman environment with the **API Key** and **Server Hash** provided by FinBox Team. -->
