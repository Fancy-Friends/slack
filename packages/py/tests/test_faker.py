# GENERATED FILE — do not edit.
#
# Emitted from provider/fixtures/ by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/fixtures/ (or weaver's template/) and regenerate:
#
# npm run provider -- slack

"""The golden fixtures — the SAME values the TypeScript and PHP packages
assert.

Bit-for-bit identical is the claim, and this is what checks it for Python.
Cross-runtime drift does not fail loudly on its own: it completes, down one
path, with no error.
"""

import pytest

from fancy_slack._fake import FakeValues, seed_for_call
from fancy_slack.faker import respond


def test_message_post_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("slack", "message_post", config))

    faked = respond("message_post", {"config": config, "fake": fake})

    assert faked == {
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


def test_message_update_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("slack", "message_update", config))

    faked = respond("message_update", {"config": config, "fake": fake})

    assert faked == {
        "ok": True,
        "channel": "C123ABC456",
        "ts": "1787719200.000100",
        "text": "Ticket #42 assigned to Rosa.",
    }


def test_user_lookup_by_email_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("slack", "user_lookup_by_email", config))

    faked = respond("user_lookup_by_email", {"config": config, "fake": fake})

    assert faked == {
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


def test_block_actions_fakes_the_published_shape() -> None:
    config = {}
    fake = FakeValues(seed_for_call("slack", "block_actions", config))

    faked = respond("block_actions", {"config": config, "fake": fake})

    assert faked == {
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


def test_an_operation_with_no_fixture_raises_rather_than_inventing_a_shape() -> None:
    fake = FakeValues(seed_for_call("slack", "no_such_operation", {}))

    with pytest.raises(ValueError, match="no fake response"):
        respond("no_such_operation", {"config": {}, "fake": fake})
