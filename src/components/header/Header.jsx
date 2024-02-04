import React, { useState, useContext, createContext, useEffect } from 'react';
import { Link as ReachRouterLink } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import {
  Container,
  Group,
  Background,
  Dropdown,
  Picture,
  Link,
  Search,
  Favorite,
  Profile,
  FeatureCallOut,
  SearchIcon,
  SearchInput,
  ButtonLink,
  PlayButton,
  Text,
  Feature,
  Logo,
  FavoriteIcon,
  MuchFavorite
} from './styles';
import AppContext from "../../context/Context";
import useNetwork from '../../hooks/use-network';
import { logo } from "../../utils/url";
import { searchMovies, keywordMovies } from "../../hooks/actions";

export const DrawerContext = createContext();

export default function Header({ bg = true, children, ...restProps }) {
  const [open, setOpen] = useState(false)
  return (
    <DrawerContext.Provider value={{ open, setOpen }}>
      {
        bg ? (
          <Background data-testid="header-bg" {...restProps}>
            {children}
          </Background>
        ) : (
          children
        )
      }
    </DrawerContext.Provider>
  )
  
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Group = function HeaderGroup({ children, ...restProps }) {
  return <Group {...restProps}>{children}</Group>;
};

Header.Logo = function HeaderLogo({ to }) {
  return (
    <Link to={to}>
      <Logo src={logo} alt='Buana' />
    </Link>
  );
};

Header.Favorite = function HeaderFavorite({ ...restProps }) {
  const { setOpen } = useContext(DrawerContext);
  const { online } = useNetwork()
  const {state} = useContext(AppContext.Context);
  const favoriteStorage = localStorage.getItem('film_favorite') || []


  let dataFavorite  = []
  
  if (online) {
    dataFavorite = state?.favorite
  } else {
    dataFavorite = JSON.parse(favoriteStorage) || []
  }


  return (
    <Favorite {...restProps}>
      <FavoriteIcon onClick={() => dataFavorite?.length > 0 ? setOpen(true) : {}}>
        <FaHeart color='#fff' size={22} />
      </FavoriteIcon>
      {
        dataFavorite.length > 0 &&
      <MuchFavorite></MuchFavorite>
      }
    </Favorite>
  )
  
}

Header.Search = function HeaderSearch({children, ...restProps }) {
  const [searchActive, setSearchActive] = useState(false);
  const [dropwdown, setDropwdown] = useState({
    value: false,
    type: false
  });
  const [searchTerm, setSearchTerm] = useState('')
  const [keyword, setKeyword] = useState([])
  const { dispatch } = useContext(AppContext.Context);
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      searchMovies({
        searchTerm,
        dispatch
      })
    }
  }


  useEffect(() => {
    if (searchTerm && !dropwdown.type) {
      setDropwdown({
        value: true,
        type: false
      })
    } else {
      setDropwdown({
        value: false,
        type: false
      })
    }
    const delayDebounceFn = setTimeout(async () => {
      const response = await keywordMovies(searchTerm)
      setKeyword(response || [])
      // Send Axios request here
    }, 1000)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm])


  return (
    <Search {...restProps}>
      <SearchIcon onClick={() => setSearchActive((searchActive) => !searchActive)} data-testid="search-click">
        <img src="/images/icons/search.png" alt="Search" />
      </SearchIcon>
      <SearchInput
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Search films and series"
        active={searchActive}
        data-testid="search-input"
        onKeyDown={handleKeyDown}
      />
      {
        keyword.length > 0 && (
          <Header.Dropdown searchTerm={dropwdown.value}>
            { keyword?.map(item => (
                <Header.Group>
                <Header.TextLink onClick={() => {
                    setDropwdown({
                      value: false,
                      type: true
                    })
                    setSearchTerm(item.name)
                    searchMovies({
                      searchTerm : item.name,
                      dispatch
                    })
                  }}>{item.name}</Header.TextLink>
                </Header.Group>  
                ))
            }
          </Header.Dropdown>
        )
      }
    </Search>
  );
};


Header.Profile = function HeaderProfile({ children, ...restProps }) {
  return <Profile {...restProps}>{children}</Profile>;
};

Header.Feature = function HeaderFeature({ children, ...restProps }) {
  return <Feature>{children}</Feature>;
};

Header.Picture = function HeaderPicture({ src, ...restProps }) {
  return <Picture {...restProps} src={`data:image/jpeg;base64,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`} />;
};

Header.Dropdown = function HeaderDropdown({ children, ...restProps }) {
  return <Dropdown {...restProps}>{children}</Dropdown>;
};

Header.TextLink = function HeaderTextLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Header.PlayButton = function HeaderPlayButton({ children, ...restProps }) {
  return <PlayButton {...restProps}>{children}</PlayButton>;
};

Header.FeatureCallOut = function HeaderFeatureCallOut({ children, ...restProps }) {
  return <FeatureCallOut {...restProps}>{children}</FeatureCallOut>;
};

Header.Text = function HeaderText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};
