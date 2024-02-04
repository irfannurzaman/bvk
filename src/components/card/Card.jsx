import React, { useState, useContext, createContext } from 'react';
import { GoHeart, GoHeartFill } from "react-icons/go";
import {
  Container,
  Group,
  Title,
  SubTitle,
  Text,
  Feature,
  FeatureTitle,
  FeatureText,
  FeatureClose,
  FeatureFavorite,
  Maturity,
  Content,
  Meta,
  Entities,
  Item,
  Image,
  ImageFavorite
} from './styles';
import moment from "moment"
import { addFavorite, getMovieDetail, getDataFavorite } from "../../hooks/actions";
import AppContext from "../../context/Context";
import Loading from '../loading/Loading';
import { urlImage, urlYoutube } from "../../utils/url"


export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
  const [showFeature, setShowFeature] = useState(false);
  const [itemFeature, setItemFeature] = useState({});
  const [loading, setLoading] = useState(false);


  const values = {
      showFeature,
      setShowFeature,
      itemFeature,
      setItemFeature,
      loading,
      setLoading
    }

  return (
    <FeatureContext.Provider value={values}>
      <Container {...restProps}>{children}</Container>
    </FeatureContext.Provider>
  );
}

Card.Group = function CardGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
  return <SubTitle {...restProps}>{children}</SubTitle>;
};

Card.Text = function CardText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Card.Entities = function CardEntities({ children, ...restProps }) {
  return <Entities {...restProps}>{children}</Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
  return <Meta {...restProps}>{children}</Meta>;
};


export const showDetailMovie = async ({
  id,
  setItemFeature,
  setLoading,
  load = true
}) => {
    setLoading(load)
    const { loading, response} = await getMovieDetail(id)
    setItemFeature(response); 
    setLoading(loading)     
  }

Card.Item = function CardItem({ item, children, ...restProps }) {
  const { setShowFeature, setItemFeature, setLoading } = useContext(FeatureContext);


  const onClickShowMovie = async () => {    
    setShowFeature(true);
    await showDetailMovie({
      id: item.id,
      setItemFeature,
      setLoading
    })

  }

  return (
    <Item
      onClick={onClickShowMovie}
      {...restProps}
    >
      {children}
    </Item>
  );
};

Card.Image = function CardImage({ ...restProps }) {
  return <Image {...restProps} />;
};
Card.ImageFavorite = function CardImageFavorite({ ...restProps }) {
  return <ImageFavorite {...restProps} />;
};

Card.Feature = function CardFeature({ children, category, genres, ...restProps }) {
  const { showFeature, itemFeature, setShowFeature, setItemFeature, loading,  setLoading } = useContext(FeatureContext);
  const { dispatch } = useContext(AppContext.Context)

  const onClickAddFavorite = () => {
    addFavorite({
      id: itemFeature.id,
      favorite: !itemFeature.favorite
    }).then((res) => {
      showDetailMovie({
        id: itemFeature.id,
        setItemFeature,
        setLoading,
        load: false
      })
      getDataFavorite(dispatch)
    })
  }

  return showFeature ? (
    <Feature {...restProps} src={!loading ? (urlImage + itemFeature?.backdrop_path) : ''}>
      {loading ? (
        <Loading/>
        
      ) : (
          <Content>
            <FeatureTitle>{itemFeature?.original_title} {moment(itemFeature?.release_date).format('YYYY')}</FeatureTitle>
            <FeatureText>{itemFeature?.overview}</FeatureText>

            <FeatureFavorite onClick={() => onClickAddFavorite()}>
              {
                itemFeature?.favorite ?
                  <GoHeartFill color='red' size={28} /> :
                  <GoHeart color='#fff' size={28} />
              }
            </FeatureFavorite>
            <FeatureClose onClick={() => setShowFeature(false)}>
              <img src="/images/icons/close.png" alt="Close" />
            </FeatureClose>
            
            <Group margin="30px 0" flexDirection="row" alignItems="center">
              <Maturity rating={itemFeature?.vote_average}>{itemFeature?.vote_average}</Maturity>
              {itemFeature?.genres?.map(item => (
                <FeatureText fontWeight="bold">
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1)}, &nbsp;
                </FeatureText>
              ))}
            </Group>
              
            {children}
          </Content>
      )}
    </Feature>
  ) : null;
};
