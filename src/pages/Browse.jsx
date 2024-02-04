import React from 'react';
import { BrowseContainer } from '../containers/Browse';
import { useContent } from '../hooks';
import selectionFilter from '../utils/selection-filter';

export default function Browse() {
  const { data, genres, favorite, loading } = useContent();
  const slides = selectionFilter({ genres, data });

  return <BrowseContainer
    slides={slides}
    genres={genres}
    favorite={favorite}
    data={data}
    loading={loading}
  />;
}
