<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ReportResource;
use App\Models\Report;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ReportController extends Controller
{
    /**
     * Mapping des types signalables autorisés.
     * Clé = valeur acceptée par l'API, Valeur = nom complet du modèle.
     */
    private const REPORTABLE_TYPES = [
        'club'   => \App\Models\Club::class,
        'event'  => \App\Models\Event::class,
        'review' => \App\Models\Review::class,
    ];

    /**
     * POST /api/reports
     * Créer un nouveau signalement.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'reportable_type' => ['required', 'string', Rule::in(array_keys(self::REPORTABLE_TYPES))],
            'reportable_id'   => ['required', 'integer'],
            'reason'          => ['required', 'string', 'max:1000'],
        ]);

        // Résoudre le type complet du modèle
        $morphClass = self::REPORTABLE_TYPES[$validated['reportable_type']];

        // Vérifier que la ressource signalée existe
        if (!$morphClass::find($validated['reportable_id'])) {
            return response()->json([
                'success' => false,
                'message' => 'La ressource signalée est introuvable.',
            ], 404);
        }

        // Empêcher les doublons (même user, même cible)
        $exists = Report::where('reporter_id', auth()->id())
            ->where('reportable_type', $morphClass)
            ->where('reportable_id', $validated['reportable_id'])
            ->exists();

        if ($exists) {
            return response()->json([
                'success' => false,
                'message' => 'Vous avez déjà signalé cette ressource.',
            ], 409);
        }

        $report = Report::create([
            'reporter_id'     => auth()->id(),
            'reportable_type' => $morphClass,
            'reportable_id'   => $validated['reportable_id'],
            'reason'          => $validated['reason'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Signalement envoyé avec succès.',
            'data'    => new ReportResource($report->load('reporter')),
        ], 201);
    }

    /**
     * GET /api/reports/my
     * Lister les signalements de l'utilisateur connecté.
     */
    public function myReports(): JsonResponse
    {
        $reports = Report::with('reporter')
            ->where('reporter_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'data'    => ReportResource::collection($reports),
            'meta'    => [
                'current_page' => $reports->currentPage(),
                'last_page'    => $reports->lastPage(),
                'per_page'     => $reports->perPage(),
                'total'        => $reports->total(),
            ],
        ]);
    }
}
