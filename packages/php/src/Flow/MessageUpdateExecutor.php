<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Slack\Actions\MessageUpdate;
use ParticleAcademy\Slack\Slack;

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
 * Slack message update, run on a fancy-flow-php host.
 *
 * The PHP twin of `slackMessageUpdateExecutor` in @particle-academy/slack-js:
 * the same request, built from the node's config by the same
 * `Actions\MessageUpdate` a host would call directly, and the same value on
 * `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Slack. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/slack_message_update',
    aliases: [
        'slack_message_update',
    ],
    category: 'io',
    label: 'Slack message update',
    description: 'Replace the text and blocks of a Slack message the app posted.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'idempotent',
    outputShape: [
        [
            'path' => 'data.ok',
            'type' => 'boolean',
            'description' => 'True after resultCheck has established Slack accepted the update.',
        ],
        [
            'path' => 'data.channel',
            'type' => 'string',
            'description' => 'The conversation holding the message.',
        ],
        [
            'path' => 'data.ts',
            'type' => 'string',
            'description' => 'The updated message\'s ts, unchanged by the update.',
        ],
        [
            'path' => 'data.text',
            'type' => 'string',
            'description' => 'The message text as Slack stored it.',
        ],
    ],
)]
final class MessageUpdateExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Slack::descriptor(),
            MessageUpdate::OPERATION,
            $config,
            [
                'method' => MessageUpdate::METHOD,
                'path' => MessageUpdate::PATH,
                'json' => MessageUpdate::body($config),
            ],
            $ctx->input('in'),
        );

        // Slack can answer HTTP 200 and still refuse. check() reads what the status did not.
        if (is_array($result->data)) {
            MessageUpdate::check($result->data);
        }

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'slack message_update'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
