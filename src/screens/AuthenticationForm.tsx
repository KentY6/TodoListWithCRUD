import React, { useEffect, useState } from "react";
import { Title } from "../components/atoms/Title";
import { SmallButton } from "../components/atoms/SmallButton";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import "firebase/auth";
import type { User } from "firebase/auth";

export const AuthenticationForm = () => {
  const [mailAddress, setMailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loggedState, setLoggedState] = useState<string>("ログイン");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // 認証ステージを変更
  const toggleLoggedState: Function = () => {
    setMessage("");
    setMailAddress("");
    setPassword("");
    if (loggedState === "ログイン") {
      setLoggedState("アカウント登録");
    }
    if (loggedState === "アカウント登録") {
      setLoggedState("ログイン");
    }
    if (loggedState === "ログアウト") {
      signOut();
    }
  };

  // ヴァリデーション設定
  const getErrorMessage: Function = () => {
    let message = "";
    if (
      mailAddress.length > 0 &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mailAddress)
    ) {
      message = `メールアドレスが正しい形式で\n
            入力されていません`;
    }
    if (password.length > 0 && password.length < 6) {
      message = "パスワードは6文字以上入力してください";
    }
    if (
      (mailAddress.length > 0 && !/^[!-~]+$/.test(mailAddress)) ||
      (password.length > 0 && !/^[!-~]+$/.test(password))
    ) {
      message = "半角英数字で記載してください";
    }
    return setErrorMessage(message);
  };

  useEffect(() => {
    getErrorMessage();
  }, [mailAddress, password]);

  // 認証処理条件設定
  const authentication: Function = () => {
    if (loggedState === "アカウント登録") {
      signUp();
    }
    if (loggedState === "ログイン") {
      logIn();
    }
    if (loggedState === "ログアウト") {
      logOut();
    }
  };

  // 認証画面ページ変更設定
  const isLink: Function = () => {
    if (loggedState === "ログイン") {
      return "アカウント登録";
    }
    if (loggedState === "アカウント登録") {
      return "ログイン";
    }
    if (loggedState === "ログアウト") {
      return "アカウント削除";
    }
  };

  const user: User | null = auth.currentUser;

  // サインアップ機能
  const signUp: Function = async () => {
    if (errorMessage === "") {
      try {
        setMessage("処理中");
        await createUserWithEmailAndPassword(auth, mailAddress, password);
        setMailAddress("");
        setPassword("");
        setLoggedState("ログアウト");
        setMessage("アカウント登録に成功しました");
      } catch (err) {
        console.error(err);
        setMessage(
          "アカウント登録に失敗しました。既に登録されている可能性があります。"
        );
      }
    }
  };

  // ログイン機能
  const logIn: Function = async () => {
    if (errorMessage === "") {
      try {
        setMessage("処理中");
        await signInWithEmailAndPassword(auth, mailAddress, password);
        setMailAddress("");
        setPassword("");
        setLoggedState("ログアウト");
        setMessage("ログインに成功しました");
      } catch (err) {
        console.error(err);
        setMessage(
          `ログインに失敗しました。\nメールアドレスかパスワードが\n間違っている可能性があります。`
        );
      }
    }
  };

  // ログアウト機能
  const logOut: Function = async () => {
    try {
      setMessage("処理中");
      await auth.signOut();
      setLoggedState("ログイン");
      setMessage("ログアウトしました");
    } catch (err) {
      console.error(err);
      setMessage("ログアウトに失敗しました");
    }
  };

  // サインアウト機能
  const signOut: Function = () => {
    const checkSignOut = window.confirm("アカウントを削除しますか？");
    const deleteAccount = async () => {
      if (user) {
        await user.delete();
        setLoggedState("ログイン");
        setMessage("アカウント削除に成功しました");
      }
    };
    if (checkSignOut) {
      try {
        setMessage("処理中");
        deleteAccount();
      } catch (err) {
        console.error(err);
        setMessage("アカウント削除に失敗しました");
      }
    } else return;
  };

  // ログイン状態の時、ログアウトページにする
  useEffect(() => {
    if (user) {
      setLoggedState("ログアウト");
    }
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center w-full">
        <Title title={loggedState} />
        <div
          className={
            loggedState === "ログアウト"
              ? "hidden"
              : "m-2 w-1/4 max-sm:w-3/4 max-lg:w-1/2"
          }
        >
          <div className="m-1 text-sm">・メールアドレス</div>
          <input
            className="border p-1 w-full border-gray-400 rounded"
            type="email"
            value={mailAddress}
            onChange={(e) => setMailAddress(e.target.value)}
          />
        </div>
        <div
          className={
            loggedState === "ログアウト"
              ? "hidden"
              : "m-2 w-1/4 max-sm:w-3/4 max-lg:w-1/2"
          }
        >
          <div className="m-1 text-sm">・パスワード</div>
          <input
            className="border p-1 w-full border-gray-400 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div
          className={
            errorMessage === "" ? "hidden" : "text-red-500 m-4 text-sm"
          }
        >
          {errorMessage}
        </div>
        <div
          className={
            message === ""
              ? "hidden"
              : "m-4 text-sm w-1/4 max-sm:w-3/4 max-lg:w-1/2 text-center"
          }
        >
          <pre>{message}</pre>
        </div>
        <div className="w-1/4 max-sm:w-3/4 max-lg:w-1/2">
          <div className="mt-8" onClick={() => authentication()}>
            <SmallButton name={loggedState} />
          </div>
          <div
            className={
              "text-blue-500 mt-12 border-b border-blue-500 w-fit cursor-pointer"
            }
            onClick={() => toggleLoggedState()}
          >
            {isLink()}
          </div>
          <div className="text-blue-500 mt-6 border-b border-blue-500 w-fit cursor-pointer">
            <Link to={`/`}>Todoリストへ</Link>
          </div>
        </div>
      </div>
    </>
  );
};
