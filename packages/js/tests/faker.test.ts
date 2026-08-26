/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { slackFaker } from "../src/faker.js";

test("message_post fakes the shape Slack publishes", () => {
  const config = {};

  const faked = slackFaker("message_post", fakeRequest("slack", "message_post", config));

  assert.deepEqual(faked, {
    "ok": true,
    "channel": "C123ABC456",
    "ts": "1787719200.000100",
    "message": {
      "user": "U012AB3CDE",
      "type": "message",
      "ts": "1787719200.000100",
      "text": "Deployment finished successfully.",
      "app_id": "A012BC3DEF",
      "bot_id": "B012AB3CD"
    }
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => slackFaker("no_such_operation", fakeRequest("slack", "no_such_operation", {})), /no fake response/);
});
