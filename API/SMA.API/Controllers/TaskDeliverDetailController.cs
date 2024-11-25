using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class TaskDeliverDetailController : ControllerBase
    {
        private readonly ITaskDeliverDetailService _taskDeliverDetailService;
        private readonly IMapper _mapper;
        public TaskDeliverDetailController(ITaskDeliverDetailService taskDeliverDetailService, IMapper mapper)
        {
            _taskDeliverDetailService = taskDeliverDetailService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _taskDeliverDetailService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _taskDeliverDetailService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTaskDeliverDetail(TaskDeliverDetailModel TaskDeliverDetailModel)
        {
            var createStatus = await _taskDeliverDetailService.Create(TaskDeliverDetailModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateTaskDeliverDetail(decimal id, TaskDeliverDetailModel TaskDeliverDetailModel)
        {
            var updateStatus = await _taskDeliverDetailService.Update(id, TaskDeliverDetailModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteTaskDeliverDetail(decimal id)
        {
            var deleteStatus = await _taskDeliverDetailService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }

        [HttpPost("UploadTaskRequest")]
        public async Task<IActionResult> UploadTaskRequest(UploadTaskRequestModel iduploadTaskRequestModel)
        {
            var uploadStatus = await _taskDeliverDetailService.UploadTaskRequest(iduploadTaskRequestModel);
            if (uploadStatus == null || !uploadStatus.Success)
            {
                return NotFound(uploadStatus);
            }
            return Ok(uploadStatus);
        }
    }
}



