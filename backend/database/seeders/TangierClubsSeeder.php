<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Club;
use Illuminate\Support\Facades\Hash;

class TangierClubsSeeder extends Seeder
{
    public function run(): void
    {
        $clubs = [
            [
                'name' => 'Club Natation Tanger (CNT)',
                'sport' => 'Natation',
                'description' => 'Le plus ancien club de natation de Tanger, formant des champions depuis des décennies.',
                'address' => 'Piscine Olympique, Tanger',
                'city' => 'Tanger',
                'phone' => '0539123456',
                'email' => 'contact@cnt-tanger.ma',
                'tarifs' => '400 DH / mois',
                'horaires' => '07:00 - 21:00',
                'latitude' => 35.7595,
                'longitude' => -5.8340,
            ],
            [
                'name' => 'IRT Natation',
                'sport' => 'Natation',
                'description' => 'Section natation du prestigieux club omnisports Ittihad Riadi Tanger.',
                'address' => 'Piscine Municipale, Tanger',
                'city' => 'Tanger',
                'phone' => '0539654321',
                'email' => 'natation@irt.ma',
                'tarifs' => '350 DH / mois',
                'horaires' => '08:00 - 20:00',
                'latitude' => 35.7720,
                'longitude' => -5.8010,
            ],
            [
                'name' => 'Tanger Tennis Club (TTC)',
                'sport' => 'Tennis',
                'description' => 'Installations modernes avec 8 courts en terre battue au cœur de Tanger.',
                'address' => 'Quartier Administratif, Tanger',
                'city' => 'Tanger',
                'phone' => '0539887766',
                'email' => 'info@ttc.ma',
                'tarifs' => '500 DH / mois',
                'horaires' => '08:00 - 22:00',
                'latitude' => 35.7650,
                'longitude' => -5.8150,
            ],
            [
                'name' => 'Royal Tennis Club de Tanger',
                'sport' => 'Tennis',
                'description' => 'Un club historique offrant un cadre exceptionnel pour la pratique du tennis.',
                'address' => 'Boulevard Mohammed V, Tanger',
                'city' => 'Tanger',
                'phone' => '0539112233',
                'email' => 'royal@tennis-tanger.ma',
                'tarifs' => '600 DH / mois',
                'horaires' => '07:00 - 23:00',
                'latitude' => 35.7810,
                'longitude' => -5.8080,
            ],
            [
                'name' => 'City Club Tanger',
                'sport' => 'Fitness',
                'description' => 'La plus grande chaîne de fitness au Maroc, maintenant à Tanger avec des équipements de pointe.',
                'address' => 'Tanger City Center, Tanger',
                'city' => 'Tanger',
                'phone' => '0539445566',
                'email' => 'tanger@cityclub.ma',
                'tarifs' => '2500 DH / an',
                'horaires' => '06:00 - 23:00',
                'latitude' => 35.7750,
                'longitude' => -5.7950,
            ],
            [
                'name' => 'Fitness Park Tanger',
                'sport' => 'Fitness',
                'description' => 'Espace de musculation et cardio haut de gamme ouvert 7j/7.',
                'address' => 'Socco Alto, Tanger',
                'city' => 'Tanger',
                'phone' => '0539998877',
                'email' => 'fitnesspark@tanger.ma',
                'tarifs' => '350 DH / mois',
                'horaires' => '06:00 - 23:00',
                'latitude' => 35.7620,
                'longitude' => -5.8450,
            ],
            [
                'name' => 'Gold Gym Tanger',
                'sport' => 'Fitness',
                'description' => 'Le temple de la musculation à Tanger, idéal pour le bodybuilding.',
                'address' => 'Route de Rabat, Tanger',
                'city' => 'Tanger',
                'phone' => '0539332211',
                'email' => 'goldgym@gmail.com',
                'tarifs' => '300 DH / mois',
                'horaires' => '07:00 - 22:00',
                'latitude' => 35.7410,
                'longitude' => -5.8210,
            ],
            [
                'name' => 'Vip Gym Tanger',
                'sport' => 'Fitness',
                'description' => 'Club de sport exclusif offrant des services de coaching personnalisés.',
                'address' => 'Malabata, Tanger',
                'city' => 'Tanger',
                'phone' => '0539554433',
                'email' => 'vip@gym-tanger.ma',
                'tarifs' => '800 DH / mois',
                'horaires' => '08:00 - 22:00',
                'latitude' => 35.7890,
                'longitude' => -5.7820,
            ],
            [
                'name' => 'Aswak Assalam Gym',
                'sport' => 'Fitness',
                'description' => 'Salle de sport familiale avec cours collectifs variés.',
                'address' => 'Aswak Assalam, Tanger',
                'city' => 'Tanger',
                'phone' => '0539221144',
                'email' => 'aswak@fitness.ma',
                'tarifs' => '200 DH / mois',
                'horaires' => '09:00 - 21:00',
                'latitude' => 35.7510,
                'longitude' => -5.8120,
            ],
            [
                'name' => 'IRT Basketball',
                'sport' => 'Basketball',
                'description' => 'Rejoignez l\'équipe de basket-ball la plus titrée de la ville.',
                'address' => 'Salle Couverte Ziaten, Tanger',
                'city' => 'Tanger',
                'phone' => '0539001122',
                'email' => 'basket@irt.ma',
                'tarifs' => '250 DH / mois',
                'horaires' => '16:00 - 21:00',
                'latitude' => 35.7350,
                'longitude' => -5.8520,
            ],
            [
                'name' => 'Tanger Yoga Studio',
                'sport' => 'Yoga',
                'description' => 'Un havre de paix pour pratiquer le yoga et la méditation.',
                'address' => 'Place des Nations, Tanger',
                'city' => 'Tanger',
                'phone' => '0539334455',
                'email' => 'yoga@tanger-zen.ma',
                'tarifs' => '100 DH / séance',
                'horaires' => '08:00 - 20:00',
                'latitude' => 35.7780,
                'longitude' => -5.8050,
            ],
            [
                'name' => 'Ittihad Riadi Tanger (IRT)',
                'sport' => 'Football',
                'description' => 'L\'âme du football tangérois. École de foot pour les jeunes et entraînements.',
                'address' => 'Grand Stade de Tanger, Tanger',
                'city' => 'Tanger',
                'phone' => '0539667788',
                'email' => 'football@irt.ma',
                'tarifs' => '300 DH / mois',
                'horaires' => '10:00 - 19:00',
                'latitude' => 35.7320,
                'longitude' => -5.8610,
            ],
        ];

        foreach ($clubs as $index => $clubData) {
            $user = User::create([
                'name' => 'Propriétaire ' . $clubData['name'],
                'email' => 'club' . ($index + 1) . '@movem3ana.com',
                'password' => Hash::make('password'),
                'role' => 'club',
                'is_active' => true,
            ]);

            $clubData['user_id'] = $user->id;
            $clubData['is_approved'] = true;
            $clubData['is_active'] = true;

            Club::create($clubData);
        }
    }
}
