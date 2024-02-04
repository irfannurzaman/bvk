import React, { useState, useEffect } from 'react';
import { Header } from '../components';

export function HeaderContainer({
  children,
  src,
  dontShowOnSmallViewPort
}) {

  const users = JSON.parse(localStorage.getItem('users'))
  const [colors, setColors] = useState('transparent')
  


  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setColors("transparant")
    } else if (window.scrollY > 70) {
      return setColors("#000")
    } 
  }


  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);

    return () =>
      window.removeEventListener('scroll', listenScrollEvent);
  }, []);



  return (
    <Header src={src} dontShowOnSmallViewPort={dontShowOnSmallViewPort}>
      <Header.Frame  colors={colors}>
          <Header.Group>
            <Header.Logo />
          </Header.Group>
          <Header.Group>
          <Header.Favorite />
          <Header.Search />
            <Header.Profile>
              <Header.Picture />
            </Header.Profile>
          </Header.Group>
      </Header.Frame>
      {children}
    </Header>
  );
}
