<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Language;
use Lang;

class LanguagesController extends Controller
{
    public function getTranslations() {
        return response()->json([
            'auth'            => Lang::get('auth'),
            'auth_form'       => Lang::get('auth_form'),
            'dashboard'       => Lang::get('dashboard'),
            'input'           => Lang::get('input'),
            'partials'        => Lang::get('partials'),
            'passwords'       => Lang::get('passwords'),
            'status_messages' => Lang::get('status_messages'),
            'validaiton'      => Lang::get('validaiton'),
        ]);
    }

    public function getLanguages() {
        return response()->json(Language::all()->pluck('name'));
    }
}