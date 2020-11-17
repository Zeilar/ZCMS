import styled from 'styled-components';

const Knockout = styled.p`
    background-image: var(--color-main-gradient);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: var(--color-main);
    background-clip: text;
    user-select: none;
`;

const LinkStandard = styled.a`
    color: var(--color-link);
    &:hover {
        text-decoration: underline;
    }
`;

const LinkButton = styled.a`
    color: inherit;
    &:hover {
        text-decoration: none;
    }
`;

const BigNavButton = styled.a`
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.15);
    background-color: var(--color-primary);
    transition: all 0.05s linear;
    color: var(--text-primary);
    font-family: Raleway;
    border-radius: 3px;
    padding: 30px 50px;
    user-select: none;
    font-weight: bold;
    font-size: 1.5rem;
    &:hover, &:focus {
        color: var(--text-primary);
        transform: scale(1.02);
    }
    &:hover {
        text-decoration: none;
    }
    &:focus, &.active {
        background-color: var(--color-main);
        color: var(--color-primary);
        svg, img {
            filter: brightness(0) invert(1);
        }
    }
`;

export {
    BigNavButton,
    LinkStandard,
    LinkButton,
    Knockout,
};
