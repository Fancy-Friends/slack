/*
 * Slack — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { slackFaker } from "@particle-academy/slack-js";
import { SLACK_KINDS } from "@particle-academy/slack-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/slack-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "message_post",
    "config": {},
    "expected": {
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
    }
  },
  {
    "operation": "message_update",
    "config": {},
    "expected": {
      "ok": true,
      "channel": "C123ABC456",
      "ts": "1787719200.000100",
      "text": "Ticket #42 assigned to Rosa."
    }
  },
  {
    "operation": "user_lookup_by_email",
    "config": {},
    "expected": {
      "ok": true,
      "user": {
        "id": "U2CERLKJA",
        "team_id": "T1DC2JH3J",
        "name": "rosa",
        "real_name": "Rosa Diaz",
        "deleted": false,
        "is_bot": false
      }
    }
  },
  {
    "operation": "block_actions",
    "config": {},
    "expected": {
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
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = slackFaker(operation, fakeRequest("slack", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(SLACK_KINDS.length, 4);
for (const kind of SLACK_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/slack-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
