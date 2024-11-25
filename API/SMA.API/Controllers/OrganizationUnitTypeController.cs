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
    public class OrganizationUnitTypeController : ControllerBase
    {
        private readonly IOrganizationUnitType _OrganizationUnitType;
        private readonly IMapper _Mapper;


        public OrganizationUnitTypeController(IMapper mapper, IOrganizationUnitType OrganizationUnitType)
        {
            _OrganizationUnitType = OrganizationUnitType;
            _Mapper = mapper;


        }

        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {

            var OrganizationUnitType = await _OrganizationUnitType.GetAll();
            return Ok(OrganizationUnitType);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var value = await _OrganizationUnitType.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }


        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> AddOrganizationUnitType(OrganizationUnitTypeModel OrganizationUnitType)
        {
            var createStatus = await _OrganizationUnitType.Create(OrganizationUnitType);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateOrganizationUnitType(int id, OrganizationUnitTypeModel OrganizationUnitType)
        {
            var updateStatus = await _OrganizationUnitType.Update(id, OrganizationUnitType);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteOrganizationUnitType(int id)
        {
            var deleteStatus = await _OrganizationUnitType.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetDataShowTreeSelect")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetDataShowTreeSelect()
        {
            var OrganizationUnitType = await _OrganizationUnitType.GetDataShowTreeSelect();
            return Ok(OrganizationUnitType);
        }
    }
}

