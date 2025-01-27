<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Http\Requests\ProductRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
use App\Jobs\SendEmailJob;
use Illuminate\Support\Facades\Config; 
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;




class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();
        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::findOrFail($id);
        return response()->json($product);
    }

    public function store(ProductRequest $request)
    {
        $data = $request->validated();
    
        $product = Product::create($data);
    
        $notificationEmail = config('products.email');
    
        SendEmailJob::dispatch([
            'name' => $product->name,
            'article' => $product->article,
            'status' => $product->status
        ], $notificationEmail);
    
        return response()->json([
            'message' => 'Product created successfully',
            'product' => $product,
        ]);
    }
    public function update(ProductRequest $request, $id)
    {
        $product = Product::findOrFail($id);

        $user = Auth::user();
        if ($request->has('article') && $user->role !== 'admin') {
            return response()->json(['message' => 'You are not allowed to edit the article'], 403);
        }

        $product->update($request->validated());

        return response()->json(['message' => 'Product updated successfully', 'product' => $product]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
