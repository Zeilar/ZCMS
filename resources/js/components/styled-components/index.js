import styled from 'styled-components';

const Knockout = styled.p`
    background-image: var(--color-main-gradient);
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: var(--color-main);
    background-clip: text;
    font-family: Raleway;
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

export {
    Knockout,
    LinkStandard,
    LinkButton,
};
