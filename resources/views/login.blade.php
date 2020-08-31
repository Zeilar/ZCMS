@extends('app')

@section('content')
    <div id="loginWrapper">
        <form action="{{ route('login.submit') }}" method="POST">
            @csrf

            <div class="input-row">
                <label for="id">Username or email</label>
                <input type="text" name="id" id="id">
            </div>
            <div class="input-row">
                <label for="password">Password</label>
                <input type="password" name="password" id="password">
            </div>
        </form>
    </div>
@endsection