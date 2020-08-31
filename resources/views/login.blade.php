@extends('app')

@section('content')
    <form class="authWrapper" action="{{ route('login.submit') }}" method="POST">
        @csrf

        <h2 class="authHeader">Sign in</h2>

        <div class="input-row">
            <input type="text" name="id" id="id" placeholder="Username or email" required>
        </div>
        <div class="input-row">
            <input type="password" name="password" id="password" placeholder="Password" required>
        </div>

        <button class="authSubmit btnPrimary block" type="submit">
            Sign in
        </button>
    </form>
@endsection