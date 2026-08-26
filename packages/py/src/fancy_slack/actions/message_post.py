# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/message-post.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/message-post.json (or weaver's template/) and regenerate:
#
# npm run provider -- slack

"""Post a text message to a Slack channel or conversation.

POST /api/chat.postMessage —
https://docs.slack.dev/reference/methods/chat.postMessage

This describes the request. `call` resolves the connection, picks the
estate, and either calls Slack or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "message_post"
METHOD = "POST"
PATH = "/api/chat.postMessage"
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("channel") is None or config.get("channel") == "":
        raise ConnectorConfigError(
            "message_post: \"channel\" is required (Channel)."
        )

    if config.get("text") is None or config.get("text") == "":
        raise ConnectorConfigError(
            "message_post: \"text\" is required (Message)."
        )

    out: dict[str, Any] = {}
    _value = config.get("channel")
    if _value is None or _value == "":
        raise ConnectorConfigError("message_post: \"channel\" is required.")

    out["channel"] = str(_value)
    _value = config.get("text")
    if _value is None or _value == "":
        raise ConnectorConfigError("message_post: \"text\" is required.")

    out["text"] = str(_value)

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
            "message_post: Slack rejected chat.postMessage — "
            + str(data.get("error") or "no reason given")
        )

def message_post(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Post a text message to a Slack channel or conversation."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )
