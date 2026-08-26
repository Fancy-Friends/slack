# Slack

Slack for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/slack-ui` | `npm install @particle-academy/slack-ui` |
| Node | `@particle-academy/slack-js` | `npm install @particle-academy/slack-js` |
| PHP 8.4+ | `particle-academy/slack-php` | `composer require particle-academy/slack-php` |
| Python 3.11+ | `fancy-slack` | `pip install fancy-slack` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Slack SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Slack connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **Client ID** | per installation | not secret | The Slack app client ID shared by the installation. |
| **Client secret** | per installation | **secret** | The matching Slack app client secret used by OAuth V2. |
| **Bot access token** | per connected account | **secret** | The workspace installation's rotating bot token. Token rotation must be enabled; the token expires after 12 hours. |
| **Refresh token** | per connected account | **secret** | The workspace installation's single-use refresh token. Persist Slack's replacement after every refresh. |

### Authorising

Slack uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://slack.com/oauth/v2/authorize
- **Token URL** — https://slack.com/api/oauth.v2.access
- **Scopes** — `chat:write`
- **Access token lifetime** — 43200 seconds (12 hours). A host that never refreshes works all afternoon and is broken by morning.

**The refresh tokens ROTATE, and they are single use.** Every refresh returns a new one and spends the one submitted, so replaying a spent token revokes the ENTIRE grant — the user is signed out, with nothing in the failure that says why.

Two consequences, both of which a host gets wrong by default:

1. **Do not RETRY a failed refresh with the same token.** A response that arrived but was not persisted — a crash between the reply and the write — turns the reflexive retry into a replay.
2. **Do not refresh CONCURRENTLY.** Two workers refreshing at once means one of them replays.

Persist the returned token before using the access token it came with.

### The estate

Slack has a test estate on the same host, reached with credentials from a SEPARATE test account you register. Selecting sandbox mode uses those credentials.

> Install the app into a dedicated development workspace or Slack developer sandbox. Messages are real inside that workspace, but its users and data are separate from production. Developer sandboxes expire by default and have feature and integration limits.

## What it can do

### Actions

#### `message_post` — Slack message

Post a text message to a Slack channel or conversation.

`POST /api/chat.postMessage` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `channel` | yes | The encoded channel, private group, direct-message or group-message conversation ID visible to the installed app. |
| `text` | yes | The message's top-level text. Keeping meaningful text here also gives screen readers a complete fallback when richer blocks are added elsewhere. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Slack has a sandbox. Set a
node's mode to `fake` and it returns the shape Slack actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/slack`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
