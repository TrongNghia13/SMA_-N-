using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CateCoatingFacilityController : ControllerBase
    {

        private readonly ICateCoatingFacility _CateCoatingFacilityRepository;
        private readonly IMapper _Mapper;


        public CateCoatingFacilityController(ICateCoatingFacility cateCoatingFacility, IMapper mapper)
        {
            _CateCoatingFacilityRepository = cateCoatingFacility;
            _Mapper = mapper;


        }

        [ActionName("GetAll")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllCateCoatingFacility()
        {

            var cateCoatingFacility = await _CateCoatingFacilityRepository.GetAll();
            return Ok(cateCoatingFacility);
        }

        [ActionName("GetByID")]
        [HttpGet("{id}")]


        public async Task<IActionResult> GetCateCoatingFacilityById(string id)
        {
            var cateCoatingFacility = await _CateCoatingFacilityRepository.GetById(id);
            if (cateCoatingFacility == null)
                return NotFound();
            return Ok(cateCoatingFacility);
        }


        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> AddCateCoatingFacility(CateCoatingFacilityModel cateCoatingFacility)
        {
            var existingCateCoatingFacility = await _CateCoatingFacilityRepository.GetById(cateCoatingFacility.CoatingFacilityId);
            if (existingCateCoatingFacility != null)
                return BadRequest("Dublicate !");
            await _CateCoatingFacilityRepository.Add(cateCoatingFacility);
            return Ok(cateCoatingFacility);
        }

        [ActionName("Update")]
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdatedCateCoatingFacility(string id, CateCoatingFacilityModel cateCoatingFacility)
        {
            var existingCateCoatingFacility = await _CateCoatingFacilityRepository.IsExists(id);
            if (!existingCateCoatingFacility)
                return NotFound();
            await _CateCoatingFacilityRepository.Update(cateCoatingFacility);
            return Ok(cateCoatingFacility);
        }

        [ActionName("Delete")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteCateCoatingFacility(string id)
        {
            var existingCateCoatingFacility = await _CateCoatingFacilityRepository.GetById(id);
            if (existingCateCoatingFacility == null)
                return NotFound();

            await _CateCoatingFacilityRepository.Delete(id);

            return Ok("Delete Success!");
        }
    }
}
