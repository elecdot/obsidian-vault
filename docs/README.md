# Vault Documentation

Use this guide to find an answer about the vault or choose where to record a change.

| What are you looking for? | Where it belongs |
| --- | --- |
| What do Note, Source, Activity, and Domain mean? | [Domain language](../CONTEXT.md) defines terms shared across the vault. |
| Why do we organize or maintain the vault this way? | [Design](design.md) records adopted workflows and their rationale. |
| What does a field mean, and which values can tools rely on? | [Metadata](metadata.md) defines fields, identity, ownership, and the registry the tools read. |
| How do I use the vault? | [Operations](operations.md) covers setup, writing commands, refinement, commits, and Git coverage. |
| How do I change a tool, template, view, or shared convention? | [Tooling](tooling.md) identifies the affected components and how to check a change. |
| What behavior has been verified, and where? | [Verification](verification.md) records coverage, runtime evidence, and its limits. |
| What still needs investigation or a later decision? | [Maintenance notes](maintenance-notes.md) tracks observations, open questions, and when to revisit them. |
| Which primary sources support the implementation? | [References](references.md) links to the relevant specifications and application documentation. |
| How will we assess the first real use of the vault? | [First use](first-use.md) gives the MoE research scenario and its completion criteria. |

For example, if a desktop command behaves unexpectedly, record the observation
in Maintenance notes. If testing establishes a limit that users will encounter,
record the evidence in Verification. If the procedure changes, update Operations.
The [maintenance workflow](design.md#vault-maintenance) explains when to close the item.
