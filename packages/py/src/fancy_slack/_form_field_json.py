# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json (via weaver's
# template/embed/py/_form_field_json.py) by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (via weaver's template/embed/py/_form_field_json.py)
# (or weaver's template/) and regenerate:
#
# npm run provider -- slack

"""A form-encoded body whose one named field holds JSON, decoded.

The payload TRANSFORM Slack's interactivity callbacks need (``payload=<json>``).
fancy-connector-core implements it in TypeScript and PHP; it has no Python
package, so this copy is embedded, and weaver's
``tests/form-field-json-py.test.mjs`` holds it to the core's authored corpus
(``fixtures/form-field-json/``), the same seven cases the other two reproduce.

It runs AFTER signature verification, over the same raw bytes. The decisions:

- ``+`` and ``%20`` are both a space; ``%XX`` decodes to a byte, and the result
  must be valid UTF-8.
- The WHOLE body is decoded strictly: a ``%`` not followed by two hex digits,
  anywhere, is ``bad-encoding``. ``urllib.parse.unquote_plus`` keeps ``%zz``
  as it is, so it is not used.
- The field absent is ``missing-field``; present twice is ``duplicate-field``.
- A value that is not JSON is ``not-json``, never the raw string.
"""

from __future__ import annotations

import json
from typing import Any

_HEX = frozenset("0123456789abcdefABCDEF")


class FormFieldJsonError(ValueError):
    """Refused BY NAME; ``reason`` is the same string TS and PHP carry."""

    def __init__(self, reason: str, field: str, message: str) -> None:
        super().__init__(message)
        self.reason = reason
        self.field = field


def decode_form_field_json(raw: bytes | str, field: str) -> Any:
    """Decode ``field`` out of a form-encoded body and parse it as JSON."""
    # Bytes read one-byte-one-char, as PHP reads a string.
    text = raw.decode("latin-1") if isinstance(raw, bytes) else raw

    found: list[str] = []
    for pair in text.split("&"):
        if pair == "":
            continue
        name, sep, value = pair.partition("=")
        decoded_name = _component(name, field)
        decoded_value = _component(value if sep else "", field)
        if decoded_name == field:
            found.append(decoded_value)

    if not found:
        raise FormFieldJsonError("missing-field", field, f'the body has no "{field}" field')
    if len(found) > 1:
        raise FormFieldJsonError(
            "duplicate-field", field, f'the body has "{field}" {len(found)} times'
        )

    try:
        return json.loads(found[0])
    except ValueError as error:
        raise FormFieldJsonError("not-json", field, f'"{field}" is not JSON: {error}') from error


def decode_delivery(decode: dict[str, str], raw: bytes | str) -> Any:
    """Apply a trigger's declared ``decode``; an unknown kind is refused."""
    if decode.get("kind") == "form-field-json":
        return decode_form_field_json(raw, decode.get("field", ""))
    # Refused rather than passed through: a kind nothing implements would
    # otherwise publish the raw bytes as if they were the payload.
    raise ValueError(f"unknown decode kind {json.dumps(decode.get('kind'))}")


def _component(encoded: str, field: str) -> str:
    """One name or value: ``+`` is a space, every ``%`` must be ``%XX``."""
    out = bytearray()
    i = 0
    while i < len(encoded):
        char = encoded[i]
        if char == "+":
            out.append(0x20)
        elif char == "%":
            hex_pair = encoded[i + 1 : i + 3]
            if len(hex_pair) != 2 or not set(hex_pair) <= _HEX:
                raise FormFieldJsonError(
                    "bad-encoding", field, f'a "%" at byte {i} is not followed by two hex digits'
                )
            out.append(int(hex_pair, 16))
            i += 2
        else:
            out.append(ord(char) & 0xFF)
        i += 1

    try:
        return out.decode("utf-8")
    except UnicodeDecodeError as error:
        raise FormFieldJsonError(
            "bad-encoding", field, "the decoded bytes are not valid UTF-8"
        ) from error
