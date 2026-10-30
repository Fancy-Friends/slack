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
 * Slack's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about SLACK. Two Slack triggers must not be able
 * to disagree about how a delivery is verified.
 */

import { decodeDelivery, verifyDelivery, type DeliveryDecode, type HmacScheme, type InboundDelivery, type TriggerDescriptor, type WebhookVerification } from "@particle-academy/fancy-connector-core";
import { slackFaker } from "../faker.js";

export const SLACK_BLOCK_ACTIONS_SIGNATURE_HEADER = "X-Slack-Signature";
/** The provider's documented replay window, in seconds. */
export const SLACK_BLOCK_ACTIONS_TOLERANCE = 300;

export const SLACK_BLOCK_ACTIONS_SCHEME: HmacScheme = {
  algorithm: "SHA-256",
  payload: (raw, timestamp) => `v0:${timestamp}:${raw}`,
  tolerance: SLACK_BLOCK_ACTIONS_TOLERANCE,
  encoding: "hex",
};

/** Strip the `v0=` prefix the provider sends. */
export function parseSlackSignature(raw: string): { signature?: string } {
  return { signature: raw.startsWith("v0=") ? raw.slice(3) : raw };
}

export const SLACK_BLOCK_ACTIONS_DECODE: DeliveryDecode = {
  kind: "form-field-json",
  field: "payload",
};

export const SLACK_BLOCK_ACTIONS: TriggerDescriptor = {
  service: "slack",
  operation: "block_actions",
  delivery: "webhook",
  setup:
    "In the Slack app's Interactivity & Shortcuts settings, turn interactivity on and set the Request URL to the route your host mounts for this trigger, then put the app's signing secret (Basic Information) on the connection as `signingSecret`. Slack shows the user an error unless the request is answered with a 200 within 3 seconds, so the host must acknowledge FIRST and run the graph after.",
  verification: {
    signatureHeader: SLACK_BLOCK_ACTIONS_SIGNATURE_HEADER,
    scheme: SLACK_BLOCK_ACTIONS_SCHEME,
    timestampHeader: "X-Slack-Request-Timestamp",
    parse: parseSlackSignature,
  },
  decode: SLACK_BLOCK_ACTIONS_DECODE,
  faker: slackFaker,
};

/**
 * Verify one inbound Slack delivery.
 *
 * The host calls this BEFORE starting a run, with the body exactly as
 * received. Re-serialised JSON changes key order and whitespace, and produces
 * a mismatch that looks precisely like a wrong secret — hours of debugging the
 * wrong thing.
 *
 * The secret is the connection's `signingSecret`.
 */
export function verifySlackDelivery(
  delivery: InboundDelivery,
  signingSecret: string | undefined,
  now?: number,
): Promise<WebhookVerification> {
  return verifyDelivery(SLACK_BLOCK_ACTIONS, delivery, signingSecret, now);
}

/**
 * Read one VERIFIED Slack delivery.
 *
 * The body is not plain JSON: it is form-field-json, with the payload in the
 * `payload` field. The host calls this AFTER `verifySlackDelivery` has
 * accepted the delivery, with the SAME raw bytes, and starts the run with what
 * it returns. A body that cannot be read is refused by name, never passed on.
 */
export function decodeSlackDelivery(raw: Uint8Array | string): unknown {
  return decodeDelivery(SLACK_BLOCK_ACTIONS_DECODE, raw);
}
