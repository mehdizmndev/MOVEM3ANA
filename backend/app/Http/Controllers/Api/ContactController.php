<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    /**
     * POST /api/contact
     * Send a general contact message to the platform.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:2000',
        ]);

        // Here we could save to a ContactMessage model or send an email.
        // For now, we just log it and return success.
        Log::info('New Contact Message', $validated);

        return response()->json([
            'success' => true,
            'message' => 'Votre message a été envoyé avec succès. Nous vous contacterons bientôt.',
        ], 201);
    }
}
