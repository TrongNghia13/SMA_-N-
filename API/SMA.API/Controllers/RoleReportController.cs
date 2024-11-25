using AutoMapper;
using DATA;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class RoleReportController : ControllerBase
    {
        private readonly IRoleReportService _roleReportService;
        private readonly IMapper _mapper;
        public RoleReportController(IRoleReportService roleReportService, IMapper mapper)
        {
            _roleReportService = roleReportService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _roleReportService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _roleReportService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateRoleReport(RoleReportModel roleReportModel)
        {
            var createStatus = await _roleReportService.Create(roleReportModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateRoleReport(int id, RoleReportModel roleReportModel)
        {
            var updateStatus = await _roleReportService.Update(id, roleReportModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteRoleReport(int id)
        {
            var deleteStatus = await _roleReportService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("TreeReportByRole/{id}")]
        public async Task<IActionResult> TreeReportByRole(int id)
        {
            var value = await _roleReportService.TreeReportByRole(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpPost("RoleReportManagerByList")]
        public async Task<IActionResult> RoleMenuManagerByList(List<RoleReport> listRole)
        {
            var value = await _roleReportService.RoleReportManagerByList(listRole);
            return Ok(value);
        }
    }
}



