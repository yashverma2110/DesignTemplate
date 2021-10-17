import { useRef, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import "./styles/Login.css";
import Header from "../Components/Header/Header";
import { client } from "../utils/api.config";
import { useHistory } from "react-router";

const Login = ({ setMessage }: any) => {
  const history = useHistory();
  const [isLogin] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const nameRef = useRef<any>();
  const emailRef = useRef<any>();
  const passRef = useRef<any>();

  const handleSubmit = async () => {
    try {
      let data;
      setLoading(true);
      if (!isLogin) {
        data = await client.post("/user/signup", {
          name: nameRef.current.value,
          email: emailRef.current.value,
          password: passRef.current.value,
        });
      } else {
        data = await client.post("/user/login", {
          email: emailRef.current.value,
          password: passRef.current.value,
        });
      }

      data = data.data;
      setLoading(false);
      const { token, user }: any = data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("XKEY", token);
      history.push("/");
    } catch (error) {
      setMessage({
        open: true,
        severity: "error",
        msg: "User does not exist",
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="form-parent">
        <Card elevation={3}>
          <CardHeader
            title={
              <Typography variant="h5" className="login-card-header">
                {isLogin ? "Log In" : "Join Us"}
              </Typography>
            }
          />
          <CardContent>
            <form className="form-container">
              {!isLogin && (
                <TextField
                  variant="outlined"
                  type="text"
                  name="name"
                  required
                  label="Full Name"
                  placeholder="Full Name"
                  className="input-field"
                  inputRef={nameRef}
                />
              )}
              <TextField
                variant="outlined"
                type="text"
                name="email"
                required
                label="Login"
                placeholder="Email"
                className="input-field"
                inputRef={emailRef}
              />
              <TextField
                variant="outlined"
                type="password"
                required
                name="password"
                label="Password"
                placeholder="Password"
                className="input-field"
                inputRef={passRef}
              />
              <Button
                color="primary"
                variant="contained"
                className="submit-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? (
                  <CircularProgress color="secondary" size="1.2em" />
                ) : (
                  "Submit"
                )}
              </Button>
              {/* <Button
                className="submit-btn"
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? "Don't" : "Already"} have an account?
              </Button> */}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
