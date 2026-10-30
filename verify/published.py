"""
Slack — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_slack._fake import FakeValues, seed_for_call
from fancy_slack.faker import respond

GOLDENS = [
    {
        "operation": "message_post",
        "config": {},
        "expected": {
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
        },
    },
    {
        "operation": "message_update",
        "config": {},
        "expected": {
            "ok": True,
            "channel": "C123ABC456",
            "ts": "1787719200.000100",
            "text": "Ticket #42 assigned to Rosa.",
        },
    },
    {
        "operation": "user_lookup_by_email",
        "config": {},
        "expected": {
            "ok": True,
            "user": {
                "id": "U2CERLKJA",
                "team_id": "T1DC2JH3J",
                "name": "rosa",
                "real_name": "Rosa Diaz",
                "deleted": False,
                "is_bot": False,
            },
        },
    },
    {
        "operation": "block_actions",
        "config": {},
        "expected": {
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
                                "https://hooks.slack.com/actions/T1DC2JH3J/397700885554/96rG"
                                "lfmibIGlgcZRskXaIFfN"
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
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-slack")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("slack", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
