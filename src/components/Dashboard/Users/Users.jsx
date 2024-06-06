import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from '../FormCategories.module.css';
import Update from '../Update/Update';
import UserController from './UserController';

const Users=()=> {


    


    return (
        <div className={style.FormCategories}>
            <h1>Lista de usuarios</h1>
            <UserController/>
        </div>
    );
}

export default Users