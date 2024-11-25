using AutoMapper;
using DATA;
using Model.Models;

namespace Helper.MappingProfile
{
    public class ReportLeftHeadlineProfile : Profile
    {
        public ReportLeftHeadlineProfile()
        {
            CreateMap<ReportLeftHeadlineModel, ReportLeftHeadline>().ReverseMap();
        }
    }
}
