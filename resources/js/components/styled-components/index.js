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
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.15);
    background-color: var(--color-primary);
    transition: all 0.05s linear;
    color: var(--text-primary);
    justify-content: center;
    flex-direction: column;
    font-family: Raleway;
    align-items: center;
    border-radius: 3px;
    font-size: 1.25rem;
    padding: 30px 50px;
    user-select: none;
    font-weight: bold;
    display: flex;
    &:hover, &.active {
        transform: scale(1.02);
    }
    &.active {
        background-image: var(--color-main-gradient);
        color: var(--color-primary);
        &:hover {
            color: var(--color-primary);
        }
        svg, img {
            filter: brightness(0) invert(1);
        }
    }
    &:hover {
        color: var(--text-primary);
        text-decoration: none;
    }
`;

export {
    BigNavButton,
    LinkStandard,
    LinkButton,
    Knockout,
};
