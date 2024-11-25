using Model.Models;
namespace Service.Interface
{
	public interface IEmployee
    {
        Task<IEnumerable<EmployeeModel>> GetAll(EmployeeRequestModel? employeeRequestModel);
        Task<ApiResponeModel> GetById(int id);
        Task<ApiResponeModel> Create(EmployeeModel employeeModel);
        Task<ApiResponeModel> Update(int id, EmployeeModel employeeModel);
        Task<ApiResponeModel> Delete(int id);
        Task<IEnumerable<EmployeeModel>> GetListEmployee();

    }
}
