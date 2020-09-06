@extends('app', ['disable' => ['header', 'toolbar', 'footer', 'chat']])

@section('content')
    @yield('admin.dashboard.content')
@endsection

@section('footer')
    <style>
        #content {
            padding: 0;
        }

        .dashboardWrapper {
            flex-direction: row;
            display: flex;
            flex: 1;
        }
    </style>
@endsection