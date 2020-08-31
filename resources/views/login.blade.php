@extends('app')

@section('content')
    <form class="authWrapper" action="{{ route('login.submit') }}" method="POST">
        @csrf

        <h2 class="authHeader">Sign in</h2>

        <div class="inputRow">
            <input type="text" name="id" id="id" placeholder="Username or email" required>
        </div>
        <div class="inputRow">
            <input type="password" name="password" id="password" placeholder="Password" required>
        </div>

        <div class="rememberRow">
            <div class="checkboxWrapper">
                <div class="checkbox" data-name="remember" data-id="remember"></div>
                <label for="remember">Remember me</label>
            </div>

            <a href="{{ route('register.form') }}">
                <p>Forgot password?</p>
            </a>
        </div>

        <button class="authSubmit btnPrimary block" type="submit">
            Sign in
        </button>

    </form>
@endsection