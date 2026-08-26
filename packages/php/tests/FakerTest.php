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

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('slack', 'no_such_operation', []));

    expect(fn () => SlackFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
