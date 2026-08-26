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
