using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Implement;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/")]
    [ApiController]
    public class ProductImeiController : ControllerBase
    {
        private readonly IProductImeiService _ProductImeiService;
        private readonly IMapper _mapper;
        public ProductImeiController(IProductImeiService ProductImeiService, IMapper mapper)
        {
            _ProductImeiService = ProductImeiService;
            _mapper = mapper;
        }
        [HttpGet("GetAll")]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAll()
        {
            var listValue = await _ProductImeiService.GetAll();
            return Ok(listValue);
        }


        [HttpGet("GetById/{id}")]
        public async Task<IActionResult> GetById(decimal id)
        {
            var value = await _ProductImeiService.GetById(id);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateProductImei(ProductImeiModel ProductImeiModel)
        {
            var createStatus = await _ProductImeiService.Create(ProductImeiModel);
            if (createStatus == null || !createStatus.Success)
            {
                return BadRequest(createStatus);
            }
            return Ok(createStatus);
        }

        [HttpPut("Update/{id}")]

        public async Task<IActionResult> UpdateProductImei(decimal id, ProductImeiModel ProductImeiModel)
        {
            var updateStatus = await _ProductImeiService.Update(id, ProductImeiModel);
            if (updateStatus == null || !updateStatus.Success)
            {
                return NotFound(updateStatus);
            }
            return Ok(updateStatus);
        }


        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> DeleteProductImei(decimal id)
        {
            var deleteStatus = await _ProductImeiService.Delete(id);
            if (deleteStatus == null || !deleteStatus.Success)
            {
                return NotFound(deleteStatus);
            }
            return Ok(deleteStatus);
        }
        [HttpGet("GetRollByImei/{imei}")]
        public async Task<IActionResult> GetRollByImei(string imei)
        {
            var value = await _ProductImeiService.GetRollByImei(imei);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpGet("GetTapeByImei/{imei}")]
        public async Task<IActionResult> GetTapeByImei(string imei)
        {
            var value = await _ProductImeiService.GetTapeByImei(imei);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpGet("GetProductByImei/{imei}")]
        public async Task<IActionResult> GetProductByImei(string imei)
        {
            var value = await _ProductImeiService.GetProductByImei(imei);
            if (value == null || !value.Success)
                return NotFound(value);

            return Ok(value);
        }
        [HttpPost("UploadProductImeiWithImage")]
        [Consumes("multipart/form-data")]
        public async Task<IActionResult> UploadProductImeiWithImage([FromForm] List<IFormFile> imageFiles, [FromForm] ProductImeiModel product)
        {
            List<string> uploadedFilePaths = new List<string>();
            List<string> urlImage = new List<string>();
            try
            {
                ProductImeiModel productImei = product;

                string uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/imageuploads/" + product.ProductImeiID);

                if (!Directory.Exists(uploadsFolder))
                {
                    Directory.CreateDirectory(uploadsFolder);
                }

                foreach (var imageFile in imageFiles)
                {
                    if (imageFile.Length > 0)
                    {
                        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), uploadsFolder, fileName);

                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            await imageFile.CopyToAsync(stream);
                            uploadedFilePaths.Add(filePath);
                            urlImage.Add("https://apisma.cuahangkinhdoanh.com/imageuploads/" + product.ProductImeiID + "/"+ fileName);
                        }
                    }
                }
                for (int i = 0; i < urlImage.Count; i++)
                {
                    if (product.Image1 == null || product.Image1.Trim() == "")
                    {
                        productImei.Image1 = urlImage[i];
                    }
                    else if (product.Image2 == null || product.Image2.Trim() == "")
                    {
                        productImei.Image2 = urlImage[i];

                    }
                    else if (product.Image3 == null || product.Image3.Trim() == "")
                    {
                        productImei.Image3 = urlImage[i];
                    }
                    else if (product.Image4 == null || product.Image4.Trim() == "")
                    {
                        productImei.Image4 = urlImage[i];
                    }
                }
                productImei.CreatedBy = product.CreatedBy;
                productImei.CreatedDate = DateTime.Now;
                var updateImei = await UpdateProductImei(productImei.ProductImeiID, productImei);
                return Ok();
            }
            catch (Exception ex)
            {
                for(int i = 0; i < uploadedFilePaths.Count; i++)
                {
                    System.IO.File.Delete(uploadedFilePaths[i]);
                }
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}



