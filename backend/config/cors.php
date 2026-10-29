<?php

// Which frontends may call the API from a browser.
// Set in .env: CORS_ALLOWED_ORIGINS=https://glancetechy.com,https://glancetechy.com
return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_values(array_filter(array_map(
        'trim',
        explode(',', (string) env(
            'CORS_ALLOWED_ORIGINS',
            'https://glancetechy.com,https://glancetechy.com'
        ))
    ))),

    // Local development (Next.js dev server, LAN testing)
    'allowed_origins_patterns' => [
        '#^http://(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3})(:\d+)?$#',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,
];
