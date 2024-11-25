using Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA.Infastructure;
using DATA;
using Model.Models;
using Service.Interface;

namespace Service.Implement
{
    public class ReportLeftHeadlineService : IReportLeftHeadlineService
    {

        private readonly IUnitOfWork _unitOfWork;
        private readonly IRepository<ReportLeftHeadline> _reportLeftHeadlineRepository;
        private readonly IMapper _mapper;
        public ReportLeftHeadlineService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _reportLeftHeadlineRepository = _unitOfWork.ReportLeftHeadlineRepository;
            _mapper = mapper;
        }
        public async Task<IEnumerable<ReportLeftHeadlineModel>> GetAll()
        {
            var listEntity = await _reportLeftHeadlineRepository.GetAllAsync();
            var mapList = _mapper.Map<IEnumerable<ReportLeftHeadlineModel>>(listEntity);
            return mapList;
        }
    }
}
