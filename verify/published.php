<?php

declare(strict_types=1);

/*
 * Slack — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/slack-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\Slack\SlackFaker;

$goldens = [
    [
        'operation' => 'message_post',
        'config' => [],
        'expected' => [
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
        ],
    ],
    [
        'operation' => 'message_update',
        'config' => [],
        'expected' => [
            'ok' => true,
            'channel' => 'C123ABC456',
            'ts' => '1787719200.000100',
            'text' => 'Ticket #42 assigned to Rosa.',
        ],
    ],
    [
        'operation' => 'user_lookup_by_email',
        'config' => [],
        'expected' => [
            'ok' => true,
            'user' => [
                'id' => 'U2CERLKJA',
                'team_id' => 'T1DC2JH3J',
                'name' => 'rosa',
                'real_name' => 'Rosa Diaz',
                'deleted' => false,
                'is_bot' => false,
            ],
        ],
    ],
    [
        'operation' => 'block_actions',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('slack', $operation, $config));
    $faked = SlackFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
