import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthHttp from "../util/AuthHttp";
import Cookies from "js-cookie";
function 첫번째로그인페이지() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(sessionStorage.getItem("username") || "");
  const [name, setName] = useState(sessionStorage.getItem("name") || "");
  const [image, setImage] = useState(null);
  const [password, setPassword] = useState(sessionStorage.getItem("password") || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [phone, setPhone] = useState(sessionStorage.getItem("phone") || "");
  const [newPhone, setNewPhone] = useState("");
  const [passwordChangeSuccess, setPasswordChangeSuccess] = useState(false);
  const [phoneChangeSuccess, setPhoneChangeSuccess] = useState(false);
  const [uploadMessage, setUploadMessage] = useState(""); // 이미지 업로드 메시지
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const refreshToken = sessionStorage.getItem("accessToken");
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpdate = () => {
    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인합니다.
    if (newPassword !== confirmNewPassword) {
      alert("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }

    // FormData 객체를 생성하여 데이터를 담습니다.
    const formData = new FormData();
    const jsonData = {
      name: name,
      password: newPassword,
      phone: newPhone,
    };

    if (image) {
      formData.append("profileImage", image);
      formData.append("employeeUpdateRequest", JSON.stringify(jsonData));
    }
    sendUpdateRequest(formData);
  };

  // const sendUpdateRequest = async (formData) => {
  //   try {
  //     const response = await AuthHttp({
  //       method: 'patch',
  //       url: `/private/members/employees`,
  //       data: formData, // Pass the formData here
  //     });
  //     sessionStorage.setItem('password', newPassword);
  //     sessionStorage.setItem('phone', newPhone);
  //     setPasswordChangeSuccess(true);
  //     setPhoneChangeSuccess(true);
  //   } catch (error) {
  //     console.error("이미지 업로드 실패:", error);
  //     setUploadMessage('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
  //   }
  // };
  // const handleLogout = async () => {
  //   try {
  //     const accessToken = sessionStorage.getItem('accessToken');

  //     if (accessToken) {
  //       // Send a POST request to the logout API with accessToken in Authorization header
  //       await axios.post(
  //         `${BASE_URL}/api/v1/private/auth/logout`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `${accessToken}`,
  //           },
  //         }
  //       );
  //     }

  //     // Assuming the logout was successful, clear the token from localStorage
  //     localStorage.removeItem('accessToken');
  //     // Cookies.remove('accessToken');
  //     sessionStorage.removeItem('imageurl');
  //     sessionStorage.removeItem('username');
  //     sessionStorage.removeItem('role');
  //     sessionStorage.removeItem('name');
  //     sessionStorage.removeItem('phone');
  //     sessionStorage.removeItem('accessToken');
  //     // sessionStorage.clear();
  //     // Cookies.clear();
  //     // Optionally, you can clear other data from localStorage as well, e.g., username
  //     localStorage.removeItem('username');
  //     // Redirect the user to the webmain page
  //     window.location.href = '/';
  //     navigate('/');

  //     console.log('로그아웃 성공')
  //   } catch (error) {
  //     // Handle logout error here
  //     console.error('로그아웃 실패', error);
  //     navigate('/');

  //     // Even if there is an error, clear the token from both localStorage and cookies

  //     // navigate('/');
  //   }
  // };

  const sendUpdateRequest = (formData) => {
    // axios를 사용하여 PATCH 요청을 보냅니다.
    const headers = {
      Authorization: `${refreshToken}`,
      "Content-Type": "multipart/form-data",
    };

    axios
      .patch(`${BASE_URL}/api/v1/private/members/employees`, formData, { headers })
      .then(async (response) => {
        // 성공적으로 업데이트된 경우
        console.log("이미지 업로드 성공:", response.data);

        // 나머지 데이터 업데이트 요청
        // axios
        //   .patch(`${BASE_URL}/api/v1/private/members/employees`, jsonData, { headers })
        //   .then((response) => {
        //     // 성공적으로 업데이트된 경우
        //     console.log("API 요청 성공:", response.data);

        // 여기서 성공 메시지를 처리하거나 필요한 로직을 추가하세요.
        // 예를 들어, sessionStorage 업데이트 및 성공 메시지 표시
        sessionStorage.setItem("password", newPassword);
        sessionStorage.setItem("phone", newPhone);
        setPasswordChangeSuccess(true);
        setPhoneChangeSuccess(true);
        alert("변경이 성공했습니다."); // 변경이 성공했음을 알림

        // mypage로 이동
        localStorage.removeItem("accessToken");
        Cookies.remove("accessToken");
        sessionStorage.removeItem("imageurl");
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("phone");
        sessionStorage.removeItem("accessToken");
        // sessionStorage.clear();
        // Cookies.clear();
        // Optionally, you can clear other data from localStorage as well, e.g., username
        localStorage.removeItem("username");
        window.location.href = BASE_NAME + "/";
      })
      .catch((error) => {
        console.error("이미지 업로드 실패:", error);
        setUploadMessage("이미지 업로드에 실패했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className="infocha fontb">
      <div className="infoin">
        <div className="infogridx">
          <div>
            <label htmlFor="profile-image">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  className="infoimg"
                  style={{ border: "2px solid black", cursor: "pointer" }}
                  alt="프로필"
                />
              ) : (
                <div
                  className="infoimg"
                  style={{
                    textAlign: "center",
                    borderRadius: "50%",
                    width: "6rem",
                    height: "6rem",
                    border: "2px solid black",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "1rem",
                  }}
                >
                  이미지를 선택해주세요
                </div>
              )}
            </label>
            <input
              type="file"
              id="profile-image"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <span className="infofirtitle">{name}</span>
            {uploadMessage && <p style={{ color: "red" }}>{uploadMessage}</p>}
          </div>

          <div style={{ marginTop: "6.9rem", display: "flex", justifyContent: "space-between" }}>
            <p style={{ fontSize: "1.3rem", fontWeight: "bold" }}>아이디 : {username}</p>
          </div>
        </div>

        <div>
          <div className="passtagboxx">
            연락처
            <p>
              <input
                className="detailpassboxs"
                placeholder="연락처를 입력해주시오."
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </p>
            비밀번호 변경
          </div>

          <div>
            <p>
              <input
                style={{ marginTop: "1rem" }}
                className="detailpassboxx"
                placeholder="새 비밀번호"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                style={{ marginTop: "1rem" }}
                className="detailpassboxx"
                placeholder="새 비밀번호 확인"
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </p>
          </div>

          <div style={{ marginTop: "1rem", display: "flex", justifyContent: "center" }}>
            <button className="Changeboxx" onClick={handleUpdate}>
              변경하기
            </button>
          </div>

          {passwordChangeSuccess && (
            <p style={{ color: "green", marginTop: "1rem" }}>
              비밀번호가 성공적으로 변경되었습니다.
            </p>
          )}
          {phoneChangeSuccess && (
            <p style={{ color: "green", marginTop: "1rem" }}>
              휴대폰 번호가 성공적으로 변경되었습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default 첫번째로그인페이지;
