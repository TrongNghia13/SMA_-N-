using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Service.Interface;

namespace SMA.API.Controllers
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class ImageController : ControllerBase
    {

        private readonly IImage _imageRepository;



        public ImageController(IImage image, IMapper mapper)
        {
            _imageRepository = image;



        }

        [ActionName("GetAll")]
        [HttpGet]
        //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetAllImage()
        {

            var image = await _imageRepository.GetAll();
            return Ok(image);
        }

        [ActionName("GetByID")]
        [HttpGet("{id}")]

        public async Task<IActionResult> GetImageById(long id)
        {
            var image = await _imageRepository.GetById(id);
            if (image == null)
                return NotFound();
            return Ok(image);
        }

        [ActionName("GetItemIdById")]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemIdById(string id)
        {
            var listImage = await _imageRepository.GetItemIdById(id);
            if (listImage == null)
                return NotFound();
            return Ok(listImage);
        }

        [ActionName("Create")]
        [HttpPost]
        public async Task<IActionResult> AddImage(ImageModel image)
        {
            var existingImage = await _imageRepository.GetById(image.ImageId);
            if (existingImage != null)
                return BadRequest("Dublicate !");

            await _imageRepository.Add(image);
            return Ok(image);
        }

        [ActionName("Update")]
        [HttpPut("{id}")]

        public async Task<IActionResult> UpdatedImage(long id, ImageModel image)
        {
            var existingImage = await _imageRepository.IsExists(id);
            if (!existingImage)
                return NotFound();
            await _imageRepository.Update(image);
            return Ok(image);
        }

        [ActionName("Delete")]
        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteImage(long id)
        {
            var existingImage = await _imageRepository.GetById(id);
            if (existingImage == null)
                return NotFound();

            await _imageRepository.Delete(id);

            return Ok("Delete Success!");
        }
    }
}
