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
    public class CateManufacturingProcessProfile : Profile
    {
        public CateManufacturingProcessProfile()
        {
            CreateMap<CateManufacturingProcess, CateManufacturingProcessModel>().ReverseMap();
        }

    }
}
