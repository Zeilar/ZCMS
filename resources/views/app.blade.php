<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Z CMS') }}</title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body class="scrollbar">
        <main class="scrollbar" id="app">
            @include('partials.header')
            <div class="scrollbar" id="content">
                @yield('content')
            </div>
            @include('partials.sidebar')
        </main>
        @include('partials.footer')
        @yield('footer')
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>