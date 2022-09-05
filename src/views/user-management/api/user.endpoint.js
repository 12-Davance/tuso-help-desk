import { environment } from '../../../environments/environments'
export const userEndpoint = {
    addUser: `${environment.urls.userApi}/user-account`, // add, edit, delete apis
    listUsers: `${environment.urls.userApi}/user-accounts`, // list all users
    singleUser: `${environment.urls.userApi}/user-account/key` // get single user
}
