<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use ParticleAcademy\Connectors\ConnectionHost;
use ParticleAcademy\Connectors\TriggerEvent;
use ParticleAcademy\Slack\Slack;
use ParticleAcademy\Slack\Triggers\BlockActions;

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
 * Slack button click, run on a fancy-flow-php host.
 *
 * The PHP twin of `slackBlockActionsExecutor` in @particle-academy/slack-js. A
 * webhook trigger never calls Slack: it republishes, on `out`, the delivery
 * the HOST received and verified at its own route. With nothing delivered,
 * fake mode publishes the faker's sample event, so a flow can be designed
 * before the endpoint exists; any other mode refuses, and says how to deliver
 * one.
 */
#[FlowNode(
    name: '@particle-academy/slack_block_actions',
    aliases: [
        'slack_block_actions',
    ],
    category: 'trigger',
    label: 'Slack button click',
    description: 'Start when someone clicks a button or picks from a menu in a Slack message the app posted.',
    inputs: [],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'type',
            'type' => 'string',
            'description' => 'Always block_actions for this trigger.',
        ],
        [
            'path' => 'team.id',
            'type' => 'string',
            'description' => 'The workspace the click came from.',
        ],
        [
            'path' => 'enterprise',
            'type' => 'object',
            'description' => 'The Enterprise Grid org ({id}), or NULL outside Grid.',
        ],
        [
            'path' => 'user.id',
            'type' => 'string',
            'description' => 'The Slack user who clicked. Map it to your own user on the host; user_lookup_by_email helps build that map.',
        ],
        [
            'path' => 'user.team_id',
            'type' => 'string',
            'description' => 'The workspace the user belongs to.',
        ],
        [
            'path' => 'channel',
            'type' => 'object',
            'description' => 'The conversation ({id}) holding the message, or NULL when the click came from a surface with no channel.',
        ],
        [
            'path' => 'message',
            'type' => 'object',
            'description' => 'The message ({ts}) the click was on, or NULL. Pass channel.id and message.ts to message_update to change it.',
        ],
        [
            'path' => 'trigger_id',
            'type' => 'string',
            'description' => 'Slack\'s short-lived id for opening a modal in response.',
        ],
        [
            'path' => 'response_url',
            'type' => 'string',
            'description' => 'Slack\'s reply URL for this click. Published for completeness; this package never posts to it — use message_update.',
        ],
        [
            'path' => 'actions[].action_id',
            'type' => 'string',
            'description' => 'Which button or menu was used. Route on this.',
        ],
        [
            'path' => 'actions[].block_id',
            'type' => 'string',
            'description' => 'The block holding it.',
        ],
        [
            'path' => 'actions[].type',
            'type' => 'string',
            'description' => 'button, static_select, …',
        ],
        [
            'path' => 'actions[].value',
            'type' => 'string',
            'description' => 'A button\'s value, or NULL for elements that carry none.',
        ],
        [
            'path' => 'actions[].selected_option',
            'type' => 'object',
            'description' => 'A menu\'s choice ({value}), or NULL for a button.',
        ],
        [
            'path' => 'actions[].action_ts',
            'type' => 'string',
            'description' => 'When the action happened.',
        ],
    ],
)]
final class BlockActionsExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectionHost $host = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();
        $service = Slack::descriptor();

        $connection = ($this->host ?? new ConnectionHost)->resolve(
            $service->service,
            BlockActions::OPERATION,
            $config,
            $service->sandbox,
            $service->requires,
            $service->baseUrls,
        );

        $event = TriggerEvent::resolve(
            $service->service,
            BlockActions::OPERATION,
            BlockActions::DELIVERY,
            BlockActions::SETUP,
            $service->faker,
            $connection,
            $ctx->input('in'),
            $config,
        );

        return Port::only('out', $event);
    }
}
