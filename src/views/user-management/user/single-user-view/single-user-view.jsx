import React, {useState, useEffect, Fragment} from 'react'
import './single-user-view.scss'
import {Link, useParams} from 'react-router-dom'
import axios from "axios"
import {userEndpoint} from "../../api/user.endpoint"
import ComponentSpinner from "../../../../@core/components/spinner/Loading-spinner"
import {Button, Card, CardBody, Badge, CardHeader} from 'reactstrap'
import Avatar from "../../../../@core/components/avatar"
import {XCircle} from 'react-feather'

const SingleUserView = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(false)
    const [singleUserData, setSingleUserData] = useState(null)


    const getSingleUserData = () => {
        setLoading(true)
        axios.get(`${userEndpoint.singleUser}/${id}`).then((res) => {
            setSingleUserData(res.data)
            setLoading(false)
        }).catch(error => {
            console.error(error)
            setLoading(false)
        })
    }

    useEffect(() => {
        getSingleUserData()
    }, [])

    if (loading) {
        return <ComponentSpinner />
    } else {
        if (singleUserData) {

        const {name, surname, username, email, countryCode, cellphone, roleID, facilityID, isAccountActive} = singleUserData
        return (
            <Fragment>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Card style={{width: '50%'}}>
                    <CardHeader style={{display: 'flex', justifyContent: 'end', alignItems: 'end'}}>
                        <Button tag={Link} to='/user-list' size='sm' color='light'>
                            <XCircle />
                        </Button>
                    </CardHeader>
                    <CardBody>
                        <div className='user-avatar-section'>
                            <div className='d-flex align-items-center flex-column'>
                                <Avatar
                                    initials
                                    color='light-primary'
                                    className='rounded mt-3 mb-2'
                                    content={`${name} ${surname}`}
                                    contentStyles={{
                                        borderRadius: 0,
                                        fontSize: 'calc(48px)',
                                        width: '100%',
                                        height: '100%'
                                    }}
                                    style={{
                                        height: '110px',
                                        width: '110px'
                                    }}
                                />
                                <div className='d-flex flex-column align-items-center text-center'>
                                    <div className='user-info'>
                                        <h4>{`${name} ${surname}`}</h4>
                                            <Badge color='light-primary' className='text-capitalize'>
                                                {roleID}
                                            </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
                        <div className='info-container'>
                                <ul className='list-unstyled'>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Username:</span>
                                        <span>{username}</span>
                                    </li>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Email:</span>
                                        <span>{email}</span>
                                    </li>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Status:</span>
                                        <Badge className='text-capitalize' color={isAccountActive ? 'success' : 'danger'}>
                                            {isAccountActive ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </li>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Roles:</span>
                                        <span className='text-capitalize'>{roleID}</span>
                                    </li>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Facilities:</span>
                                        <span className='text-capitalize'>{facilityID}</span>
                                    </li>
                                    <li className='mb-75'>
                                        <span className='fw-bolder me-25'>Cellphone:</span>
                                        <span>{`${countryCode}-${cellphone}`}</span>
                                    </li>
                                </ul>
                        </div>
                    </CardBody>
                </Card>
                </div>
            </Fragment>
        )
        } else {
            return (
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'}}>
                    <h4>No Data!</h4>
                </div>
            )
        }
    }
}

export default SingleUserView
