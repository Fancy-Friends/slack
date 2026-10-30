<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Actions;

use ParticleAcademy\Slack\Slack;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-update.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-update.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */
/**
 * Replace the text and blocks of a Slack message the app posted.
 *
 * POST /api/chat.update — https://docs.slack.dev/reference/methods/chat.update
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Slack or calls the faker.
 */
final class MessageUpdate
{
    public const OPERATION = 'message_update';
    public const METHOD = 'POST';
    public const PATH = '/api/chat.update';
    public const SIDE_EFFECTS = 'idempotent';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Slack.
     *
     * @param array<string,mixed> $config
     * An EMPTY body is `{}`, not `[]` — and PHP cannot tell those apart, because
     * both are `array()` and `json_encode` picks the list. So an empty one is
     * returned as an object. TypeScript and Python have no such ambiguity, which
     * is why this is a difference only the byte-parity suite can see.
     *
     * @return array<string,mixed>|\stdClass
     */
    public static function body(array $config): array|\stdClass
    {
        if (($config['channel'] ?? null) === null || ($config['channel'] ?? null) === '') {
            throw new ConnectorConfigException('message_update: "channel" is required (Channel).');
        }

        if (($config['ts'] ?? null) === null || ($config['ts'] ?? null) === '') {
            throw new ConnectorConfigException('message_update: "ts" is required (Message ts).');
        }

        if (($config['text'] ?? null) === null || ($config['text'] ?? null) === '') {
            throw new ConnectorConfigException('message_update: "text" is required (Message).');
        }

        $blocks = $config['blocks'] ?? null;
        if (is_string($blocks) && $blocks !== '') {
            try {
                json_decode($blocks, false, 512, JSON_THROW_ON_ERROR);
            } catch (\JsonException $e) {
                throw new ConnectorConfigException(
                    'message_update: "blocks" must be JSON: '.$e->getMessage(),
                );
            }
        }

        $body = [];

        $value = $config['channel'] ?? null;
        $body['channel'] = (string) $value;

        $value = $config['ts'] ?? null;
        $body['ts'] = (string) $value;

        $value = $config['text'] ?? null;
        $body['text'] = (string) $value;

        $value = $config['blocks'] ?? null;
        if ($value !== null && $value !== '') {
            $body['blocks'] = is_string($value) ? json_decode($value, false, 512, JSON_THROW_ON_ERROR) : $value;
        }

        $body = $body === [] ? new \stdClass() : $body;
        return $body;
    }

    /**
     * Refuse a response that says no while answering 200.
     *
     * Slack answers HTTP 200 with `{ok: false}` for an application-level failure.
     * A status check alone reads that as success and publishes an empty batch — a
     * poll that silently finds nothing, forever, which is indistinguishable from a
     * quiet channel.
     *
     * @param array<string,mixed> $data
     */
    public static function check(array $data): void
    {
        if (($data['ok'] ?? null) === false) {
            throw new ConnectorConfigException(
                'message_update: Slack rejected chat.update — '
                .(string) ($data['error'] ?? 'no reason given')
            );
        }
    }
}
