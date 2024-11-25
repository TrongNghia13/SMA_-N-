using AutoMapper;
using DATA;
using Model.Models;

namespace Helper.MappingProfile
{
    public class ReportParameterProfile : Profile
    {
        public ReportParameterProfile()
        {
            CreateMap<ReportParameterModel, ReportParameter>().ReverseMap();
        }
    }
}
