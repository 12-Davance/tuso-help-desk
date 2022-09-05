import React, {useEffect, useState} from 'react'
import {Table, Card, ButtonGroup, Button} from "reactstrap"
import axios from "axios"
import {userEndpoint} from "../../api/user.endpoint"
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner"
import {Edit, Trash, User} from "react-feather"
import AddEditUserModal from "../user-manage/add-edit-user-modal"
import Avatar from "../../../../@core/components/avatar"
import {Link} from "react-router-dom"
import * as Swal from "sweetalert2"

const UserList = () => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [showUserModal, setShowUserModal] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [userData, setUserData] = useState(null)


    const getUserAccounts = () => {
        setLoading(true)
        axios.get(userEndpoint.listUsers).then((res) => {
            setUsers(res.data)
            setLoading(false)
        }).catch(error => {
            console.error(error)
            setLoading(false)
        })
    }

    const onUserModalHide = (source) => {
        setShowUserModal(false)
        if (source) {
            getUserAccounts()
        }
    }

    const deleteUser = (userAccountID) => {
        axios.delete(`${userEndpoint.addUser}/${userAccountID}`).then((res) => {
            if (res.status === 200) {
                Swal.fire('User Deleted!', '', 'info')
                getUserAccounts()
            }
        }).catch((error) => {
            console.error(error)
            Swal.fire({title: 'Error Occurred!', text: error.response.data, icon: 'error'})
        })
    }

    const onDelete = (userAccountID) => {
        Swal.fire({
            title: 'Do you want to delete this user?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: `No`
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(userAccountID)
            } else if (result.isDenied) {
                Swal.fire('User Not Deleted!', '', 'info')
            }
        })
    }

    useEffect(() => {
        getUserAccounts()
    }, [])

    if (loading) {
        return <ComponentSpinner />
    } else {
        return (
            <>
            <Card title='Basic' noBody style={{overflow: 'auto'}}>
                <div style={{display: 'flex', alignItems: 'end', justifyContent: 'end', padding: '1rem'}}>
                    <Button color='primary' onClick={() => {
                        setShowUserModal(true)
                        setIsEditMode(false)
                        setUserData(null)
                    }}>
                        Add New User
                    </Button>
                </div>
                {users.length > 0 ? (
                    <Table
                    >
                        <thead>
                        <tr>
                            <th>...</th>
                            <th>
                                Name
                            </th>
                            <th>
                                Sur Name
                            </th>
                            <th>
                                Username
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                Cellphone
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(({userAccountID, surname, name, username, email, cellphone}, index) => <tr key={userAccountID}>
                                <td>
                                    <Avatar tag={Link} to={`single-user-view/${userAccountID}`} color='light-primary' icon={<User size={14} />} size='lg'/>
                                </td>
                                <td>
                                    {name}
                                </td>
                                <td>
                                    {surname}
                                </td>
                                <td>
                                    {username}
                                </td>
                                <td>
                                    {email}
                                </td>
                                <td>
                                    {cellphone}
                                </td>
                            <td>
                                <ButtonGroup>
                                    <Button onClick={() => {
                                        setIsEditMode(true)
                                        setUserData(users[index])
                                        setShowUserModal(true)
                                    }} size='sm' color='warning'>
                                        <Edit size={15}/>
                                    </Button>
                                    <Button onClick={() => onDelete(userAccountID)} size='sm' color='danger'>
                                        <Trash size={15} />
                                    </Button>
                                </ButtonGroup>
                            </td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                ) : (
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
                        <h4>No Data!</h4>
                    </div>
                    )}
            </Card>
                {showUserModal && <AddEditUserModal isOpen={showUserModal} isEditMode={isEditMode} data={isEditMode ? userData : null} onHide={onUserModalHide} />}
                </>
    )
    }

}

export default UserList
