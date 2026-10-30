# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/user-lookup-by-email.json by weaver's
# generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/user-lookup-by-email.json (or weaver's template/) and
# regenerate:
#
# npm run provider -- slack

"""Find the Slack user in this workspace who has a given email address.

GET /api/users.lookupByEmail —
https://docs.slack.dev/reference/methods/users.lookupByEmail

This describes the request. `call` resolves the connection, picks the
estate, and either calls Slack or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "user_lookup_by_email"
METHOD = "GET"
PATH = "/api/users.lookupByEmail"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the form body for one call, failing loudly and specifically."""
    if config.get("email") is None or config.get("email") == "":
        raise ConnectorConfigError(
            "user_lookup_by_email: \"email\" is required (Email)."
        )

    out: dict[str, Any] = {}
    _value = config.get("email")
    if _value is None or _value == "":
        raise ConnectorConfigError("user_lookup_by_email: \"email\" is required.")

    out["email"] = str(_value).strip()

    return out



def check(data: dict[str, Any]) -> None:
    """Refuse a response that says no while answering 200.

    Slack answers HTTP 200 with `{ok: false}` for an application-level
    failure. A status check alone reads that as success and publishes an empty
    batch — a poll that silently finds nothing, forever, which is
    indistinguishable from a quiet channel.
    """
    if data.get("ok") is False:
        raise ConnectorConfigError(
            "user_lookup_by_email: Slack rejected users.lookupByEmail — "
            + str(data.get("error") or "no reason given")
        )

def user_lookup_by_email(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Find the Slack user in this workspace who has a given email address."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        form=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
