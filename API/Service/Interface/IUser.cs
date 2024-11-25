using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interface
{
    public interface IUser
    {
        Task<Object> Validate(UserModel userModel);
        Task<string> GennerateToken(UserModel userModel);       
        Task<IEnumerable<UserModel>> GetAll();
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(UsersManagerVmModel userModel);
        Task<ApiResponeModel> Update(int id, UserModel userModel);
        Task<ApiResponeModel> Delete(int id);
        Task<ApiResponeModel> GetManagerById(int id);
        Task<ApiResponeModel> SetRegistrationToken(int userId, string registrationToken);
        Task<IEnumerable<UserInformationModel>> GetListUserUseMobileByBranchID(string branchId);


    }
}
