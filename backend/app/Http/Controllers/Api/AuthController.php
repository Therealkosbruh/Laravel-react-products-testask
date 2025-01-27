<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignupRequest;
use App\Models\User;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;


class AuthController extends Controller
{
    public function sign_up(SignupRequest $request)
    {
        $data = $request->validated();
        try {
            $user = User::create([
                'name' => $data['name'],
                'password' => bcrypt($data['password']),
                'role' => $data['role'] ?? 'user',
            ]);
    
            $token = JWTAuth::customClaims(['name' => $user->name])->fromUser($user);
    
            return response()->json([
                'user' => $user,
                'token' => $token,
            ]);
        } catch (ValidationException $e) {
            Log::error('Validation error:', ['errors' => $e->errors()]);
            return response()->json([
                'message' => 'Validation error',
                'errors' => $e->errors(),
            ], 422); 
        } catch (\Exception $e) {
            Log::error('Error in sign_up:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error occurred'], 500);
        }
    }
    

    public function login(LoginRequest $request)
    {
        $credentials = $request->only('name', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid name or password'], 401);
        }

        $user = JWTAuth::user();

        // $token = JWTAuth::customClaims(['name' => $user->name])->fromUser($user);

        return response()->json([
            'user' => $user,
            'token' => $token,
        ]);
    }

    public function logout()
    {
        JWTAuth::invalidate(JWTAuth::getToken());
        return response()->json(['message' => 'Logged out successfully']);
    }
}
