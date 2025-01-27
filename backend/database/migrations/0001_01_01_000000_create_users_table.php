<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Field for 'name'
            $table->string('password'); // Field for 'password'
            $table->string('role')->default('user'); // Field for 'role' with default value
            $table->rememberToken(); // Field for 'remember_token'
            $table->timestamps(); // 'created_at' and 'updated_at'
        });

        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary(); // Primary key for password reset
            $table->string('token'); // Reset token
            $table->timestamp('created_at')->nullable(); // Timestamp for when token was created
        });

        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary(); // Primary key
            $table->foreignId('user_id')->nullable()->index(); // Foreign key to users table
            $table->string('ip_address', 45)->nullable(); // IP address of the user
            $table->text('user_agent')->nullable(); // User agent string
            $table->longText('payload'); // Session payload
            $table->integer('last_activity')->index(); // Timestamp of last activity
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users'); // Drop users table
        Schema::dropIfExists('password_reset_tokens'); // Drop password reset tokens table
        Schema::dropIfExists('sessions'); // Drop sessions table
    }
};
