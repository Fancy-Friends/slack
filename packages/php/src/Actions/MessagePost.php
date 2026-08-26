<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Actions;

use ParticleAcademy\Slack\Slack;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/message-post.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/message-post.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */
/**
 * Post a text message to a Slack channel or conversation.
 *
 * POST /api/chat.postMessage —
 * https://docs.slack.dev/reference/methods/chat.postMessage
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Slack or calls the faker.
 */
final class MessagePost
{
    public const OPERATION = 'message_post';
    public const METHOD = 'POST';
    public const PATH = '/api/chat.postMessage';
    public const SIDE_EFFECTS = 'unsafe-to-replay';

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
            throw new ConnectorConfigException('message_post: "channel" is required (Channel).');
        }

        if (($config['text'] ?? null) === null || ($config['text'] ?? null) === '') {
            throw new ConnectorConfigException('message_post: "text" is required (Message).');
        }

        $body = [];

        $value = $config['channel'] ?? null;
        $body['channel'] = (string) $value;

        $value = $config['text'] ?? null;
        $body['text'] = (string) $value;

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
                'message_post: Slack rejected chat.postMessage — '
                .(string) ($data['error'] ?? 'no reason given')
            );
        }
    }
}
