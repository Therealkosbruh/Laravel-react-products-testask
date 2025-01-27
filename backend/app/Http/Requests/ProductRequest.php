<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class ProductRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $rules = [
            'name' => 'required|string|min:10',
            'status' => 'required|string|in:available,unavailable',
            'color' => 'nullable|string',
            'size' => 'nullable|string',
            'img' => 'nullable|url',
        ];

      
        if ($this->isMethod('post')) {
            $rules['article'] = 'required|string|regex:/^[a-zA-Z0-9]+$/|unique:products,article';
        }

    
        if ($this->isMethod('put') || $this->isMethod('patch')) {
            $user = $this->user(); 

            if ($user && $user->role === 'admin') {
                $rules['article'] = 'sometimes|string|regex:/^[a-zA-Z0-9]+$/|unique:products,article,' . $this->route('id');
            }
        }

        return $rules;
    }

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

