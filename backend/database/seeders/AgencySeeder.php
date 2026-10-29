<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\Country;
use App\Models\State;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class ServiceAreaSeeder extends Seeder
{
    public function run(): void
    {
        /*
        |--------------------------------------------------------------------------
        | INDIA
        |--------------------------------------------------------------------------
        */

        $india = Country::updateOrCreate(
            ['slug' => 'india'],
            [
                'name' => 'India',

                'short_description' =>
                    'Website Design, Web Development, SEO and digital marketing services across India.',

                'meta_title' =>
                    'Web Design & Digital Marketing Services in India | GlanceTechy',

                'meta_description' =>
                    'GlanceTechy provides Website Design, web Development, SEO, UI/UX and digital marketing services for businesses across India.',

                'status' => true,
                'sort_order' => 1,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - UTTAR PRADESH
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Uttar Pradesh',
            [
                'Lucknow',
                'Kanpur',
                'Agra',
                'Varanasi',
                'Prayagraj',
                'Noida',
                'Ghaziabad',
                'Meerut',
            ],
            1
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - DELHI
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Delhi',
            [
                'New Delhi',
                'Delhi',
            ],
            2
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - MAHARASHTRA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Maharashtra',
            [
                'Mumbai',
                'Pune',
                'Nagpur',
                'Nashik',
                'Thane',
                'Aurangabad',
            ],
            3
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - KARNATAKA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Karnataka',
            [
                'Bengaluru',
                'Mysuru',
                'Mangaluru',
                'Hubballi',
                'Belagavi',
            ],
            4
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - GUJARAT
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Gujarat',
            [
                'Ahmedabad',
                'Surat',
                'Vadodara',
                'Rajkot',
                'Gandhinagar',
            ],
            5
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - RAJASTHAN
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Rajasthan',
            [
                'Jaipur',
                'Jodhpur',
                'Udaipur',
                'Kota',
                'Ajmer',
            ],
            6
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - WEST BENGAL
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'West Bengal',
            [
                'Kolkata',
                'Howrah',
                'Durgapur',
                'Siliguri',
            ],
            7
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - TAMIL NADU
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Tamil Nadu',
            [
                'Chennai',
                'Coimbatore',
                'Madurai',
                'Tiruchirappalli',
                'Salem',
            ],
            8
        );

        /*
        |--------------------------------------------------------------------------
        | INDIA - TELANGANA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $india,
            'Telangana',
            [
                'Hyderabad',
                'Warangal',
                'Nizamabad',
                'Karimnagar',
            ],
            9
        );


        /*
        |--------------------------------------------------------------------------
        | UNITED STATES
        |--------------------------------------------------------------------------
        */

        $usa = Country::updateOrCreate(
            ['slug' => 'united-states'],
            [
                'name' => 'United States',

                'short_description' =>
                    'Website Design, Web Development, SEO and digital marketing services for businesses across the United States.',

                'meta_title' =>
                    'Web Design & Digital Marketing Services in the United States | GlanceTechy',

                'meta_description' =>
                    'GlanceTechy provides website design, development, SEO, UI/UX and digital marketing services for businesses across the United States.',

                'status' => true,
                'sort_order' => 2,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | USA - CALIFORNIA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'California',
            [
                'Los Angeles',
                'San Francisco',
                'San Diego',
                'San Jose',
                'Sacramento',
            ],
            1
        );

        /*
        |--------------------------------------------------------------------------
        | USA - TEXAS
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'Texas',
            [
                'Houston',
                'Dallas',
                'Austin',
                'San Antonio',
                'Fort Worth',
            ],
            2
        );

        /*
        |--------------------------------------------------------------------------
        | USA - NEW YORK
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'New York',
            [
                'New York City',
                'Buffalo',
                'Rochester',
                'Albany',
            ],
            3
        );

        /*
        |--------------------------------------------------------------------------
        | USA - FLORIDA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'Florida',
            [
                'Miami',
                'Orlando',
                'Tampa',
                'Jacksonville',
                'Tallahassee',
            ],
            4
        );

        /*
        |--------------------------------------------------------------------------
        | USA - ILLINOIS
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'Illinois',
            [
                'Chicago',
                'Aurora',
                'Naperville',
                'Rockford',
            ],
            5
        );

        /*
        |--------------------------------------------------------------------------
        | USA - WASHINGTON
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'Washington',
            [
                'Seattle',
                'Spokane',
                'Tacoma',
                'Vancouver',
            ],
            6
        );

        /*
        |--------------------------------------------------------------------------
        | USA - NEW JERSEY
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'New Jersey',
            [
                'Newark',
                'Jersey City',
                'Paterson',
                'Trenton',
            ],
            7
        );

        /*
        |--------------------------------------------------------------------------
        | USA - ARIZONA
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $usa,
            'Arizona',
            [
                'Phoenix',
                'Tucson',
                'Mesa',
                'Scottsdale',
            ],
            8
        );


        /*
        |--------------------------------------------------------------------------
        | UNITED KINGDOM
        |--------------------------------------------------------------------------
        */

        $uk = Country::updateOrCreate(
            ['slug' => 'united-kingdom'],
            [
                'name' => 'United Kingdom',

                'short_description' =>
                    'Digital solutions, website development, SEO and marketing services for businesses across the United Kingdom.',

                'meta_title' =>
                    'Web Design & Digital Marketing Services in the UK | GlanceTechy',

                'meta_description' =>
                    'GlanceTechy provides website design, web development, SEO, UI/UX and digital marketing services for businesses across the United Kingdom.',

                'status' => true,
                'sort_order' => 3,
            ]
        );

        /*
        |--------------------------------------------------------------------------
        | UK - ENGLAND
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $uk,
            'England',
            [
                'London',
                'Manchester',
                'Birmingham',
                'Liverpool',
                'Leeds',
                'Bristol',
            ],
            1
        );

        /*
        |--------------------------------------------------------------------------
        | UK - SCOTLAND
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $uk,
            'Scotland',
            [
                'Edinburgh',
                'Glasgow',
                'Aberdeen',
                'Dundee',
            ],
            2
        );

        /*
        |--------------------------------------------------------------------------
        | UK - WALES
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $uk,
            'Wales',
            [
                'Cardiff',
                'Swansea',
                'Newport',
                'Wrexham',
            ],
            3
        );

        /*
        |--------------------------------------------------------------------------
        | UK - NORTHERN IRELAND
        |--------------------------------------------------------------------------
        */

        $this->seedState(
            $uk,
            'Northern Ireland',
            [
                'Belfast',
                'Derry',
                'Lisburn',
                'Newtownabbey',
            ],
            4
        );


        /*
        |--------------------------------------------------------------------------
        | COMPLETE
        |--------------------------------------------------------------------------
        */

        $this->command?->info(
            'Service areas seeded successfully: countries, states and cities.'
        );
    }


    /*
    |--------------------------------------------------------------------------
    | CREATE / UPDATE STATE + CITIES
    |--------------------------------------------------------------------------
    */

    private function seedState(
        Country $country,
        string $stateName,
        array $cities,
        int $sortOrder
    ): void {
        /*
        |--------------------------------------------------------------------------
        | STATE
        |--------------------------------------------------------------------------
        */

        $stateSlug = Str::slug($stateName);

        $state = State::updateOrCreate(
            [
                'country_id' => $country->id,
                'slug' => $stateSlug,
            ],
            [
                'name' => $stateName,

                'short_description' => sprintf(
                    'Website design, web development, SEO and digital marketing services in %s, %s.',
                    $stateName,
                    $country->name
                ),

                'meta_title' => sprintf(
                    'Web Design & Digital Marketing Services in %s | GlanceTechy',
                    $stateName
                ),

                'meta_description' => sprintf(
                    'GlanceTechy provides website design, web development, SEO, UI/UX and digital marketing services for businesses in %s, %s.',
                    $stateName,
                    $country->name
                ),

                'status' => true,
                'sort_order' => $sortOrder,
            ]
        );


        /*
        |--------------------------------------------------------------------------
        | CITIES
        |--------------------------------------------------------------------------
        |
        | IMPORTANT:
        |
        | cities table currently has a unique key:
        |
        | country_id + slug
        |
        | Therefore state_id is NOT included in updateOrCreate lookup.
        |
        | This also handles your old/legacy city records.
        |
        */

        foreach ($cities as $cityIndex => $cityName) {
            $citySlug = Str::slug($cityName);

            City::updateOrCreate(
                [
                    'country_id' => $country->id,
                    'slug' => $citySlug,
                ],
                [
                    'state_id' => $state->id,

                    'name' => $cityName,

                    'short_description' => sprintf(
                        'Professional website design, web development, SEO and digital marketing services for businesses in %s, %s.',
                        $cityName,
                        $stateName
                    ),

                    'meta_title' => sprintf(
                        'Best Digital Marketing agency in %s | GlanceTechy',
                        $cityName
                    ),

                    'meta_description' => sprintf(
                        'GlanceTechy provides website design, web development, SEO, UI/UX and digital marketing services in %s, %s, %s.',
                        $cityName,
                        $stateName,
                        $country->name
                    ),

                    'status' => true,

                    'sort_order' => $cityIndex + 1,
                ]
            );
        }
    }
}