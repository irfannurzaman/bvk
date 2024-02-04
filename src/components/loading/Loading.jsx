import React from 'react';
import { LoadingContainer, LoadingSpinner } from './styles';



export default function Loading({ children, ...restProps }) {
    return <LoadingContainer {...restProps}>
        <LoadingSpinner>{children}</LoadingSpinner>
    </LoadingContainer>;
}
