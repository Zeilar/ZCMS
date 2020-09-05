@extends('app', ['disable' => ['header', 'toolbar', 'footer', 'chat']])

@section('content')
    @yield('admin.dashboard.content')
@endsection