<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\FailedJobResource;
use App\Models\FailedJob;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class FailedJobController extends Controller
{
    /**
     * GET /api/admin/failed-jobs
     * Lister les jobs échoués.
     */
    public function index(): JsonResponse
    {
        $failedJobs = FailedJob::orderBy('failed_at', 'desc')->paginate(15);

        return response()->json([
            'success' => true,
            'data'    => FailedJobResource::collection($failedJobs),
            'meta'    => [
                'current_page' => $failedJobs->currentPage(),
                'last_page'    => $failedJobs->lastPage(),
                'per_page'     => $failedJobs->perPage(),
                'total'        => $failedJobs->total(),
            ],
        ]);
    }

    /**
     * POST /api/admin/failed-jobs/{id}/retry
     * Retenter un job échoué.
     */
    public function retry(string $id): JsonResponse
    {
        $job = DB::table('failed_jobs')->where('id', $id)->first();

        if (!$job) {
            return response()->json([
                'success' => false,
                'message' => 'Job introuvable.',
            ], 404);
        }

        Artisan::call('queue:retry', ['id' => [$job->uuid]]);

        return response()->json([
            'success' => true,
            'message' => 'Job remis en file d\'attente.',
        ]);
    }

    /**
     * DELETE /api/admin/failed-jobs/{id}
     * Supprimer un job échoué.
     */
    public function destroy(string $id): JsonResponse
    {
        $deleted = DB::table('failed_jobs')->where('id', $id)->delete();

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Job introuvable ou déjà supprimé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Job supprimé avec succès.',
        ]);
    }

    /**
     * DELETE /api/admin/failed-jobs
     * Supprimer tous les jobs échoués (flush).
     */
    public function flush(): JsonResponse
    {
        Artisan::call('queue:flush');

        return response()->json([
            'success' => true,
            'message' => 'Tous les jobs échoués ont été supprimés.',
        ]);
    }
}
