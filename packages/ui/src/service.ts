/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */

/**
 * Slack's identity on the authoring surface, shared by every Slack node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * Install the app into a dedicated development workspace or Slack developer
 * sandbox. Messages are real inside that workspace, but its users and data are
 * separate from production. Developer sandboxes expire by default and have
 * feature and integration limits.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const SLACK_SERVICE = {
  service: "slack",
  serviceTitle: "Slack",
  domain: "messaging",
  sandbox: "separate-account",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a Slack connection holds. */
export const SLACK_CREDENTIALS = [
  {
    "key": "clientId",
    "label": "Client ID",
    "scope": "provider",
    "secret": false,
    "help": "The Slack app client ID shared by the installation."
  },
  {
    "key": "clientSecret",
    "label": "Client secret",
    "scope": "provider",
    "secret": true,
    "help": "The matching Slack app client secret used by OAuth V2."
  },
  {
    "key": "accessToken",
    "label": "Bot access token",
    "scope": "account",
    "secret": true,
    "help": "The workspace installation's rotating bot token. Token rotation must be enabled; the token expires after 12 hours."
  },
  {
    "key": "refreshToken",
    "label": "Refresh token",
    "scope": "account",
    "secret": true,
    "help": "The workspace installation's single-use refresh token. Persist Slack's replacement after every refresh."
  }
] as const;

/**
 * The OAuth2 exchange Slack requires — DECLARED here, performed by the host.
 *
 * A consent screen needs a browser, a redirect URI and somewhere to persist
 * the result, and all three belong to the host; a package that ran the dance
 * itself would have to own a web server. So this says precisely enough for a
 * host to do it.
 *
 * The access token lasts 43200 seconds. A host that never refreshes will work
 * all afternoon and be broken by morning, which is why the lifetime is stated
 * rather than left to be discovered.
 *
 * Its refresh tokens ROTATE, and they are single use. Every refresh returns a
 * new one and spends the one submitted, so REPLAYING a spent token revokes the
 * entire grant — the user is signed out, with nothing in the failure that says
 * why.
 *
 * Two consequences, both of which a host gets wrong by default. Do not RETRY a
 * failed refresh with the same token: a response that arrived but was not
 * persisted — a crash between the reply and the write — makes the retry a
 * replay. And do not refresh concurrently, because two workers refreshing at
 * once means one of them replays. Persist the returned token BEFORE using the
 * access token it came with.
 */
export const SLACK_OAUTH = {
  "flow": "authorization_code",
  "authorizeUrl": "https://slack.com/oauth/v2/authorize",
  "tokenUrl": "https://slack.com/api/oauth.v2.access",
  "scopes": [
    "chat:write"
  ],
  "accessTokenCredential": "accessToken",
  "refreshTokenCredential": "refreshToken",
  "refreshTokenRotates": true,
  "accessTokenTtlSeconds": 43200
} as const;

/** Build a Slack node's connector metadata from the operation it performs. */
export function slackMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...SLACK_SERVICE, role, operation, docs };
}
