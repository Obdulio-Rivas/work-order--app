import React, {useState, useEffect} from 'react';
import {getDepartments} from "../../services/getDepartments";

const headerStyle = {
    display: 'block',
    background: 'red',
    width: '100%',
    padding: '1em',
    textAlign: 'center',
    color: 'white',
    fontSize: '1.5em'
}

export const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(()=>{
        getDepartments().then((res) => {
            setUsers(res.data);
        }).catch((error)=>{
            console.log(error)
        })
    },[]);

    return (
        <>
            <div style={headerStyle}>
                User List
            </div>
            <div>
                {users.map((user)=>(
                    <div key={user.id_department}>{`${user.department}`}</div>
                ))}
            </div>
        </>
    )
}
