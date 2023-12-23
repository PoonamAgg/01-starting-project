import React, { useState, useEffect, useReducer, useContext } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../store/auth-context";
import Input from "../UI/Input/Input";

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length>6 };
  }
 return { value: '', isValid: false };
};

const collegeReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
        return { value: action.val, isValid: action.val.trim().length >= 4 };
      }
      if (action.type === "INPUT_BLUR") {
        return { value: state.value, isValid: state.value.trim.length>=4 };
      }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  // const [enteredCollege, setEnteredCollege] = useState("");
  // const [CollegeIsValid, setCollegeIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
    value: "",
    isValid: null,
  });

  const [collegeState, dispatchCollege] = useReducer(collegeReducer,{
    value: "",
    isValid: null,
  });

  const authCtx =useContext(AuthContext);
  useEffect(() => {
    console.log("Effect Running");
    return () => {
      console.log("Effect laeanUp");
    };
  }, []);

  const { isValid: emailIsValid} = emailState;
  const { isValid: passwordIsValid} = passwordState;
  const { isValid: collegeIsValid} = collegeState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking the Validity!')
      setFormIsValid(
        emailIsValid &&
          passwordIsValid &&
          collegeIsValid
      );
    }, 500);
    return () => {
      console.log("clean Up!");
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid, collegeIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   event.target.value.includes("@") &&
    //     passwordState.isValid &&
    //     collegeState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid &&
    //     event.target.value.trim().length > 6 &&
    //     collegeState.isValid
    // );
  };

  const collegeChangeHandler = (event) => {
    dispatchCollege({ type: "USER_INPUT", val: event.target.value });

    // setFormIsValid(
    //   emailState.isValid &&
    //     passwordState.isValid &&
    //     event.target.value.trim().length >= 4
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
       <Input 
       id ="email" 
       label = "E-mail" 
       type = "email" 
       isValid = {emailIsValid} 
       value = {emailState.value} 
       onChange = {emailChangeHandler}
       onBlur ={validateEmailHandler}
       />
        <Input 
       id ="password" 
       label = "Password" 
       type = "password" 
       isValid = {passwordIsValid} 
       value = {passwordState.value} 
       onChange = {passwordChangeHandler}
       onBlur ={validatePasswordHandler}
       />
        <Input 
       id ="college" 
       label = "College" 
       type = "text" 
       isValid = {collegeIsValid} 
       value = {collegeState.value} 
       onChange = {collegeChangeHandler}
       onBlur ={validateCollegeHandler}
       />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
