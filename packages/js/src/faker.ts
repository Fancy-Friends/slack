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

export const slackFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "message_post":
      return fakeMessagePost(request);

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
