import React, {useState, useEffect} from 'react'
import './add-edit-user-moda.scss'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
    FormFeedback, Spinner
} from 'reactstrap'
import {User} from "react-feather"
import Avatar from "../../../../@core/components/avatar"
import axios from "axios"
import {userEndpoint} from "../../api/user.endpoint"
import * as Swal from "sweetalert2"

const AddEditUserModal = ({isOpen, isEditMode, data, onHide}) => {
    const [userForm, setUserForm] = useState({
       name: '',
       surname: '',
       email: '',
       username: '',
       password: '',
       confirmPassword: '',
       countryCode: '',
       cellphone: '',
       photoPath: '',
       roleID: '',
       facilityID: '',
       isAccountActive: true,
       isDeleted: false
    })

    const [currentImage, setCurrentImage] = useState(null)

    const {name,
        surname,
        email,
        username,
        countryCode,
        cellphone,
        roleID,
        photoPath,
        facilityID,
        password,
        confirmPassword} = userForm

    const [loading, setLoading] = useState(false)


    const onChange = (e) => {
        if (e.target.name === 'photoPath') {
            const imageUrl = URL.createObjectURL(e.target.files[0])
            setCurrentImage(imageUrl)
        }

        setUserForm({...userForm, [e.target.name]: e.target.value})
    }

    const sendUser = (user, mode) => {
        if (mode === 'add') {
            axios.post(userEndpoint.addUser, user).then((res) => {
                if (res.status === 204) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Created User!',
                        icon: 'success'
                    })
                    onHide('add')
                }
            }).catch((error) => {
                setLoading(false)
                Swal.fire({
                    title: 'Error Occurred!',
                    text: error.response.data,
                    icon: 'error'
                })
            })
        } else {
            axios.put(`${userEndpoint.addUser}/${user.userAccountID}`, user).then((res) => {
                if (res.status === 204) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Success!',
                        text: 'Successfully Updated User!',
                        icon: 'success'
                    })
                    onHide('edit')
                }
            }).catch((error) => {
                setLoading(false)
                console.error(error)
                Swal.fire({title: 'Error Occurred!', text: error.response.data, icon: 'error'})
            })
        }
    }

    const onSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const userToSend = {...userForm}
        userToSend['photoPath'] = currentImage
        userToSend['countryCode'] = countryCode[0] !== '+' ? `+${countryCode}` : countryCode
        userToSend['roleID'] = Number(roleID)
        userToSend['facilityID'] = Number(facilityID)
        delete userToSend.confirmPassword
        if (!isEditMode) {
            sendUser(userToSend, 'add')
        } else {
            sendUser(userToSend, 'edit')
        }
    }


    useEffect(() => {
        if (isEditMode) {
            const {userAccountID, name, surname, email, username, countryCode, cellphone, roleID, facilityID, isAccountActive, isDeleted} = data
            setUserForm({
                userAccountID,
                name,
                surname,
                email,
                username,
                password: '',
                confirmPassword: '',
                countryCode,
                cellphone,
                photoPath: '',
                roleID,
                facilityID,
                isAccountActive,
                isDeleted
            })
        }
    }, [])

    return (
        <Modal backdrop='static' isOpen={isOpen} toggle={() => onHide(null)} size='lg'>
            <Form onSubmit={onSubmit}>
                <ModalHeader toggle={() => onHide(null)}>Add New User</ModalHeader>
                <ModalBody>
                    <div style={{display: 'flex', flexFlow: 'column wrap', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem'}}>
                        {
                            currentImage ? (
                                <Avatar img={currentImage} size='xl'
                                        style={{marginBottom: '1rem'}}/>
                            ) : (
                                <Avatar icon={<User size={14} />} size='xl' style={{marginBottom: '1rem'}} />
                            )
                        }
                        <Input required style={{width: '50%'}} onChange={onChange} value={photoPath} id='photoPath' name='photoPath' type='file' accept='image/png, image/jpeg' />
                    </div>
                    <div className='row'>
                        <div className="col-4">
                       <FormGroup className='form-item'>
                           <Label for='Name' >Name</Label>
                           <Input required value={name} onChange={onChange} id='name' name='name' placeholder='Name' type='text' />
                       </FormGroup>
                        </div>
                        <div className="col-4">
                            <FormGroup className='form-item'>
                                <Label for='surname' >Sur Name</Label>
                                <Input required value={surname} onChange={onChange} id='surname' name='surname' placeholder='Sur Name' type='text' />
                            </FormGroup>
                        </div>
                        <div className="col-4">
                            <FormGroup className='form-item'>
                                <Label for='username' >Username</Label>
                                <Input required value={username} onChange={onChange} id='username' name='username' placeholder='Username' type='text' />
                            </FormGroup>
                        </div>
                        <div className="col-6">
                            <FormGroup className='form-item'>
                                <Label for='email' >Email</Label>
                                <Input required value={email} onChange={onChange} id='email' name='email' placeholder='Email' type='email' />
                            </FormGroup>
                        </div>
                        <div className="col-2">
                            <FormGroup className='form-item'>
                                <Label for='countryCode' >Country Code</Label>
                                <Input maxLength={5} required value={countryCode} onChange={onChange} id='countryCode' name='countryCode' placeholder='Code' type='text' />
                            </FormGroup>
                        </div>
                        <div className="col-4">
                            <FormGroup className='form-item'>
                                <Label for='cellphone' >Cellphone</Label>
                                <Input required onChange={onChange} minLength={9} maxLength={15} value={cellphone} id='cellphone' name='cellphone' placeholder='Cellphone' type='text' />
                            </FormGroup>
                        </div>
                        <div className="col-6">
                            <FormGroup className='form-item'>
                                <Label for='roleID' >Role</Label>
                                <Input required value={roleID} onChange={onChange} id='roleID' name='roleID' placeholder='Role' type='select' >
                                    <option value={1}>Role 1</option>
                                    <option value={2}>Role 2</option>
                                    <option value={3}>Role 3</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="col-6">
                            <FormGroup className='form-item'>
                                <Label for='facilityID' >Facility</Label>
                                <Input required value={facilityID} onChange={onChange} id='facilityID' name='facilityID' placeholder='Facility' type='select' >
                                    <option value={1}>Facility 1</option>
                                    <option value={2}>Facility 2</option>
                                    <option value={3}>Facility 3</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="col-6">
                            <FormGroup className='form-item'>
                                <Label for='password' >Password</Label>
                                <Input invalid={password !== confirmPassword} minLength={8} required value={password} onChange={onChange} id='password' name='password' placeholder='Password' type='password' />
                                <FormFeedback>
                                    Passwords doesn't match
                                </FormFeedback>
                            </FormGroup>
                        </div>
                        <div className="col-6">
                            <FormGroup className='form-item'>
                                <Label for='confirmPassword' >Confirm Password</Label>
                                <Input pattern={password} invalid={password !== confirmPassword} minLength={8} required value={confirmPassword} onChange={onChange} id='confirmPassword' name='confirmPassword' placeholder='Confirm Password' type='password' />
                            </FormGroup>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button disabled={loading} color="primary" type='submit'>
                        {loading &&
                        <Spinner size="sm" style={{marginRight: '1rem'}}>
                            Loading...
                        </Spinner>
                        }
                        Submit
                    </Button>
                    <Button color="secondary" onClick={() => onHide(null)}>
                        Cancel
                    </Button>
            </ModalFooter>
            </Form>
        </Modal>
    )
}

export default AddEditUserModal
