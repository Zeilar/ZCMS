<header id="header">
    <div id="hero">
        <h1 class="siteHeader">
            <a class="siteHeaderLink" href="{{ route('index') }}">
                {{ config('app.name', 'ZCMS') }}
            </a>
        </h1>
        <p class="siteSlogan">
            @lang('partials.slogan')
        </p>
    </div>
    <nav id="navbar">
        <ul class="navlist">
            @guest
                <li class="navitem">
                    <a class="navlink {{ request()->is('login') ? 'active' : '' }}" href="{{ route('login.form') }}">
                        @lang('partials.login')
                    </a>
                </li>
                <li class="navitem">
                    <a class="navlink {{ request()->is('register') ? 'active' : '' }}" href="{{ route('register.form') }}">
                        @lang('partials.register')
                    </a>
                </li>
            @else
                <li class="navitem">
                    <a class="navlink" href="{{ route('admin.index') }}">
                        Admin
                    </a>
                </li>
                <li class="navitem">
                    <a class="navlink" href="{{ route('logout') }}">
                        @lang('partials.logout')
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