import React, { useState, useContext, createContext } from 'react';
import { Container, Frame, Title, Item, Inner, Header, Body, Image } from './styles';
import moment from "moment"
import { urlImage } from "../../utils/url"
import { MdDelete } from "react-icons/md";
import { addFavorite, getDataFavorite } from "../../hooks/actions";
import AppContext from "../../context/Context";




const ToggleContext = createContext();
export default function Accordion({ children, ...restProps }) {
  return (
    <Container {...restProps}>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = useState(false);

  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  const { dispatch } = useContext(AppContext.Context);
  const { toggleShow, setToggleShow } = useContext(ToggleContext);


  const { item } = restProps

    const onClickDeleteFavorite = () => {
        addFavorite({
            id: item.id,
            favorite: false
        }).then((res) => {
            getDataFavorite(dispatch)
        })
    }
  return (
    <Header {...restProps}>
      <Image src={urlImage + item.poster_path} alt="Open" />
      <span>{children}</span>&nbsp;{moment(item.release_date).format('YYYY')}
      {toggleShow ? (
        <img onClick={() => setToggleShow(!toggleShow)} className='icons' src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img onClick={() => setToggleShow(!toggleShow)} className='icons' src="/images/icons/add.png" alt="Open" />
      )}
      <MdDelete className='delete' onClick={() => onClickDeleteFavorite()} size={25} />
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = useContext(ToggleContext);
  return (
    <Body className={toggleShow ? 'open' : 'closed'} {...restProps}>
      <span>{children}</span>
    </Body>
  );
};
