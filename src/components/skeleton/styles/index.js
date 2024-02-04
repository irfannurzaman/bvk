import styled, { keyframes } from 'styled-components';


const shimmer = keyframes`
    0% {
    background-color: rgb(209, 209, 209);
  }
  100% {
    background-color: rgb(243, 243, 243);
  }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`
export const SkeletonComponent = styled.div`
    width: 100%;
    height: 200px; 
    background-color: #f0f0f0; 
    margin-bottom: 10px; 
    animation: ${shimmer} 1.5s infinite linear; 
`

export const Image = styled.div`
    width: 200px;
    height: 300px;
    margin: 10px;
    background-color: rgb(209, 209, 209);
    animation: ${shimmer} 0.5s linear infinite alternate; 
`
export const Text = styled.div`
    width: 500px;
    height: 20px;
    background-color: rgb(209, 209, 209);
    animation: ${shimmer} 0.5s linear infinite alternate;
    ${(clas) => clas}
`
export const Title = styled.div`
    width: 500px;
    height: 30px;
    background-color: rgb(209, 209, 209);
    animation: ${shimmer} 0.5s linear infinite alternate; 
`