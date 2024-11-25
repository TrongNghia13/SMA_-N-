using AutoMapper;
using DATA;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Helper.MappingProfile
{
    public class CateCounterpartyGroupProfile : Profile
    {
        public CateCounterpartyGroupProfile()
        {
            CreateMap<CateCounterpartyGroup, CateCounterpartyGroupModel>();
            CreateMap<CateCounterpartyGroupModel, CateCounterpartyGroup>();
            CreateMap<CateCounterpartyGroupTreeDataModel, CateCounterpartyGroup>().ReverseMap();

        }
    }
}
