<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Product;
use App\Jobs\SendProductToWebhookJob;

class DispatchSendProductToWebhook extends Command
{
    protected $signature = 'dispatch:send-product-webhook';
    protected $description = 'Отправить продукт с наибольшим ID на Webhook';

    public function handle()
    {
        // Найти продукт с наибольшим ID
        $product = Product::orderBy('id', 'desc')->first();

        if ($product) {
            // Диспетч задачи в очередь
            SendProductToWebhookJob::dispatch($product);
            $this->info('Задача отправки продукта добавлена в очередь.');
        } else {
            $this->error('Продукт не найден.');
        }
    }
}
