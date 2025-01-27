<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;


class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
{
    $schedule->call(function () {
        Log::info('Тестовая команда запустилась!');
    })->everyMinute();
}  

    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');
    }
}
