# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- slack

"""The Slack faker.

Bit-for-bit identical to the TypeScript and PHP fakers: the same FNV-1a seed
and the same xorshift32 sequence, so a golden fixture asserts the exact
faked payload and ALL THREE runtimes have to produce it. That turns the
faker into a parity test rather than a convenience — which matters, because
cross-runtime drift does not fail loudly. It completes, down one path, with
no error.
"""

from __future__ import annotations

from typing import Any

from ._fake import FakeValues


def _as_number(value: Any) -> float | None:
    """The coercion an `"as": "integer" | "number"` config binding uses: a value
    that IS a number, never int(float(...))'s uncaught ValueError on one that
    merely looks like text (a text field's auto-generated example, before an
    author has typed a real one).
    """
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _message_post(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "ok": True,
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
    }


def _message_update(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "ok": True,
        "channel": "C123ABC456",
        "ts": "1787719200.000100",
        "text": "Ticket #42 assigned to Rosa.",
    }


def _user_lookup_by_email(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "ok": True,
        "user": {
            "id": "U2CERLKJA",
            "team_id": "T1DC2JH3J",
            "name": "rosa",
            "real_name": "Rosa Diaz",
            "deleted": False,
            "is_bot": False,
        },
    }


def _block_actions(config: dict[str, Any], fake: FakeValues) -> Any:
    return {
        "type": "block_actions",
        "team": {
            "id": "T1DC2JH3J",
            "domain": "testteamnow",
        },
        "enterprise": None,
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
        "response_url": (
                            "https://hooks.slack.com/actions/T1DC2JH3J/397700885554/96rGlfmi"
                            "bIGlgcZRskXaIFfN"
                        ),
        "actions": [
            {
                "action_id": "ticket_assign_me",
                "block_id": "ticket_42",
                "type": "button",
                "value": "42",
                "selected_option": None,
                "action_ts": "1730070012.345678",
            },
        ],
    }


def respond(operation: str, request: dict[str, Any]) -> Any:
    """Dispatch to the fixture for one operation."""
    config: dict[str, Any] = request.get("config") or {}
    fake: FakeValues = request["fake"]

    if operation == "message_post":
        return _message_post(config, fake)

    if operation == "message_update":
        return _message_update(config, fake)

    if operation == "user_lookup_by_email":
        return _user_lookup_by_email(config, fake)

    if operation == "block_actions":
        return _block_actions(config, fake)

    # A faker asked for an operation it has no shape for must SAY so. Making
    # something up would produce a green run whose output silently has none of
    # the fields the author is about to reference.
    raise ValueError(
        f'slack: no fake response is defined for "{operation}". '
        "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker "
        "cannot be developed against, tested, or demonstrated."
    )
