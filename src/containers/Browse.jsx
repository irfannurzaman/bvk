import React, { useMemo } from 'react';
import {
  Card,
  Header,
  Player,
  Drawer,
  Skeleton,
} from '../components';

import { urlImage } from "../utils/url"
import { HeaderContainer } from "./Header/";
import { ListFavoriteContiner } from "./ListFavorite";


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const newArrayGenres = Array.from({ length: 2 });
const newArrayMovie = Array.from({ length: 6});

export function BrowseContainer({ slides, genres, favorite, data, loading }) {
  const min = 1;
  const max = data.length;
  const randomNumber = getRandomInt(min, max);

  
  let dataHeader = useMemo(() => {
    return data[randomNumber]
  }, [data])


  if (!dataHeader) {
    dataHeader = data[randomNumber]
  }

  return (
    <>
      <HeaderContainer src={!loading ? (urlImage + dataHeader?.backdrop_path) : ""} dontShowOnSmallViewPort> 
        <Header.Feature>

          {
            loading ?           <Skeleton>
            <Skeleton.Title />
            <Skeleton.Text margin-top="20px;" />
            <Skeleton.Text  margin-top="10px;" width="300px;" />
            <Skeleton.Text  margin-top="10px;" width="200px;" />
          </Skeleton>
              : <Header.FeatureCallOut>{dataHeader?.title}</Header.FeatureCallOut>
          }
          
          {!loading && (
          <Header.Text>
            {dataHeader?.overview}
          </Header.Text>
          )}
        </Header.Feature>
        <Drawer>
          <Drawer.Components>
            <ListFavoriteContiner favorite={favorite} />
          </Drawer.Components>
        </Drawer>
      </HeaderContainer>
      <Card.Group>
        {
          loading && newArrayGenres.map((item, index) => (
            <Card key={index}>
              <Skeleton.Text></Skeleton.Text>
              <Card.Entities>
                {
                  newArrayMovie.map((item, index) => (
                    <Skeleton.Image/>
                  ))
                }
              </Card.Entities>
            </Card>
          ))
        }
        {!loading && slides.map((slideItem) => (
            <Card key={slideItem.title.toLowerCase()}>
              <Card.Title>{slideItem.title}</Card.Title>
              <Card.Entities>
                {slideItem.data.map((item) => (
                  <Card.Item key={item.id} item={item}>
                    <Card.Image src={urlImage + item.poster_path} />
                    <Card.Meta>
                      <Card.SubTitle>{item.title}</Card.SubTitle>
                      <Card.Text>{item.overview}</Card.Text>
                    </Card.Meta>
                  </Card.Item>
                ))}
              </Card.Entities>
              <Card.Feature category={"films"} genres={genres}>
                <Player>
                  <Player.Button />
                  <Player.Video src={"UtjH6Sk7Gxs"} />
                </Player>
              </Card.Feature>
            </Card>
          ))
        }
      </Card.Group>
    </>
  )
}
