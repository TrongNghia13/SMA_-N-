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
    public class CateStoreProfile : Profile
    {
        public CateStoreProfile()
        {
            CreateMap<CateStore, CateStoreModel>().ReverseMap();
        }
    }
}
