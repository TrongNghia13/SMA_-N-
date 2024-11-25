using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DATA;
using Model.Models;

namespace Helper.MappingProfile
{
    public class CateSteelTypeProfile : Profile
    {
        public CateSteelTypeProfile()
        {

            CreateMap<CateSteelType, CateSteelTypeModel>();
            CreateMap<CateSteelTypeModel, CateSteelType>();

        }
    }
}