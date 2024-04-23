# Acceptance Criteria

Acceptance criteria refer to predefined conditions or standards that
must be met for a statement upload to be considered successful.
BankConnect employs two levels of validation during the statement upload
process, each with its own set of criteria:

## Level 1 Validation (Real-time during Upload):

-   **Missing Upload Months** **(Default):** Verify that all months
    within the specified duration are included in the uploaded
    statement.

-   **Missing Upload Date Range:** Ensure that the complete date range
    specified in the statement is uploaded without any gaps. Optionally,
    a specified number of missing days can be tolerated.

Errors encountered during Level 1 validation are presented to the user
immediately during the upload process.

## Level 2 Validation (Post-processing):

-   **At Least One Transaction:** Validate that there is at least one
    transaction present within the specified duration.

-   **At Least One Transaction in Start and End Months:** Confirm that
    there is at least one transaction in both the start and end months
    of the specified duration.

-   **At Least One Transaction Per Month (Default):** Ensure that there
    is at least one transaction per month within the specified duration.

Errors encountered during Level 2 validation are communicated through
the webhook or status APIs after the statement has been processed.

These acceptance criteria serve to constrain the conditions under which
the user\'s data should be accepted and report generated.

**Note:** The FinBox team has the authority to configure acceptance
criteria based on your requirements. Once determined, the chosen
acceptance criteria can be shared with the team. This configuration is a
one-time setup and can encompass any combination of the options provided
above.