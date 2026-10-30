/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/user-lookup-by-email.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/user-lookup-by-email.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack user lookup by email — Find the Slack user in this workspace who has a
 * given email address.
 *
 * https://docs.slack.dev/reference/methods/users.lookupByEmail
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { slackMeta } from "../service.js";

export const SLACK_USER_LOOKUP_BY_EMAIL_KIND = "@particle-academy/slack_user_lookup_by_email";
export const SLACK_USER_LOOKUP_BY_EMAIL_OPERATION = "user_lookup_by_email";

export const SLACK_USER_LOOKUP_BY_EMAIL_META = slackMeta("action", "look up a Slack user by email", "https://docs.slack.dev/reference/methods/users.lookupByEmail");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const SLACK_USER_LOOKUP_BY_EMAIL_OUTPUT: OutputField[] = [
  {
    "path": "data.ok",
    "type": "boolean",
    "description": "True after resultCheck has established Slack found the user."
  },
  {
    "path": "data.user.id",
    "type": "string",
    "description": "The Slack user ID, the same value a click carries as user.id."
  },
  {
    "path": "data.user.team_id",
    "type": "string",
    "description": "The workspace the user belongs to."
  },
  {
    "path": "data.user.name",
    "type": "string",
    "description": "The user's handle."
  },
  {
    "path": "data.user",
    "type": "object",
    "description": "The full user object Slack returned."
  }
];

export const slackUserLookupByEmailKind: NodeKindDefinition = defineConnectorKind(SLACK_USER_LOOKUP_BY_EMAIL_META, {
  name: SLACK_USER_LOOKUP_BY_EMAIL_KIND,
  aliases: ["slack_user_lookup_by_email"],
  label: "Slack user lookup by email",
  description: "Find the Slack user in this workspace who has a given email address.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: SLACK_USER_LOOKUP_BY_EMAIL_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "email",
      "label": "Email",
      "required": true,
      "description": "The email address to look up. Requires the users:read.email scope."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(SLACK_USER_LOOKUP_BY_EMAIL_META, config as Record<string, unknown>, "look up a Slack user by email"),
});
