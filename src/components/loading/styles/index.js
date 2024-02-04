import styled, { keyframes } from 'styled-components';


const spinAnimation = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
`
export const LoadingSpinner = styled.div`
    border: 4px solid #f3f3f3; 
    border-top: 4px solid #3498db; 
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: ${spinAnimation} 1s linear infinite;
`

