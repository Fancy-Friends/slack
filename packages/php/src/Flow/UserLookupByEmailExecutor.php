<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Slack\Actions\UserLookupByEmail;
use ParticleAcademy\Slack\Slack;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/user-lookup-by-email.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/user-lookup-by-email.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */
/**
 * Slack user lookup by email, run on a fancy-flow-php host.
 *
 * The PHP twin of `slackUserLookupByEmailExecutor` in
 * @particle-academy/slack-js: the same request, built from the node's config
 * by the same `Actions\UserLookupByEmail` a host would call directly, and the
 * same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Slack. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/slack_user_lookup_by_email',
    aliases: [
        'slack_user_lookup_by_email',
    ],
    category: 'io',
    label: 'Slack user lookup by email',
    description: 'Find the Slack user in this workspace who has a given email address.',
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
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.ok',
            'type' => 'boolean',
            'description' => 'True after resultCheck has established Slack found the user.',
        ],
        [
            'path' => 'data.user.id',
            'type' => 'string',
            'description' => 'The Slack user ID, the same value a click carries as user.id.',
        ],
        [
            'path' => 'data.user.team_id',
            'type' => 'string',
            'description' => 'The workspace the user belongs to.',
        ],
        [
            'path' => 'data.user.name',
            'type' => 'string',
            'description' => 'The user\'s handle.',
        ],
        [
            'path' => 'data.user',
            'type' => 'object',
            'description' => 'The full user object Slack returned.',
        ],
    ],
)]
final class UserLookupByEmailExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Slack::descriptor(),
            UserLookupByEmail::OPERATION,
            $config,
            [
                'method' => UserLookupByEmail::METHOD,
                'path' => UserLookupByEmail::PATH,
                'query' => UserLookupByEmail::body($config),
            ],
            $ctx->input('in'),
        );

        // Slack can answer HTTP 200 and still refuse. check() reads what the status did not.
        if (is_array($result->data)) {
            UserLookupByEmail::check($result->data);
        }

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'slack user_lookup_by_email'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
