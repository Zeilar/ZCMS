@extends('app', ['disable' => ['header', 'toolbar', 'footer', 'chat'], 'theme' => 'light'])

@section('content')
    @yield('admin.dashboard.content')
@endsection

@section('footer')
    <style>
        :root {
            --dashboard-secondary: rgb(20, 30, 35);
            --dashboard-primary: rgb(25, 35, 40);
        }

        #content {
            padding: 0;
        }

        .dashboardWrapper {
            background: rgb(235, 240, 245);
            flex-direction: row;
            display: flex;
            flex: 1;
        }
    </style>
@endsection