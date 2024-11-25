using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployee _EmployeeRepository;
        private readonly IMapper _Mapper;


        public EmployeeController(IEmployee employee, IMapper mapper)
        {
            _EmployeeRepository = employee;
            _Mapper = mapper;


        }

        [HttpPost("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll(EmployeeRequestModel? employeeRequestModel)
        {
            try
            {
                var listValue = await _EmployeeRepository.GetAll(employeeRequestModel);
                return Ok(listValue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllNoRequest()
        {
            EmployeeRequestModel? employeeRequestModel = new EmployeeRequestModel();
            try
            {
                var listValue = await _EmployeeRepository.GetAll(employeeRequestModel);
                return Ok(listValue);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
                [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _EmployeeRepository.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee(EmployeeModel employeeModel)
        {
            var createStatus = await _EmployeeRepository.Create(employeeModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateEmployee(int id, EmployeeModel employeeModel)
        {
            var updateStatus = await _EmployeeRepository.Update(id, employeeModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var deleteStatus = await _EmployeeRepository.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetListEmployee")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetListEmployee()
        {
            var value = await _EmployeeRepository.GetListEmployee();
            return Ok(value);
        }
    }
}


