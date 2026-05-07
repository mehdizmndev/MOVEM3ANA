<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Club;
use App\Models\Event;
use App\Models\Review;
use App\Models\Activity;
use App\Models\Subscription;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DemoSeeder extends Seeder
{
    public function run(): void
    {
        // ─── Utilisateurs ────────────────────────────────────────
        $user1 = User::updateOrCreate(
            ['email' => 'lahcen@gmail.com'],
            ['name' => 'Lahcen Benali', 'password' => Hash::make('123456'), 'role' => 'user', 'phone' => '0612345678', 'sport_preferences' => ['football', 'natation'], 'is_active' => true, 'email_verified_at' => now()]
        );
        $user2 = User::updateOrCreate(
            ['email' => 'fatima@gmail.com'],
            ['name' => 'Fatima Zahra', 'password' => Hash::make('123456'), 'role' => 'user', 'phone' => '0698765432', 'sport_preferences' => ['fitness', 'yoga'], 'is_active' => true, 'email_verified_at' => now()]
        );
        $user3 = User::updateOrCreate(
            ['email' => 'karim@gmail.com'],
            ['name' => 'Karim Idrissi', 'password' => Hash::make('123456'), 'role' => 'user', 'phone' => '0654321987', 'sport_preferences' => ['tennis', 'basketball'], 'is_active' => true, 'email_verified_at' => now()]
        );

        // ─── Propriétaires de clubs ──────────────────────────────
        $owner1 = User::updateOrCreate(
            ['email' => 'club.fitness@tanger.com'],
            ['name' => 'Club Fitness Tanger', 'password' => Hash::make('123456'), 'role' => 'club', 'phone' => '0539123456', 'is_active' => true, 'email_verified_at' => now()]
        );
        $owner2 = User::updateOrCreate(
            ['email' => 'club.football@tanger.com'],
            ['name' => 'Club Football Tanger', 'password' => Hash::make('123456'), 'role' => 'club', 'phone' => '0539654321', 'is_active' => true, 'email_verified_at' => now()]
        );
        $owner3 = User::updateOrCreate(
            ['email' => 'club.tennis@tanger.com'],
            ['name' => 'Club Tennis Tanger', 'password' => Hash::make('123456'), 'role' => 'club', 'phone' => '0539111333', 'is_active' => true, 'email_verified_at' => now()]
        );
        $owner4 = User::updateOrCreate(
            ['email' => 'club.yoga@tanger.com'],
            ['name' => 'Club Yoga Tanger', 'password' => Hash::make('123456'), 'role' => 'club', 'phone' => '0539222444', 'is_active' => true, 'email_verified_at' => now()]
        );

        // ─── Clubs ───────────────────────────────────────────────
        $club1 = Club::updateOrCreate(['name' => 'Tanger Fitness'], [
            'user_id' => $owner1->id, 'sport' => 'fitness',
            'description' => 'Le meilleur club de fitness à Tanger. Équipements modernes, coaching personnalisé et ambiance motivante. Salle de musculation, cours collectifs, et espace cardio.',
            'address' => 'Av. Mohammed V, Tanger', 'city' => 'Tanger', 'phone' => '0539123456', 'email' => 'contact@tangerfitness.ma',
            'tarifs' => '200 DH/mois', 'horaires' => 'Lun-Sam: 6h-22h, Dim: 8h-18h',
            'latitude' => 35.7595, 'longitude' => -5.8340, 'is_approved' => true, 'is_active' => true,
            'social_links' => ['facebook' => 'https://facebook.com/tangerfitness', 'instagram' => 'https://instagram.com/tangerfitness'],
        ]);

        $club2 = Club::updateOrCreate(['name' => 'FC Tanger Academy'], [
            'user_id' => $owner2->id, 'sport' => 'football',
            'description' => 'Académie de football pour tous les niveaux. Formation professionnelle, matchs réguliers et terrains synthétiques de qualité.',
            'address' => 'Stade Marchan, Tanger', 'city' => 'Tanger', 'phone' => '0539654321', 'email' => 'contact@fctanger.ma',
            'tarifs' => '150 DH/mois', 'horaires' => 'Lun-Sam: 8h-20h',
            'latitude' => 35.7831, 'longitude' => -5.8132, 'is_approved' => true, 'is_active' => true,
            'social_links' => ['facebook' => 'https://facebook.com/fctanger'],
        ]);

        $club3 = Club::updateOrCreate(['name' => 'Tanger Tennis Club'], [
            'user_id' => $owner3->id, 'sport' => 'tennis',
            'description' => 'Club de tennis avec 6 courts en dur et 2 en terre battue. Cours particuliers et collectifs, compétitions régionales.',
            'address' => 'Bd Pasteur, Tanger', 'city' => 'Tanger', 'phone' => '0539111333', 'email' => 'contact@tangertennis.ma',
            'tarifs' => '350 DH/mois', 'horaires' => 'Tous les jours: 7h-21h',
            'latitude' => 35.7750, 'longitude' => -5.8000, 'is_approved' => true, 'is_active' => true,
        ]);

        $club4 = Club::updateOrCreate(['name' => 'Zen Yoga Studio'], [
            'user_id' => $owner4->id, 'sport' => 'yoga',
            'description' => 'Studio de yoga et méditation au cœur de Tanger. Hatha, Vinyasa, Yin Yoga et sessions de pleine conscience.',
            'address' => 'Rue de Hollande, Tanger', 'city' => 'Tanger', 'phone' => '0539222444', 'email' => 'contact@zenyoga.ma',
            'tarifs' => '250 DH/mois', 'horaires' => 'Lun-Sam: 7h-20h',
            'latitude' => 35.7650, 'longitude' => -5.8200, 'is_approved' => true, 'is_active' => true,
        ]);

        $club5 = Club::updateOrCreate(['name' => 'Aqua Tanger'], [
            'user_id' => $owner1->id, 'sport' => 'natation',
            'description' => 'Club de natation avec piscine olympique. Cours pour enfants et adultes, aquagym et compétitions.',
            'address' => 'Route de Malabata, Tanger', 'city' => 'Tanger', 'phone' => '0539111222', 'email' => 'contact@aquatanger.ma',
            'tarifs' => '300 DH/mois', 'horaires' => 'Tous les jours: 7h-21h',
            'latitude' => 35.7900, 'longitude' => -5.7900, 'is_approved' => true, 'is_active' => true,
        ]);

        $club6 = Club::updateOrCreate(['name' => 'Tanger Basketball Arena'], [
            'user_id' => $owner2->id, 'sport' => 'basketball',
            'description' => 'Salle de basketball couverte avec parquet professionnel. Entraînements, ligues locales et camps d\'été.',
            'address' => 'Zone Boubana, Tanger', 'city' => 'Tanger', 'phone' => '0539333555', 'email' => 'contact@tangerbasket.ma',
            'tarifs' => '180 DH/mois', 'horaires' => 'Lun-Sam: 9h-22h',
            'latitude' => 35.7500, 'longitude' => -5.8450, 'is_approved' => true, 'is_active' => true,
        ]);

        // ─── Activités ───────────────────────────────────────────
        $clubActivities = [
            [$club1, 'Musculation', 'fitness', 'Séance de musculation avec coaching personnalisé.'],
            [$club1, 'Cardio HIIT', 'fitness', 'Cours collectif de haute intensité.'],
            [$club2, 'Entraînement Football', 'football', 'Session d\'entraînement tactique et technique.'],
            [$club2, 'Match Amical', 'football', 'Match amical inter-équipes.'],
            [$club3, 'Cours de Tennis', 'tennis', 'Cours particulier ou collectif avec moniteur diplômé.'],
            [$club4, 'Hatha Yoga', 'yoga', 'Séance de Hatha Yoga pour tous niveaux.'],
            [$club4, 'Méditation', 'yoga', 'Session guidée de méditation et pleine conscience.'],
            [$club5, 'Cours de Natation', 'natation', 'Apprentissage et perfectionnement.'],
            [$club5, 'Aquagym', 'natation', 'Gymnastique aquatique en groupe.'],
            [$club6, 'Entraînement Basketball', 'basketball', 'Session d\'entraînement avec coach.'],
        ];

        foreach ($clubActivities as [$club, $title, $sport, $desc]) {
            Activity::updateOrCreate(
                ['title' => $title, 'club_id' => $club->id],
                ['user_id' => $club->user_id, 'sport' => $sport, 'description' => $desc, 'city' => 'Tanger', 'location' => $club->address, 'is_active' => true]
            );
        }

        // ─── Événements ──────────────────────────────────────────
        $eventsData = [
            [$club2, 'Tournoi Football Inter-Quartiers', 'Grand tournoi ouvert à tous les quartiers de Tanger.', 30, 100, 'Stade Marchan, Tanger'],
            [$club1, 'Marathon Fitness Challenge', 'Défi fitness de 4 heures avec des exercices variés.', 15, 50, 'Tanger Fitness, Av. Mohammed V'],
            [$club4, 'Yoga en Plein Air', 'Session de yoga gratuite sur la plage.', 7, 30, 'Plage Municipale, Tanger'],
            [$club3, 'Tournoi Tennis Open', 'Compétition ouverte à tous les niveaux.', 45, 32, 'Tanger Tennis Club'],
            [$club5, 'Course de Natation', 'Compétition amicale de natation.', 20, 40, 'Aqua Tanger'],
            [$club6, 'Tournoi 3x3 Basketball', 'Tournoi de basketball 3 contre 3.', 10, 24, 'Tanger Basketball Arena'],
        ];

        foreach ($eventsData as [$club, $title, $desc, $days, $capacity, $loc]) {
            Event::updateOrCreate(
                ['title' => $title],
                ['club_id' => $club->id, 'description' => $desc, 'date' => now()->addDays($days), 'capacity' => $capacity, 'location' => $loc]
            );
        }

        // ─── Abonnements ─────────────────────────────────────────
        foreach ([[$user1, $club1], [$user1, $club2], [$user2, $club1], [$user2, $club4], [$user3, $club3], [$user3, $club6]] as [$u, $c]) {
            Subscription::updateOrCreate(['user_id' => $u->id, 'club_id' => $c->id]);
        }

        // ─── Avis ────────────────────────────────────────────────
        $reviewsData = [
            [$user1, $club1, 5, 'Excellent club ! Équipements top et coachs très professionnels.'],
            [$user2, $club1, 4, 'Très bon club, ambiance agréable. Un peu cher mais ça vaut le coup.'],
            [$user3, $club1, 5, 'Meilleur gym de Tanger, je recommande !'],
            [$user1, $club2, 4, 'Bonne académie de football. Les entraîneurs sont compétents.'],
            [$user3, $club2, 5, 'Terrains de qualité et organisation impeccable.'],
            [$user1, $club3, 4, 'Courts bien entretenus et moniteur expérimenté.'],
            [$user2, $club4, 5, 'Studio magnifique, les cours de yoga sont exceptionnels.'],
            [$user3, $club5, 4, 'Piscine propre et bien chauffée. Bons coachs.'],
            [$user2, $club6, 4, 'Bonne salle pour le basketball, parquet de qualité.'],
        ];

        foreach ($reviewsData as [$u, $c, $rating, $comment]) {
            Review::updateOrCreate(
                ['user_id' => $u->id, 'club_id' => $c->id],
                ['rating' => $rating, 'comment' => $comment]
            );
        }

        $this->command->info('✅ Données de démonstration créées avec succès.');
    }
}
