<?php

declare(strict_types=1);

namespace ParticleAcademy\Slack;

use ParticleAcademy\Connectors\FakeRequest;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- slack
 */
/**
 * The Slack faker — the PHP twin of the js package's `src/faker.ts`.
 *
 * Bit-for-bit identical: the same FNV-1a seed and the same xorshift32
 * sequence, so a golden fixture asserts the exact faked payload and BOTH
 * runtimes have to produce it. That turns the faker into a parity test rather
 * than a convenience.
 */
final class SlackFaker
{
    /** @param array<string,mixed> $request */
    public static function respond(string $operation, array $request): mixed
    {
        /** @var array<string,mixed> $config */
        $config = $request['config'] ?? [];
        /** @var FakeValuesLike $fake */
        $fake = $request['fake'];

        return match ($operation) {
            'message_post' => self::MessagePost($config, $fake),
            'message_update' => self::MessageUpdate($config, $fake),
            'user_lookup_by_email' => self::UserLookupByEmail($config, $fake),
            'block_actions' => self::BlockActions($config, $fake),
            default => throw new \InvalidArgumentException(
                // A faker asked for an operation it has no shape for must SAY so.
                // Making something up would produce a green run whose output
                // silently has none of the fields the author is about to reference.
                'slack: no fake response is defined for "'.$operation.'". '
                    .'Add a fixture under provider/fixtures/ and regenerate — a connector without a faker '
                    .'cannot be developed against, tested, or demonstrated.'
            ),
        };
    }

    /** @param array<string,mixed> $config */
    private static function MessagePost(array $config, mixed $fake): array|\stdClass
    {
        return [
        'ok' => true,
        'channel' => 'C123ABC456',
        'ts' => '1787719200.000100',
        'message' => [
            'user' => 'U012AB3CDE',
            'type' => 'message',
            'ts' => '1787719200.000100',
            'text' => 'Deployment finished successfully.',
            'app_id' => 'A012BC3DEF',
            'bot_id' => 'B012AB3CD',
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function MessageUpdate(array $config, mixed $fake): array|\stdClass
    {
        return [
        'ok' => true,
        'channel' => 'C123ABC456',
        'ts' => '1787719200.000100',
        'text' => 'Ticket #42 assigned to Rosa.',
    ];
    }

    /** @param array<string,mixed> $config */
    private static function UserLookupByEmail(array $config, mixed $fake): array|\stdClass
    {
        return [
        'ok' => true,
        'user' => [
            'id' => 'U2CERLKJA',
            'team_id' => 'T1DC2JH3J',
            'name' => 'rosa',
            'real_name' => 'Rosa Diaz',
            'deleted' => false,
            'is_bot' => false,
        ],
    ];
    }

    /** @param array<string,mixed> $config */
    private static function BlockActions(array $config, mixed $fake): array|\stdClass
    {
        return [
        'type' => 'block_actions',
        'team' => [
            'id' => 'T1DC2JH3J',
            'domain' => 'testteamnow',
        ],
        'enterprise' => null,
        'user' => [
            'id' => 'U2CERLKJA',
            'username' => 'roadrunner',
            'team_id' => 'T1DC2JH3J',
        ],
        'channel' => [
            'id' => 'C0123ABCD',
            'name' => 'support',
        ],
        'message' => [
            'type' => 'message',
            'ts' => '1730070000.000100',
            'text' => 'Ticket #42: Printer on fire',
        ],
        'trigger_id' => '398738663015.47445629121.803a0bc887a14d10d2c447fce8b6703c',
        'response_url' => 'https://hooks.slack.com/actions/T1DC2JH3J/397700885554/96rGlfmibIGlgcZRskXaIFfN',
        'actions' => [
            [
                'action_id' => 'ticket_assign_me',
                'block_id' => 'ticket_42',
                'type' => 'button',
                'value' => '42',
                'selected_option' => null,
                'action_ts' => '1730070012.345678',
            ],
        ],
    ];
    }
}
