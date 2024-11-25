using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class CateGalvanizedOrganizationController : ControllerBase
    {


        private readonly ICateGalvanizedOrganizationService _cateGalvanizedOrganizationService;
        private readonly IMapper _mapper;
        public CateGalvanizedOrganizationController(ICateGalvanizedOrganizationService cateGalvanizedOrganizationService, IMapper mapper)
        {
            _cateGalvanizedOrganizationService = cateGalvanizedOrganizationService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _cateGalvanizedOrganizationService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var value = await _cateGalvanizedOrganizationService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateCateProductType(CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel)
        {
            var createStatus = await _cateGalvanizedOrganizationService.Create(cateGalvanizedOrganizationModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateCateProductType(string id, CateGalvanizedOrganizationModel cateGalvanizedOrganizationModel)
        {
            var updateStatus = await _cateGalvanizedOrganizationService.Update(id, cateGalvanizedOrganizationModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteCateProductType(string id)
        {
            var deleteStatus = await _cateGalvanizedOrganizationService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }

    }
}
