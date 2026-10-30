# Changelog

All notable changes to `@particle-academy/slack-ui`,
`@particle-academy/slack-js`, `particle-academy/slack-php` and `fancy-slack`.

## [0.2.0] — 2026-10-28

### Added

- **`block_actions`: a trigger for button clicks and menu choices.** Slack
  posts interactivity as `application/x-www-form-urlencoded` with ONE field,
  `payload`, holding the JSON, and signs the form body as sent. So every
  delivery is verified first, over the raw bytes (`X-Slack-Signature`, `v0=`
  + HMAC-SHA256 of `v0:{timestamp}:{body}`, with `X-Slack-Request-Timestamp`
  inside a 300-second replay window), and decoded second. The decode
  functions are `decodeSlackDelivery` (js), `BlockActions::decodeDelivery`
  (php) and `decode_delivery` (python). The event is published as it
  arrives: `type`, `team`, `enterprise`, `user`, `channel`, `message`,
  `trigger_id`, `response_url`, and `actions[]` with `action_id`,
  `block_id`, `type`, `value`, `selected_option` and `action_ts`. A field
  Slack did not send is `null`, never `""`. **Slack shows the user an error
  unless the request is answered with a 200 within 3 seconds**, so a host
  acknowledges first and runs the graph after. Verified against Slack's own
  worked example from "Verifying requests from Slack" in PHP and Python.
- **`message_update`: edit a message the app posted** (`chat.update`,
  addressed by `channel` + `ts`). Declared `idempotent`, because replacing a
  message with the same content is harmless. This is what a host calls after
  a click. The click's `response_url` is deliberately never used: it is a URL
  taken from a delivery, so posting to it would make the package contact an
  address the request chose.
- **`user_lookup_by_email`: find the Slack user with an email address**
  (`users.lookupByEmail`, a read). It exists so a host can map Slack users to
  its own; storing that map stays with the host. `users_not_found` arrives
  as Slack's own reason, not as an empty result.
- **`blocks` on `message_post`**: an optional Block Kit layout, buttons
  included. `text` stays required, because it is what screen readers and
  notifications show. A JSON string is parsed, an already-parsed array from
  an upstream node passes through untouched, invalid JSON is refused by name
  before any request is built, and an empty value is left out.
- **`signingSecret`**, a credential scoped to the provider (one value for the
  whole Slack app). It is needed only by `block_actions`.

### Changed

- **Scopes:** `users:read` and `users:read.email` join `chat:write`, for
  `user_lookup_by_email`. An existing installation must be re-authorised to
  grant them before that action can run. Nothing else needs them.
- **Requires `fancy-connector-core` ≥ 0.11.0**, for `decodeDelivery` /
  `DeliveryDecode`. The floor is raised for Slack only; it is derived from
  the trigger that decodes.

## [0.1.3] — 2026-09-12

### Changed

- **Requires `fancy-connector-core` ≥ 0.4.0** — `particle-academy/fancy-connector-core` for php, `@particle-academy/fancy-connector-core` for js. The flow executors now pass a provider's declared `idempotencyMaxLength` through to the core's key derivation, and a named argument an older core does not accept is a fatal rather than a no-op, so the floor moves with it. This connector declares no limit and passes nothing, so nothing else changes for it; the bump is the floor alone.

## [0.1.2] — 2026-09-11

### Added

- **`fancy-flow-php` executors for every node.** `src/Flow/` carries one `#[FlowNode]` class per action and trigger, and `SlackFlow::EXECUTORS` lists them.

A Laravel host running fancy-flow-php could show this connector's nodes in its editor and could not run them: `particle-academy/slack-php` shipped the request builders and no executor. Each one is the PHP twin of the executor in `@particle-academy/slack-js` — the same kind, the same request, the same value on `out` — and an unsafe-to-replay action derives its idempotency key from the run and the node, so a retried durable run sends the key it sent the first time.

Register them by adding `vendor/particle-academy/slack-php/packages/php/src/Flow` to `config('fancy-flow.discover')`. `particle-academy/fancy-flow-php` is SUGGESTED, not required, and conflicts outside `>=0.51.0 <2.0`, the range the executors were tested under. Nothing outside `Flow\` needs it.

### Fixed

- **Fake mode through `ConnectorClient` threw.** `Slack::descriptor()` handed the connector core its faker as `SlackFaker::respond(...)`, which takes `($operation, $request)`; the core calls a faker `($operation, $config, $fake, $input)`. So `$config` arrived as `$request` and every fake call died on "Call to a member function … on null". The descriptor now translates between the two. Calling `SlackFaker::respond()` directly — what this package's own tests do, which is why they never saw it — is unchanged.

## [0.1.1] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/slack-ui@0.1.1` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.1.0.

- **`repository.directory` in the npm packages.**

`@particle-academy/slack-ui` and `@particle-academy/slack-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.1.0] - 2026-08-26

### Added

- Post text messages through Slack's JSON Web API.
- Reject HTTP-success responses whose body reports `ok: false`.
- OAuth V2 with required single-use refresh-token rotation.
- Dedicated development-workspace sandbox guidance.
- A deterministic fixture matching Slack's top-level success response.

[0.1.0]: https://github.com/Fancy-Friends/slack/releases/tag/v0.1.0
