<?php
require __DIR__.'/../vendor/autoload.php';
$app = require __DIR__.'/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$env = base_path('.env');
$email = (string) config('app.admin_email');
$pass = (string) config('app.admin_password');

header('Content-Type: application/json');
echo json_encode([
    'env_file' => $env,
    'env_last_modified' => date('Y-m-d H:i:s', (int) @filemtime($env)),
    'server_time_now' => date('Y-m-d H:i:s'),
    'config_cached' => $app->configurationIsCached(),
    'admin_email_masked' => $email === '' ? '(khali)' : substr($email, 0, 2).'***'.substr($email, -8),
    'admin_password_length' => strlen($pass),
]);