import React from "react";
import {List} from "./list";
import {SearchPanel} from "./search-panel";
import {useEffect, useState} from "react";
import {cleanObject, useDebounce, useMount} from "../../utils";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectList = () => {
    const [param, setParam] = useState({
        name: '',
        personId: ''
    });
    const debounceParam = useDebounce(param, 1500)

    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async response => {
            if (response.ok) {
                setUsers(await response.json());
            }
        })
    });

    useEffect(() => {
        fetch(`${apiUrl}/projects/?${qs.stringify(cleanObject(debounceParam))}`).then(async response => {
            if (response.ok) {
                setProjects(await response.json());
            }
        })
    },[debounceParam]);

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
            <List projects={projects} users={users}></List>
        </div>
    )
}
