<?php

namespace App\Models;

use App\Models\Traits\HasPromotions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory, HasPromotions;
 
    protected $appends = ['available_slots', 'is_sold_out'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'club_id',
        'title',
        'description',
        'date',
        'location',
        'capacity',
        'image',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date' => 'datetime',
        'capacity' => 'integer',
    ];

    // ─── Relationships ───────────────────────────────────────

    /**
     * Le club organisateur de l'événement.
     */
    public function club()
    {
        return $this->belongsTo(Club::class);
    }

    public function registrations()
    {
        return $this->hasMany(EventRegistration::class);
    }

    /**
     * Obtenir le nombre de places restantes (ici directement la capacité car elle baisse à chaque inscription).
     */
    public function getAvailableSlotsAttribute()
    {
        return $this->capacity;
    }
 
    /**
     * Vérifier si l'événement est complet.
     */
    public function getIsSoldOutAttribute()
    {
        if ($this->capacity === null) return false;
        return $this->capacity <= 0;
    }

    /**
     * Les signalements concernant cet événement.
     */
    public function reports()
    {
        return $this->morphMany(Report::class, 'reportable');
    }
}
