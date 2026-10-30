/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ + triggers/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ + triggers/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack's node kinds with their TypeScript executors attached — for hosts that
 * EXECUTE on TS.
 *
 * The authoring surface in @particle-academy/slack-ui carries no executor: the
 * editor is React on every host, so a PHP or Python project installs the ui
 * package and never this one.
 */

import type { NodeExecutor, NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import {
  idempotencyKeyFor,
  NO_IDEMPOTENCY_KEY_WARNING,
  resolveConnection,
  triggerEvent,
  type RequestedMode,
} from "@particle-academy/fancy-connector-core";
import { SLACK } from "./service.js";

import {
  slackMessageKind,
  slackMessageUpdateKind,
  slackUserLookupByEmailKind,
  slackBlockActionsKind,
} from "@particle-academy/slack-ui";

import { slackMessagePost } from "./actions/message-post.js";
import { slackMessageUpdate } from "./actions/message-update.js";
import { slackUserLookupByEmail } from "./actions/user-lookup-by-email.js";
import { SLACK_BLOCK_ACTIONS } from "./triggers/block-actions.js";

export const slackMessageExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await slackMessagePost({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `slack message_post ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const slackMessageUpdateExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await slackMessageUpdate({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `slack message_update ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const slackUserLookupByEmailExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});

  const result = await slackUserLookupByEmail({
    config,
    input: ctx.inputs?.in,
  });

  ctx.emit({
    type: "log",
    level: "info",
    nodeId: ctx.node.id,
    message: `slack user_lookup_by_email ${(result.data as { id?: string })?.id} (${result.mode})`,
  });

  return { __port: "out", value: result };
};

export const slackBlockActionsExecutor: NodeExecutor = async (ctx) => {
  const config = ((ctx.node.data as { config?: Record<string, unknown> })?.config ?? {});
  const connection = resolveConnection({
    service: SLACK.service,
    operation: "block_actions",
    sandbox: SLACK.sandbox,
    baseUrls: SLACK.baseUrls,
    requires: SLACK.requires,
    connectionId: typeof config.connection === "string" ? config.connection : null,
    requested: typeof config.mode === "string" ? (config.mode as RequestedMode) : null,
  });

  const event = triggerEvent(SLACK_BLOCK_ACTIONS, connection, ctx.inputs?.in, config);

  return { __port: "out", value: event };
};

/** The kinds a TypeScript host registers. */
export const SLACK_RUNNABLE_KINDS: NodeKindDefinition[] = [
  { ...slackMessageKind, executor: slackMessageExecutor },
  { ...slackMessageUpdateKind, executor: slackMessageUpdateExecutor },
  { ...slackUserLookupByEmailKind, executor: slackUserLookupByEmailExecutor },
  { ...slackBlockActionsKind, executor: slackBlockActionsExecutor },
];
