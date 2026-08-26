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
 * Post a text message to a Slack channel or conversation.
 *
 * POST /api/chat.postMessage —
 * https://docs.slack.dev/reference/methods/chat.postMessage
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Slack or calls the faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { SLACK } from "../service.js";

export const MESSAGE_POST_OPERATION = "message_post";

export type MessagePostOptions = {
  /** The node's resolved config. Keys: channel, text. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function slackMessagePost(options: MessagePostOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.channel === undefined || config.channel === null || config.channel === "") {
    throw new Error(`message_post: "channel" is required (Channel).`);
  }

  if (config.text === undefined || config.text === null || config.text === "") {
    throw new Error(`message_post: "text" is required (Message).`);
  }

  const result = await callConnector(SLACK, {
    operation: MESSAGE_POST_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/api/chat.postMessage",
      json: {
        "channel": String(config.channel),
        "text": String(config.text),
      },
    },
  });

  // Slack answers HTTP 200 with `{ok: false}` for an application-level
  // failure. A status check alone reads that as success, so the call is
  // reported as having worked and the next node receives a body that says
  // otherwise.
  const data = result.data as Record<string, unknown> | undefined;

  if (data?.ok === false) {
    throw new Error(
      `message_post: Slack rejected chat.postMessage — ` +
        String(data.error ?? "no reason given"),
    );
  }

  return result;
}
