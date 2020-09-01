<header class="header">
    <h1 class="siteHeader">
        <a class="siteHeaderLink knockout" href="{{ route('index') }}">
            ZCMS
        </a>
    </h1>
    <nav class="navbar">
        <ul class="navlist">
            @guest
                <li class="navitem">
                    <a class="navlink {{ request()->is('login') ? 'active' : '' }}" href="{{ route('login.form') }}">
                        Login
                    </a>
                </li>
                <li class="navitem">
                    <a class="navlink {{ request()->is('register') ? 'active' : '' }}" href="{{ route('register.form') }}">
                        Register
                    </a>
                </li>
            @else
                <li class="navitem">
                    <a class="navlink" href="{{ route('logout') }}">
                        Logout
                    </a>
                </li>
            @endguest
        </ul>
    </nav>
</header>