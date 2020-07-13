import React, {useState, useEffect, useRef, memo} from "react";
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import styled from 'styled-components';
import {searchType, searchTerm, performSearch, resetSearch} from "../../redux";

const NavBarMain = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
align-content: center;
justify-items: center;
background-color: black;
padding: 2vh 5vw 2vh 5vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
flex-wrap: wrap;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
padding: 1vh 2vw 1vh 2vw;
}`;

const AmdbLogo = styled.img`
width: 6vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
width: 18vw;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 7vw;
}`;

const AmdbLogoText = styled.span`
font-size: 4rem;
color: white;
font-weight: bold;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 4rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 2.5rem;
}`;

const SearchDiv = styled.div`
display: flex;
align-items: center;
font-size: 1.5rem;
margin: 0 1rem 0 1rem;
border-radius: 1rem;
background-color: #545b62;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const SearchInput = styled.input`
font-size: 1.5rem;
padding-left: 1rem;
border:none;
width: 30vw;
background:transparent;
color: white;
font-weight: bold;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 1rem;
width: 50vw;
margin: 0;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 1rem;
width: 26vw;
}`;

const SearchCategoryDiv = styled.div`
padding-right: 0.5rem;
border-left: 2px solid black;
display: flex;
align-items: center;
@media screen and (min-width: 320px) and (max-width: 767px) {
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
}`;

const SearchCategoryButton = styled.button`
font-size: 1rem;
padding: 0.3rem;
border:none;
background-color: #545b62;
color: white;
font-family: 'Mandali', sans-serif;
font-weight: bold;
:focus {
    outline: 0;
}
:hover {
color:black
}

@media screen and (min-width: 320px) and (max-width: 767px) {
font-size: 0.9rem;
padding-left: 0.5rem;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
padding-left: 0.5rem;
}`;

const TmdbLogoText = styled.span`
color: white;
font-size: 1.5rem;
font-family: 'Mandali', sans-serif;

@media screen and (min-width: 320px) and (max-width: 767px) {
display:none;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
font-size: 0.9rem;
}`;

const TmdbLogo = styled.img`
width: 10vw;

@media screen and (min-width: 320px) and (max-width: 767px) {
display:none;
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
width: 10vw;
}`;

const NavBar = memo((props) => {

  let history = useHistory();

  const [searchValue, setSearchValue] = useState("");
  const [placeHolder, setPlaceHolder] = useState("Movies");
  const searchRef = useRef("");

  useEffect(() => {
    searchRef.current.focus();
    console.log("searching"); // DELETE
    setTimeout(() => {
      if (searchValue && searchValue === searchRef.current.value) {
        props.searchTerm(searchValue);
        props.performSearch();
        history.push("/search");
        setSearchValue("");
      } else {
        return null;
      }
    }, 1000);

  }, [searchValue]);

  return (
    <>
      <NavBarMain>

        <Link to="/">
          <AmdbLogo src="../images/amdbLogo.svg"
                    alt="logo"
                    onClick={() => {
                      props.resetSearch();
                      props.searchTerm("");
                      setSearchValue("");
                    }}/>
        </Link>
        <Link to="/" id="TitleLink">
          <AmdbLogoText>AMDb</AmdbLogoText>
        </Link>

        <SearchDiv>

          <SearchInput
            type="text"
            placeholder={`Search in ${placeHolder}`}
            ref={searchRef}
            value={searchValue}
            onChange={event => {
              setSearchValue(event.target.value);
            }}
          />

          <SearchCategoryDiv>
            <SearchCategoryButton onClick={() => {
              setPlaceHolder("Movies");
              props.searchType("movie");
            }}>Movies
            </SearchCategoryButton>

            <SearchCategoryButton onClick={() => {
              setPlaceHolder("TV");
              props.searchType("tv");
            }}>TV
            </SearchCategoryButton>

            <SearchCategoryButton onClick={() => {
              setPlaceHolder("People");
              props.searchType("person");
            }}>People
            </SearchCategoryButton>
          </SearchCategoryDiv>

        </SearchDiv>

        <TmdbLogoText>Powered by</TmdbLogoText>
        <TmdbLogo src="../images/tmdbLogo.svg" alt="logo"/>

      </NavBarMain>

    </>
  );
});

const mapStateToProps = state => {
  return {
    searchTerm: state.reducerUrl.searchTerm,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchType: type => dispatch(searchType(type)),
    searchTerm: term => dispatch(searchTerm(term)),
    performSearch: () => dispatch(performSearch()),
    resetSearch: () => dispatch(resetSearch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
