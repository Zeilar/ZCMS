import styled from 'styled-components';

const Back = styled.a`
    background-image: var(--color-main-gradient);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    color: var(--color-primary);
    border-radius: 2px;
    margin-right: 10px;
    padding: 15px;
    display: flex;
    &:hover {
        color: var(--color-primary);
    }
`;

const TableTitle = styled.div`
    background-image: var(--color-main-gradient);
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    color: var(--color-primary);
    align-items: center;
    border-radius: 3px;
    font-size: 1rem;
    padding: 15px;
    display: flex;
    width: 100%;
`;

export {
    TableTitle,
    Back,
};