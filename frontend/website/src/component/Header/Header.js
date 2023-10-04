import React, { useEffect, useState } from "react";
import "./Header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Logout from "../Login/Logout";
function Header(props) {
  const [activeLink, setActiveLink] = useState("");
  const [view, setView] = useState(false);
  const [username, setUsername] = useState(null);
  const [imageurl, setImageurl] = useState(null);
  const [name, setName] = useState(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    setUsername(sessionStorage.getItem("username"));
    setImageurl(sessionStorage.getItem("imageurl"));
    setName(sessionStorage.getItem("name"));

    return () => {
      setUsername(null);
      setImageurl(null);
      setName(null);
    };
  }, [view]);

  useEffect(() => {
    if (username && imageurl && name) setView(true);

    return () => {
      setView(false);
    };
  }, [username, imageurl, name]);

  const linkStyle = {
    color: "black",
    marginRight: "3%",
    display: "inline-block",
  };

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
  };

  // 로그아웃 함수

  return (
    <div className="fontb">
      <div className="header">
        <img
          style={{ marginLeft: "4rem", marginTop: "8rem", width: "8rem" }}
          src={`${process.env.PUBLIC_URL}/assets/logo.png`}
          alt="logo"
        />{" "}
        {/* 로고 이미지를 표시합니다. */}
        <div className="items">
          {/* <NavLink
            to={`/`}
            style={activeLink === '홈' ? { ...linkStyle, color: 'orange' } : linkStyle}
            onClick={() => handleLinkClick('홈')}
          >
            홈
          </NavLink> */}
          {/* 로그아웃 버튼 */}
          {view && (
            <div
              className="useritem"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <img
                src={imageurl}
                alt="User Profile"
                style={{
                  width: "40px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p style={{ fontSize: "12px" }}>{name}</p>
                <Logout />
              </div>
            </div>
          )}

          <NavLink
            to={`/list`}
            className="item"
            style={
              activeLink === "접수 목록"
                ? {
                    ...linkStyle,
                    color: "#F07B3F",
                    height: "2rem",
                    width: "5.2rem",
                    borderBottom: "2px solid #F07B3F",
                    fontWeight: "bold",
                  }
                : linkStyle
            }
            onClick={() => handleLinkClick("접수 목록")}
          >
            접수내역
          </NavLink>
          <NavLink
            to={`/resultList`}
            className="item"
            style={
              activeLink === "결과 목록"
                ? {
                    ...linkStyle,
                    color: "#F07B3F",
                    borderBottom: "2px solid #F07B3F",
                    height: "2rem",
                    width: "5.2rem",
                    fontWeight: "bold",
                  }
                : linkStyle
            }
            onClick={() => handleLinkClick("결과 목록")}
          >
            결과내역
          </NavLink>
          <NavLink
            to={`/mypage`}
            className="minitem"
            style={
              activeLink === "내 정보"
                ? {
                    ...linkStyle,
                    color: "#F07B3F",
                    height: "2rem",
                    width: "4rem",
                    borderBottom: "2px solid #F07B3F",
                    fontWeight: "bold",
                  }
                : linkStyle
            }
            onClick={() => handleLinkClick("내 정보")}
          >
            내정보
          </NavLink>
          {/* <button onClick={handleLogout}>로그아웃</button> */}
        </div>
      </div>
    </div>
  );
}

export default Header;
