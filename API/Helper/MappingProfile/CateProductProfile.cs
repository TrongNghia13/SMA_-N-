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
    public class CateProductProfile : Profile
    {
        public CateProductProfile()
        {

            CreateMap<CateProduct, CateProductModel>();
            CreateMap<CateProductModel, CateProduct>();

        }
    }
}
