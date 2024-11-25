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
    public class PlanDetailOutputProfile : Profile
    {
        public PlanDetailOutputProfile()
        {

            CreateMap<PlanDetailOutput, PlanDetailOutputModel>();
            CreateMap<PlanDetailOutputModel, PlanDetailOutput>();

        }
    }
}
