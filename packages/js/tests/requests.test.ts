/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * What Slack actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { slackMessagePost } from "../src/actions/message-post.js";
import { slackMessageUpdate } from "../src/actions/message-update.js";
import { slackUserLookupByEmail } from "../src/actions/user-lookup-by-email.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "clientId": "test_clientId",
  "clientSecret": "test_clientSecret",
  "accessToken": "test_accessToken",
  "refreshToken": "test_refreshToken",
  "signingSecret": "test_signingSecret"
};

test("message_post sends POST /api/chat.postMessage", async () => {
  const { seen, transport } = capture();

  await slackMessagePost({
    config: {
      "channel": "example-channel",
      "text": "example-text",
      "blocks": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Ticket *42*\"}}]"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/api/chat.postMessage"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "channel": "example-channel",
    "text": "example-text",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Ticket *42*"
        }
      }
    ]
  });
});

test("message_update sends POST /api/chat.update", async () => {
  const { seen, transport } = capture();

  await slackMessageUpdate({
    config: {
      "channel": "example-channel",
      "ts": "example-ts",
      "text": "example-text",
      "blocks": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Ticket *42*\"}}]"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/api/chat.update"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "channel": "example-channel",
    "ts": "example-ts",
    "text": "example-text",
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "Ticket *42*"
        }
      }
    ]
  });
});

test("user_lookup_by_email sends GET /api/users.lookupByEmail", async () => {
  const { seen, transport } = capture();

  await slackUserLookupByEmail({
    config: {
      "email": "  Example-email  "
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "GET");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/api/users.lookupByEmail"), seen[0]!.url);

  assert.deepEqual(
    Object.fromEntries(new URL(seen[0]!.url).searchParams),
    {
      "email": "Example-email"
    },
  );
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await slackMessagePost({
    config: {
      "channel": "example-channel",
      "text": "example-text",
      "blocks": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Ticket *42*\"}}]"
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers.Authorization, "Bearer test_accessToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    slackMessagePost({
      config: {
        "text": "example-text",
        "blocks": "[{\"type\":\"section\",\"text\":{\"type\":\"mrkdwn\",\"text\":\"Ticket *42*\"}}]"
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("channel"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
