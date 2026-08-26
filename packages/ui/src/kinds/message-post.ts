/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-post.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-post.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack message — Post a text message to a Slack channel or conversation.
 *
 * https://docs.slack.dev/reference/methods/chat.postMessage
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { slackMeta } from "../service.js";

export const SLACK_MESSAGE_KIND = "@particle-academy/slack_message";
export const SLACK_MESSAGE_OPERATION = "message_post";

export const SLACK_MESSAGE_META = slackMeta("action", "post a Slack message", "https://docs.slack.dev/reference/methods/chat.postMessage");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const SLACK_MESSAGE_OUTPUT: OutputField[] = [
  {
    "path": "data.ok",
    "type": "boolean",
    "description": "True after resultCheck has established Slack accepted the message."
  },
  {
    "path": "data.channel",
    "type": "string",
    "description": "The conversation that received the message."
  },
  {
    "path": "data.ts",
    "type": "string",
    "description": "Slack's message timestamp and stable message identifier within the channel."
  },
  {
    "path": "data.message",
    "type": "object",
    "description": "The message object Slack stored, including its text and authorship metadata."
  }
];

export const slackMessageKind: NodeKindDefinition = defineConnectorKind(SLACK_MESSAGE_META, {
  name: SLACK_MESSAGE_KIND,
  aliases: ["slack_message"],
  label: "Slack message",
  description: "Post a text message to a Slack channel or conversation.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: SLACK_MESSAGE_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "channel",
      "label": "Channel",
      "required": true,
      "description": "The encoded channel, private group, direct-message or group-message conversation ID visible to the installed app."
    },
    {
      "type": "textarea",
      "key": "text",
      "label": "Message",
      "required": true,
      "description": "The message's top-level text. Keeping meaningful text here also gives screen readers a complete fallback when richer blocks are added elsewhere."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(SLACK_MESSAGE_META, config as Record<string, unknown>, "post a Slack message"),
});
