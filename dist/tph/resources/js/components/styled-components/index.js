import { TableTitle, Back } from './tables';
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

const AdminStatisticBox = styled.div`
    border: 2px solid var(--border-primary);
    background-color: var(--color-primary);
    flex-direction: column;
    font-family: Raleway;
    align-items: center;
    border-radius: 2px;
    padding: 25px 50px;
    width: fit-content;
    font-weight: bold;
    font-size: 1.5rem;
    display: flex;
    gap: 15px;
`;

const Tab = styled.a`
    border: 1px solid var(--border-primary);
    background-color: var(--color-primary);
    color: var(--text-primary);
    justify-content: center;
    flex-direction: column;
    font-family: Raleway;
    align-items: center;
    font-size: 1.25rem;
    position: relative;
    padding: 10px 20px;
    margin-left: -1px;
    user-select: none;
    font-weight: bold;
    transition: none;
    display: flex;
    &::after {
        background-color: var(--color-main);
        width: calc(100% + 2px);
        position: absolute;
        display: none;
        bottom: -1px;
        content: "";
        height: 2px;
        left: -1px;
    }
    &:first-child {
        margin-left: 0;
    }
    &:hover {
        text-decoration: none;
    }
    &:hover, &.active {
        border-bottom-color: var(--color-main);
        color: var(--color-main);
        &::after {
            display: block;
        }
    }
`;

const BigNavButton = styled.a`
    box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.15);
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
    * {
        font-size: inherit;
    }
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
    @media (max-width: 768px) {
        padding: 8px 12px;
        font-size: 1rem; 
    }
`;

export {
    AdminStatisticBox,
    BigNavButton,
    LinkStandard,
    LinkButton,
    TableTitle,
    Knockout,
    Back,
    Tab,
};
