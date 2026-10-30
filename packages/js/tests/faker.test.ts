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

test("message_update fakes the shape Slack publishes", () => {
  const config = {};

  const faked = slackFaker("message_update", fakeRequest("slack", "message_update", config));

  assert.deepEqual(faked, {
    "ok": true,
    "channel": "C123ABC456",
    "ts": "1787719200.000100",
    "text": "Ticket #42 assigned to Rosa."
  });
});

test("user_lookup_by_email fakes the shape Slack publishes", () => {
  const config = {};

  const faked = slackFaker("user_lookup_by_email", fakeRequest("slack", "user_lookup_by_email", config));

  assert.deepEqual(faked, {
    "ok": true,
    "user": {
      "id": "U2CERLKJA",
      "team_id": "T1DC2JH3J",
      "name": "rosa",
      "real_name": "Rosa Diaz",
      "deleted": false,
      "is_bot": false
    }
  });
});

test("block_actions fakes the shape Slack publishes", () => {
  const config = {};

  const faked = slackFaker("block_actions", fakeRequest("slack", "block_actions", config));

  assert.deepEqual(faked, {
    "type": "block_actions",
    "team": {
      "id": "T1DC2JH3J",
      "domain": "testteamnow"
    },
    "enterprise": null,
    "user": {
      "id": "U2CERLKJA",
      "username": "roadrunner",
      "team_id": "T1DC2JH3J"
    },
    "channel": {
      "id": "C0123ABCD",
      "name": "support"
    },
    "message": {
      "type": "message",
      "ts": "1730070000.000100",
      "text": "Ticket #42: Printer on fire"
    },
    "trigger_id": "398738663015.47445629121.803a0bc887a14d10d2c447fce8b6703c",
    "response_url": "https://hooks.slack.com/actions/T1DC2JH3J/397700885554/96rGlfmibIGlgcZRskXaIFfN",
    "actions": [
      {
        "action_id": "ticket_assign_me",
        "block_id": "ticket_42",
        "type": "button",
        "value": "42",
        "selected_option": null,
        "action_ts": "1730070012.345678"
      }
    ]
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => slackFaker("no_such_operation", fakeRequest("slack", "no_such_operation", {})), /no fake response/);
});
