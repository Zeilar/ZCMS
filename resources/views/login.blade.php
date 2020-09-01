@extends('app', ['disable' => ['header', 'footer']])

@section('content')
    <h1 class="authLogo">
        <a class="authLogoLink" href="{{ route('index') }}">
            {{ config('app.name', 'ZCMS') }}
        </a>
    </h1>

    <form class="authWrapper" action="{{ route('login.submit') }}" method="POST">
        @csrf

        <h2 class="authHeader">
            @lang('partials.login')
        </h2>

        @error('id') <p class="authError">{{ $message }}</p> @enderror
        <div class="inputRow @error('id') error @enderror">
            <div class="inputIcon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path></svg>
            </div>
            <input type="text" value="{{ old('id') }}" required placeholder="Username or email" name="id" id="id" autocomplete="off" />
        </div>

        @error('password') <p class="authError">{{ $message }}</p> @enderror
        <div class="inputRow @error('password') error @enderror">
            <div class="inputIcon">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
            </div>
            <input type="password" required placeholder="@lang('input.password')" name="password" id="password" autocomplete="off" />
            <div class="passwordToggler" data-id="password"><!-- PasswordToggler component --></div>
        </div>

        <div class="rememberRow">
            <div class="checkboxWrapper">
                <div class="checkbox" data-name="remember" data-id="remember"></div>
                <label for="remember">
                    @lang('input.remember_me')
                </label>
            </div>

            <a class="forgotPassword" href="{{ route('register.form') }}">
                <p>
                    @lang('auth_form.forgot_password')
                </p>
            </a>
        </div>

        <button class="authSubmit btnPrimary block" type="submit">
            @lang('partials.login')
        </button>

        <div class="footer">
            <span class="signupText">
                @lang('auth_form.not_member')
            </span>
            <a class="signupLink" href="{{ route('register.form') }}">
                @lang('partials.register')
            </a>
        </div>
    </form>
@endsection