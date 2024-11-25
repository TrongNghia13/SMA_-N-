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
    public class PlanManufacturingProfile : Profile
    {
        public PlanManufacturingProfile()
        {

            CreateMap<PlanManufacturing, PlanManufacturingModel>();
            CreateMap<PlanManufacturingModel, PlanManufacturing>();

        }
    }
}
