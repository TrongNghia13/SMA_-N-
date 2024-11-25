using AutoMapper;
using DATA;
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
    public class OrganizationUnitController : ControllerBase
    {
        private readonly IOrganizationUnit _OrganizationUnitService;
        private readonly IMapper _Mapper;


        public OrganizationUnitController( IMapper mapper, IOrganizationUnit OrganizationUnit )
        {
            _OrganizationUnitService = OrganizationUnit;
            _Mapper = mapper;


        }

        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllOrganizationUnit()
        {

            var listValue = await _OrganizationUnitService.GetAll();
            return Ok(listValue);
        }

        [HttpGet("GetById/{id}")]


        public async Task<IActionResult> GetById(int id)
        {
            var value = await _OrganizationUnitService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }


    
        [HttpPost("Create")]
        public async Task<IActionResult> AddOrganizationUnit(OrganizationUnitModel OrganizationUnit)
        {
            var createStatus = await _OrganizationUnitService.Create(OrganizationUnit);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateOrganizationUnit(int id, OrganizationUnitModel OrganizationUnit)
        {
            var updateStatus = await _OrganizationUnitService.Update(id, OrganizationUnit);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }

        [HttpDelete("Delete/{id}")]

        public async Task<IActionResult> DeleteOrganizationUnit(int id)
        {
            
                var deleteStatus = await _OrganizationUnitService.Delete(id);
                if (deleteStatus == null || !deleteStatus.Success)
                {
                    return NotFound(deleteStatus);
                }
                return Ok(deleteStatus);
            
        }
        [HttpGet("GetDataShowTreeSelect")]
        public async Task<IActionResult> GetDataShowTreeSelect()
        {
            try
            {
                var entity = await _OrganizationUnitService.GetDataShowTreeSelect();
                return Ok(entity);
            }
            catch
            {
                return Ok();

            }
        }

        [HttpGet("GetDataShowTreeGrid")]
        public async Task<IActionResult> GetDataShowTreeGrid()
        {
            try
            {
                var entity = await _OrganizationUnitService.GetDataShowTreeGrid();
                return Ok(entity);
            }
            catch
            {
                return Ok();

            }
        }
    }
}
