/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/block-actions.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/block-actions.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack button click — Start when someone clicks a button or picks from a menu
 * in a Slack message the app posted.
 *
 * https://docs.slack.dev/interactivity/handling-user-interaction
 *
 * Delivery: webhook. In the Slack app's Interactivity & Shortcuts settings,
 * turn interactivity on and set the Request URL to the route your host mounts
 * for this trigger, then put the app's signing secret (Basic Information) on
 * the connection as `signingSecret`. Slack shows the user an error unless the
 * request is answered with a 200 within 3 seconds, so the host must
 * acknowledge FIRST and run the graph after.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { slackMeta } from "../service.js";

export const SLACK_BLOCK_ACTIONS_KIND = "@particle-academy/slack_block_actions";
export const SLACK_BLOCK_ACTIONS_OPERATION = "block_actions";

export const SLACK_BLOCK_ACTIONS_META = slackMeta("trigger", "a click in a Slack message", "https://docs.slack.dev/interactivity/handling-user-interaction");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const SLACK_BLOCK_ACTIONS_OUTPUT: OutputField[] = [
  {
    "path": "type",
    "type": "string",
    "description": "Always block_actions for this trigger."
  },
  {
    "path": "team.id",
    "type": "string",
    "description": "The workspace the click came from."
  },
  {
    "path": "enterprise",
    "type": "object",
    "description": "The Enterprise Grid org ({id}), or NULL outside Grid."
  },
  {
    "path": "user.id",
    "type": "string",
    "description": "The Slack user who clicked. Map it to your own user on the host; user_lookup_by_email helps build that map."
  },
  {
    "path": "user.team_id",
    "type": "string",
    "description": "The workspace the user belongs to."
  },
  {
    "path": "channel",
    "type": "object",
    "description": "The conversation ({id}) holding the message, or NULL when the click came from a surface with no channel."
  },
  {
    "path": "message",
    "type": "object",
    "description": "The message ({ts}) the click was on, or NULL. Pass channel.id and message.ts to message_update to change it."
  },
  {
    "path": "trigger_id",
    "type": "string",
    "description": "Slack's short-lived id for opening a modal in response."
  },
  {
    "path": "response_url",
    "type": "string",
    "description": "Slack's reply URL for this click. Published for completeness; this package never posts to it — use message_update."
  },
  {
    "path": "actions[].action_id",
    "type": "string",
    "description": "Which button or menu was used. Route on this."
  },
  {
    "path": "actions[].block_id",
    "type": "string",
    "description": "The block holding it."
  },
  {
    "path": "actions[].type",
    "type": "string",
    "description": "button, static_select, …"
  },
  {
    "path": "actions[].value",
    "type": "string",
    "description": "A button's value, or NULL for elements that carry none."
  },
  {
    "path": "actions[].selected_option",
    "type": "object",
    "description": "A menu's choice ({value}), or NULL for a button."
  },
  {
    "path": "actions[].action_ts",
    "type": "string",
    "description": "When the action happened."
  }
];

export const slackBlockActionsKind: NodeKindDefinition = defineConnectorKind(SLACK_BLOCK_ACTIONS_META, {
  name: SLACK_BLOCK_ACTIONS_KIND,
  aliases: ["slack_block_actions"],
  label: "Slack button click",
  description: "Start when someone clicks a button or picks from a menu in a Slack message the app posted.",
  inputs: [],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: SLACK_BLOCK_ACTIONS_OUTPUT,
  configSchema: [],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(SLACK_BLOCK_ACTIONS_META, config as Record<string, unknown>, "a click in a Slack message"),
});
