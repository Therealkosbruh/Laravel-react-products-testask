<?php

namespace App\Jobs;

use App\Models\Product;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SendProductToWebhookJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $product;

    /**
     * Create a new job instance.
     *
     * @param Product $product
     */
    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        $webhookUrl = config('products.webhook');

        if ($webhookUrl) {
            $response = Http::post($webhookUrl, [
                'name' => $this->product->name,
                'article' => $this->product->article,
                'color' => $this->product->color,
                'size' => $this->product->size,
                'status' => $this->product->status,
                'id' => $this->product->id,
            ]);

            if ($response->successful()) {
                Log::info('Successfully sent product data to the webhook.');
            } else {
                Log::error('Failed to send product data to the webhook. Status: ' . $response->status());
            }
        } else {
            Log::error('Webhook URL is not set.');
        }
    }
}
