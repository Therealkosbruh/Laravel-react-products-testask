<?php

namespace App\Console\Commands;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Console\Command;

class SendProductToWebhookJob extends Command
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct()
    {
        //
    }

    public function handle()
    {
        // Получаем продукт с наибольшим ID
        $product = Product::orderBy('id', 'desc')->first();

        // URL Webhook-а
        $webhookUrl = config('products.webhook');

        if ($product && $webhookUrl) {
            $response = Http::post($webhookUrl, [
                'name' => $product->name,
                'article' => $product->article,
                'color' => $product->color,
                'size' => $product->size,
                'status' => $product->status,
                'id' => $product->id,
            ]);

            if ($response->successful()) {
                Log::info('Продукт успешно отправлен на Webhook.', [
                    'product_id' => $product->id,
                    'status' => $response->status(),
                ]);
            } else {
                Log::error('Ошибка отправки продукта на Webhook.', [
                    'product_id' => $product->id,
                    'status' => $response->status(),
                    'response' => $response->body(),
                ]);
            }
        } else {
            Log::error('Продукт не найден или Webhook URL не настроен.');
        }
    }
}
