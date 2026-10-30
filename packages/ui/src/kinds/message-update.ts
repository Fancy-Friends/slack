/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack message update — Replace the text and blocks of a Slack message the
 * app posted.
 *
 * https://docs.slack.dev/reference/methods/chat.update
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { slackMeta } from "../service.js";

export const SLACK_MESSAGE_UPDATE_KIND = "@particle-academy/slack_message_update";
export const SLACK_MESSAGE_UPDATE_OPERATION = "message_update";

export const SLACK_MESSAGE_UPDATE_META = slackMeta("action", "update a Slack message", "https://docs.slack.dev/reference/methods/chat.update");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const SLACK_MESSAGE_UPDATE_OUTPUT: OutputField[] = [
  {
    "path": "data.ok",
    "type": "boolean",
    "description": "True after resultCheck has established Slack accepted the update."
  },
  {
    "path": "data.channel",
    "type": "string",
    "description": "The conversation holding the message."
  },
  {
    "path": "data.ts",
    "type": "string",
    "description": "The updated message's ts, unchanged by the update."
  },
  {
    "path": "data.text",
    "type": "string",
    "description": "The message text as Slack stored it."
  }
];

export const slackMessageUpdateKind: NodeKindDefinition = defineConnectorKind(SLACK_MESSAGE_UPDATE_META, {
  name: SLACK_MESSAGE_UPDATE_KIND,
  aliases: ["slack_message_update"],
  label: "Slack message update",
  description: "Replace the text and blocks of a Slack message the app posted.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "idempotent",
  outputShape: SLACK_MESSAGE_UPDATE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "channel",
      "label": "Channel",
      "required": true,
      "description": "The conversation ID holding the message, as returned when it was posted or carried in a click."
    },
    {
      "type": "text",
      "key": "ts",
      "label": "Message ts",
      "required": true,
      "description": "The message's ts, its stable identifier within the channel."
    },
    {
      "type": "textarea",
      "key": "text",
      "label": "Message",
      "required": true,
      "description": "The replacement top-level text, kept as the accessible fallback for the blocks."
    },
    {
      "type": "json",
      "key": "blocks",
      "label": "Blocks",
      "description": "Optional replacement Block Kit layout: a JSON array of blocks."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(SLACK_MESSAGE_UPDATE_META, config as Record<string, unknown>, "update a Slack message"),
});
