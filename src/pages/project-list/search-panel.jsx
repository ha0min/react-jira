import React from "react";

export const SearchPanel = ({users, param, setParam}) => {

    return (
        <form action="">
            <div>
                <input type="text"
                       value={param.name}
                       onChange={evt => setParam(
                           {
                               ...param,
                               name: evt.target.value
                           }
                       )}/>
                <select value={param.personId}
                        onChange={evt => {
                            setParam({
                                ...param,
                                personId: evt.target.value
                            })
                        }}
                >
                    <option value={""}>负责人</option>
                    {
                        users.map(userItem => (
                            <option value={userItem.id} key={userItem.name}>{userItem.name}</option>
                        ))
                    }
                </select>
            </div>
        </form>
    )
}
