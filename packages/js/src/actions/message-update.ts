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
 * Replace the text and blocks of a Slack message the app posted.
 *
 * POST /api/chat.update — https://docs.slack.dev/reference/methods/chat.update
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Slack or calls the faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { SLACK } from "../service.js";

export const MESSAGE_UPDATE_OPERATION = "message_update";

export type MessageUpdateOptions = {
  /** The node's resolved config. Keys: channel, ts, text, blocks. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function slackMessageUpdate(options: MessageUpdateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.channel === undefined || config.channel === null || config.channel === "") {
    throw new Error(`message_update: "channel" is required (Channel).`);
  }

  if (config.ts === undefined || config.ts === null || config.ts === "") {
    throw new Error(`message_update: "ts" is required (Message ts).`);
  }

  if (config.text === undefined || config.text === null || config.text === "") {
    throw new Error(`message_update: "text" is required (Message).`);
  }

  if (typeof config.blocks === "string" && config.blocks !== "") {
    try {
      JSON.parse(config.blocks);
    } catch (error) {
      throw new Error(`message_update: "blocks" must be JSON: ${(error as Error).message}`);
    }
  }

  const result = await callConnector(SLACK, {
    operation: MESSAGE_UPDATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/api/chat.update",
      json: {
        "channel": String(config.channel),
        "ts": String(config.ts),
        "text": String(config.text),
        ...(config.blocks !== undefined && config.blocks !== null && config.blocks !== "" ? { "blocks": typeof config.blocks === "string" ? JSON.parse(config.blocks) : config.blocks } : {}),
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
      `message_update: Slack rejected chat.update — ` +
        String(data.error ?? "no reason given"),
    );
  }

  return result;
}
