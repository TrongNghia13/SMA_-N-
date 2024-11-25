using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ReportLeftHeadlineController : ControllerBase
    {
        private readonly IReportLeftHeadlineService _reportLeftHeadlineService;
        public ReportLeftHeadlineController(IReportLeftHeadlineService reportLeftHeadlineService)
        {
            _reportLeftHeadlineService = reportLeftHeadlineService;
        }
        [ActionName("GetAll")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {

            var listValue = await _reportLeftHeadlineService.GetAll();
            return Ok(listValue);
        }
    }
}



