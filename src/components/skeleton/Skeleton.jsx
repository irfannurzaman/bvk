import React from 'react';
import { Container, SkeletonComponent, Image, Text, Title } from './styles';


export default function Skeleton({ children, ...restProps }) {
    return <Container {...restProps}>
        {children}
    </Container>;
}

Skeleton.Image = function SkeltonImage({...restProps }) {
    return (
        <Image {...restProps } />
    )
}
Skeleton.Title = function SkeltonTitle({...restProps }) {
    return (
        <Title {...restProps } />
    )
}
Skeleton.Text = function SkeltonText({ ...restProps }) {
    return (
        <Text {...restProps } />
    )
}
