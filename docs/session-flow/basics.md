# BankConnect: Basics
One must be familiar with following terms before starting with BankConnect Integration Process:


<img src="/key-terms.png" alt="Basic Terms" />

## Link ID
A unique identifier provided by the client to reference an individual user.
This is used to uniquely identify a user throughout the BankConnect integration process. This identifier is referred to as `link_id`.

## Session
Instances generated to initiate the BankConnect process are called `sessions`. The creation of a session can be achieved through the Sessions API. Every BankConnect journey is associated with a specific session. Each session is valid for a defined TTL (Time To Live) of x time.

## Account
Bank accounts connected within a session, located in the same or different banks. These bank accounts are referred to as simply **Accounts** in BankConnect. FinBox refers to each account within a session using a unique identifier, `account_id`.

## Statement
Bank transaction records submitted or fetched within a session, identified by a unique statement_id. Multiple statements can be uploaded for a given account over a period. When multiple statements are uploaded against an entity, BankConnect automatically recognizes the bank account and assigns the `account_id` to the statement. Each statement is referred using a unique identifier called `statement_id`.


## Note
You have the flexibility to generate multiple sessions for an individual user, also referred as a `link_id` in BankConnect. Each session exclusively provides responses for the statements uploaded within that specific session. 
It's important to note that data from different sessions cannot be combined.
For instance, when a customer visits your platform, you initiate BankConnect with a new session_id. The customer uploads multiple statements to cover a 6-month duration. If the customer returns after 3 months, a new session must be created for that subsequent interaction.


Now since these terms are clear, you can head towards the next section [Integration Pre-requisite](/session-flow/integration-steps.html) to understand the integration process.