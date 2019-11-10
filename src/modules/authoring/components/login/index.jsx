﻿import React, { useState,useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { LoginModel } from 'modules/authoring/types';
import { identityService } from 'modules/authoring/services';

import { Button, Input, Password } from 'components';

import './index.scss';

const Login = () => {
    const [login, setLogin] = useState(new LoginModel());
    const history = useHistory();

    useEffect(() => {
        if (identityService.isLoggedIn) {
            console.log('already logged in');
        }
    }, []);

    const handleSubmit = (evt) => {
        evt.preventDefault();

        identityService.login(login)
            .then(() => {
                history.push('/loanSetup');
            })
            .catch(error => {
                toast.error(error);
            });
    };

    const inputOnChange = evt => {
        const name = evt.target.name;
        const value = evt.target.value;

        setLogin({ ...login, ...{ [name]: value } });       
    };

    const forgotPassword = () => {
        history.push('/forgotPassword');
    };

    const register = () => {     
        history.push('/register');
    };

    return (
        <div className="login mx-auto">
            <div className="row">
                <form onSubmit={handleSubmit} className="col">
                    <Input
                        inputType="text"
                        title="Username"
                        name="username"
                        onChange={inputOnChange}
                        value={login.username}
                    />

                    <Password
                        title="Password"
                        name="password"
                        onChange={inputOnChange}
                        value={login.password}
                    />

                    <Button type="submit" text="Login" className="btn-primary btn-block" />
                </form>
                </div>
            <div className="row mt-3">
                <div className="col">
                    <Button text="Forgot password" onClick={forgotPassword} className="btn-secondary btn-block" />
                </div>
                <div className="col">
                    <Button text="Register" onClick={register} className="btn-success btn-block" />
                </div>
            </div>

            My Content: 
            {JSON.stringify(login)}
        </div>
    );
};

export default Login;