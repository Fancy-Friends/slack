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
 * Find the Slack user in this workspace who has a given email address.
 *
 * GET /api/users.lookupByEmail —
 * https://docs.slack.dev/reference/methods/users.lookupByEmail
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

export const USER_LOOKUP_BY_EMAIL_OPERATION = "user_lookup_by_email";

export type UserLookupByEmailOptions = {
  /** The node's resolved config. Keys: email. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function slackUserLookupByEmail(options: UserLookupByEmailOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.email === undefined || config.email === null || config.email === "") {
    throw new Error(`user_lookup_by_email: "email" is required (Email).`);
  }

  const result = await callConnector(SLACK, {
    operation: USER_LOOKUP_BY_EMAIL_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "GET",
      path: "/api/users.lookupByEmail",
      query: {
        "email": String(config.email).trim(),
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
      `user_lookup_by_email: Slack rejected users.lookupByEmail — ` +
        String(data.error ?? "no reason given"),
    );
  }

  return result;
}
