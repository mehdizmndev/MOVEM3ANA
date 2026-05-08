<?php

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ClubController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\ActivityController;
use App\Http\Controllers\Api\PromotionController;
use App\Http\Controllers\Api\SubscriptionController;
use App\Http\Controllers\Api\MessageController;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\SearchController;
use App\Http\Controllers\Api\ReportController;
use App\Http\Controllers\Api\FailedJobController;
use App\Http\Controllers\Api\ContactController;

/*
|--------------------------------------------------------------------------
| API Routes — TANGIER SPORTS COMMUNITY
|--------------------------------------------------------------------------
|
| Toutes les routes sont préfixées par /api automatiquement.
| Les routes protégées nécessitent un token Sanctum valide.
|
*/


// ─── 1. Authentification (routes publiques) ──────────────────────────────
Route::prefix('auth')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);

    // Routes nécessitant une authentification
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);
        Route::get('me', [AuthController::class, 'me']);
    });
});

// ─── Public Routes (accessible sans authentification) ─────────────────────
// Clubs
Route::get('clubs', [ClubController::class, 'index']);
Route::get('clubs/{id}', [ClubController::class, 'show']);
Route::get('clubs/sport/{sport}', [ClubController::class, 'bySport']);
Route::get('clubs/location/{city}', [ClubController::class, 'byLocation']);

// Activités
Route::get('activities', [ActivityController::class, 'index']);
Route::get('activities/{id}', [ActivityController::class, 'show']);
Route::get('activities/sport/{sport}', [ActivityController::class, 'bySport']);
Route::get('activities/club/{clubId}', [ActivityController::class, 'byClub']);
Route::get('activities/city/{city}', [ActivityController::class, 'byCity']);

// Événements
Route::get('events', [EventController::class, 'index']);
Route::get('events/{id}', [EventController::class, 'show']);
Route::get('events/club/{clubId}', [EventController::class, 'byClub']);

// Promotions
Route::get('promotions', [PromotionController::class, 'index']);
Route::get('promotions/{id}', [PromotionController::class, 'show']);

// Avis (Reviews)
Route::get('reviews/club/{clubId}', [ReviewController::class, 'byClub']);

// Recherche & Contact
Route::get('search/clubs', [SearchController::class, 'clubs']);
Route::get('search/events', [SearchController::class, 'events']);
Route::post('contact', [ContactController::class, 'store']);


// ─── Routes protégées (authentification + compte actif) ──────────────────
Route::middleware(['auth:sanctum', 'active'])->group(function () {

    // ─── Utilisateurs ─────────────────────────────────────────────
    Route::put('users/profile', [UserController::class, 'updateProfile']);
    Route::put('users/profile/password', [UserController::class, 'updatePassword']);
    Route::get('users', [UserController::class, 'index']);
    Route::get('users/{id}', [UserController::class, 'show']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);

    // ─── Clubs (Actions protégées) ────────────────────────────────
    Route::post('clubs', [ClubController::class, 'store']);
    Route::put('clubs/{id}', [ClubController::class, 'update']);
    Route::delete('clubs/{id}', [ClubController::class, 'destroy']);

    // ─── Événements (Actions protégées) ───────────────────────────
    Route::get('my-events', [EventController::class, 'myEvents']);
    Route::post('events', [EventController::class, 'store']);
    Route::put('events/{id}', [EventController::class, 'update']);
    Route::delete('events/{id}', [EventController::class, 'destroy']);
    Route::post('events/{id}/enroll', [EventController::class, 'enroll']);
    Route::post('events/{id}/cancel', [EventController::class, 'cancelEnrollment']);

    // ─── Activités (Actions protégées) ────────────────────────────
    Route::post('activities', [ActivityController::class, 'store']);
    Route::put('activities/{id}', [ActivityController::class, 'update']);
    Route::delete('activities/{id}', [ActivityController::class, 'destroy']);

    // ─── Abonnements ──────────────────────────────────────────────
    Route::post('subscriptions', [SubscriptionController::class, 'store']);
    Route::delete('subscriptions/{id}', [SubscriptionController::class, 'destroy']);
    Route::get('subscriptions/user/{userId}', [SubscriptionController::class, 'byUser']);
    Route::get('subscriptions/club/{clubId}', [SubscriptionController::class, 'byClub']);

    // ─── Messages ─────────────────────────────────────────────────
    Route::post('messages', [MessageController::class, 'store']);
    Route::get('messages', [MessageController::class, 'index']);
    Route::get('messages/{id}', [MessageController::class, 'show']);
    Route::get('messages/club/{clubId}', [MessageController::class, 'byClub']);
    Route::get('messages/user/{userId}', [MessageController::class, 'byUser']);

    // ─── Avis / Notes (Actions protégées) ─────────────────────────
    Route::post('reviews', [ReviewController::class, 'store']);
    Route::put('reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('reviews/{id}', [ReviewController::class, 'destroy']);

    // ─── Promotions (Actions protégées) ───────────────────────────
    Route::prefix('promotions')->group(function () {
        Route::post('/', [PromotionController::class, 'store']);
        Route::put('/{id}/boost', [PromotionController::class, 'boost']);
        Route::put('/{id}/cancel', [PromotionController::class, 'cancel']);
    });

    // ─── Signalements (Reports) ──────────────────────────────────
    Route::post('reports', [ReportController::class, 'store']);
    Route::get('my-reports', [ReportController::class, 'myReports']);

    // ─── Statistiques (Tableau de bord, etc.) ─────────────────────
    Route::prefix('stats')->group(function () {
        Route::get('dashboard', [StatController::class, 'dashboard']);
        Route::get('clubs', [StatController::class, 'clubs']);
        Route::get('events', [StatController::class, 'events']);
        Route::get('users', [StatController::class, 'users']);
    });

    // ─── Administration (Admin uniquement) ────────────────────────
    Route::prefix('admin')->middleware('admin')->group(function () {
        Route::put('approve-club/{id}', [AdminController::class, 'approveClub']);
        Route::put('suspend-user/{id}', [AdminController::class, 'suspendUser']);
        
        Route::get('reports', [AdminController::class, 'reports']);
        Route::put('reports/{id}', [AdminController::class, 'updateReportStatus']);
        
        Route::get('failed-jobs', [FailedJobController::class, 'index']);
        Route::post('failed-jobs/{id}/retry', [FailedJobController::class, 'retry']);
        Route::delete('failed-jobs/{id}', [FailedJobController::class, 'destroy']);
        Route::delete('failed-jobs', [FailedJobController::class, 'flush']);

        Route::get('logs', [AdminController::class, 'logs']);
        Route::get('clubs', [AdminController::class, 'allClubs']);
        Route::put('clubs/{id}/status', [AdminController::class, 'updateClubStatus']);
        Route::get('events', [AdminController::class, 'allEvents']);
        Route::get('promotions', [AdminController::class, 'allPromotions']);
    });
});

//_______________________________________
Route::get('/test', function () {
    return response()->json([
        'status' => 'ok',
        'message' => 'API fonctionne'
    ]);
});




