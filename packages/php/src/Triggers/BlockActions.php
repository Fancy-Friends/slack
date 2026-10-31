<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Triggers;

use ParticleAcademy\Connectors\DeliveryDecode;
use ParticleAcademy\Connectors\DeliveryMechanism;
use ParticleAcademy\Connectors\WebhookVerifier;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/triggers/block-actions.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/triggers/block-actions.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */
/**
 * Slack's webhook trigger — the delivery contract.
 *
 * Kept beside the service descriptor rather than inside a node, because a
 * signature scheme is a fact about SLACK. The twin of the js package's trigger
 * module.
 */
final class BlockActions
{
    public const OPERATION = 'block_actions';
    public const DELIVERY = DeliveryMechanism::Webhook;

    public const SETUP = 'In the Slack app\'s Interactivity & Shortcuts settings, turn interactivity on and set the Request URL to the route your host mounts for this trigger, then put the app\'s signing secret (Basic Information) on the connection as `signingSecret`. Slack shows the user an error unless the request is answered with a 200 within 3 seconds, so the host must acknowledge FIRST and run the graph after.';

    /** Header carrying the signature. */
    public const SIGNATURE_HEADER = 'X-Slack-Signature';

    /** Header carrying the timestamp Slack signs. */
    public const TIMESTAMP_HEADER = 'X-Slack-Request-Timestamp';

    /** The provider's documented replay window, in seconds. */
    public const TOLERANCE = 300;

    /** The credential holding the signing secret. */
    public const SECRET_CREDENTIAL = 'signingSecret';

    /** @return array{signature: ?string, timestamp: ?string} */
    public static function parseSignature(string $raw): array
    {
        $prefix = 'v0=';

        return [
            'signature' => str_starts_with($raw, $prefix) ? substr($raw, strlen($prefix)) : null,
            'timestamp' => null,
        ];
    }

    /** The exact bytes Slack signs. */
    public static function signedPayload(string $raw, ?string $timestamp): string
    {
        return 'v0:'.($timestamp ?? '').':'.$raw;
    }

    /**
     * Verify one inbound Slack delivery.
     *
     * The host calls this BEFORE starting a run, with the body exactly as
     * received. Re-serialised JSON changes key order and whitespace and produces a
     * mismatch that looks precisely like a wrong secret — hours spent debugging
     * the wrong thing.
     *
     * @param array<string,string|list<string>> $headers
     * @return array{ok: bool, reason: ?string}
     */
    public static function verifyDelivery(
        string $raw,
        array $headers,
        ?string $signingSecret,
        ?int $now = null,
    ): array {
        $header = WebhookVerifier::header($headers, self::SIGNATURE_HEADER);
        $parsed = $header === null
            ? ['signature' => null, 'timestamp' => null]
            : self::parseSignature($header);
        $timestamp = $parsed['timestamp'] ?? WebhookVerifier::header($headers, self::TIMESTAMP_HEADER);

        return WebhookVerifier::verify(
            raw: $raw,
            signature: $parsed['signature'],
            secret: $signingSecret,
            payload: self::signedPayload(...),
            algorithm: 'sha256',
            tolerance: self::TOLERANCE,
            timestamp: $timestamp,
            now: $now,
        );
    }

    /** How a VERIFIED delivery is read: its body is not plain JSON. */
    public const DECODE = ['kind' => 'form-field-json', 'field' => 'payload'];

    /**
     * Read one VERIFIED Slack delivery: form-field-json, with the payload in the
     * `payload` field. The host calls this AFTER `verifyDelivery` has accepted it,
     * with the SAME raw bytes, and starts the run with what it returns. A body
     * that cannot be read is refused by name (FormFieldJsonException), never
     * passed on.
     */
    public static function decodeDelivery(string $raw): mixed
    {
        return DeliveryDecode::apply(self::DECODE, $raw);
    }
}
