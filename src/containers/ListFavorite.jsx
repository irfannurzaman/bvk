import React from 'react';
import { Accordion } from '../components';
import useNetwork from "../hooks/use-network"

export function ListFavoriteContiner({ favorite }) {
  const { online } = useNetwork()
  const favoriteStorage = localStorage.getItem('film_favorite') || []


  
  let dataFavorite  = []
  
  if (online) {
    dataFavorite = favorite
  } else {
    dataFavorite = JSON.parse(favoriteStorage) || []
  }

  return (
    <Accordion>
      <Accordion.Title>Film Favorite</Accordion.Title>
      <Accordion.Frame>
        {dataFavorite?.map((item) => (
          <Accordion.Item key={item.id}>
            <Accordion.Header item={item}>{item.original_title}</Accordion.Header>
            <Accordion.Body>{item.overview}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion.Frame>
    </Accordion>
  );
}
