<header id="header">
    <div id="hero">
        <h1 class="siteHeader">
            <a class="siteHeaderLink" href="{{ route('index') }}">
                ZCMS
            </a>
        </h1>
        <p class="siteSlogan">The pioneer hangout</p>
    </div>
    <nav id="navbar">
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

<script>
    // Scroll header folding animation
    document.addEventListener('scroll', function() {
        const header = document.querySelector('#header');
        const threshold = header.getBoundingClientRect().height;
        if (window.scrollY >= threshold) {
            header.classList.add('hide');
        } else {
            header.classList.remove('hide');
        }
    })
</script>