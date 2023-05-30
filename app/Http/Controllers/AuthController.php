<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Display the currently logged in user.
     *
     * @param Request $request
     * @return UserResource
     */
    public function index(Request $request)
    {
        if ( !$request->user()?->id ) {
            Auth::logout();
            return response()->noContent();
        }
        $id   = $request->user()->id;
        $user = User::with('role')->findOrFail($id);
        return new UserResource($user);
    }

    /**
     * Handle an authentication attempt.
     *
     * @param  \Illuminate\Http\Request  $request
     */
    public function authenticate(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required'],
            'password' => ['required'],
        ]);

        $field = filter_var($credentials['email'], FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        if (
            Auth::attempt([
                $field     => strtolower($credentials['email']),
                'password' => $credentials['password'],
            ])
        ) {
            $request->session()->regenerate();
            return response()->noContent();
        }

        return response()->json(['message' => 'The provided credentials do not match our records.'], 422);
    }

    /**
     * Handles register.
     * 
     * @param  \App\Http\Requests\RegisterRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function register(RegisterRequest $request)
    {
        $input = $request->validated();

        $user           = new User();
        $user->username = $input['username'];
        $user->email    = $input['email'];
        $user->phone    = $input['phone'];
        $user->password = Hash::make($input['password']);
        $user->save();

        if (
            Auth::attempt([
                'username' => $input['username'],
                'password' => $input['password'],
            ])
        ) {
            $request->session()->regenerate();
        }

        return response()->noContent();
    }

    /**
     * Handle user logout.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        return response()->noContent();
    }

}