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
 * The Slack faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES Slack actually publishes, so an author can wire {{ $json.data.id }}
 * against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeMessagePost({ config, fake }: FakeRequest): unknown {
  return {
    "ok": true,
    "channel": "C123ABC456",
    "ts": "1787719200.000100",
    "message": {
      "user": "U012AB3CDE",
      "type": "message",
      "ts": "1787719200.000100",
      "text": "Deployment finished successfully.",
      "app_id": "A012BC3DEF",
      "bot_id": "B012AB3CD",
    },
  };
}

function fakeMessageUpdate({ config, fake }: FakeRequest): unknown {
  return {
    "ok": true,
    "channel": "C123ABC456",
    "ts": "1787719200.000100",
    "text": "Ticket #42 assigned to Rosa.",
  };
}

function fakeUserLookupByEmail({ config, fake }: FakeRequest): unknown {
  return {
    "ok": true,
    "user": {
      "id": "U2CERLKJA",
      "team_id": "T1DC2JH3J",
      "name": "rosa",
      "real_name": "Rosa Diaz",
      "deleted": false,
      "is_bot": false,
    },
  };
}

function fakeBlockActions({ config, fake }: FakeRequest): unknown {
  return {
    "type": "block_actions",
    "team": {
      "id": "T1DC2JH3J",
      "domain": "testteamnow",
    },
    "enterprise": null,
    "user": {
      "id": "U2CERLKJA",
      "username": "roadrunner",
      "team_id": "T1DC2JH3J",
    },
    "channel": {
      "id": "C0123ABCD",
      "name": "support",
    },
    "message": {
      "type": "message",
      "ts": "1730070000.000100",
      "text": "Ticket #42: Printer on fire",
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
        "action_ts": "1730070012.345678",
      },
    ],
  };
}

export const slackFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "message_post":
      return fakeMessagePost(request);

    case "message_update":
      return fakeMessageUpdate(request);

    case "user_lookup_by_email":
      return fakeUserLookupByEmail(request);

    case "block_actions":
      return fakeBlockActions(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `slack: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
