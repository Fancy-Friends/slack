# GENERATED FILE — do not edit.
#
# Emitted from provider/triggers/block-actions.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/triggers/block-actions.json (or weaver's template/) and regenerate:
#
# npm run provider -- slack

"""Slack's webhook trigger — the delivery contract.

Kept beside the service descriptor rather than inside a node, because a
signature scheme is a fact about SLACK.
"""

from __future__ import annotations

from typing import Any

from .._form_field_json import decode_delivery as _decode_delivery
from .._runtime import Verification, verify_hmac
from ..faker import respond
from ..service import SERVICE

OPERATION = "block_actions"
DELIVERY = "webhook"
SETUP = (
    "In the Slack app's Interactivity & Shortcuts settings, turn interactivity on and set the "
    "Request URL to the route your host mounts for this trigger, then put the app's signing "
    "secret (Basic Information) on the connection as `signingSecret`. Slack shows the user an "
    "error unless the request is answered with a 200 within 3 seconds, so the host must "
    "acknowledge FIRST and run the graph after."
)
DECODE: dict[str, str] = {"kind": "form-field-json", "field": "payload"}
SIGNATURE_HEADER = "X-Slack-Signature"
TIMESTAMP_HEADER = "X-Slack-Request-Timestamp"
ALGORITHM = "sha256"
SIGNATURE_ENCODING = "hex"

# The provider's documented replay window, in seconds.
TOLERANCE = 300

# WHICH credential holds the signing secret — a field name, not a secret.
# S105 reads any string assigned to a *_CREDENTIAL name as a hardcoded
# password; here the value is the key to look up on the connection.
SECRET_CREDENTIAL = "signingSecret"  # noqa: S105


def parse_signature(raw: str) -> tuple[str | None, str | None]:
    """Strip the `v0=` prefix the provider sends."""
    prefix = "v0="

    return (raw[len(prefix):] if raw.startswith(prefix) else None), None


def _header(headers: dict[str, str], name: str) -> str | None:
    """One header, case-insensitively — proxies do not preserve case."""
    return next((v for k, v in headers.items() if k.lower() == name.lower()), None)


def signed_payload(raw: str, timestamp: str | None) -> str:
    """The exact bytes Slack signs."""
    return f"v0:{timestamp or ''}:{raw}"


def verify_delivery(
    raw: str,
    headers: dict[str, str],
    signingsecret: str | None,
    now: int | None = None,
) -> Verification:
    """Verify one inbound Slack delivery.
    
    The host calls this BEFORE starting a run, with the body exactly as
    received. Re-serialised JSON changes key order and whitespace and produces a
    mismatch that looks precisely like a wrong secret — hours of debugging the
    wrong thing.
    """
    header = _header(headers, SIGNATURE_HEADER)
    signature, timestamp = parse_signature(header) if header else (None, None)
    if timestamp is None:
        timestamp = _header(headers, TIMESTAMP_HEADER)

    return verify_hmac(
        raw=raw,
        signature=signature,
        secret=signingsecret,
        payload=signed_payload,
        algorithm=ALGORITHM,
        encoding=SIGNATURE_ENCODING,
        tolerance=TOLERANCE,
        timestamp=timestamp,
        now=now,
    )


def decode_delivery(raw: bytes | str) -> Any:
    """Read one VERIFIED Slack delivery: form-field-json, with the payload in the
    `payload` field.
    
    The host calls this AFTER `verify_delivery` has accepted it, with the SAME
    raw bytes, and starts the run with what it returns. A body that cannot be
    read raises FormFieldJsonError by name, never passed on.
    """
    return _decode_delivery(DECODE, raw)


def sample_event(config: dict[str, Any] | None = None) -> Any:
    """A faked sample event, so the trigger is runnable before any of the setup
    above.
    
    An author can see the real field names and wire the downstream nodes against
    them before the provider has ever been contacted.
    """
    from .._fake import FakeValues, seed_for_call

    resolved = config or {}
    fake = FakeValues(seed_for_call(SERVICE, OPERATION, resolved))

    return respond(OPERATION, {"config": resolved, "fake": fake})
