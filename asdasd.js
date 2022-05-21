import React, { useCallback } from "react";
import useInput from "../hooks/useInput";
import { KakaoLoginAction } from "../modules/user";
import { loginAction } from "../modules/user";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Container, Grid, Input, Paper, Button } from "@material-ui/core";
import KakaoLogin from "react-kakao-login";

function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useInput("");
    const [password, setPassword] = useInput("");

    const LoginHandler = useCallback(async () => {
        try {
            const data = {
                email: email,
                password,
            };
            console.log(data);
            await dispatch(loginAction(data));
            alert("로그인 성공!");
            history.push("/");
        } catch (err) {
            console.error(err.response);
            alert("로그인 실패");
        }
    }, [email, password]);

    const KakaoLoginHandler = useCallback(
        async (result) => {
            try {
                let token = result.response.access_token;
                console.log(token);
                await dispatch(KakaoLoginAction({ token }));
            } catch (error) {
                console.error(error);
                alert("로그인 실패");
            }
        },
        [dispatch]
    );

    return (
        <Container maxWidth="sm">
            <Paper>
                <Grid container spacing={3}>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "blue",
                            fontSize: "2rem",
                        }}
                        item
                        xs={12}>
                        로그인 페이지
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>email:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="email"
                            type="email"
                            value={email}
                            onChange={setEmail}
                        />
                    </Grid>
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                        }}
                        item
                        xs={6}>
                        <div>password:</div>
                    </Grid>
                    <Grid item xs={5}>
                        <Input
                            fullWidth
                            placeholder="password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" onClick={LoginHandler}>
                            로그인
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={3}
                        style={{ display: "flex", justifyContent: "center" }}>
                        <KakaoLogin
                            useLoginForm
                            token={process.env.REACT_APP_KAKAO_SECRET}
                            onSuccess={(result) => KakaoLoginHandler(result)}
                            onFail={(result) => console.log(result)}
                            render={(props) => (
                                <img
                                    src="/images/kakao_login_medium.png"
                                    alt="카카오로그인"
                                    onClick={props.onClick}
                                />
                            )}></KakaoLogin>
                    </Grid>
                    <Grid
                        item
                        xs={6}
                        style={{ display: "flex", justifyContent: "center" }}>
                        <Button onClick={""}>
                            <img
                                src="/images/google_login.png"
                                alt="구글로그인"
                            />
                        </Button>
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        style={{ display: "flex", justifyContent: "center" }}>
                        <Button>
                            <Link
                                to="/signup"
                                style={{
                                    textDecoration: "none",
                                    color: "black",
                                    fontSize: "1.1rem",
                                }}>
                                회원가입
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default Login;