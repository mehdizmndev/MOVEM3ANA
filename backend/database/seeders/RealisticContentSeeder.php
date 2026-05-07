<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RealisticContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $clubs = \App\Models\Club::all();

        foreach ($clubs as $club) {
            // --- Offers (Offres) ---
            $club->offers()->createMany([
                [
                    'title' => 'Pass Découverte Mensuel',
                    'description' => 'Idéal pour ceux qui souhaitent commencer en douceur. Accès illimité aux installations de base et 1 séance découverte offerte.',
                    'price' => rand(200, 350),
                    'period' => 'mois',
                ],
                [
                    'title' => 'Pack Performance & Bien-être',
                    'description' => 'Le choix favori de nos membres. Inclut l\'accès complet, des sessions de coaching groupé et un bilan forme trimestriel.',
                    'price' => rand(450, 650),
                    'period' => 'mois',
                ],
                [
                    'title' => 'Abonnement Annuel Elite',
                    'description' => 'L\'engagement pour des résultats durables. Accès prioritaire, serviettes incluses, et 1 mois offert pour toute souscription annuelle.',
                    'price' => rand(3500, 5000),
                    'period' => 'an',
                ],
            ]);

            // --- Events (Événements) ---
            $club->events()->createMany([
                [
                    'title' => 'Tournoi Open de ' . $club->sport,
                    'description' => 'Rejoignez-nous pour une journée de compétition amicale et de passion sportive. Ouvert à tous les niveaux, avec de nombreux lots à gagner.',
                    'date' => now()->addDays(rand(7, 30))->setHour(10)->setMinute(0),
                    'location' => $club->address,
                    'capacity' => rand(20, 50),
                ],
                [
                    'title' => 'Masterclass & Portes Ouvertes',
                    'description' => 'Venez découvrir nos nouvelles installations et profiter d\'une masterclass exclusive animée par nos coachs certifiés. Séance gratuite sur réservation.',
                    'date' => now()->addDays(rand(31, 60))->setHour(18)->setMinute(30),
                    'location' => $club->address,
                    'capacity' => rand(15, 30),
                ],
            ]);
        }
    }
}
