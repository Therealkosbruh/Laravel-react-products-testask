<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SignupRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255|unique:users,name',
            'password' => [
                'required',
                \Illuminate\Validation\Rules\Password::min(8)
                    ->mixedCase()
                    ->letters()
                    ->symbols(),
            ],
            'role' => 'sometimes|string|in:user,admin',
        ];
    }

    /**
     * Обработка ошибок валидации
     */
    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422)
        );
    }
}
