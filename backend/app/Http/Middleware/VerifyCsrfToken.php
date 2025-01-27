<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Индекс URL-ов, которые не должны проверяться на CSRF.
     *
     * @var array
     */
    protected $except = [
        // Добавьте сюда URL-ы для исключения из проверки CSRF, например:
        'api/*', // Все API роуты не будут проверяться на CSRF
    ];
}
