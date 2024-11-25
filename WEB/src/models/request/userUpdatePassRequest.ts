interface UserUpdatePassRequest {
    UserId: number;
    userName:string;
    password: string;
    newPassword: string;
    PasswordConfirm: string;
    branchID : string;
}
export default UserUpdatePassRequest;