<?php

declare(strict_types=1);

use ParticleAcademy\Slack\SlackFaker;
use ParticleAcademy\Connectors\FakeValues;

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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('message_post fakes the shape Slack publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'message_post', $config));

    $faked = SlackFaker::respond('message_post', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
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
    ]);
});

it('message_update fakes the shape Slack publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'message_update', $config));

    $faked = SlackFaker::respond('message_update', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'ok' => true,
        'channel' => 'C123ABC456',
        'ts' => '1787719200.000100',
        'text' => 'Ticket #42 assigned to Rosa.',
    ]);
});

it('user_lookup_by_email fakes the shape Slack publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'user_lookup_by_email', $config));

    $faked = SlackFaker::respond('user_lookup_by_email', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
        'ok' => true,
        'user' => [
            'id' => 'U2CERLKJA',
            'team_id' => 'T1DC2JH3J',
            'name' => 'rosa',
            'real_name' => 'Rosa Diaz',
            'deleted' => false,
            'is_bot' => false,
        ],
    ]);
});

it('block_actions fakes the shape Slack publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'block_actions', $config));

    $faked = SlackFaker::respond('block_actions', ['config' => $config, 'fake' => $fake]);

    // Through JSON and back, because a faked EMPTY object is a stdClass — the only
    // PHP value that spells `{}` on the wire — and `toBe` compares objects by
    // identity. This asserts the VALUES; the `{}`-versus-`[]` spelling is what
    // weaver's cross-runtime parity suite asserts, byte for byte.
    $faked = json_decode((string) json_encode($faked), true, 512, JSON_THROW_ON_ERROR);

    expect($faked)->toBe([
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
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'no_such_operation', []));

    expect(fn () => SlackFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
