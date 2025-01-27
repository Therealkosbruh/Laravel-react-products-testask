<?php
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Log;
use App\Jobs\SendProductToWebhookJob;
use App\Models\Product;


app()->make(Schedule::class)->call(function () {
    $product = Product::orderBy('id', 'desc')->first(); 
    if ($product) {
        SendProductToWebhookJob::dispatch($product); 
    }
})->everyMinute();