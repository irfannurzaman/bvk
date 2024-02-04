import styled from 'styled-components';

export const Container = styled.div`
    position: fixed;
    top: 0;
    right: ${({open}) => open ? '0px' : '-1000px'};
    width: 600px;
    height: 100%;
    background-color: #fff;
    transition: right 0.3s ease;     
    z-index: 1000;
    @media (max-width: 700px) {
        width: 100%;
    }
`;
export const Drawers = styled.div`
    position: relative;
    overflow-y: scroll;
    height: 100%;
`;

export const Close = styled.button`
    right: 20px;
    top: 30px;
    cursor: pointer;
    background-color: transparent;
    border: 0;
    position: absolute;
    z-index: 999;
`
export const ButtonDelete = styled.button`
    position: absolute;
    cursor: pointer;
    background-color: transparent;
    border: 0;
`

export const Content = styled.div`
    padding: 20px;
    display: flex;
`