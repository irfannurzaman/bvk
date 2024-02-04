import React, { useState, useContext, createContext } from 'react';

import {
    Container,
    Drawers,
    Close,
    Content,
    ButtonDelete
} from './styles';
import { IoCloseSharp } from "react-icons/io5";
import { DrawerContext } from "../header/Header"
import { MdDelete } from "react-icons/md";
import { addFavorite, getDataFavorite } from "../../hooks/actions";
import AppContext from "../../context/Context"

export default function Drawer({ children, ...restProps }) { 
    const { open, setOpen } = useContext(DrawerContext);

    return (
        <Container open={open} {...restProps}>
            <Close onClick={() => setOpen(false)}>
                <IoCloseSharp size={25} color='#000'/>
            </Close>
            {children}
        </Container>
    )
}



Drawer.Components = function DrawerComponents({ children, ...restProps }) {
    return (
        <Drawers>{children}</Drawers>
    )
}
Drawer.Content = function DrawerContent({ slideItem, children, ...restProps }) {
    const { dispatch } = useContext(AppContext.Context);
    const onClickDeleteFavorite = () => {
        addFavorite({
            id: slideItem.id,
            favorite: false
        }).then((res) => {
            getDataFavorite(dispatch)
        })
    }
    
    return (
        <Content>
            {children}
            <ButtonDelete onClick={() => onClickDeleteFavorite()}>
                <MdDelete size={25} />
            </ButtonDelete>
        </Content>
    )
}
