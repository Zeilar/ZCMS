@empty($disable) @php $disable = [] @endphp @endempty

<!doctype html>
<html lang="{{ str_replace('_', '-', session('locale')) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>
            @yield('pageTitle', config('app.name', 'ZCMS') . ' - ' . __('partials.slogan'))
        </title>

        <!-- Fonts -->
        <link rel="dns-prefetch" href="//fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    </head>
    <body>
        <div id="toolbar">
            <div id="themeToggler" title="@lang('partials.themeToggler')"></div>
            <div id="languageToggler"></div>
        </div>
        <main id="app">
            @includeUnless(in_array('header', $disable), 'partials.header')
            <div id="content">
                @yield('content')
            </div>
            @includeUnless(in_array('sidebar', $disable), 'partials.sidebar')
        </main>
        @includeUnless(in_array('footer', $disable), 'partials.footer')
        @yield('footer')
        <script src="{{ asset('js/app.js') }}"></script>
    </body>
</html>