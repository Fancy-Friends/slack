/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack's node kinds for fancy-flow.
 *
 * Install this on every host. The TypeScript executors live in the js
 * package's `./flow` subpath; PHP and Python hosts run their own and need only
 * this.
 */

export * from "./service.js";
export * from "./kinds/message-post.js";
export * from "./kinds/message-update.js";
export * from "./kinds/user-lookup-by-email.js";
export * from "./kinds/block-actions.js";

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { slackMessageKind } from "./kinds/message-post.js";
import { slackMessageUpdateKind } from "./kinds/message-update.js";
import { slackUserLookupByEmailKind } from "./kinds/user-lookup-by-email.js";
import { slackBlockActionsKind } from "./kinds/block-actions.js";

/** Every Slack kind, for a host that registers the lot. */
export const SLACK_KINDS: NodeKindDefinition[] = [
  slackMessageKind,
  slackMessageUpdateKind,
  slackUserLookupByEmailKind,
  slackBlockActionsKind,
];
