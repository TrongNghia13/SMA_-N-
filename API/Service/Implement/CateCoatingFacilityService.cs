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
    public class CateCoatingFacilityService : ICateCoatingFacility
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<CateCoatingFacility> _CateCoatingFacilityRepository;
        private readonly IMapper _Mapper;

        public CateCoatingFacilityService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _CateCoatingFacilityRepository = _unitOfWork.CateCoatingFacilityRepository;
            _Mapper = mapper;
        }

        public async Task Add(CateCoatingFacilityModel cateCoatingFacilityModel)
        {

            var _mapping = _Mapper.Map<CateCoatingFacility>(cateCoatingFacilityModel);
            _mapping.isDelete= false;
            await _CateCoatingFacilityRepository.CreateAsync(_mapping);
            await _unitOfWork.SaveChanges();
        }

        public async Task Delete(string id)
        {
            var entity = await _CateCoatingFacilityRepository.GetAsync(id);
            if (entity != null)
            {
                entity.isDelete = true;
                await _CateCoatingFacilityRepository.UpdateAsync(entity);
                await _unitOfWork.SaveChanges();
            }
        }


        public async Task<IEnumerable<CateCoatingFacility>> GetAll()
        {

            var listCateCoatingFacility = await _CateCoatingFacilityRepository.GetAllAsync(c=>c.isDelete==false);

            return listCateCoatingFacility;

        }

        public async Task<CateCoatingFacility> GetById(string id)
        {
            var cateCoatingFacility = await _CateCoatingFacilityRepository.GetAsync(id);

            return cateCoatingFacility;
        }
        public async Task Update(CateCoatingFacilityModel cateCoatingFacilityModel)
        {
            var map = _Mapper.Map<CateCoatingFacility>(cateCoatingFacilityModel);
            map.isDelete = false;
            await _CateCoatingFacilityRepository.UpdateAsync(map);
            await _unitOfWork.SaveChanges();

        }

        public async Task<bool> IsExists(string id)
        {
            return await _CateCoatingFacilityRepository.AnyAsync(p => p.CoatingFacilityId == id && p.isDelete == false);

        }
    }
}
