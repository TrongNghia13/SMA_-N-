using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Implement
{
    public class ImageService : IImage
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<Image> _imageRepository;
        private readonly IMapper _Mapper;

        public ImageService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _imageRepository = _unitOfWork.ImageRepository;
            _Mapper = mapper;
        }

        public async Task Add(ImageModel imageModel)
        {

            var _mapping = _Mapper.Map<Image>(imageModel);
            _mapping.IsDelete = false;
            await _imageRepository.CreateAsync(_mapping);
            await _unitOfWork.SaveChanges();
        }

        public async Task Delete(long id)
        {
            var entity = await _imageRepository.GetAsync(id);
            if (entity != null)
            {
                entity.IsDelete = true;
                await _imageRepository.UpdateAsync(entity);
                await _unitOfWork.SaveChanges();
            }
        }


        public async Task<IEnumerable<Image>> GetAll()
        {

            var listImage = await _imageRepository.GetAllAsync(c => c.IsDelete == false);

            return listImage;

        }

        public async Task<Image> GetById(long id)
        {
            var image = await _imageRepository.GetAsync(id);

            return image;
        }

        public async Task<IEnumerable<Image>> GetItemIdById(string id)
        {
            var listImage = await _imageRepository.GetAllAsync(i=>i.ItemId==id);

            return listImage;
        }

        public async Task Update(ImageModel imageModel)
        {
            var map = _Mapper.Map<Image>(imageModel);
            map.IsDelete = false;
            await _imageRepository.UpdateAsync(map);
            await _unitOfWork.SaveChanges();

        }

        public async Task<bool> IsExists(long id)
        {
            return await _imageRepository.AnyAsync(p => p.ImageId == id && p.IsDelete == false);

        }
    }
}
