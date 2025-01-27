<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class SendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $product;
    protected $email;

    /**
     * Create a new job instance.
     *
     * @param array $product
     * @param string $email
     */
    public function __construct($product, $email)
    {
        $this->product = $product;
        $this->email = $email;
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
        try {
            Log::info('Начало отправки письма...');
    
            // Логируем конфигурацию почты
            Log::info('MAIL_FROM_ADDRESS: ' . env('MAIL_FROM_ADDRESS'));
            Log::info('MAIL_FROM_NAME: ' . env('MAIL_FROM_NAME'));
    
            Mail::raw("Продукт создан:\nНазвание: {$this->product['name']}\nАртикул: {$this->product['article']}\nСтатус: {$this->product['status']}", function ($message) {
                $message->to($this->email)
                    ->subject('Продукт создан')
                    ->from(env('MAIL_FROM_ADDRESS'), env('MAIL_FROM_NAME')); // Используем конфигурацию
            });
    
            Log::info('Письмо отправлено успешно!');
        } catch (\Exception $e) {
            Log::error('Ошибка при отправке письма: ' . $e->getMessage());
        }
    }
    
}
