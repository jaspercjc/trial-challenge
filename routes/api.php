<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/auth/register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('/auth/authenticate', [App\Http\Controllers\AuthController::class, 'authenticate']);
Route::post('/logout', [App\Http\Controllers\AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/user', [App\Http\Controllers\AuthController::class, 'index']);
    Route::resource("/users", \App\Http\Controllers\UserController::class);
});