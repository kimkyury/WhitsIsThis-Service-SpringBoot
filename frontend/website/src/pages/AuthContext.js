// import React, { createContext, useContext, useState } from 'react';

// // AuthContext 생성
// const AuthContext = createContext();

// // AuthProvider 컴포넌트
// export function AuthProvider({ children }) {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // 로그인 함수
//   const login = () => {
//     // 실제 로그인 로직은 여기에 구현
//     setIsLoggedIn(true);
//   };

//   // 로그아웃 함수
//   const logout = () => {
//     // 실제 로그아웃 로직은 여기에 구현
//     setIsLoggedIn(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // 사용자 정의 훅 생성
// export function useAuth() {
//   return useContext(AuthContext);
// }
