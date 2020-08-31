<header class="header">
    <a class="siteHeaderLink" href="{{ route('index') }}">
        <h1 class="siteHeader">ZCMS</h1>
    </a>
    <nav class="navbar">
        <ul class="navlist">
            @guest
                <li class="navitem">
                    <a class="navlink {{ request()->is('login') ? 'active' : '' }}" href="{{ route('login.form') }}">
                        Login
                    </a>
                </li>
                <li class="navitem">
                    <a class="navlink" href="{{ route('register.form') }}">
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