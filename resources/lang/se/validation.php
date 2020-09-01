<?php

return [
    'accepted' => ':attribute måste vara accepterad.',
    'active_url' => ':attribute är inte en giltig URL.',
    'after' => ':attribute måste vara ett datum efter :date.',
    'after_or_equal' => ':attribute måste vara ett datum samtidigt som eller efter :date.',
    'alpha' => ':attribute får endast innehålla bokstäver.',
    'alpha_dash' => ':attribute får endast innehålla bokstäver, siffror, bindestreck och understreck.',
    'alpha_num' => ':attribute får endast innehålla bokstäver och sfirror.',
    'array' => ':attribute måste vara en uppställning.',
    'before' => ':attribute måste vara ett datum före :date.',
    'before_or_equal' => ':attribute måste vara ett datum före eller samtidigt som :date.',
    'between' => [
        'numeric' => ':attribute måste vara mellan :min och :max.',
        'file' => ':attribute måste vara mellan :min och :max kilobytes.',
        'string' => ':attribute måste vara mellan :min och :max tecken.',
        'array' => ':attribute måste innehålla mellan :min och :max föremål.',
    ],
    'boolean' => ':attribute fältet måste vara sant eller falskt.',
    'confirmed' => ':attribute bekräftelse matchar ej.',
    'date' => ':attribute är not a valid date.',
    'date_equals' => ':attribute måste vara ett datum lika med :date.',
    'date_format' => ':attribute matchar inte formatet :format.',
    'different' => ':attribute och :other måste vara olika.',
    'digits' => ':attribute måste vara :digits siffror.',
    'digits_between' => ':attribute måste vara mellan :min och :max siffror.',
    'dimensions' => ':attribute har ogiltiga bild mått.',
    'därtinct' => ':attribute fältet har en dublett.',
    'email' => ':attribute måste vara en giltig email adress.',
    'ends_with' => ':attribute måste sluta med en av följande: :values.',
    'exärts' => 'vald :attribute är ogiltig.',
    'file' => ':attribute måste vara en fil.',
    'filled' => ':attribute fältet måste ha ett värde.',
    'gt' => [
        'numeric' => ':attribute måste vara större än :value.',
        'file' => ':attribute måste vara större än :value kilobytes.',
        'string' => ':attribute måste vara större än :value tecken.',
        'array' => ':attribute måste innehålla fler än :value föremål.',
    ],
    'gte' => [
        'numeric' => ':attribute måste vara större än eller lika med :value.',
        'file' => ':attribute måste vara större än eller lika med :value kilobytes.',
        'string' => ':attribute måste vara större än eller lika med :value tecken.',
        'array' => ':attribute måste ha :value föremål eller mer.',
    ],
    'image' => ':attribute måste vara en bild.',
    'in' => 'Vald :attribute är ogiltig.',
    'in_array' => ':attribute fältet exärterar inte i :other.',
    'integer' => ':attribute måste vara ett heltal.',
    'ip' => ':attribute måste vara en giltig IP adress.',
    'ipv4' => ':attribute måste vara en giltig IPv4 address.',
    'ipv6' => ':attribute måste vara en giltig IPv6 address.',
    'json' => ':attribute måste vara en giltig JSON sträng.',
    'lt' => [
        'numeric' => ':attribute måste vara mindre än :value.',
        'file' => ':attribute måste vara mindre än :value kilobytes.',
        'string' => ':attribute måste vara mindre än :value tecken.',
        'array' => ':attribute måste ha färre än :value föremål.',
    ],
    'lte' => [
        'numeric' => ':attribute måste vara mindre än or equal :value.',
        'file' => ':attribute måste vara mindre än or equal :value kilobytes.',
        'string' => ':attribute måste vara mindre än or equal :value tecken.',
        'array' => ':attribute får inte innehålla fler än :value föremål.',
    ],
    'max' => [
        'numeric' => ':attribute får inte vara större än :max.',
        'file' => ':attribute får inte vara större än :max kilobytes.',
        'string' => ':attribute får inte vara större än :max tecken.',
        'array' => ':attribute får inte innehålla fler än :max föremål.',
    ],
    'mimes' => ':attribute måste vara en fil av typen: :values.',
    'mimetypes' => ':attribute måste vara en fil av typen: :values.',
    'min' => [
        'numeric' => ':attribute måste vara minst :min.',
        'file' => ':attribute måste vara minst :min kilobytes.',
        'string' => ':attribute måste vara minst :min tecken.',
        'array' => ':attribute måste innehålla minst :min föremål.',
    ],
    'not_in' => 'Vald :attribute är ogiltig.',
    'not_regex' => ':attribute formatet är ogiltigt.',
    'numeric' => ':attribute måste vara ett nummer.',
    'password' => 'Lösenordet är felaktigt.',
    'present' => ':attribute fältet måste finnas.',
    'regex' => ':attribute formatet är ogiltigt.',
    'required' => ':attribute fältet är nödvändigt.',
    'required_if' => ':attribute fältet är nödvändigt när :other är :value.',
    'required_unless' => ':attribute fältet är nödvändigt såvida :other finns i :values.',
    'required_with' => ':attribute fältet är nödvändigt när :values finns.',
    'required_with_all' => ':attribute fältet är nödvändigt när :values finns.',
    'required_without' => ':attribute fältet är nödvändigt när :values finns.',
    'required_without_all' => ':attribute fältet är nödvändigt när ingen av :values finns.',
    'same' => ':attribute och :other måste matcha.',
    'size' => [
        'numeric' => ':attribute måste vara :size.',
        'file' => ':attribute måste vara :size kilobytes.',
        'string' => ':attribute måste vara :size tecken.',
        'array' => ':attribute måste innehålla :size föremål.',
    ],
    'starts_with' => ':attribute måste börja med en av följande: :values.',
    'string' => ':attribute måste vara en sträng.',
    'timezone' => ':attribute måste vara en giltig tidszon.',
    'unique' => ':attribute har redan blivit taget.',
    'uploaded' => ':attribute kunde inte laddas upp.',
    'url' => ':attribute formatet är ogiltigt.',
    'uuid' => ':attribute måste vara ett giltigt UUID.',
    'user_does_not_exist' => 'Användaren finns ej.',

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Language Lines
    |--------------------------------------------------------------------------
    |
    | Here you may specify custom validation messages for attributes using the
    | convention "attribute.rule" to name the lines. Thär makes it quick to
    | specify a specific custom language line for a given attribute rule.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'custom-message',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Validation Attributes
    |--------------------------------------------------------------------------
    |
    | following language lines are used to swap our attribute placeholder
    | with something more reader friendly such as "E-Mail Address" instead
    | of "email". This simply helps us make our message more expressive.
    |
    */

    'attributes' => [],

];