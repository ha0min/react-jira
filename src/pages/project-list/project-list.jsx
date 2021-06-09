import React from "react";
import {List} from "./list";
import {SearchPanel} from "./search-panel";
import {useEffect, useState} from "react";
import {cleanObject} from "../../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });

    const [users, setUsers] = useState([]);

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(param))}`).then(async response => {
            if (response.ok) {
                setProjects(await response.json());
            }
        })
    }, [param]);

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        })
    }, []);

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
            <List projects={projects} users={users}></List>
        </div>
    )
}
